import { Component, OnInit } from '@angular/core';
import { Subject } from '../models/subject';
import { SubjectService } from '../services/subject.service';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css']
})
export class SubjectListComponent implements OnInit {

  subjects: Subject[] = [];

  constructor(
    private subjectService: SubjectService
  ) { }

  async ngOnInit() {
    try {
      this.subjects = await this.subjectService.getSubjects();
      console.log(this.subjects)
    } catch (err) {
      console.error(err);
    }
  }

}
