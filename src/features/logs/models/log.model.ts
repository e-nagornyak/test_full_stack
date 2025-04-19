import { IsNumber, IsOptional, IsEnum, IsObject } from 'class-validator'
import { LogType } from '@prisma/client'

export class LogModel {
  @IsOptional()
  @IsObject()
  payload?: Record<string, any> // The payload field can be an object or null

  @IsEnum(LogType)
  type: LogType // The type field is required and must match the value from the LogType enum

  @IsNumber()
  userId: number // The userId field is required and must be a number

  @IsOptional()
  @IsNumber()
  productId?: number // The entityId field is optional and must be a number

  @IsOptional()
  @IsNumber()
  orderId?: number // The entityId field is optional and must be a number
}
