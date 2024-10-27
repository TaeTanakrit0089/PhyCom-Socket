import {ComponentFixture, TestBed} from '@angular/core/testing';

import {Exam66Component} from './exam66.component';

describe('HiveComponent', () => {
  let component: Exam66Component;
  let fixture: ComponentFixture<Exam66Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Exam66Component]
    })
      .compileComponents();

    fixture = TestBed.createComponent(Exam66Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
