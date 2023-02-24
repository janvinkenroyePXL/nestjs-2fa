import { HttpException } from "@nestjs/common";
export declare class NoOTPFoundException extends HttpException {
    constructor(error: string);
}
