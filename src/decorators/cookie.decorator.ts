import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const Cookie = createParamDecorator((data, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req.signedCookies[data];
});