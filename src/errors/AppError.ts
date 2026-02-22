export class AppError extends Error {
  appError: boolean;
  status: number;

  constructor(message = "something went wrong", status = 500) {
    super(message);
    this.status = status;
    this.appError = true;
  }
}
