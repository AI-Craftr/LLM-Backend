export interface ISingleJwt {
  secret: string;
  time: number;
}

export interface IAccessJwt {
  time: number;
  public_key: string;
  private_key: string;
}

export interface IJwt {
  access: IAccessJwt;
  refresh: ISingleJwt;
  confirmation: ISingleJwt;
  reset_password: ISingleJwt;
}
