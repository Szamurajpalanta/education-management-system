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
  teacherCourses: Course[] = [];
  subjects: Subject[] = [];
  isEditingTeacher: boolean = false;
  isEditingCourse: boolean = false;
  isDeletingTeacher: boolean = false;
  isDeletingCourse: boolean = false;
  showStatusMessage: boolean = false;
  success: boolean = false;
  statusMessage = '';
  editTeacherForm!: FormGroup;
  newCourseForm!: FormGroup;
  tempTime: string = '';
  courseSkeleton = {
    subjectName: '',
    time: ''
  }
  newCourse: Course = {
    id: 0,
    time: '',
    teacher: new Teacher,
    subject: new Subject
  };

  constructor(
    private teacherService: TeacherService,
    private subjectService: SubjectService,
    private courseService: CourseService,
    private formBuilder: FormBuilder
  ) { }

  async ngOnInit() {
    try {
      this.courses = await this.courseService.getCourses();
    } catch (err) {
      console.error(err);
    }

    console.log("getTeacherCourses vagyok: ", this.teacher.id);
    this.courses.forEach(course => {
      if (course.teacher.id === this.teacher.id) {
        this.teacherCourses.push(course);
      }
    });
    console.log(this.teacherCourses)

    this.getSubjects();

    this.editTeacherForm = this.formBuilder.group({
      id: [this.teacher.id],
      name: [this.teacher.name, [Validators.required]],
      department: [this.teacher.department, [Validators.required]],
    });

    this.newCourseForm = this.formBuilder.group({
      subjectName: ['', [Validators.required]],
      time: ['', [Validators.required]],
    });
  }

  get subjectName() {
    return this.newCourseForm.get('subjectName');
  }
 
  get time() {
    return this.newCourseForm.get('time');
  }

  async getCourses() {
    try {
      this.courses = await this.courseService.getCourses();
    } catch (err) {
      console.error(err);
    }
  }

  getTeacherCourses() {
    console.log(this.teacher.id);
    this.courses.forEach(course => {
      console.log(course)
      if (course.teacher.id === this.teacher.id) {
        this.teacherCourses.push(course);
      }
    });
  }

  async getSubjects() {
    try {
      this.subjects = await this.subjectService.getSubjects();
    } catch (err) {
      console.error(err);
    }
  }

  toggleEditTeacherMode() {
    if (this.isEditingTeacher) {
      this.isEditingTeacher = false;
    } else {
      this.isEditingTeacher = true;
    }
  }

  toggleDeleteTeacherMode() {
    if (this.isDeletingTeacher) {
      this.isDeletingTeacher = false;
    } else {
      this.isDeletingTeacher = true;
    }
  }

  toggleEditCourseMode() {
    if (this.isEditingCourse) {
      this.isEditingCourse = false;
    } else {
      this.isEditingCourse = true;
    }
  }

  toggleDeleteCourseMode() {
    if (this.isDeletingCourse) {
      this.isDeletingCourse = false;
    } else {
      this.isDeletingCourse = true;
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
      this.statusMessage = 'Az oktató módosítása sikeres volt.';
      this.toggleEditTeacherMode();
    } catch (err: any) {
      this.statusMessage = err.error.message;
      this.success = false;
    }
  }

  async deleteTeacher() {
    this.showStatusMessage = true;
    this.success = true;
    this.toggleDeleteTeacherMode();
    
    if (this.teacherCourses.length === 0) {
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

  async updateCourse(course: Course) {
    this.statusMessage = '';
    course.time = this.tempTime;
    this.showStatusMessage = true;

    try {
      await this.courseService.updateCourse(course);
      this.getCourses();     
      this.getTeacherCourses();
      this.statusMessage = 'A kurzus időpontjának módosítása sikeres volt.';
      this.success = true;
      this.toggleEditTeacherMode();
    } catch (err: any) {
      this.statusMessage = err.error.message;
      this.success = false;
    }
  }

  async deleteCourse(course: Course) {
    this.toggleDeleteCourseMode();
    this.showStatusMessage = true;
    
    try {
      await this.courseService.deleteCourse(course.id);
      this.getCourses();
      this.getTeacherCourses();
      this.statusMessage = 'Az okatatott kurzus törlése sikeres volt.';
      this.success = true;
    } catch (err: any) {
      this.statusMessage = err.error.message;
      this.success = false;
    }
  }

  async createCourse() {
    let index = 0;
    this.courseSkeleton = this.newCourseForm.value;
    this.newCourse.teacher = this.teacher;
    this.subjects.forEach(subject => {
      console.log(subject.name + " = " + this.courseSkeleton.subjectName)
      if (subject.name === this.courseSkeleton.subjectName) {
        this.newCourse.subject = subject;
      }
    });
    this.newCourse.time = this.courseSkeleton.time;

    console.log(this.courseSkeleton.subjectName);
    console.log(this.courseSkeleton.time);
    console.log(this.newCourse);
  }

}
