// Her tar vi i mot requesten
// Her kan vi hente ut bruker fra context og jobbe med den
// (i tilfelle vi vil sende deg ut med 401 eller 403 med en gang)
// Her validerer vi at minium med required data er oppfylt (eks. tittel > 10)
// Her sender vi en Response tilbake med et gitt format {ok: true, data: }
// eller {ok: false: error: {}}

import { Result } from "@/app/types/result";
import { ErrorCode } from "@/app/types/errors";
import { DefaultAppContext } from "rwsdk/worker";
import { RequestInfo } from "rwsdk/worker";
export interface AnimalController {
    list(request:RequestInfo<any, DefaultAppContext>): Promise<Response>;
    get(request:RequestInfo<any, DefaultAppContext>): Promise<Response>;
    create(request:RequestInfo<any, DefaultAppContext>): Promise<Response>;
    update(request:RequestInfo<any, DefaultAppContext>): Promise<Response>;
    action(request:RequestInfo<any, DefaultAppContext>): Promise<Response>;
    remove(request:RequestInfo<any, DefaultAppContext>): Promise<Response>;
}

export function createAnimalController(service: any): AnimalController{
    return {
        async list(request:RequestInfo<any, DefaultAppContext>)    {return Response.json({success: false, error: {code: "INTERNAL_SERVER_ERROR", message: "TODO:"}})},
        async get(request:RequestInfo<any, DefaultAppContext>)     {return Response.json({success: false, error: {code: "INTERNAL_SERVER_ERROR", message: "TODO:"}})},
        async create(request:RequestInfo<any, DefaultAppContext>)  {return Response.json({success: false, error: {code: "INTERNAL_SERVER_ERROR", message: "TODO:"}})},
        async update(request:RequestInfo<any, DefaultAppContext>)  {return Response.json({success: false, error: {code: "INTERNAL_SERVER_ERROR", message: "TODO:"}})},
        async action(request:RequestInfo<any, DefaultAppContext>)  {return Response.json({success: false, error: {code: "INTERNAL_SERVER_ERROR", message: "TODO:"}})},
        async remove(request:RequestInfo<any, DefaultAppContext>)  {return Response.json({success: false, error: {code: "INTERNAL_SERVER_ERROR", message: "TODO:"}})},
    };
}

export const animalController = createAnimalController({})