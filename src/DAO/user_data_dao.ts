import mysql2, { RowDataPacket } from "mysql2/promise";
import { UserData } from "../types";
import CustomError from "../utils/customError";

const database = mysql2.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  connectionLimit: 5,
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
  } finally {
    await database.end()
  }
}

export async function readData(id: number) {
  try {
    const [rows] = await database.query<RowDataPacket[]>(
      "select * from user_data where user_id = ?",
      [id]
    );
    return rows;
  } catch (error) {
    throw error;
  } finally {
    await database.end()
  }
}

export async function update(id: number, column: string, newValue: any) {
  try {

    const allowedColumns = [
      "user_id",
      "weight",
      "height",
      "difficulty",
      "bodyType",
      "goal",
    ];
    if (!allowedColumns.includes(column)) {
      const error = new CustomError("Not valid column!", 400);
      throw error;
    }
    const [result] = await database.query(
      `update user_data set ${column} = ? where user_id = ?`,
      [newValue, id]
    );
    return result;
  } catch (error) {
    throw error;
  } finally {
    await database.end()
  }
}
