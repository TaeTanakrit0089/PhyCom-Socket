import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MqttConnectionComponent } from './mqtt-connection.component';

describe('MqttConnectionComponent', () => {
  let component: MqttConnectionComponent;
  let fixture: ComponentFixture<MqttConnectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MqttConnectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MqttConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
