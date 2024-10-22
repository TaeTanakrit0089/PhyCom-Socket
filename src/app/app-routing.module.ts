import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContentComponent} from './components/content/content.component';

const routes: Routes = [
  {path: '', component: ContentComponent},
  {path: 'about', component: ContentComponent}  // Add more routes as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
