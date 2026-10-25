// Her tar vi i mot requesten
// Her kan vi hente ut bruker fra context og jobbe med den
// (i tilfelle vi vil sende deg ut med 401 eller 403 med en gang)
// Her validerer vi at minium med required data er oppfylt (eks. tittel > 10)
// Her sender vi en Response tilbake med et gitt format {ok: true, data: }
// eller {ok: false: error: {}}

import { RequestInfo } from "rwsdk/worker";
import { animalService, AnimalService } from "./animal-services";
import { isAnimalCreationParams, isAnimalUpdateParams } from "./animal-types";


export function parseParams(request:Request){
    return Object.fromEntries(new URL(request.url).searchParams);
}

// NOTE: should be moved somewhere else! This is only a temporary home
// NOTE: auth types should obviously be something else in prod.
function isActionAuthorized( action : string, auth: string):boolean{
    switch (action){
        case "list":
            if (auth === "none") return false;
            if (auth === "user") return true;
            if (auth === "admin") return true;
            break;
        case "get":
            if (auth === "none") return false;
            if (auth === "user") return true;
            if (auth === "admin") return true;
            break;
        case "create":
            if (auth === "none") return false;
            if (auth === "user") return true;
            if (auth === "admin") return false;
            break;
        case "update":
            if (auth === "none") return false;
            if (auth === "user") return true;
            if (auth === "admin") return true;
            break;
        case "remove":
            if (auth === "none") return false;
            if (auth === "user") return true;
            if (auth === "admin") return true;
            break;
        default:
            return false;
    }
    return false;
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
            if (!auth || !isActionAuthorized("list", auth)){
                return Response.json(
                    { error:'not authorized'},
                    { status: 403},)
            }

            return Response.json(await service.list(auth));
        },
        
        async get({request}:RequestInfo){
            const auth = request.headers.get("Authorization")
            if (!auth || !isActionAuthorized("get", auth)){
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
            if (!auth || !isActionAuthorized("create", auth)){
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
            if (!auth || !isActionAuthorized("update", auth)){
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
            // TODO: no actions currently, so....
            // const auth = request.headers.get("Authorization")
            // if (!auth || !isActionAuthorized("action", auth)){
            //     return Response.json(
            //         { error:'not authorized'},
            //         { status: 403},)
            // }
            return Response.json(
                {error:' Invalid request body'},
                { status: 400},)
            },

        async remove({request}:RequestInfo)  {
            const auth = request.headers.get("Authorization")
            if (!auth || !isActionAuthorized("remove", auth)){
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