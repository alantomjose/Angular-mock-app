import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { exhaustMap } from 'rxjs-compat/operator/exhaustMap';
// import { take } from 'rxjs-compat/operator/take';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Recipie } from '../recipies/recipie.model';
import { RecipieService } from '../recipies/recipie.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipieService: RecipieService,
    private authservice: AuthService
  ) {}

  storeRecipies() {
    let recipies = this.recipieService.getRecipie();
    return this.http
      .put(
        'https://udemy-recipie-app-default-rtdb.firebaseio.com/recipies.json',
        recipies
      )
      .subscribe((res) => {
        console.log(res);
      });
  }
  fetchRecipies() {
    return this.authservice.user.pipe(
      take(1),
      exhaustMap((user) => {
        return this.http.get<Recipie[]>(
          'https://udemy-recipie-app-default-rtdb.firebaseio.com/recipies.json',
          { params: new HttpParams().set('auth', user.token) }
        );
      }),
      map((recpies) => {
        return recpies.map((recipie: Recipie) => {
          return {
            ...recipie,
            ingredients: recipie.ingredients ? recipie.ingredients : [],
          };
        });
      }),
      tap((recipies) => {
        this.recipieService.setRecipies(recipies);
      })
    );
  }
}
