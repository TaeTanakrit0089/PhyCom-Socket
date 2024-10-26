import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ExamComponent} from './exam/exam.component';
import {Error404Component} from './templates/error-404/error-404.component';
import {MqttDashboard} from './mqtt/mqtt.component';
import {HomePageComponent} from './home-page/home-page.component';
import {AboutComponent} from './about/about.component';

export const routes: Routes = [
  // {path: '', redirectTo: '/exam', pathMatch: 'full'}, // Default route redirect to /exam
  {path: '', component: HomePageComponent},
  {path: 'exam', component: ExamComponent},
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
