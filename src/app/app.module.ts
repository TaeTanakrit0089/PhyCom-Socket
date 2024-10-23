import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {ExamComponent} from './exam/exam.component';
import {StudentNodeComponent} from './exam/student-node/student-node.component';


@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    FormsModule,
    AppComponent,
    ExamComponent,
    StudentNodeComponent
  ],
  providers: [],
})
export class AppModule {
}
