import { Request } from "express";
import { Server } from "socket.io";

export interface TokenData {
  id?: string;
  iat?: number;
  exp?: number;
}
