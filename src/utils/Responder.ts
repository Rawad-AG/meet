import type { Response } from "express";
import type { AppError } from "../errors/AppError.js";

class ResponseTemplate {
  status: number | undefined;
  message: string | undefined;
  data: any;

  error: AppError | undefined;

  constructor() {}

  send(res: Response) {
    if (this.error) {
      return res.status(this.status ?? 500).json({
        success: false,
        status: this.status ?? 500,
        message: this.message ?? "fail",
        data: this.data,
      });
    }

    return res.status(this.status ?? 200).json({
      success: true,
      status: this.status ?? 200,
      message: this.message ?? "success",
      data: this.data,
    });
  }

  err(err: AppError): ResponseTemplate {
    this.error = err;
    this.status = err.status;
    this.message = err.message;
    return this;
  }

  code(code: number): ResponseTemplate {
    this.status = code;
    return this;
  }

  mess(mess: string): ResponseTemplate {
    this.message = mess;
    return this;
  }

  payload(payload: any): ResponseTemplate {
    this.data = payload;
    return this;
  }
}

export const responder = () => new ResponseTemplate();
