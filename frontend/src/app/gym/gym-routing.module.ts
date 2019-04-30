import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EquipmentComponent } from './equipment/equipment.component';
import { IngredientsComponent } from './ingredients/ingredients.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'equipment',
    pathMatch: 'full'
  },
  {
    path: 'equipment',
    component: EquipmentComponent,
  },
  {
    path: 'ingredients',
    component: IngredientsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GymRoutingModule { }
