export class FlatUserWithoutSecretsDto {
    constructor(id: number, username: string, has2faEnabled: boolean) {
        this.id = id;
        this.username = username;
        this.has2faEnabled = has2faEnabled;
        this.roles = new Array<string>();
    }
    id: number;
    username: string;
    has2faEnabled: boolean;
    roles: string[]
}