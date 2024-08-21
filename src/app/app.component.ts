import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PizzaOrderComponent } from "./pizza-order/pizza-order.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PizzaOrderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'order_pizza';
}
