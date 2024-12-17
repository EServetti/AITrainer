import { User } from "../../types";
import crypto from "crypto";

class UserDTO {
  first_name: string;
  last_name: string;
  sex: string;
  date_of_birth: string;
  email: string;
  password: string;
  verifyCode: string;
  verified: boolean;

  constructor(data: User) {
    this.first_name = data.first_name;
    this.last_name = data.last_name;
    this.sex = data.sex;
    this.date_of_birth = data.date_of_birth;
    this.email = data.email;
    this.password = data.password;
    this.verifyCode = crypto.randomBytes(6).toString("hex");
    this.verified = data.verified || false;
  }
}

export default UserDTO