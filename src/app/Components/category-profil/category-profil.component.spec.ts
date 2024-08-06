import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryProfilComponent } from './category-profil.component';

describe('CategoryProfilComponent', () => {
  let component: CategoryProfilComponent;
  let fixture: ComponentFixture<CategoryProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoryProfilComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoryProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
