import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivreProfilComponent } from './livre-profil.component';

describe('LivreProfilComponent', () => {
  let component: LivreProfilComponent;
  let fixture: ComponentFixture<LivreProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LivreProfilComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LivreProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
