import { Time } from '@angular/common';

export class Need {

    constructor(
      public id: number,
      public description: string,
      public completed: boolean, 
      public hour: number, //hour
      public minute: number, //minute 
      public time: string, //am or pm 
    ) { }

  
  }