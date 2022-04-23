import { Teacher } from "../entity/Teacher";
import { getRepository } from "typeorm";
import { Controller } from "./base.controller";

export class TeacherController extends Controller {
    override repository = getRepository(Teacher);
}