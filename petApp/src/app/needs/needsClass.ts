import { Need } from '../needs/need.component'

export class Needs {
    constructor(
        public needs: Array<Need>
    ){}

    addPet(need: Need){
        this.needs.push(need)
    }

    getPets(){
        return this.needs
    }
}