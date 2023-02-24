import { HttpException, HttpStatus } from "@nestjs/common";

export class OTPNotValidException extends HttpException {
    constructor() {
        super('One-time password not valid', HttpStatus.BAD_REQUEST);
    }
}