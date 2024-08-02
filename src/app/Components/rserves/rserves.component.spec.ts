import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RservesComponent } from './rserves.component';

describe('RservesComponent', () => {
  let component: RservesComponent;
  let fixture: ComponentFixture<RservesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RservesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RservesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
