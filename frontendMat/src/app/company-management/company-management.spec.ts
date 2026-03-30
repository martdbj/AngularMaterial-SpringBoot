import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyManagement } from './company-management';

describe('CompanyManagement', () => {
  let component: CompanyManagement;
  let fixture: ComponentFixture<CompanyManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyManagement],
    }).compileComponents();

    fixture = TestBed.createComponent(CompanyManagement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
