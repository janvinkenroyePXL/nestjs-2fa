import { HttpException, HttpStatus } from "@nestjs/common";

export class No2faSecretException extends HttpException {
    constructor() {
        super('No mfa secret found on the server', HttpStatus.BAD_REQUEST);
    }
}