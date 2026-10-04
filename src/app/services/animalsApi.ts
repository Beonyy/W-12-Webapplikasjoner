
// basert på https://fullstaekk.no/courses/webapp-2025/lessons/api-bibliotek
type AnimalTEMP = {}

interface GetAnimalsParams {
    page?: number;
    limit?: number;
    search?: string;
}

interface Pagination {
    limit: number;
    page: number;
    pages: number;
    total: number;
}

interface GetAnimalsResponse extends Pagination {
    data: any[];
}


export async function listAnimals(
    params: GetAnimalsParams = {},
    signal?: AbortSignal
): Promise<GetAnimalsResponse> {

    return new Promise((resolve, reject) => {

        if (signal?.aborted) {
            reject(new DOMException("Request was aborted", "AbortError"));
            return;
        }
        const timeoutId = setTimeout(() => {
            const shouldFail = Math.random() < 0.1;
            if (shouldFail) {
                reject(new Error("Network error: could not connect to server"));
                return;
            }

            let filteredAnimals : AnimalTEMP[] = [];

            if (params.search) {
               // TODO: Search logic here?
            }

            // similuate pagination?
            const page = params.page || 1;
            const limit = params.limit || 10;
            const startIndex = (page-1) * limit;
            const endIndex = startIndex + limit;

            const paginatedAnimals = filteredAnimals.slice(startIndex, endIndex);

            resolve({
                limit,
                data:paginatedAnimals,
                total:filteredAnimals.length,
                page,
                pages: Math.ceil(filteredAnimals.length / limit),
            });
        }, 1000 + Math.random() * 1000);

        if(signal){
            signal.addEventListener("abort", () =>{
                clearTimeout(timeoutId);
                reject( new DOMException("Request was aborted", "AbortError"));
            });
        }
    });
}

export async function getAnimalById(
    id:string,
    signal?: AbortSignal
): Promise<AnimalTEMP> {

    return new Promise((resolve, reject) =>{
        if (signal?.aborted) {
            reject(new DOMException("Request was aborted", "AbortError"));
            return;
        }
        
        const timeoutId = setTimeout(() => {
            // Simulate finding by id.
            const animal : AnimalTEMP = {};
            if (!animal){
                reject( new Error(`Animal with ID ${id} was not found`));
                return;
            }    

            resolve(animal);
        }, 800);

        if(signal){
            signal.addEventListener("abort", () =>{
                clearTimeout(timeoutId);
                reject( new DOMException("Request was aborted", "AbortError"));
            });
        }
    });
}
