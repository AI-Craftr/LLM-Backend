import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ResponseMessages } from '@src/common/constants/response-messages.constant';

export const ApiUpdateChatRoom = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'update a chat room by `chat_room_id`',
    }),
    ApiOkResponse({
      schema: {
        example: {
          statusCode: 200,
          message: 'CHAT_ROOM_UPDATED_SUCCESS',
          response: null,
        },
      },
    }),
    ApiBadRequestResponse({
      schema: {
        example: {
          statusCode: HttpStatus.NOT_FOUND,
          message: ResponseMessages.NOT_FOUND_CHAT_ROOM,
          error: 'Not Found',
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
  );
};
