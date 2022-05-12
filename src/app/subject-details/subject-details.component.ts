import { Component, Input, OnInit } from '@angular/core';
import { isJSDocThisTag } from 'typescript';
import { Course } from '../models/course';
import { Subject } from '../models/subject';
import { Teacher } from '../models/teacher';
import { CourseService } from '../services/course.service';
import { SubjectService } from '../services/subject.service';
import { TeacherService } from '../services/teacher.service';

@Component({
  selector: 'app-subject-details',
  templateUrl: './subject-details.component.html',
  styleUrls: ['./subject-details.component.css']
})
export class SubjectDetailsComponent implements OnInit {

  @Input() subject!: Subject;
  courses: Course[] = [];
  teachers: Teacher[] = [];
  subjects: Subject[] = [];
  subjectCourses: Course[] = [];
  teacherCourses: Course[] = [];
  selectedTeacher!: Teacher;
  tempTime: string = '';
  tempName: string = '';
  isEditingSubject: boolean = false;
  isDeletingSubject: boolean = false;
  isDeletingCourse: boolean = false;
  showStatusMessage: boolean = false;
  success: boolean = false;
  statusMessage = '';
  newCourse: Course = {
    id: 0,
    time: '',
    teacher: new Teacher,
    subject: new Subject
  };
  newSubject: Subject = {
    id: 0,
    name: '',
  };

  constructor(
    private subjectService: SubjectService,
    private courseService: CourseService,
    private teacherService: TeacherService
  ) { }

  async ngOnInit() {
    try {
      this.courses = await this.courseService.getCourses();
      console.log(this.courses);
    } catch (err) {
      console.error(err);
    }

    this.getSubjectCourses();
    this.getTeachers();
  }

  toggleEditSubjectMode() {
    if (this.isEditingSubject) {
      this.isEditingSubject = false;
    } else {
      this.isEditingSubject = true;
    }
  }

  toggleDeleteSubjectMode() {
    if (this.isDeletingSubject) {
      this.isDeletingSubject = false;
    } else {
      this.isDeletingSubject = true;
    }
  }

  toggleDeleteCourseMode() {
    if (this.isDeletingCourse) {
      this.isDeletingCourse = false;
    } else {
      this.isDeletingCourse = true;
    }
  }

  async getCourses() {
    try {
      this.courses = await this.courseService.getCourses();
      console.log(this.courses);
    } catch (err) {
      console.error(err);
    }
  }

  getSubjectCourses() {
    this.subjectCourses = [];
    this.courses.forEach(course => {
      if (course.subject.name === this.subject.name) {
        this.subjectCourses.push(course);
      }
    });
  }

  getTeacherCourses() {
    this.teacherCourses = [];
    console.log(this.selectedTeacher.id);
    this.courses.forEach(course => {
      console.log(course)
      if (course.teacher.id === this.selectedTeacher.id) {
        this.teacherCourses.push(course);
      }
    });
  }

  async getTeachers() {
    try {
      this.teachers = await this.teacherService.getTeachers();
      console.log(this.teachers);
    } catch (err) {
      console.error(err);
    }
  }

  async deleteCourse(course: Course) {
    this.toggleDeleteCourseMode();
    this.showStatusMessage = true;
    
    try {
      await this.courseService.deleteCourse(course.id);
      let index = this.subjectCourses.indexOf(course);
      this.subjectCourses.splice(index, 1);
      this.getCourses();
      this.getSubjectCourses();
      this.statusMessage = 'Az okatatott kurzus törlése sikeres volt.';
      this.success = true;
    } catch (err: any) {
      this.statusMessage = err.error.message;
      this.success = false;
    }
  }

  async createCourse() {
    this.newCourse.id = this.courseService.getLowestAvailableId(await this.courseService.getCourses());
    this.newCourse.teacher = this.selectedTeacher;
    this.newCourse.subject = this.subject;
    this.newCourse.time = this.tempTime;
    this.showStatusMessage = true;

    console.log(this.newCourse);

    try {
      if (!this.checkTimeConflict(this.newCourse.time)) {
        await this.courseService.createCourse(this.newCourse);
        this.getCourses();
        this.getSubjectCourses();
        this.statusMessage = 'Az új kurzus sikeresen létrejött.';
        this.success = true;
      } else {
        this.statusMessage = 'A kiválasztott oktatónak már van egy kurzusa a megadott időpontban.';
        this.success = false;
      }
      
    } catch (err: any) {
      this.statusMessage = err.error.message;
      this.success = false;
    }   
  }

  async updateSubject() {
    this.statusMessage = '';
    this.subject.name = this.tempName;
    this.showStatusMessage = true;

    try {
      await this.subjectService.updateSubject(this.subject);
      this.statusMessage = 'A tantárgy módosítása sikeres volt.';
      this.success = true;
      this.toggleEditSubjectMode();
    } catch (err: any) {
      this.statusMessage = err.error.message;
      this.success = false;
    }
  }
  
  async deleteSubject() {
    this.showStatusMessage = true;
    this.toggleDeleteSubjectMode();
    
    if (this.subjectCourses.length === 0) {
      try {
        await this.subjectService.deleteSubject(this.subject.id);
        this.statusMessage = 'A tantárgy törlése sikeres volt.';
        this.success = true;
      } catch (err: any) {
        this.statusMessage = err.error.message;
        this.success = false;
      }
    } else {
      this.statusMessage = "A törölni kívánt tantárgyhoz még tartozik kurzus.";
      this.success = false;
    }
  }

  checkTimeConflict(time: String): boolean {
    this.getTeacherCourses();
    let conflict = false;
    this.teacherCourses.forEach(course => {
      if (course.time === time) {
        conflict = true;
      }
    });
    return conflict;
  }
}
