import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipie } from '../recipie.model';
import { RecipieService } from '../recipie.service';

@Component({
  selector: 'app-recipie-details',
  templateUrl: './recipie-details.component.html',
  styleUrls: ['./recipie-details.component.css'],
})
export class RecipieDetailsComponent implements OnInit {
  recipie: Recipie;
  constructor(
    private recipieService: RecipieService,
    private route: ActivatedRoute
  ) {}
  id: number;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      this.recipie = this.recipieService.getRecipiebyId(this.id);
    });
  }

  addIngredients() {
    this.recipieService.addRecipieToShoppingList(this.recipie.ingredients);
  }
  deleteRecipie() {
    this.recipieService.deleteRecipie(this.id);
  }
}
