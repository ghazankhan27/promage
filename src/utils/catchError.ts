import { Response } from "express";
import { GeneralResponse } from "../types";

export function catchError(res: Response, location: string, error: any, statusCode: number = 200) {
  console.log(`Error at ${location}: ${error}`);

  const response: GeneralResponse = {
    success: false,
    message: error instanceof Error ? error.message : error,
  };

  res.status(statusCode).send(response);
}
