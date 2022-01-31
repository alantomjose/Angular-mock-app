import {
  Component,
  ElementRef,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from '../shared/ingredients.model';
import { ShopingListSerive } from '../shopping-list/shopping-list.serivce';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @Output() ingredientAdded = new EventEmitter<Ingredient>();
  constructor(private shopingListSerive: ShopingListSerive) {}
  @ViewChild('f') slForm: NgForm;

  subscription: Subscription;
  editing: boolean = false;
  editIndex: number;
  editIngredient: Ingredient;

  ngOnInit(): void {
    this.subscription = this.shopingListSerive.startEditing.subscribe(
      (index: number) => {
        this.editing = true;
        this.editIndex = index;
        this.editIngredient = this.shopingListSerive.getIngredient(index);
        this.slForm.setValue({
          name: this.editIngredient.name,
          amount: this.editIngredient.amount,
        });
      }
    );
  }

  onAddIngred(form: NgForm) {
    // console.log(this.nameInpRef.nativeElement.value);
    if (this.editing) {
      console.log('updating');
      this.shopingListSerive.updateIngredient(
        this.editIndex,
        new Ingredient(form.value.name, form.value.amount)
      );
    } else {
      this.shopingListSerive.addIngredient(
        new Ingredient(form.value.name, form.value.amount)
      );
    }
    this.editing = false;
    this.slForm.reset();
  }

  clearForm() {
    this.editing = false;
    this.slForm.reset();
  }

  DeleteIgred() {
    this.shopingListSerive.deleteIngredient(this.editIndex);
    this.editing = false;
    this.slForm.reset();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
