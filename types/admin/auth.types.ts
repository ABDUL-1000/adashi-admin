export interface AdminLoginPayload {
  email: string;
  password: string;
}

export interface AdminLoginResponse {
  token?: string;
  accessToken?: string;
  access_token?: string;
  jwt?: string;
  authToken?: string;
  data?: {
    token?: string;
    accessToken?: string;
    access_token?: string;
    jwt?: string;
    authToken?: string;
  };
}
