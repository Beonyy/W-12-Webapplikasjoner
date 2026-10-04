// tatt fra: https://fullstaekk.no/courses/webapp-2025/lessons/fetch-arkitektur
import { Result } from "./result";


// Parameters type for HTTP client calls, injecting a genric type T
export type ClientParams<T = unknown> = {
    url: string;
    method?: RequestInit["method"];
    options?: Omit<RequestInit, "method" | "body">;
    body?: T | Record<string, unknown> | null;
};

// generic HTTP client interface/function signature declaration
// T goes in, U comes out.
// T is the type of request body.
// U is the return type.
export type Client<T = unknown, U = Response> = (params: ClientParams<T>) => Promise<U>;

// Response handler for processing HTTP responses
// this is the signature, of sorts.
export type ResponseHandler = <T>(response: Promise<Response>) => Promise<Result<T>>;


// Client factory parameters
export type ClientFactoryParams = {
    client: Client;
    handleResponse: ResponseHandler;
};

type Params<T> = Omit<ClientParams<T>, "method">;

// HTTP client with specific methods - now returns Result<T>
export interface ClientResult {
    get: <T = unknown>(params: Params<T>) => Promise<Result<T>>;
    post: <T = unknown>(params: Params<T>) => Promise<Result<T>>;
    put: <T = unknown>(params: Params<T>) => Promise<Result<T>>;
    delete: <T = unknown>(params: Params<T>) => Promise<Result<T>>;
    patch: <T = unknown>(params: Params<T>) => Promise<Result<T>>;
}

// Factory interface for creating HTTP clients
export type IClientFactory = (params: ClientFactoryParams) => ClientResult;