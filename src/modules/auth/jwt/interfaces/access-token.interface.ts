import { ITokenBase } from './token-base.interface';

export interface IAccessPayload {
  user_id: string;
}

export interface IAccessToken extends IAccessPayload, ITokenBase {}
