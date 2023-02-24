"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlatUserWithoutSecretsDto = void 0;
class FlatUserWithoutSecretsDto {
    constructor(id, username, has2faEnabled) {
        this.id = id;
        this.username = username;
        this.has2faEnabled = has2faEnabled;
        this.roles = new Array();
    }
}
exports.FlatUserWithoutSecretsDto = FlatUserWithoutSecretsDto;
//# sourceMappingURL=flat-user-without-secrets-dto.js.map