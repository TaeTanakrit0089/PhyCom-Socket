import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Exam66Component} from './exam/exam66/exam66.component';
import {Error404Component} from './templates/error-404/error-404.component';
import {MqttDashboard} from './mqtt/mqtt.component';
import {HomePageComponent} from './home-page/home-page.component';
import {AboutComponent} from './about/about.component';
import {RedirectToGoogleComponent} from './redirect.component';
import {Exam67Component} from './exam/exam67/exam67.component';

export const routes: Routes = [
  // {path: '', redirectTo: '/exam66', pathMatch: 'full'}, // Default route redirect to /exam66
  {path: '', component: HomePageComponent},
  {path: 'exam66', component: Exam66Component},
  {path: 'exam67', component: RedirectToGoogleComponent},
  // {path: 'exam67', component: Exam67Component},
  {path: 'mqtt', component: MqttDashboard},
  {path: 'about', component: AboutComponent},
  {path: '**', component: Error404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
