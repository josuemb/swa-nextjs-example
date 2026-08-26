import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

const defaultHeaders = {
    'Content-Type': 'application/json'
};

const DEFAULT_NAME = 'Stranger';

const HTTP_STATUS_OK = 200;
const HTTP_METHOD_NOT_ALLOWED = 405;

const getName = (request: HttpRequest): HttpResponseInit => {
    const name = (request.params.name || request.query.get('name') || DEFAULT_NAME);
    return {
        status: HTTP_STATUS_OK,
        headers: defaultHeaders,
        jsonBody: {
            name: name,
            message: `Hello ${name}`
        }
    };
}

export async function hello(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log('HTTP trigger function processed a request.');
    if (request.method === 'GET') {
        return getName(request);
    }
    return {
        status: HTTP_METHOD_NOT_ALLOWED,
        headers: defaultHeaders
    };
}

app.http('hello', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    route: 'hello/{name?}',
    handler: hello
});
