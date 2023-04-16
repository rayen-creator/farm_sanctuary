import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CropReFormComponent } from './crop-re-form.component';

describe('CropReFormComponent', () => {
  let component: CropReFormComponent;
  let fixture: ComponentFixture<CropReFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CropReFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CropReFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
