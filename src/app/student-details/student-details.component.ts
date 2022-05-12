import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Course } from '../models/course';
import { Enrollment } from '../models/enrollment';
import { Student } from '../models/student';
import { Subject } from '../models/subject';
import { CourseService } from '../services/course.service';
import { EnrollmentService } from '../services/enrollment.service';
import { StudentService } from '../services/student.service';
import { SubjectService } from '../services/subject.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {
  @Input() student!: Student;
  enrollments: Enrollment[] = [];
  studentEnrollments: Enrollment[] = [];
  subjects: Subject[] = [];
  courses: Course[] = [];
  selectedCourse!: Course;
  isEditingStudent: boolean = false;
  isEditingEnrollment: boolean = false;
  isDeletingStudent: boolean = false;
  isDeletingEnrollment: boolean = false;
  showStatusMessage: boolean = false;
  success: boolean = false;
  statusMessage = '';
  editStudentForm!: FormGroup;
  newEnrollmentForm!: FormGroup;
  tempMark: number = 1;
  newEnrollment: Enrollment = {
    id: 0,
    course: new Course,
    student: new Student,
    mark: 0
  }

  constructor(
    private studentService: StudentService,
    private enrollmentService: EnrollmentService,
    private courseService: CourseService,
    private subjectService: SubjectService,
    private formBuilder: FormBuilder
  ) { }

  async ngOnInit() {
    this.getEnrollments();
    this.getSubjects();
    this.getCourses();

    this.editStudentForm = this.formBuilder.group({
      id: [this.student.id],
      name: [this.student.name, [Validators.required]],
      circle: [this.student.circle, [Validators.required]],
    });
  }

  async getCourses() {
    try {
      this.courses = await this.courseService.getCourses();
    } catch (err) {
      console.error(err);
    }
  }

  async getEnrollments() {
    try {
      this.enrollments = await this.enrollmentService.getEnrollments();
    } catch (err) {
      console.error(err);
    }
    this.sortEnrollments();
    console.log(this.enrollments);

    console.log(this.student.id);
    this.studentEnrollments = [];
    this.enrollments.forEach(enrollment => {
      console.log(enrollment)
      if (enrollment.student.id === this.student.id) {
        this.studentEnrollments.push(enrollment);
      }
    });
    console.log(this.studentEnrollments);
  }

  async getSubjects() {
    try {
      this.subjects = await this.subjectService.getSubjects();
    } catch (err) {
      console.error(err);
    }
  }

  toggleEditStudentMode() {
    if (this.isEditingStudent) {
      this.isEditingStudent = false;
    } else {
      this.isEditingStudent = true;
    }
  }

  toggleEditEnrollmentMode() {
    if (this.isEditingEnrollment) {
      this.isEditingEnrollment = false;
    } else {
      this.isEditingEnrollment = true;
    }
  }

  toggleDeleteStudentMode() {
    if (this.isDeletingStudent) {
      this.isDeletingStudent = false;
    } else {
      this.isDeletingStudent = true;
    }
  }

  toggleDeleteEnrollmentMode() {
    if (this.isDeletingEnrollment) {
      this.isDeletingEnrollment = false;
    } else {
      this.isDeletingEnrollment = true;
    }
  }

  async updateStudent() {
    this.statusMessage = '';
    const student = this.editStudentForm.value;
    this.showStatusMessage = true;

    try {
      await this.studentService.updateStudent(student);      
      this.getEnrollments();
      this.statusMessage = 'A hallgató módosítása sikeres volt.';
      this.success = true;
      this.toggleEditStudentMode();
    } catch (err: any) {
      this.statusMessage = err.error.message;
      this.success = false;
    }
  }

  async deleteStudent() {
    this.showStatusMessage = true;
    this.toggleDeleteStudentMode();
    
    if (this.enrollments.length === 0) {
      try {
        await this.studentService.deleteStudent(this.student.id);
        this.getEnrollments();
        this.statusMessage = 'A hallgató törlése sikeres volt.';
        this.success = true;
      } catch (err: any) {
        this.statusMessage = err.error.message;
        this.success = false;
      }
    } else {
      this.statusMessage = "A törölni kívánt hallgatónak van még felvett kurzusa.";
      this.success = false;
    }
  }

  async updateEnrollment(enrollment: Enrollment) {
    this.statusMessage = '';
    enrollment.mark = this.tempMark;
    this.showStatusMessage = true;

    try {
      await this.enrollmentService.updateEnrollment(enrollment);      
      this.getEnrollments();
      this.statusMessage = 'A kurzusra kapott értékelés módosítása sikeres volt.';
      this.success = true;
      this.toggleEditStudentMode();
    } catch (err: any) {
      this.statusMessage = err.error.message;
      this.success = false;
    }
  }

  async deleteEnrollment(enrollment: Enrollment) {
    this.toggleDeleteEnrollmentMode();
    this.showStatusMessage = true;
    
    try {
      await this.enrollmentService.deleteEnrollment(enrollment.id);
      let index = this.studentEnrollments.indexOf(enrollment);
      this.studentEnrollments.splice(index, 1);
      this.getEnrollments();
      this.statusMessage = 'A felvett kurzus törlése sikeres volt.';
      this.success = true;
      this.calculateAverage()
    } catch (err: any) {
      this.statusMessage = err.error.message;
      this.success = false;
    }
  }

  calculateAverage() {
    let temp = 0;
    this.studentEnrollments.forEach(enrollment => {
      temp += enrollment.mark;
    });
    temp /= this.studentEnrollments.length;
    return temp;
  }

  async createEnrollment() {
    this.newEnrollment.id = this.enrollmentService.getLowestAvailableId(await this.enrollmentService.getEnrollments());
    this.newEnrollment.student = this.student;
    this.newEnrollment.course = this.selectedCourse;
    this.newEnrollment.mark = this.tempMark;
    this.showStatusMessage = true;
    console.log(this.newEnrollment);

    try {
      if (!this.doesTimeConflict(this.newEnrollment.course.time)) {
        if (!this.doesTimeConflict(this.newEnrollment.course.time)) {
        await this.enrollmentService.createEnrollment(this.newEnrollment);
        this.getEnrollments();
        this.statusMessage = 'A kiválasztott tárgy sikeresen felvételre került az hallgató számára.';
        this.success = true;
        this.calculateAverage();
        } else {
          this.statusMessage = 'A jelenlegi hallgatónak már van egy kurzusa a megadott időpontban.';
          this.success = false;
        }
      } else {
        this.statusMessage = 'A jelenlegi hallgatónak már fel van véve a kiválasztott kurzus.';
        this.success = false;
      }
      
    } catch (err: any) {
      this.statusMessage = err.error.message;
      this.success = false;
    }
  }

  doesTimeConflict(time: String): boolean {
    let conflict = false;
    
    this.studentEnrollments.forEach(element => {
      if (element.course.time === time) {
        conflict = true;
      }
    });

    return conflict;
  }

  isAlreadyAppliedToCourse(course: Course): boolean {
    let conflict = false;
    
    this.studentEnrollments.forEach(element => {
      if (element.course.id === course.id) {
        conflict = true;
      }
    });

    return conflict;
  }

  sortEnrollments() {
    this.enrollments.sort((a, b) => {
      if (a.id > b.id) return 1;
      if (a.id < b.id) return -1;
      return 0;
    });
  }

}
