import type { RequestHandler } from "express";

/** Cast multer middleware when duplicate @types/express packages cause TS overload errors. */
export function multerHandler(handler: unknown): RequestHandler {
  return handler as RequestHandler;
}
