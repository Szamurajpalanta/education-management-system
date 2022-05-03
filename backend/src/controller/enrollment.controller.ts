import { getRepository} from "typeorm";
import { Controller } from "./base.controller";
import { Enrollment } from "../entity/Enrollment";

export class EnrollmentController extends Controller {
    override repository = getRepository(Enrollment);

    search = async (req, res) => {
        const query = req.query.search || '';

        try {
            const enrollments = await this.repository.createQueryBuilder('enrollment')
                .where("enrollment.studentId = :param", { param: query })
                .getMany();

            res.json(enrollments);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };
}