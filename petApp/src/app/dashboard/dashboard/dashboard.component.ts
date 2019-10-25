import { Component, OnInit } from '@angular/core';
import { Need } from '../../needs/needs.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  
  needs = [
    new Need(1, 'Walk', false, 9, 15, 'am'),
    new Need(2, 'Feed', false, 9, 15,'am')
  ]

  constructor() { }

  ngOnInit() {
  }

}
