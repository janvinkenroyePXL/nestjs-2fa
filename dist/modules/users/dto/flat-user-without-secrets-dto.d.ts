export declare class FlatUserWithoutSecretsDto {
    constructor(id: number, username: string, has2faEnabled: boolean);
    id: number;
    username: string;
    has2faEnabled: boolean;
    roles: string[];
}
