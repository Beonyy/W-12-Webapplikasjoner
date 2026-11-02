import { RequestInfo } from "rwsdk/worker";

// straight outta chatgpt
type RequestInfoOverrides = Partial<RequestInfo>;
export function createRequestInfo(
    overrides: RequestInfoOverrides = {},
): RequestInfo {
    return {
        request: new Request("https://example.com/"),
        path: "/",
        params: {},
        ctx: {},
        response: {
            headers: new Headers(),
        },
        ...overrides,
    } as RequestInfo;
}