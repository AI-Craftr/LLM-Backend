import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ResponseMessages } from '@src/common/constants/response-messages.constant';

export const ApiCreateChatRoom = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Create chat room',
    }),
    ApiCreatedResponse({
      schema: {
        example: {
          statusCode: 201,
          message: null,
          response: {
            chat_room: {
              owner_id: '99236eb7-fb04-4426-97cf-67ded0e03a14',
              title: 'string',
              chat_room_id: '435ce136-2d2a-4198-8ab5-6085765d0779',
              created_at: '2024-11-26T03:08:48.923Z',
              updated_at: '2024-11-26T03:08:48.923Z',
            },
          },
        },
      },
    }),
    ApiBadRequestResponse({
      schema: {
        example: {
          statusCode: HttpStatus.BAD_REQUEST,
          message: ResponseMessages.BAD_REQUEST,
          error: 'Bad Request',
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
