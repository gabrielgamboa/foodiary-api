export class UnauthorizedError extends Error {
  constructor(message: string) {
    super(`Unauthorized Error: ${message}`);
    this.name = UnauthorizedError.name;
  }
}