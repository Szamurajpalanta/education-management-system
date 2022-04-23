import { Student } from "../entity/Student";
import { getRepository } from "typeorm";
import { Controller } from "./base.controller";

export class StudentController extends Controller {
    override repository = getRepository(Student);
}