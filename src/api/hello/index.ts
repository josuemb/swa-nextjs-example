import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const defaultHeaders = {
    'Content-Type': 'application/json'
};

const DEFAULT_NAME = 'Stranger';

const HTTP_STATUS_OK = 200;
const HTTP_METHOD_NOT_ALLOWED = 405;

const HTTP_METHOD_GET = 'GET';

const getName = (context: Context, request: HttpRequest) => {
    const name = (context.bindingData.name || request.query.name || DEFAULT_NAME);
    const response = {
        status: HTTP_STATUS_OK,
        headers: defaultHeaders,
        body: {
            name: name,
            message: `Hello ${name}`
        }
    }
    return response;
}

const httpTrigger: AzureFunction = async function (context: Context, request: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    let response = {};
    switch (request.method) {
        case HTTP_METHOD_GET:
            response = getName(context, request);
            break;
        default:
            response = {
                status: HTTP_METHOD_NOT_ALLOWED,
                headers: defaultHeaders
            }
            break;
    }
    context.res = response;
};

export default httpTrigger;