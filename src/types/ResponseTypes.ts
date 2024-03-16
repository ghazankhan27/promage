export interface GeneralResponse {
  success: boolean;
  message: string;
}

export interface LoginResponse extends GeneralResponse {
  token?: string;
  refreshToken?: string;
}

export interface DataResponse<T> extends GeneralResponse {
  data: T;
}
