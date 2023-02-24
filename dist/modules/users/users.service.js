"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const user_entity_1 = require("./user.entity");
const username_already_exists_exception_1 = require("../../exceptions/username-already-exists.exception");
let UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    findAll() {
        return this.usersRepository.find();
    }
    findAllWithRoles() {
        return this.usersRepository.find({
            relations: ['roles'],
        });
    }
    findById(userId) {
        return this.usersRepository.findOne({
            where: {
                id: userId,
            },
            relations: ['roles'],
        });
    }
    findByUsername(username) {
        return this.usersRepository.findOne({
            where: {
                username: username,
            },
            relations: ['roles'],
        });
    }
    async remove(id) {
        await this.usersRepository.delete(id);
    }
    async create(user) {
        if (await this.findByUsername(user.username)) {
            throw new username_already_exists_exception_1.UsernameAlreadyExistsException();
        }
        const salt = await bcrypt.genSalt();
        const password = await bcrypt.hash(user.password, salt);
        let newUser = this.usersRepository.create({ username: user.username, password, has2faEnabled: false });
        return this.save(newUser);
    }
    async save(user) {
        const savedUser = await this.usersRepository.save(user);
        const { password, mfaSecret } = savedUser, userWithoutSecrets = __rest(savedUser, ["password", "mfaSecret"]);
        return userWithoutSecrets;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map