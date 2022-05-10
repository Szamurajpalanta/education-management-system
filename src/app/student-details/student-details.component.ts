import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Enrollment } from '../models/enrollment';
import { Student } from '../models/student';
import { EnrollmentService } from '../services/enrollment.service';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {
  @Input() student!: Student;
  enrollments: Enrollment[] = [];
  isEditing: boolean = false;
  isDeleting: boolean = false;
  showStatusMessage: boolean = false;
  success: boolean = false;
  statusMessage = '';
  editStudentForm!: FormGroup;

  constructor(
    private studentService: StudentService,
    private enrollmentService: EnrollmentService,
    private formBuilder: FormBuilder
  ) { }

  async ngOnInit() {
    this.getStudent();

    this.editStudentForm = this.formBuilder.group({
      id: [this.student.id],
      name: [this.student.name, [Validators.required]],
      circle: [this.student.circle, [Validators.required]],
    });
  }

  async getStudent() {
    try {
      this.enrollments = await this.enrollmentService.searchEnrollments(this.student.id);
    } catch (err) {
      console.error(err);
    }
  }

  toggleEditMode() {
    if (this.isEditing) {
      this.isEditing = false;
    } else {
      this.isEditing = true;
    }
  }

  toggleDeleteMode() {
    if (this.isDeleting) {
      this.isDeleting = false;
    } else {
      this.isDeleting = true;
    }
  }

  async updateStudent() {
    this.statusMessage = '';
    const student = this.editStudentForm.value;
    this.showStatusMessage = true;

    try {
      await this.studentService.updateStudent(student);
      this.success = true;
      this.getStudent();
      this.statusMessage = 'A hallgató módosítása sikeres volt.';
      this.toggleEditMode();
    } catch (err: any) {
      this.statusMessage = err.error.message;
      this.success = false;
    }
  }

  async deleteStudent() {
    this.showStatusMessage = true;
    this.success = true;
    this.toggleDeleteMode();
    
    if (this.enrollments.length === 0) {
      try {
        await this.studentService.deleteStudent(this.student.id);
        this.success = true;
        this.getStudent();
        this.statusMessage = 'A hallgató törlése sikeres volt.';
      } catch (err: any) {
        this.statusMessage = err.error.message;
        this.success = false;
      }
    } else {
      this.statusMessage = "A törölni kívánt hallgatónak van még felvett kurzusa.";
      this.success = false;
    }
  }

}
