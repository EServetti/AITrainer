import mysql2 from "mysql2/promise";
import { User } from "../types";
import CustomError from "../utils/customError";
import { RowDataPacket } from "mysql2/promise";

const database = mysql2.createPool({
  host: "localhost",
  user: "root",
  password: process.env.DATABASE_PASSWORD,
  database: "aitrainer_dev",
});

export async function createUser(data: User): Promise<any> {
  try {
    const [result] = await database.query(
      `insert into users (first_name, last_name, sex, date_of_birth, email, password, verified) values(?,?,?,?,?,?,?);`,
      [
        data.first_name,
        data.last_name,
        data.sex,
        data.date_of_birth,
        data.email,
        data.password,
        data.verified,
      ]
    );
    return result;
  } catch (error) {
    throw error;
  }
}

export async function readUsers(filter:{column: string, value: string | number | boolean}) {
  try {
    if (filter) {
      const allowedColumns = [
        "first_name",
        "last_name",
        "email",
        "password",
        "verified",
        "date_of_birth",
      ];
      if (!allowedColumns.includes(filter.column)) {
        const error = new CustomError("Not valid column!", 400);
        throw error
      }
      const [rows] = await database.query<RowDataPacket[]>(`select * from users where ${filter.column} = ?`, [filter.value])
      return rows
    } else {
      const [rows] = await database.query<RowDataPacket[]>("select * from users")
      return rows
    }
  } catch (error) {
    throw error
  }
}

export async function readByEmail(email: string) {
  try {
    const [rows] = await database.query<RowDataPacket[]>(
      "select * from users where email = ?;",
      [email]
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

export async function updateUser(
  id_user: number,
  column: string,
  newValue: string | number | boolean
) {
  try {
    const allowedColumns = [
      "first_name",
      "last_name",
      "email",
      "password",
      "verified",
      "date_of_birth",
    ];
    if (!allowedColumns.includes(column)) {
      const error = new CustomError("Not valid column!", 400);
      throw error
    }

    const [result] = await database.query(
      `update users set ${column} = ? where id = ?;`,
      [newValue, id_user]
    );
    return result;
  } catch (error) {
    throw error;
  }
}

export async function deleteUser(id:number) {
  try {
    const [result] = await database.query("delete from users where id = ?",[id])
    return result
  } catch (error) {
    throw error
  }
}
