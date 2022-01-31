import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipieService } from '../recipie.service';
import { Recipie } from '../recipie.model';

@Component({
  selector: 'app-recipie-edit',
  templateUrl: './recipie-edit.component.html',
  styleUrls: ['./recipie-edit.component.css'],
})
export class RecipieEditComponent implements OnInit {
  id: number;
  editMode: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private recipieService: RecipieService,
    private router: Router
  ) {}
  recipieForm: FormGroup;
  ingredients: FormArray;

  ngOnInit(): void {
    this.route.params.subscribe((route) => {
      this.id = route['id'];
      this.editMode = route['id'] != null;
      console.log(this.editMode);
      this.initForm();
    });
  }

  private initForm() {
    let name = '';
    let imgUrl = '';
    let desc = '';
    let ingredients = new FormArray([]);
    if (this.editMode) {
      const recipie = this.recipieService.getRecipiebyId(this.id);
      name = recipie.name;
      imgUrl = recipie.imagePath;
      desc = recipie.description;
      if (recipie.ingredients) {
        for (let ingr of recipie.ingredients) {
          ingredients.push(
            new FormGroup({
              name: new FormControl(ingr.name, Validators.required),
              amount: new FormControl(ingr.amount, Validators.required),
            })
          );
        }
      }
    }
    this.recipieForm = new FormGroup({
      name: new FormControl(name, Validators.required),
      imagePath: new FormControl(imgUrl, Validators.required),
      description: new FormControl(desc, Validators.required),
      ingredients: ingredients,
    });
  }

  onSubmit() {
    console.log(this.recipieForm);

    if (this.editMode) {
      this.recipieService.updateRecipie(this.id, this.recipieForm.value);
    } else {
      this.recipieService.addRecipie(this.recipieForm.value);
    }
    this.onCancel();
  }

  get controls() {
    // a getter!
    return (<FormArray>this.recipieForm.get('ingredients')).controls;
  }

  onAddIngred() {
    console.log('adding');
    (<FormArray>this.recipieForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, Validators.required),
      })
    );
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
