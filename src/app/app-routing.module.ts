import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainFormComponent } from './main-form/main-form.component';
import { LinkedRecordsComponent } from './linked-records/linked-records.component';

const routes: Routes = [
  { path: 'main-form/:id', component: MainFormComponent },
  { path: 'linked-records/:recordId', component: LinkedRecordsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
