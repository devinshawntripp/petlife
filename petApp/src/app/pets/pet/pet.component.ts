
import { Need } from '../../needs/needs.component'
export class Pet {

  constructor(
    public id: number,
    public name: string,
    public description: string,
    public Needs: Array<Need>
  ) { }

}
