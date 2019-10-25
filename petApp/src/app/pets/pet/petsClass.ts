import { Pet } from '../pet/pet.component'

export class Pets {
    constructor(
        public pets: Array<Pet>
    ){}

    addPet(pet: Pet){
        this.pets.push(pet)
    }

    getPets(){
        return this.pets
    }
}