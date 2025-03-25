import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ResponseMessages } from '@src/common/constants/response-messages.constant';

export const ApiGetMe = () => {
  return applyDecorators(
    ApiBearerAuth("Authorization"),
    ApiOperation({
      summary: 'Get logged in user',
    }),
    ApiOkResponse({
      schema: {
        example: {
          user: {
            user_id: '99236eb7-fb04-4426-97cf-67ded0e03a14',
            email: 'example@example.com',
            full_name: 'John Doe',
            avatar_url: null,
            created_at: '2024-11-22T17:13:29.366Z',
            updated_at: '2024-11-22T17:13:29.366Z',
          },
        },
      },
    }),
    ApiUnauthorizedResponse({
      schema: {
        example: {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: ResponseMessages.UNAUTHORIZED,
          error: 'Unauthorized',
        },
      },
    }),
  );
};
