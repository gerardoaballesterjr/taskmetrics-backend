import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    const error = (message, error = 'Bad Request') => {
      response.status(400).json({
        message: [message],
        error: error,
        statusCode: 400,
      });
    };

    switch (exception.code) {
      case 'P2002': {
        error(`${exception.meta.target[0]} is already exist.`);
        break;
      }
      case 'P2025': {
        error(`${exception.meta.modelName} does not existss.`);
        break;
      }
      case 'P2003': {
        error(
          `${exception.meta.field_name.toString().split('_')[1]} does not exists.`,
        );
        break;
      }
      default:
        super.catch(exception, host);
        break;
    }
  }
}
