import { Type, applyDecorators } from '@nestjs/common'
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger'

export const PaginatedResponse = <TModel extends Type<any>>(model: TModel) => {
  return applyDecorators(
    ApiExtraModels(model),
    ApiOkResponse({
      schema: {
        title: `PaginatedResponseOf${model.name}`,
        allOf: [
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
          {
            properties: {
              meta: {
                type: 'object',
                properties: {
                  total: { type: 'number' },
                  lastPage: { type: 'number' },
                  currentPage: { type: 'number' },
                  limit: { type: 'number' },
                  prev: { type: 'number' },
                  next: { type: 'number' },
                },
              },
            },
          },
        ],
      },
    }),
  )
}
