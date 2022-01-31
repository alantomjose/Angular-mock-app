import { Component, OnInit } from '@angular/core';
import { Recipie } from './recipie.model';
import { RecipieService } from './recipie.service';

@Component({
  selector: 'app-recipies',
  templateUrl: './recipies.component.html',
  styleUrls: ['./recipies.component.css'],
  providers: [],
})
export class RecipiesComponent implements OnInit {
  recipies: Recipie[] = [];
  selectedRecipie: Recipie;
  constructor(private recipieService: RecipieService) {}

  ngOnInit(): void {
    this.recipieService.recipieSelected.subscribe((recipie: Recipie) => {
      this.selectedRecipie = recipie;
    });
  }
}
