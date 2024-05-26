import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadOfCompanyComponent } from './head-of-company.component';

describe('HeadOfCompanyComponent', () => {
  let component: HeadOfCompanyComponent;
  let fixture: ComponentFixture<HeadOfCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeadOfCompanyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeadOfCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
