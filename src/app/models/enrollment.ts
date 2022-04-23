import { Course } from "./course";
import { Student } from "./student";

export class Enrollment {
    id: number;
    courseId: Course;
    studentId: Student;
    mark: number;
}