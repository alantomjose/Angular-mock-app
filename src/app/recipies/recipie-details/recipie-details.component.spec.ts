import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipieDetailsComponent } from './recipie-details.component';

describe('RecipieDetailsComponent', () => {
  let component: RecipieDetailsComponent;
  let fixture: ComponentFixture<RecipieDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipieDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipieDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
