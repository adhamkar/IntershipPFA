import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpruntsComponent } from './emprunts.component';

describe('EmpruntsComponent', () => {
  let component: EmpruntsComponent;
  let fixture: ComponentFixture<EmpruntsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmpruntsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmpruntsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
