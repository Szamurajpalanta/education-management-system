import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Teacher } from '../models/teacher';
import { TeacherService } from '../services/teacher.service';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css']
})
export class TeacherListComponent implements OnInit {

  teachers: Teacher[] = [];
  query: string = '';
  showStatusMessage: boolean = false;
  success: boolean = false;
  statusMessage = '';

  constructor(
    private teacherService: TeacherService,
    private formBuilder: FormBuilder
  ) { }

  async ngOnInit() {
    this.showStatusMessage = false;

    try {
      this.teachers = await this.teacherService.getTeachers();
      console.log(this.teachers);
    } catch (err) {
      console.error(err);
    }
  }
  
  async search() {
    try {
      this.teachers = await this.teacherService.searchTeachers(this.query);
    } catch (err) {
      console.error(err);
    }
  }

  newTeacherForm = this.formBuilder.group({
    id: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
    name: ['', [Validators.required]],
    department: ['', [Validators.required]],
  });

  get id() {
    return this.newTeacherForm.get('id');
  }
 
  get name() {
    return this.newTeacherForm.get('name');
  }
 
  get department() {
    return this.newTeacherForm.get('department');
  }

  async addNewStudent() {
    this.statusMessage = '';
    const teacher = this.newTeacherForm.value;
    this.showStatusMessage = true;

    try {
      const insertedUser = await this.teacherService.createTeacher(teacher);
      this.success = true;
      this.statusMessage = 'Űj oktató jött létre a következő azonosítóval: ' + insertedUser.id;      
    } catch (err: any) {
      this.statusMessage = err.error.message;
      this.success = false;
    }
  }

}
