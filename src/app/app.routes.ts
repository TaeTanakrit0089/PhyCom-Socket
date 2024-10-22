import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HiveComponent} from './hive/hive.component';

export const routes: Routes = [
  {path: '', component: HiveComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
