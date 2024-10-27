import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {Exam66Component} from './exam/exam66/exam66.component';
import {StudentNodeComponent} from './exam/exam66/student-node/student-node.component';


@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    FormsModule,
    AppComponent,
    Exam66Component,
    StudentNodeComponent
  ],
  providers: [],
})
export class AppModule {
}
