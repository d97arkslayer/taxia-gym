import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EquipmentComponent } from './equipment/equipment.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { RutineComponent } from './rutine/rutine.component';

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
  },
  {
    path: 'rutine',
    component: RutineComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GymRoutingModule { }
