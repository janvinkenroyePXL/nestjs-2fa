import { HttpException, HttpStatus } from "@nestjs/common";

export class NoChangesException extends HttpException {
    constructor(message: string) {
        super(message, HttpStatus.OK);
    }
}