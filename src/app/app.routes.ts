import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HiveComponent} from './hive/hive.component';
import {Error404Component} from './templates/error-404/error-404.component';

export const routes: Routes = [
  {path: '', redirectTo: '/exam', pathMatch: 'full'}, // Default route redirect to /exam
  {path: 'exam', component: HiveComponent},
  {path: '**', component: Error404Component} // Wildcard route to handle any undefined routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
