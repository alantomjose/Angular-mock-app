import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipie } from '../../recipie.model';
import { RecipieService } from '../../recipie.service';

@Component({
  selector: 'app-recipie-item',
  templateUrl: './recipie-item.component.html',
  styleUrls: ['./recipie-item.component.css'],
})
export class RecipieItemComponent implements OnInit {
  @Input() recipie: Recipie;
  @Input() index: number;
  // @Output() recipieSelected = new EventEmitter<void>();
  constructor(private recipieService: RecipieService) {}

  ngOnInit(): void {
    console.log(this.recipie);
  }
}
