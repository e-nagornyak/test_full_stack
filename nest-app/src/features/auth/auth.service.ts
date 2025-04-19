import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { LoginUserModel } from './models/login-user.model'
import * as bcrypt from 'bcrypt'
import { PrismaService } from '../../prisma.service'
import { RegisterUserModel } from './models/register-user.model'
import { SocialAuthModel } from './models/social-auth.model'

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(user: RegisterUserModel) {
    const { email, password, name } = user

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      throw new ConflictException('The user with such email already exists')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const createdUser = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    })

    const token = this.jwtService.sign({
      sub: createdUser.id,
      email: createdUser.email,
    })

    return {
      user: {
        id: createdUser.id,
        email: createdUser.email,
        name: createdUser.name,
      },
      token,
    }
  }

  async login(loginUserDto: LoginUserModel) {
    const { email, password } = loginUserDto

    const user = await this.prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      throw new UnauthorizedException('Incorrect credentials')
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      throw new UnauthorizedException('Incorrect credentials')
    }

    const token = this.jwtService.sign({ sub: user.id, email: user.email })

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      token,
    }
  }
  async socialAuth(socialUser: SocialAuthModel) {
    const { accessToken, providerAccountId, provider, email, name, image } =
      socialUser

    const account = await this.prisma.account.findUnique({
      where: {
        provider_providerAccountId: {
          provider,
          providerAccountId,
        },
      },
      include: {
        user: true,
      },
    })

    let user

    if (account) {
      user = account.user

      await this.prisma.account.update({
        where: { id: account.id },
        data: {
          access_token: accessToken,
          updatedAt: new Date(),
        },
      })
    } else {
      if (email) {
        user = await this.prisma.user.findUnique({
          where: { email },
        })
      }

      if (!user) {
        user = await this.prisma.user.create({
          data: {
            email,
            name,
            image,
          },
        })
      }

      await this.prisma.account.create({
        data: {
          userId: user.id,
          type: 'oauth',
          provider,
          providerAccountId,
          access_token: accessToken,
          token_type: 'bearer',
          scope: 'read:user user:email',
        },
      })
    }

    const token = this.jwtService.sign({ sub: user.id, email: user.email })

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        image: user.image,
      },
      token,
    }
  }
}
