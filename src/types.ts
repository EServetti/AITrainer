export interface User {
  first_name: string;
  last_name: string;
  sex: string;
  date_of_birth: string;
  email: string;
  password: string;
  verifyCode: string;
  verified: boolean;
  role: string
}
export type Resp = {
  statusCode: number;
  message: string | object | any[];
};
export interface mailInfo {
  to: string;
  verifyCode: string
}