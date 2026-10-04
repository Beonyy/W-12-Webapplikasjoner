// basert på: https://fullstaekk.no/courses/webapp-2025/lessons/fetch-arkitektur

import type {Pagination} from "./api";
import { type ErrorCode, type ResultError } from "./errors";


// Successful data response type
export type ResultData<T> = {
    success:true;
    data: T;
    pagination?: Pagination;
};

/**Result pattern for APi responses.
 * Note on usage : 
 * const result = await getSomething();
 * If (result.success) ...
 * else ...
 * 
 * */ 
export type Result<T> = ResultData<T> | ResultError;

export type ResultFn = {
    success: <T>(data: T, pagination?: Pagination) => ResultData<T>;
    failure: (error: unknown, code: ErrorCode) => ResultError;
}