import { HttpException } from "@nestjs/common";
export declare class NoChangesException extends HttpException {
    constructor(message: string);
}
