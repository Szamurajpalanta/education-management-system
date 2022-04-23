import { Subject } from "./subject";
import { Teacher } from "./teacher";

export class Course {
    id: number;
    time: string;
    teacher: Teacher;
    subject: Subject;
}