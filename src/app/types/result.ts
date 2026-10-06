
import { ResultError } from "./errors"

export type ResultData<T> = {success:boolean, data: T}

export type Result<T> = ResultData<T> | ResultError