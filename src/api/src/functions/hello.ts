import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';

const DEFAULT_NAME = 'Stranger';

export async function hello(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log('HTTP trigger function processed a request.');
    const name = request.params.name || request.query.get('name') || DEFAULT_NAME;
    return {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        jsonBody: { name, message: `Hello ${name}` }
    };
}

app.http('hello', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'hello/{name?}',
    handler: hello
});
