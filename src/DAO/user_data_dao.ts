import mysql2, { RowDataPacket } from "mysql2/promise";
import { UserData } from "../types";
import CustomError from "../utils/customError";

const database = mysql2.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: "aitrainer_dev",
});

export async function create(data: UserData) {
  try {
    const [result] = await database.query(
      "insert into user_data (user_id, weight, height, goal, bodyType, difficulty) values(?,?,?,?,?,?)",
      [
        data.user_id,
        data.weight,
        data.height,
        data.goal,
        data.bodyType,
        data.difficulty,
      ]
    );
    return result;
  } catch (error) {
    throw error;
  }
}

export async function readData(id: number) {
  try {
    const [rows] = await database.query<RowDataPacket[]>(
      "select * from user_data where user_id = ?",
      [id]
    );
    return rows
  } catch (error) {
    throw error;
  }
}

export async function update(id:number, column: string, newValue: any) {
  try {
    const allowedColumns = [
      "user_id",
      "weight",
      "height",
      "difficulty",
      "bodyType",
      "goal"

    ];
    if (!allowedColumns.includes(column)) {
      const error = new CustomError("Not valid column!", 400);
      throw error
    }
  } catch (error) {
    throw error
  }
}
