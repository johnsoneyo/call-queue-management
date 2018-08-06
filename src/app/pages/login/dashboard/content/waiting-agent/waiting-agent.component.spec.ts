import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingAgentComponent } from './waiting-agent.component';

describe('WaitingAgentComponent', () => {
  let component: WaitingAgentComponent;
  let fixture: ComponentFixture<WaitingAgentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitingAgentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitingAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
