'use server';

import { Result } from "@/shared/types/result";
import { isActionAuthorized } from "./animal-controller";
import { animalService } from "./animal-services";
import { Animal } from "./animal-types";


export async function list(auth: string): Promise<Result<Animal[]>> {
    if (isActionAuthorized("list", auth)) {
        return animalService.list(auth);
    }
    return {
        success: false,
        error: {
            code: "UNAUTHORIZED",
            message: "user not authorized to do this."
        }
    }
}