import { getRepository } from "typeorm";
import { Controller } from "./base.controller";
import { Enrollment } from "../entity/Enrollment";

export class EnrollmentController extends Controller {
    override repository = getRepository(Enrollment);
}