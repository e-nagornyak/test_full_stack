import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class SettingModel {
  @ApiProperty({ description: 'The name of the setting' })
  @IsNotEmpty()
  @IsString()
  name: string

  @ApiPropertyOptional({ description: 'Optional description of the setting' })
  @IsOptional()
  @IsString()
  description?: string

  @ApiProperty({ description: 'The boolean value of the setting' })
  @IsBoolean()
  value: boolean
}
