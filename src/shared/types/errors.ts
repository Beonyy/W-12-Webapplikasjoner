//from: https://fullstaekk.no/courses/webapp-2025/lessons/fetch-arkitektur

// Base error codes
export const Errors = {
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
  NOT_FOUND: "NOT_FOUND",
  BAD_REQUEST: "BAD_REQUEST",
  FORBIDDEN: "FORBIDDEN",
  NOT_UNIQUE: "NOT_UNIQUE",
  RATE_LIMITED: "RATE_LIMITED",
  METHOD_NOT_ALLOWED: "METHOD_NOT_ALLOWED",
  UNAUTHORIZED: "UNAUTHORIZED",
} as const;

export type ErrorCode = keyof typeof Errors;


const errorCodes = new Set<string>(Object.keys(Errors));

export function isErrorCode(value: unknown): value is ErrorCode {
  return typeof value === "string" && errorCodes.has(value);
}


const errorCodes = new Set<string>(Object.keys(Errors));

export function isErrorCode(value: unknown): value is ErrorCode {
  return typeof value === "string" && errorCodes.has(value);
}

// Base error structure
type Error = {
  code: ErrorCode;
  message: string;
};

export type ResultError = {
  success: false;
  error: Error;
};

export function makeError(code: ErrorCode, message: string):ResultError{
  return {
    success: false,
    error: {
      code,
      message
    }
  }
}

export function isResultError(value: unknown): value is ResultError {
  if (!isRecord(value) || value.success !== false) {
    return false;
  }

  const error = value.error;

  return (
    isRecord(error) &&
    isErrorCode(error.code) &&
    typeof error.message === "string"
  );
}


export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function statusToResultError(status: number, error:string): ResultError{
 
    switch(status){
      case 400: return makeError("BAD_REQUEST", error);
      case 401: return makeError("UNAUTHORIZED", error);
      case 403: return makeError("FORBIDDEN", error);
      case 404: return makeError("NOT_FOUND", error);
      case 405: return makeError("METHOD_NOT_ALLOWED", error);
      case 409: return makeError("NOT_UNIQUE", error);
      case 429: return makeError("RATE_LIMITED", error);
    }

  return makeError("INTERNAL_SERVER_ERROR", error);
}