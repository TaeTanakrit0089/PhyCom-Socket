import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HiveComponent} from './hive/hive.component';
import {Error404Component} from './templates/error-404/error-404.component';
import {MqttDashboard} from './mqtt/mqtt.component';

export const routes: Routes = [
  {path: '', redirectTo: '/exam', pathMatch: 'full'}, // Default route redirect to /exam
  {path: 'exam', component: HiveComponent},
  {path: 'mqtt', component: MqttDashboard},
  // {path: '', component: HiveComponent},
  {path: 'error', component: Error404Component},
  {path: '**', component: Error404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
