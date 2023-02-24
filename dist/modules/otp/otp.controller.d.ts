import { MfaService } from './mfa.service';
export declare class MfaController {
    private mfaService;
    constructor(mfaService: MfaService);
    generateQr(res: any, req: any): Promise<any>;
    generate(req: any): Promise<any>;
    enableMfa(req: any, otp: string): Promise<any>;
    disableMfa(req: any, otp: string): Promise<any>;
    generate2(req: any): Promise<any>;
    enableMfa2(req: any, otp: string): Promise<any>;
    disableMfa2(req: any, otp: string): Promise<any>;
}
