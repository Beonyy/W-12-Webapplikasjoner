import { makeError, statusToResultError } from "@/shared/types/errors";
import { isResult, Result } from "@/shared/types/result";

export async function apiFetch(
    url:string,
    options: RequestInit = {}
): Promise<Result<unknown>>{
    try{
        const response = await fetch(url,options);
        if(!response.ok){
            return statusToResultError(response.status, `Request failed with status ${response.status}`);
        }
         // Successful response with no content
        if (response.status === 204) {
            return {success:true, data:undefined};
        }

        let data: unknown;
        try{
            data = await response.json()
        }catch{
            return makeError("INTERNAL_SERVER_ERROR", "Server returned invalid JSON");
        }

        if(!isResult(data)){
            return makeError("INTERNAL_SERVER_ERROR", "Server returned invalid structure");    
        }
        if(!data.success){
            return data;
        }
        return data

    }catch(e){
        return makeError("BAD_REQUEST", e instanceof Error ? e.message : "Fetch failed.");
    }
}