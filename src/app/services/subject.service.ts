import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Subject } from '../models/subject';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: HttpClient) { }

  getSubject(id: number) {
    return lastValueFrom(this.http.get<Subject[]>(`http://localhost:3000/api/subjects/${id}`));
  }

  getSubjects() {
    return lastValueFrom(this.http.get<Subject[]>('http://localhost:3000/api/subjects'));
  }

  searchSubjects(query: string) {
    return lastValueFrom(this.http.get<Subject[]>('http://localhost:3000/api/search/subjects', {
      params: {
        search: query
      }
    }));
  }

  createSubject(subject: Subject) {
    return lastValueFrom(this.http.post<Subject>('http://localhost:3000/api/subjects', subject));
  }

  updateSubject(subject: Subject) {
    return lastValueFrom(this.http.put<Subject>('http://localhost:3000/api/subjects', subject));
  }

  deleteSubject(id: number) {
    return lastValueFrom(this.http.delete<Subject>(`http://localhost:3000/api/subjects/${id}`));
  }

  getLowestAvailableId(subjects: Subject[]): number {
    let i = 0;
    subjects.forEach(subject => {
      if(subjects.indexOf(subject) == -1) {
        return i;
      }
      i++;
    });
    return subjects[subjects.length - 1].id + 1;
  }
}
