import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsBoolean, IsOptional, IsString } from 'class-validator'

export class UpdateSettingModel {
  @ApiPropertyOptional({ description: 'The name of the setting' })
  @IsOptional()
  @IsString()
  name?: string

  @ApiPropertyOptional({ description: 'Description of the setting' })
  @IsOptional()
  @IsString()
  description?: string

  @ApiPropertyOptional({ description: 'The boolean value of the setting' })
  @IsOptional()
  @IsBoolean()
  value?: boolean
}
