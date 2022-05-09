import { Course } from "./course";
import { Student } from "./student";

export class Enrollment {
    id!: number;
    course!: Course;
    student!: Student;
    mark!: number;
}