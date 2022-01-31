import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipie } from '../recipie.model';
import { RecipieService } from '../recipie.service';

@Component({
  selector: 'app-recipie-list',
  templateUrl: './recipie-list.component.html',
  styleUrls: ['./recipie-list.component.css'],
})
export class RecipieListComponent implements OnInit {
  @Output() recipieWasSelected = new EventEmitter<Recipie>();

  recipies: Recipie[] = [];
  constructor(private RecipieService: RecipieService) {}

  ngOnInit(): void {
    this.RecipieService.onRecipieAddedSubject.subscribe(
      (recipies: Recipie[]) => {
        this.recipies = recipies;
      }
    );
    this.recipies = this.RecipieService.getRecipie();
    console.log('recipieList', this.recipies);
  }

  // onRecipieSelect(recipie) {
  //   this.recipieWasSelected.emit(recipie);
  // }
}
