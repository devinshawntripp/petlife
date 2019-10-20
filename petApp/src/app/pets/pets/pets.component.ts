import { Component, OnInit } from '@angular/core';
import { Pet } from '../pet/pet.component'

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css']
})
export class PetsComponent implements OnInit {

  pets = [
    new Pet(1, 'ScoobyDoo', 'The coolest dog around'),
    new Pet(2, 'ScrappyDoo', 'The second coolest dog around')
  ]

  constructor() { }

  ngOnInit() {
  }

}
