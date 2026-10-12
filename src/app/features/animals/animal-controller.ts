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
import { animalService, AnimalService } from "./animal-services";
import { isAnimal } from "./animal-types";


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
            
            return Response.json(await service.list(null));
        },
        
        async get({params}:RequestInfo){

            const {id} = params;
            // TODO: validate id
            if (!id || typeof id !== "string"){
                return Response.json(
                    {error: "Missing id parameter"},
                    {status: 400},
                );
            }
            
            return Response.json(await service.get(null, id));
        },

        
        async create({request}:RequestInfo){
            const rawData : unknown = await request.json();
            if (!isAnimal(rawData)){
                return Response.json(
                    {error:' Invalid request body'},
                    { status: 400},
                )
            }
            return Response.json(await service.create(null, rawData))
        },
        
        async update({request}:RequestInfo)  {
            const params = parseParams(request);
            const {id} = params;
            const rawData : unknown = await request.json();
            if (!isAnimal(rawData)){
                return Response.json(
                    {error:' Invalid request body'},
                    { status: 400},
                )
            }
            return Response.json(await service.update(null, id, rawData))
        },
        
        async action({request})  {
            return Response.json(
                {error:' Invalid request body'},
                { status: 400},)
            },

        async remove({request}:RequestInfo)  {
            const params = parseParams(request);
            const {id} = params;
            // TODO: validate id
            if (!id){
                return Response.json(
                    {error: "Missing id parameter"},
                    {status: 400},
                );
            }
            return Response.json(await service.remove(null, id));
        },
    };
}

export const animalController = createAnimalController(animalService)