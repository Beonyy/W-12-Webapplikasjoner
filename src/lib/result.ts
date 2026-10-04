// from https://fullstaekk.no/courses/webapp-2025/lessons/fetch-arkitektur
import type { ResultFn } from "@/app/types/result";
import { Errors } from "@/app/types/errors";


// Helper function to simplify getting correct response back.
export const ResultHandler: ResultFn = {
    success(data, pagination) {
        return { success: true, data, ...pagination };
    },
    failure(error: unknown, code = Errors.INTERNAL_SERVER_ERROR) {
        let err = "";
        if (typeof error === "string") err = error;
        if (typeof error === "object" && err !== null) err = JSON.stringify(error);

        return { success: false, error: { message: err, code } };
    }
}