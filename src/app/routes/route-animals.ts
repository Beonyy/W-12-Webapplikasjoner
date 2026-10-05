import {route} from "rwsdk/router";

// https://fullstaekk.no/courses/webapp-2025/lessons/fetch-arkitektur
type ClientParams<T=unknown> = {
    url:string;
    method?: RequestInit["method"];
    options?: Omit<RequestInit, "method" | "body">;
    body?: T | Record<string, unknown> | null;
}
type Params<T> = Omit<ClientParams<T>, "method">

interface ApiRouteHandler {
    get: <T = unknown>(params: Params<T>) => Promise<Result<T>>;
    post:<T = unknown>(params: Params<T>) => Promise<Result<T>>;
    put: <T = unknown>(params: Params<T>) => Promise<Result<T>>;
    delete: <T = unknown>(params: Params<T>) => Promise<Result<T>>;
}




export const animalsRoutes = [
    route("/",{
        get: async () => Response.json(await listAllAnimals()),

        post: async ({request}) => {
            const data = await request.json();
            return Response.json(data, {status:201});
        }
    }),
    route("/:id",{
        get: async ({params}) => Response.json(await getAnimalById(params.id)),

        put: async ({request, params}) => {
            const data = await request.json();
            return Response.json(data);
        },
        delete: async({params}) => new Response(null,{status: 204}),
    }),
];