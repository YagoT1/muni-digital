import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common'
import type { Request, Response } from 'express'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name)

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()

    const isHttpException = exception instanceof HttpException
    const statusCode = isHttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR

    const exceptionResponse = isHttpException ? exception.getResponse() : null

    const rawMessage =
      typeof exceptionResponse === 'string'
        ? exceptionResponse
        : typeof exceptionResponse === 'object' &&
            exceptionResponse !== null &&
            'message' in exceptionResponse
          ? (exceptionResponse as { message?: string | string[] }).message
          : undefined

    const publicMessage =
      statusCode >= 500
        ? 'Ocurrió un error interno. Intentá nuevamente.'
        : rawMessage ?? 'No se pudo procesar la solicitud.'

    const error =
      typeof exceptionResponse === 'object' &&
      exceptionResponse !== null &&
      'error' in exceptionResponse
        ? (exceptionResponse as { error?: string }).error
        : undefined

    const technicalMessage =
      exception instanceof Error
        ? exception.message
        : Array.isArray(rawMessage)
          ? rawMessage.join(', ')
          : String(rawMessage ?? 'unknown error')

    this.logger.error(
      `[${request.method}] ${request.url} -> ${statusCode} ${technicalMessage}`,
      exception instanceof Error ? exception.stack : undefined,
    )

    response.status(statusCode).json({
      statusCode,
      message: publicMessage,
      error: statusCode >= 500 ? 'Internal Server Error' : error,
      timestamp: new Date().toISOString(),
      path: request.url,
    })
  }
}
