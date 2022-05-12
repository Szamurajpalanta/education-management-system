import { Subject } from "../entity/Subject";
import { getRepository } from "typeorm";
import { Controller } from "./base.controller";

export class SubjectController extends Controller {
    override repository = getRepository(Subject);

    search = async (req, res) => {
        const query = req.query.search || '';

        try {
            const subjects = await this.repository.createQueryBuilder('subject')
                .where("subject.name LIKE CONCAT('%', :param, '%')", { param: query })
                .getMany();

            res.json(subjects);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };
}