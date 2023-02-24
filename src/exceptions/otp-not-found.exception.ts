import { HttpException, HttpStatus } from "@nestjs/common";

export class OTPNotFoundException extends HttpException {
    constructor() {
        super('One-time password not provided', HttpStatus.BAD_REQUEST);
    }
}