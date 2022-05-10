import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Course } from '../models/course';
import { Subject } from '../models/subject';
import { Teacher } from '../models/teacher';
import { CourseService } from '../services/course.service';
import { SubjectService } from '../services/subject.service';
import { TeacherService } from '../services/teacher.service';

@Component({
  selector: 'app-teacher-details',
  templateUrl: './teacher-details.component.html',
  styleUrls: ['./teacher-details.component.css']
})
export class TeacherDetailsComponent implements OnInit {

  @Input() teacher!: Teacher;
  courses: Course[] = [];
  subjects: Subject[] = [];
  isEditing: boolean = false;
  isDeleting: boolean = false;
  showStatusMessage: boolean = false;
  success: boolean = false;
  statusMessage = '';
  editTeacherForm!: FormGroup;

  constructor(
    private teacherService: TeacherService,
    private subjectService: SubjectService,
    private courseService: CourseService,
    private formBuilder: FormBuilder
  ) { }

  async ngOnInit() {
    this.getCourses();
    this.getSubjects();

    this.editTeacherForm = this.formBuilder.group({
      id: [this.teacher.id],
      name: [this.teacher.name, [Validators.required]],
      department: [this.teacher.department, [Validators.required]],
    });
  }

  async getCourses() {
    try {
      this.courses = await this.courseService.searchCourses(this.teacher.id);
    } catch (err) {
      console.error(err);
    }
  }

  async getSubjects() {
    try {
      this.subjects = await this.subjectService.getSubjects();
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

  async updateTeacher() {
    this.statusMessage = '';
    const teacher = this.editTeacherForm.value;
    this.showStatusMessage = true;

    try {
      await this.teacherService.updateTeacher(teacher);
      this.success = true;
      this.getCourses();
      this.getSubjects();
      this.statusMessage = 'A hallgató módosítása sikeres volt.';
      this.toggleEditMode();
    } catch (err: any) {
      this.statusMessage = err.error.message;
      this.success = false;
    }
  }

  async deleteTeacher() {
    this.showStatusMessage = true;
    this.success = true;
    this.toggleDeleteMode();
    
    if (this.courses.length === 0) {
      try {
        await this.teacherService.deleteTeacher(this.teacher.id);
        this.success = true;
        this.getCourses();
        this.getSubjects();
        this.statusMessage = 'Az oktató törlése sikeres volt.';
      } catch (err: any) {
        this.statusMessage = err.error.message;
        this.success = false;
      }
    } else {
      this.statusMessage = "A törölni kívánt oktatónak van még tanított kurzusa.";
      this.success = false;
    }
  }

}
