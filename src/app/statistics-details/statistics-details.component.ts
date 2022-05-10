import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics-details',
  templateUrl: './statistics-details.component.html',
  styleUrls: ['./statistics-details.component.css']
})
export class StatisticsDetailsComponent implements OnInit {

  @Input() circle!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
