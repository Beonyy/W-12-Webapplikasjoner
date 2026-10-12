
import { ResultError } from "./errors"

export type ResultData<T> = {success:true, data: T}

export type Result<T> = ResultData<T> | ResultError