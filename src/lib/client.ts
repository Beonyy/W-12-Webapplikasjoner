import { APP_URL } from "@/app/config/api";
import type {
    ClientFactoryParams,
    ClientParams,
    ClientResult,
    ResponseHandler,
} from "../app/types/client";

import type { Result, ResultData} from "../app/types/result";

export const API_CONFIG = {
    baseURL: APP_URL,
    defaultHeaders: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
} as const;

// Factory function to create a client with a specific response handler
// Centralizes client creation and response handling
export const clientFactory = ({client, handleResponse}: ClientFactoryParams) : ClientResult =>{
    return{
        get: async <T>({url, options}: Omit<ClientParams<T>, "method">) => {
            return await handleResponse<T>(client({url, method: "GET", options}));
        },
        post: async <T>({url, options, body}: Omit<ClientParams<T>, "method">) =>{
            return await handleResponse<T>(client({url, method:"POST",options, body}));
        },
        put: async <T>({url, options, body}: Omit<ClientParams<T>, "method">) =>{
            return await handleResponse<T>(client({url, method:"PUT",options, body}));
        },
        patch: async <T>({url, options, body}: Omit<ClientParams<T>, "method">) =>{
            return await handleResponse<T>(client({url, method:"PATCH",options, body}));
        },
        delete: async <T>({url, options, body}: Omit<ClientParams<T>, "method">) =>{
            return await handleResponse<T>(client({url, method:"DELETE",options, body}));
        },
    };
};

// Generic client function to handle API requests
export const fetchClient = 
    async <T>({ url = API_CONFIG.baseURL, method = "GET", options, body} : ClientParams<T>) => {
        const requestOptions: RequestInit = { 
            method, 
            headers:{
                ...API_CONFIG.defaultHeaders,
                ...options?.headers,
            },
            ...options,
            body:body?JSON.stringify(body) : undefined,
        };
        return await fetch(url, requestOptions);
    };

// Handles the response from the fetch call
export const handleFetchResponse: ResponseHandler = async <T>(response: Promise<Response>): Promise<Result<T>> =>{
    const result = await response;
    const text = await result.text();
    const data = text ? JSON.parse(text) : null;
    if (!result.ok){
        if(data?.error){
            return data as Result<T>;
        }
        return {
            success:false,
            error: {
                code: "INTERNAL_SERVER_ERROR",
                message: result.statusText || "Request failed",
            },
        };
    }
    return{
        success: true,
        data: data?.data || data,
        pagination: data?.pagination,
    } as ResultData<T>;
};

// Creates a default API client with the base URL and response handler 
export const apiClient = clientFactory({
    client: fetchClient,
    handleResponse: handleFetchResponse,
});

// Export the client as the default for simpler imports, not forcing the usage of { apiClient }
export default apiClient;
