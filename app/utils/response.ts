import { NextResponse } from "next/server";

export class ApiResponse {
    private _message: string | Record<string, any> | boolean | number = "";
    private _status: number = 200;
    private _headers: HeadersInit = {};

    setMessage(message: string | Record<string, any> | boolean | number) {
        this._message = message
        return this
    }

    status(status: number) {
        this._status = status
        return this
    }

    setHeaders(headers: HeadersInit) {
        this._headers = headers
        return this
    }

    send(message: string | Record<string, any> | boolean | number = "", status?: number) {
        const _message = message ?? this._message
        const _status = status ?? this._status
        const options = {
            status: _status,
        } as ResponseInit;

        if (this._headers) options.headers = this._headers;

        if (typeof _message === "string") {
            return NextResponse.json({
                message: _message
            }, options)

        }

        return NextResponse.json(_message, options)
    }
}