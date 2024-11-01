import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamConnectionComponent } from './exam-connection.component';

describe('MqttConnectionComponent', () => {
  let component: ExamConnectionComponent;
  let fixture: ComponentFixture<ExamConnectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamConnectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
