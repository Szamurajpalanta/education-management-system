import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatisticsListComponent } from './statistics-list/statistics-list.component';
import { StudentListComponent } from './student-list/student-list.component';
import { SubjectListComponent } from './subject-list/subject-list.component';
import { TeacherListComponent } from './teacher-list/teacher-list.component';

const routes: Routes = [
  {
    path: 'student-list',
    component: StudentListComponent
  },
  {
    path: 'teacher-list',
    component: TeacherListComponent
  },
  {
    path: 'statistics-list',
    component: StatisticsListComponent
  },
  {
    path: 'subject-list',
    component: SubjectListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
