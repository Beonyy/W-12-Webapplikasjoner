//basert på  https://fullstaekk.no/courses/webapp-2025/lessons/rest-api-prinsipper

// temp
enum Errors {
    METHOD_NOT_ALLOWED
}

export function methodNotAllowedResponse(allowedMethods: string[]){
    return new Response(
        JSON.stringify({
                success:false,
                error:{
                    code: Errors.METHOD_NOT_ALLOWED,
                    message:"Method not allowed for this endpoint",
                    timestamp: new Date().toISOString(),
                },
            }),
            {
                status: 405,
                headers: {
                    "Content-Type" : "application/json",
                    Allow: allowedMethods.join(", "),
                },
            },
    );
}