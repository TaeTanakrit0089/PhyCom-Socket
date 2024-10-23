import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StudentNodeComponent} from './student-node.component';

describe('StudentNodeComponent', () => {
  let component: StudentNodeComponent;
  let fixture: ComponentFixture<StudentNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentNodeComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(StudentNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
