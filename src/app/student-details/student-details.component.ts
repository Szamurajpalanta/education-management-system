import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Course } from '../models/course';
import { Enrollment } from '../models/enrollment';
import { Student } from '../models/student';
import { Subject } from '../models/subject';
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
  enrollmentSkeleton = {
    subjectName: '',
    time: '',
    mark: 1
  }
  newEnrollment: Enrollment = {
    id: 0,
    course: new Course,
    student: new Student,
    mark: 0
  }

  constructor(
    private studentService: StudentService,
    private enrollmentService: EnrollmentService,
    private subjectService: SubjectService,
    private formBuilder: FormBuilder
  ) { }

  async ngOnInit() {
    this.getEnrollments();
    this.getSubjects();

    this.editStudentForm = this.formBuilder.group({
      id: [this.student.id],
      name: [this.student.name, [Validators.required]],
      circle: [this.student.circle, [Validators.required]],
    });

    this.newEnrollmentForm = this.formBuilder.group({
      mark: ['', [Validators.required]],
      subjectName: ['', [Validators.required]],
      time: ['', Validators.required]
    });
  }

  async getEnrollments() {
    try {
      this.enrollments = await this.enrollmentService.getEnrollments();
    } catch (err) {
      console.error(err);
    }
    console.log(this.enrollments);

    console.log(this.student.id);
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
      this.getEnrollments();
      this.statusMessage = 'A felvett kurzus törlése sikeres volt.';
      this.success = true;
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
    let index = 0;
    this.enrollmentSkeleton = this.newEnrollmentForm.value;
    this.newEnrollment.student = this.student;

    console.log(this.newEnrollment);
  }

}
