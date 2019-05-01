import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RutineComponent } from './rutine.component';

describe('RutineComponent', () => {
  let component: RutineComponent;
  let fixture: ComponentFixture<RutineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RutineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RutineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
