import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDetailviewComponent } from './company-detailview.component';

describe('CompanyDetailviewComponent', () => {
  let component: CompanyDetailviewComponent;
  let fixture: ComponentFixture<CompanyDetailviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyDetailviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyDetailviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
