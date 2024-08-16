import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivresAssociesComponent } from './livres-associes.component';

describe('LivresAssociesComponent', () => {
  let component: LivresAssociesComponent;
  let fixture: ComponentFixture<LivresAssociesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LivresAssociesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LivresAssociesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
