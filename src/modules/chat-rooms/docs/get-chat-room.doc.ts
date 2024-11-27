import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ResponseMessages } from '@src/common/constants/response-messages.constant';

export const ApiGetChatRoomList = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'get chat room list',
    }),
    ApiOkResponse({
      schema: {
        example: {
          statusCode: 200,
          message: null,
          response: {
            data: [
              {
                chat_room_id: '435ce136-2d2a-4198-8ab5-6085765d0779',
                owner_id: '99236eb7-fb04-4426-97cf-67ded0e03a14',
                title: 'string',
                created_at: '2024-11-26T03:08:48.923Z',
                updated_at: '2024-11-26T03:08:48.923Z',
              },
              {
                chat_room_id: '6ca6de80-6a93-4807-82c5-a7e8fac672c5',
                owner_id: '99236eb7-fb04-4426-97cf-67ded0e03a14',
                title: 'string',
                created_at: '2024-11-26T03:12:29.472Z',
                updated_at: '2024-11-26T03:12:29.472Z',
              },
              {
                chat_room_id: 'e6944d0e-05e5-40f8-9169-e14c53a6ac2d',
                owner_id: '99236eb7-fb04-4426-97cf-67ded0e03a14',
                title: 'string',
                created_at: '2024-11-26T03:12:31.407Z',
                updated_at: '2024-11-26T03:12:31.407Z',
              },
              {
                chat_room_id: '27b3d92b-f4d4-4c56-b370-44ba6918163f',
                owner_id: '99236eb7-fb04-4426-97cf-67ded0e03a14',
                title: 'string',
                created_at: '2024-11-26T03:12:34.556Z',
                updated_at: '2024-11-26T03:12:34.556Z',
              },
              {
                chat_room_id: '6eb72a53-d87b-4858-9b1d-eadaac229778',
                owner_id: '99236eb7-fb04-4426-97cf-67ded0e03a14',
                title: '',
                created_at: '2024-11-26T03:45:24.187Z',
                updated_at: '2024-11-26T03:45:24.187Z',
              },
              {
                chat_room_id: '71699194-e7dd-48bd-b083-2096bf9097f4',
                owner_id: '99236eb7-fb04-4426-97cf-67ded0e03a14',
                title: '',
                created_at: '2024-11-26T03:46:23.070Z',
                updated_at: '2024-11-26T03:46:23.070Z',
              },
              {
                chat_room_id: 'bd733aac-af03-440b-8327-ee1ebf0d3e51',
                owner_id: '99236eb7-fb04-4426-97cf-67ded0e03a14',
                title: '',
                created_at: '2024-11-26T03:46:24.749Z',
                updated_at: '2024-11-26T03:46:24.749Z',
              },
            ],
            meta: {
              page: 1,
              take: 10,
              itemCount: 7,
              pageCount: 1,
              hasPreviousPage: false,
              hasNextPage: false,
            },
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
