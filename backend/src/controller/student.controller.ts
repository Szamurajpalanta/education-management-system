import { Student } from "../entity/Student";
import { getRepository } from "typeorm";
import { Controller } from "./base.controller";

export class StudentController extends Controller {
    override repository = getRepository(Student);

    search = async (req, res) => {
        const query = req.query.search || '';

        try {
            const students = await this.repository.createQueryBuilder('student')
                .where("title LIKE CONCAT('%', :param, '%')", { param: query })
                .getMany();

            res.json(students);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };
}