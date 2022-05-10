import { Account } from "../entity/Account";
import { getRepository } from "typeorm";
import { Controller } from "./base.controller";

export class AccountController extends Controller {
    override repository = getRepository(Account);
}