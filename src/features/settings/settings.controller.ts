import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common'
import { SettingsService } from './settings.service'
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'
import { SettingModel } from './models/setting.model'
import { UpdateSettingModel } from './models/update-setting.model'

@ApiTags('settings')
@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new setting' })
  @ApiResponse({
    status: 201,
    description: 'The setting has been successfully created.',
  })
  async create(@Body() settingDto: SettingModel) {
    return this.settingsService.create(settingDto)
  }

  @Get()
  @ApiOperation({ summary: 'Get all settings with optional filtering' })
  @ApiResponse({
    status: 200,
    description: 'Return all settings that match criteria.',
  })
  @ApiQuery({
    name: 'name',
    required: false,
    type: String,
    description: 'Filter by name',
  })
  @ApiQuery({
    name: 'value',
    required: false,
    type: Boolean,
    description: 'Filter by value',
  })
  @ApiQuery({
    name: 'skip',
    required: false,
    type: Number,
    description: 'Number of records to skip',
  })
  @ApiQuery({
    name: 'take',
    required: false,
    type: Number,
    description: 'Number of records to take',
  })
  async findAll(
    @Query('name') name?: string,
    @Query('value') value?: boolean,
    @Query('skip') skip?: number,
    @Query('take') take?: number,
  ) {
    const where: any = {}

    if (name !== undefined) {
      where.name = { contains: name }
    }

    if (value !== undefined) {
      where.value =
        typeof value === 'string' ? value === 'true' : Boolean(value)
    }

    return this.settingsService.findAll({
      where,
      skip: skip ? Number(skip) : undefined,
      take: take ? Number(take) : undefined,
      orderBy: { createdAt: 'desc' },
    })
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get setting by id' })
  @ApiResponse({ status: 200, description: 'Return the setting.' })
  @ApiResponse({ status: 404, description: 'Setting not found.' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const setting = await this.settingsService.findOne(id)
    if (!setting) {
      throw new NotFoundException(`Setting with ID ${id} not found`)
    }
    return setting
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update setting by id' })
  @ApiResponse({
    status: 200,
    description: 'The setting has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Setting not found.' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSettingDto: UpdateSettingModel,
  ) {
    try {
      return await this.settingsService.update(id, updateSettingDto)
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Setting with ID ${id} not found`)
      }
      throw error
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete setting by id' })
  @ApiResponse({
    status: 204,
    description: 'The setting has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Setting not found.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.settingsService.remove(id)
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Setting with ID ${id} not found`)
      }
      throw error
    }
  }
}
