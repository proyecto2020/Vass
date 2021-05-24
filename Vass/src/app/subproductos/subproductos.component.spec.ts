import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubproductosComponent } from './subproductos.component';

describe('SubproductosComponent', () => {
  let component: SubproductosComponent;
  let fixture: ComponentFixture<SubproductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubproductosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubproductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
