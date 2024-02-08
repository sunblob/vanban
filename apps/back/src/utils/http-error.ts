import { HTTPException } from 'hono/http-exception';
import { StatusCode } from 'hono/utils/http-status';

type ErrorReason =
  | 'INVALID_TOKEN'
  | 'TOKEN_EXPIRED'
  | 'BAD_REQUEST'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'METHOD_NOT_ALLOWED'
  | 'CONFLICT'
  | 'INTERNAL_SERVER_ERROR'
  | 'SERVICE_UNAVAILABLE'
  | 'GATEWAY_TIMEOUT'
  | 'UNKNOWN';

type HTTPExceptionOptions = {
  res?: Response;
  message?: string;
  reason?: ErrorReason;
};

export class HttpError extends HTTPException {
  message: string;
  reason: ErrorReason;

  constructor(status?: StatusCode, options?: HTTPExceptionOptions) {
    super(status, options);

    this.message = options?.message || 'Internal server error';
    this.reason = options?.reason || 'INTERNAL_SERVER_ERROR';
  }
}
