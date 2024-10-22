import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {HiveComponent} from './hive/hive.component';
import {StudentNodeComponent} from './hive/student-node/student-node.component';


@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    FormsModule,
    AppComponent,
    HiveComponent,
    StudentNodeComponent
  ],
  providers: [],
})
export class AppModule {
}
