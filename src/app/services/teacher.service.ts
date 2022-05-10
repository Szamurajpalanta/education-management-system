import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Teacher } from '../models/teacher';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private http: HttpClient) { }

  getTeachers() {
    return lastValueFrom(this.http.get<Teacher[]>('http://localhost:3000/api/teachers'));
  }

  getTeacher(id: string) {
    return lastValueFrom(this.http.get<Teacher>(`http://localhost:3000/api/teachers/${id}`));
  }

  searchTeachers(query: string) {
    return lastValueFrom(this.http.get<Teacher[]>('http://localhost:3000/api/search/teachers', {
      params: {
        search: query
      }
    }));
  }

  createTeacher(teacher: Teacher) {
    return lastValueFrom(this.http.post<Teacher>('http://localhost:3000/api/teachers', teacher));
  }

  updateTeacher(teacher: Teacher) {
    return lastValueFrom(this.http.put<Teacher>('http://localhost:3000/api/teachers', teacher));
  }

  deleteTeacher(id: string) {
    return lastValueFrom(this.http.delete<Teacher>(`http://localhost:3000/api/teachers/${id}`));
  }
}
