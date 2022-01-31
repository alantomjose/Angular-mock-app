import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredients.model';
import { Recipie } from './recipie.model';
import { ShopingListSerive } from '../shopping-list/shopping-list.serivce';
import { Subject } from 'rxjs';

@Injectable()
export class RecipieService {
  recipieSelected = new Subject<Recipie>();
  onRecipieAddedSubject = new Subject<Recipie[]>();
  recipies: Recipie[] = [
    new Recipie(
      'Burger',
      'This is a Burger recipie',
      'https://www.saveur.com/uploads/2020/11/20/Y7RZPFZEERAZVHJ2VHC2RXMEEY.jpg?quality=85&width=540',
      [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]
    ),
    new Recipie(
      'Pizza',
      'This is a pizza recipie',
      'https://www.saveur.com/uploads/2020/11/20/Y7RZPFZEERAZVHJ2VHC2RXMEEY.jpg?quality=85&width=540',
      [new Ingredient('Cheese', 20), new Ingredient('sauce', 1)]
    ),
  ];

  constructor(private shopingListSerive: ShopingListSerive) {}

  getRecipie() {
    return this.recipies.slice();
  }

  getRecipiebyId(index: number) {
    return this.recipies[index];
  }

  setRecipies(recipies: Recipie[]) {
    this.recipies = recipies;
    this.onRecipieAddedSubject.next(this.recipies.slice());
  }

  addRecipieToShoppingList(ingredients: Ingredient[]) {
    this.shopingListSerive.addIngredients(ingredients);
  }

  addRecipie(recipie: Recipie) {
    this.recipies.push(recipie);
    this.onRecipieAddedSubject.next(this.recipies.slice());
  }

  updateRecipie(ind: number, recipie: Recipie) {
    this.recipies[ind] = recipie;
    this.onRecipieAddedSubject.next(this.recipies.slice());
  }

  deleteRecipie(index: number) {
    this.recipies.splice(index, 1);
    this.onRecipieAddedSubject.next(this.recipies.slice());
  }
}
