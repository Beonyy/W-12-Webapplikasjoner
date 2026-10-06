import {route} from "rwsdk/router";
import { animalController } from "./animal-controller";

export const animalsRoutes = [
    route("/api/animals",{
        get: animalController.list,
        post: animalController.create,
    }),
    route("/api/animals/:id",{
        get: animalController.get,
        put: animalController.update,
        delete: animalController.remove ,
    }),
];