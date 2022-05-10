import { Teacher } from "../entity/Teacher";
import { getRepository } from "typeorm";
import { Controller } from "./base.controller";

export class TeacherController extends Controller {
    override repository = getRepository(Teacher);

    search = async (req, res) => {
        const query = req.query.search || '';

        try {
            const students = await this.repository.createQueryBuilder('teacher')
                .where("teacher.name LIKE CONCAT('%', :param, '%')", { param: query })
                .getMany();

            res.json(students);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };
}