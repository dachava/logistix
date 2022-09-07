import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  { path: 'product', redirectTo: 'product/index', pathMatch: 'full' },
  { path: 'product/index', component: IndexComponent },
  { path: 'product/create', component: CreateComponent },
  { path: 'product/edit/:idProduct', component: EditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
