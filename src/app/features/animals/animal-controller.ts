// Her tar vi i mot requesten
// Her kan vi hente ut bruker fra context og jobbe med den
// (i tilfelle vi vil sende deg ut med 401 eller 403 med en gang)
// Her validerer vi at minium med required data er oppfylt (eks. tittel > 10)
// Her sender vi en Response tilbake med et gitt format {ok: true, data: }
// eller {ok: false: error: {}}

import { Result } from "@/shared/types/result";
import { ErrorCode } from "@/shared/types/errors";
import { DefaultAppContext } from "rwsdk/worker";
import { RequestInfo } from "rwsdk/worker";
import { animalService, AnimalService } from "./animal-services";
import { isAnimal, isAnimalCreationParams, isAnimalUpdateParams } from "./animal-types";


export function parseParams(request:Request){
    return Object.fromEntries(new URL(request.url).searchParams);
}

export interface AnimalController {
    list(request : RequestInfo): Promise<Response>;
    get(request : RequestInfo): Promise<Response>;
    create(request : RequestInfo): Promise<Response>;
    update(request : RequestInfo): Promise<Response>;
    action(request : RequestInfo): Promise<Response>;
    remove(request : RequestInfo): Promise<Response>;
}

export function createAnimalController(service: AnimalService): AnimalController{
    return {
        async list({request}:RequestInfo){

            const auth = request.headers.get("Authorization")
            if (!auth){
                return Response.json(
                    { error:'not authorized'},
                    { status: 403},)
            }

            const userId = ""
            return Response.json(await service.list(userId));
        },
        
        async get({request}:RequestInfo){
            const auth = request.headers.get("Authorization")
            if (!auth){
                return Response.json(
                    { error:'not authorized'},
                    { status: 403},)
            }
            const params = parseParams(request)
            const {id} = params;
            
            // TODO: validate id
            if (!id || typeof id !== "string"){
                return Response.json(
                    {error: "Missing id parameter"},
                    {status: 400},
                );
            }
            
            return Response.json(await service.get(auth, id));
        },

        
        async create({request}:RequestInfo){
            const auth = request.headers.get("Authorization")
            if (!auth){
                return Response.json(
                    { error:'not authorized'},
                    { status: 403},)
            }

            let data : unknown 
            try{
                data = await request.json();
            } catch{
                return Response.json(
                    { error:' Invalid JSON body'},
                    { status: 400},
                )
            }

            if (!isAnimalCreationParams(data)){
                return Response.json(
                    {error:' Invalid request body'},
                    { status: 400},
                )
            }
            return Response.json(await service.create(auth, data))
        },
        
        async update({request}:RequestInfo)  {
            const auth = request.headers.get("Authorization")
            if (!auth){
                return Response.json(
                    { error:'not authorized'},
                    { status: 403},)
            }

            const params = parseParams(request);
            const {id} = params;
            let data : unknown 
            try{
                data = await request.json();
            } catch{
                return Response.json(
                    { error:' Invalid JSON body'},
                    { status: 400},
                )
            }
            if (!isAnimalUpdateParams(data)){
                return Response.json(
                    {error:' Invalid request body'},
                    { status: 400},
                )
            }
            return Response.json(await service.update(auth, id, data))
        },
        
        async action({request} : RequestInfo)  {
            const auth = request.headers.get("Authorization")
            if (!auth){
                return Response.json(
                    { error:'not authorized'},
                    { status: 403},)
            }
            return Response.json(
                {error:' Invalid request body'},
                { status: 400},)
            },

        async remove({request}:RequestInfo)  {
            const auth = request.headers.get("Authorization")
            if (!auth){
                return Response.json(
                    { error:'not authorized'},
                    { status: 403},)
            }
            const params = parseParams(request);
            const {id} = params;
            // TODO: validate id
            if (!id){
                return Response.json(
                    {error: "Missing id parameter"},
                    {status: 400},
                );
            }
            return Response.json(await service.remove(auth, id));
        },
    };
}

export const animalController = createAnimalController(animalService)