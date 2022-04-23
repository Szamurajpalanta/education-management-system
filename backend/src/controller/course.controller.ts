import { Course } from "../entity/Course";
import { getRepository } from "typeorm";
import { Controller } from "./base.controller";

export class CourseController extends Controller {
    override repository = getRepository(Course);
}