import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredients.model';
import { ShopingListSerive } from './shopping-list.serivce';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: [],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  igAddedSubscription: Subscription;

  constructor(private shopingListSerive: ShopingListSerive) {}

  ngOnInit(): void {
    // console.log('HERE', this.ingredients);
    this.ingredients = this.shopingListSerive.getIngredients();
    this.igAddedSubscription = this.shopingListSerive.ingredientAdded.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }

  ngOnDestroy(): void {
    this.igAddedSubscription.unsubscribe();
  }

  onEditItem(i: number) {
    this.shopingListSerive.startEditing.next(i);
  }
}
