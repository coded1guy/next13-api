import { NextResponse } from 'next/server';
import qs from 'node:querystring';
 
export async function GET(request: Request) {
  return NextResponse.json({ error: 'Welcome to my api!' }, { status: 200 })
}

export async function POST(request: Request) {
    let data:object;

    // gets the content-type
    let contentType = await request.headers.get('content-type');
    contentType ? contentType = contentType.split("; ")[0].trim() : null;

    // converts request data to an object
    switch (contentType) {
        // formData - urlencoded
        case "application/x-www-form-urlencoded":
            const dataString = await request.text();
            data = qs.parse(dataString);
            break;
        // formData - multipart/form-data
        case "multipart/form-data":
            const form = await request.formData();
            let formObj:any = {};
            for (let value of form.entries()) {
                formObj[`${value[0]}`] = value[1];
            }
            data = formObj;
            break;
        // object/JSON - application/json
        case "application/json":
            data = await request.json();
            break;
        default:
            return NextResponse.json({ error: "unsupported content-type" }, { status: 501 });
    }

    return NextResponse.json({ message: 'done', data }, { status: 200 })
}
