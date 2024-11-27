import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ResponseMessages } from '@src/common/constants/response-messages.constant';

export const ApiDeleteChatRoom = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'delete chat room by `chat_room_id`',
    }),
    ApiOkResponse({
      schema: {
        example: {
          message: ResponseMessages.CHAT_ROOM_DELETED_SUCCESS,
        },
      },
    }),
    ApiNotFoundResponse({
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
