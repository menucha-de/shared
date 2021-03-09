import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransportDialogComponent } from './transport-dialog/transport-dialog.component';

export const transportRoutes: Routes = [
    {
      path: 'subscribers/:id',
      component: TransportDialogComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(transportRoutes)],
  exports: [RouterModule]
})
export class TransportRoutingModule { }
