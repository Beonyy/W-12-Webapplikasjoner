
import { ResultError, isErrorCode, isRecord } from "./errors"

export type ResultData<T> = {success:true, data: T}

export type Result<T> = ResultData<T> | ResultError

export function isResult(value: unknown): value is Result<unknown> {
  if (!isRecord(value)) {
    return false;
  }

  if (value.success === true) {
    return "data" in value;
  }

  if (value.success === false) {
    const error = value.error;

    return (
      isRecord(error) &&
      isErrorCode(error.code) &&
      typeof error.message === "string"
    );
  }

  return false;
}