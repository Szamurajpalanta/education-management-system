import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { StudentListComponent } from './student-list/student-list.component';
import { TeacherListComponent } from './teacher-list/teacher-list.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { TeacherDetailsComponent } from './teacher-details/teacher-details.component';
import { StatisticsListComponent } from './statistics-list/statistics-list.component';
import { StatisticsDetailsComponent } from './statistics-details/statistics-details.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    StudentListComponent,
    TeacherListComponent,
    StudentDetailsComponent,
    TeacherDetailsComponent,
    StatisticsListComponent,
    StatisticsDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
