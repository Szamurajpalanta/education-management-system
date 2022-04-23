import { Subject } from "../entity/Subject";
import { getRepository } from "typeorm";
import { Controller } from "./base.controller";

export class SubjectController extends Controller {
    override repository = getRepository(Subject);
}