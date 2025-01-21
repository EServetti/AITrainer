export interface User {
  first_name: string;
  last_name: string;
  sex: string;
  date_of_birth: string;
  email: string;
  password: string;
  verifyCode: string;
  verified: boolean;
  role: string,
  photo: string | null
}
export type Resp = {
  statusCode: number;
  message: string | object | any[];
};
export interface mailInfo {
  to: string;
  verifyCode: string
}
export interface recoverInfo {
  to: string,
  token: string
}
export interface UserData {
  user_id: number;
  weight: number;
  height: number;
  goal: string;
  bodyType: "mesomorfo" | "ectomorfo" | "endomorfo"
  difficulty: "facil" | "dificil" | "medio"
}