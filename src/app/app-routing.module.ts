import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipiesComponent } from './recipies/recipies.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipieStartComponent } from './recipies/recipie-start/recipie-start.component';
import { RecipieDetailsComponent } from './recipies/recipie-details/recipie-details.component';
import { RecipieEditComponent } from './recipies/recipie-edit/recipie-edit.component';
import { RecipieResolver } from './recipies/recipie-resolver.service';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth-guard';

const appRoutes: Routes = [
  { path: '', redirectTo: 'recipies', pathMatch: 'full' },
  {
    path: 'recipies',
    component: RecipiesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: RecipieStartComponent },
      { path: 'new', component: RecipieEditComponent },
      {
        path: ':id',
        component: RecipieDetailsComponent,
        resolve: [RecipieResolver],
      },
      {
        path: ':id/edit',
        component: RecipieEditComponent,
        resolve: [RecipieResolver],
      },
    ],
  },
  { path: 'shopping', component: ShoppingListComponent },
  { path: 'auth', component: AuthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class appRoutingModule {}
