import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import { QueryFailedError } from "typeorm/error/QueryFailedError";

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const status = exception.getStatus
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse = {
      code: status,
      timestamp: new Date().toLocaleDateString(),
      path: request.url,
      method: request.method,
      message:
        status !== HttpStatus.INTERNAL_SERVER_ERROR
          ? exception.message.error || exception.message || null
          : "Internal server error",
    };

    if (exception.name === "QueryFailedError") {
      Logger.warn(exception);
      this.catchTypeOrmQuery(exception, errorResponse);
    } else if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      console.error(exception);
    }

    Logger.error(
      `${request.method} ${request.url}`,
      JSON.stringify(errorResponse),
      "ExceptionFilter",
    );

    response.status(404).json(errorResponse);
  }

  catchTypeOrmQuery(exception: any, errorResponse: any) {
    const dbCode = exception.code;
    const detail = exception.detail;

    errorResponse.message = "Database error";
    errorResponse.dbCode = dbCode;
    errorResponse.detail = detail;
  }
}
