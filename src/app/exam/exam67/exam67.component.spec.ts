import {ComponentFixture, TestBed} from '@angular/core/testing';

import {Exam67Component} from './exam67.component';

describe('HiveComponent', () => {
  let component: Exam67Component;
  let fixture: ComponentFixture<Exam67Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Exam67Component]
    })
      .compileComponents();

    fixture = TestBed.createComponent(Exam67Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
