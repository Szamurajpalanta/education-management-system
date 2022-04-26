import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  getStudents() {
    return lastValueFrom(this.http.get<Student[]>('/api/students'));
  }

  getStudent(id: number) {
    return lastValueFrom(this.http.get<Student>(`/api/students/${id}`));
  }

  searchStudents(query: string) {
    return lastValueFrom(this.http.get<Student[]>('/api/students/search', {
      params: {
        search: query
      }
    }));
  }

  createProduct(student: Student) {
    return lastValueFrom(this.http.post<Student>('/api/students', student));
  }

  updateProduct(student: Student) {
    return lastValueFrom(this.http.put<Student>('/api/students', student));
  }
}
