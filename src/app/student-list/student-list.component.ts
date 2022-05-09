import { Component, OnInit } from '@angular/core';
import { Student } from '../models/student';
import { StudentService } from '../services/student.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  students: Student[] = [];
  query: string = '';
  showStatusMessage: boolean = false;
  success: boolean = false;
  statusMessage = '';

  constructor(
    private studentService: StudentService,
    private formBuilder: FormBuilder
  ) { }

  async ngOnInit() {
    this.showStatusMessage = false;

    try {
      this.students = await this.studentService.getStudents();
      console.log(this.students);
    } catch (err) {
      console.error(err);
    }
  }
  
  async search() {
    try {
      this.students = await this.studentService.searchStudents(this.query);
    } catch (err) {
      console.error(err);
    }
  }

  studentForm = this.formBuilder.group({
    id: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
    name: ['', [Validators.required]],
    circle: ['', [Validators.required]],
  });

  get id() {
    return this.studentForm.get('id');
  }
 
  get name() {
    return this.studentForm.get('name');
  }
 
  get circle() {
    return this.studentForm.get('circle');
  }

  async addNewStudent() {
    this.statusMessage = '';
    const student = this.studentForm.value;
    this.showStatusMessage = true;

    try {
      if (student.id) {
        await this.studentService.updateStudent(student);
        this.success = true;
        this.statusMessage = 'User updated successfully.';
      } else {
        const insertedUser = await this.studentService.createStudent(student);
        this.success = true;
        this.statusMessage = 'User is inserted with id ' + insertedUser.id;
      }
      
    } catch (err: any) {
      this.statusMessage = err.error.message;
      this.success = false;
    }
  }

}
