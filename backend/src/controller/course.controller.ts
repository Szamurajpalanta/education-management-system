import { Course } from "../entity/Course";
import { getRepository } from "typeorm";
import { Controller } from "./base.controller";

export class CourseController extends Controller {
    override repository = getRepository(Course);

    search = async (req, res) => {
        const query = req.query.search || '';

        try {
            const enrollments = await this.repository.createQueryBuilder('course')
                .where("course.teacherId = :param", { param: query })
                .getMany();

            res.json(enrollments);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };
}