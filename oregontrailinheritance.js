class Traveler {
     constructor(name) {
          this._name = name
          this._food = 1
          this._ishealth = true
     }


     hunt() {
          this._food += 2
     }

     eat() {

          if(this._food > 0) {
               this._food -= 1
          } else {
               this._ishealth = false
          }

     }

     set food(newfood) {
          if(Number.isInteger(newfood)){
               this._food = newfood
          }
     }

     get food() {
          return this._food
     }

     get name() {
          return this._name
     }

     get ishealth() {
          return this._ishealth
     }

}

class Hunter extends Traveler {
     constructor(name, food, ishealth) {
          super(name, food, ishealth)
          this._food = 2

     }

     hunt() {
          this._food += 5
     }

     eat() {

          if(this._food >= 2) {
               this._food -= 2
          } else if (this._food < 2 ) {
               this._food -= 1
               this._ishealth = false
          }

     }

     giveFood(traveler, numOfFoodUnits) {
          traveler._food = numOfFoodUnits
     }

     set food(newfood) {
          if(Number.isInteger(newfood)){
               this._food = newfood
          }
     }

     get food() {
          return this._food
     }

     get name() {
          return this._name
     }

     get ishealth(){
          return this._ishealth
     }

}

class Doctor extends Traveler {
     constructor(name, food, ishealth) {
          super(name, food, ishealth)
     }

     heal(traveler) {
          traveler._ishealth = true
     }

     set food(newfood) {
          if(Number.isInteger(newfood)){
               this._food = newfood
          }
     }

     get food() {
          return this._food
     }

     get name() {
          return this._name
     }

     get ishealth(){
          return this._ishealth
     }
}



class Wagon {
     constructor(capacity) {
          this._capacity = capacity
          this._passengerList = []
     }

     getAvailableSeatCount() {
          
          let avaliableSlot = this._capacity - this._passengerList.length
          return avaliableSlot

     }

     join(traveler) {

          if(this._passengerList.length < this._capacity) {
               this._passengerList.push(traveler)
          }

     }

     shouldQuarantine() {

          for(let counter = 0; counter < this._passengerList.length; counter ++) {
               if(this._passengerList[counter]._ishealth === false) {
                    return false
               } else {
                    return true
               }
          }

     }

     totalFood() {

          let food = 0
          for(let counter = 0; counter < this._passengerList.length; counter++ ) {
               food += this._passengerList[counter]._food
          }
          return food

     }

     get capacity() {
          return this._capacity
     }

     get passengerList() {
          return this._passengerList
     }
}

// Cria uma carroça que comporta 4 pessoas
let wagon = new Wagon(4);
// Cria cinco viajantes
let henrietta = new Traveler('Henrietta');
let juan = new Traveler('Juan');
let drsmith = new Doctor('Dr. Smith');
let sarahunter = new Hunter('Sara');
let maude = new Traveler('Maude');
 
console.log(`#1: There should be 4 available seats. Actual: ${wagon.getAvailableSeatCount()}`);
 
wagon.join(henrietta);
console.log(`#2: There should be 3 available seats. Actual: ${wagon.getAvailableSeatCount()}`);
 
wagon.join(juan);
wagon.join(drsmith);
wagon.join(sarahunter);
 
wagon.join(maude); // Não tem espaço para ela!
console.log(`#3: There should be 0 available seats. Actual: ${wagon.getAvailableSeatCount()}`);
 
console.log(`#4: There should be 5 total food. Actual: ${wagon.totalFood()}`);
 
sarahunter.hunt(); // pega mais 5 comidas
drsmith.hunt();
 
console.log(`#5: There should be 12 total food. Actual: ${wagon.totalFood()}`);
 
henrietta.eat();
sarahunter.eat();
drsmith.eat();
juan.eat();
juan.eat(); // juan agora está doente (sick)
 
console.log(`#6: Quarantine should be true. Actual: ${wagon.shouldQuarantine()}`);
console.log(`#7: There should be 7 total food. Actual: ${wagon.totalFood()}`);
 
drsmith.heal(juan);
console.log(`#8: Quarantine should be false. Actual: ${wagon.shouldQuarantine()}`);
 
sarahunter.giveFood(juan, 4);
sarahunter.eat(); // Ela só tem um, então ela come e fica doente
 
console.log(`#9: Quarantine should be true. Actual: ${wagon.shouldQuarantine()}`);
console.log(`#10: There should be 6 total food. Actual: ${wagon.totalFood()}`);
