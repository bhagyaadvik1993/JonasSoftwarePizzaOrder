import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Topping {
  name: string;
  price: number;
  selected: {
    small: boolean;
    medium: boolean;
    large: boolean;
    extraLarge: boolean;
  };
}

@Component({
  selector: 'app-pizza-order',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './pizza-order.component.html',
  styleUrl: './pizza-order.component.css'
})
export class PizzaOrderComponent {
  vegToppings: Topping[] = [
    { name: 'Tomatoes', price: 1.00, selected: { small: false, medium: false, large: false, extraLarge: false } },
    { name: 'Onions', price: 0.50, selected: { small: false, medium: false, large: false, extraLarge: false } },
    { name: 'Bell pepper', price: 1.00, selected: { small: false, medium: false, large: false, extraLarge: false } },
    { name: 'Mushrooms', price: 1.20, selected: { small: false, medium: false, large: false, extraLarge: false } },
    { name: 'Pineapple', price: 0.75, selected: { small: false, medium: false, large: false, extraLarge: false } },
  ];

  nonVegToppings: Topping[] = [
    { name: 'Sausage', price: 1.00, selected: { small: false, medium: false, large: false, extraLarge: false } },
    { name: 'Pepperoni', price: 2.00, selected: { small: false, medium: false, large: false, extraLarge: false } },
    { name: 'Barbecue chicken', price: 3.00, selected: { small: false, medium: false, large: false, extraLarge: false } },
  ];

  offerSelected: boolean = false;
  offerPrice: number = 0;
  totalPrice : number = 0;
  totalLargePizzaPrice: number = 0;
  finalTotalPrice : number =  0;


  getTotalPrice(): number {
    let hasSmallPizza = false;
    let hasMediumPizza = false;
    let hasLargePizza = false;
    let hasXlargePizza = false;
    this.totalPrice = 0;
    [...this.vegToppings, ...this.nonVegToppings].forEach(topping => {
      if (topping.selected.small){
        if (!hasSmallPizza) {
          this.totalPrice += 5; // Add small pizza price once
          hasSmallPizza = true;
        }
        this.totalPrice += topping.price; // Add topping price
      } 
      if (topping.selected.medium) {
        if (!hasMediumPizza) {
          this.totalPrice+= 7; 
          hasMediumPizza = true;
        }
        this.totalPrice += topping.price; 
      };
      if (topping.selected.large ){
        if (!hasLargePizza) {
          this.totalPrice += 8; 
          hasLargePizza = true;
        }
        this.totalPrice += topping.price; 
        this.totalLargePizzaPrice = this.totalPrice;
        // console.log("largePizzaPrice", this.totalLargePizzaPrice);
        // console.log("total pizza price", this.totalPrice);
      };
      if (topping.selected.extraLarge) {
        if (!hasXlargePizza) {
          this.totalPrice += 9; 
          hasXlargePizza = true;
        }
        this.totalPrice += topping.price; 
      }
    });
    this.offerPrice = this.applyOffers();
    //console.log("LargePizzaPrice", this.totalLargePizzaPrice)
    if (this.offerSelected) {
      this.finalTotalPrice = this.totalPrice - this.offerPrice ;
      //return this.finalTotalPrice;
    }
    return this.totalPrice;
  }
    // Function to apply promotional offers
    applyOffers():number 
    {
          // Example logic for determining offers:
      const selectedMediumPizzas = this.vegToppings.concat(this.nonVegToppings).filter(topping => topping.selected.medium).length;
      let selectedLargePizzas = this.vegToppings.concat(this.nonVegToppings).filter(topping => topping.selected.large).length;
      this.nonVegToppings.filter(topping => {
        if(topping.name == 'Barbecue chicken' && topping.selected.large) selectedLargePizzas += 1;
        if(topping.name == 'Pepperoni' && topping.selected.large) selectedLargePizzas += 1;
      });

          let offer = 0;
          let offerLarge = 0;
          let visited = false;
      if (selectedMediumPizzas >= 2 && selectedMediumPizzas < 4) {
        offer = 5;
      } else if (selectedMediumPizzas >= 4) {
        offer = 9;
      }
       if (selectedLargePizzas >= 4 ) {
        if(!visited){
          offerLarge = this.totalLargePizzaPrice * 0.5;
          visited = true;
        }
        // console.log("offer for large", offerLarge);
        // console.log("offer for Medium", offer);
      } return offer + offerLarge;
    }

    

}

