import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewForm } from './view-form';

describe('ViewForm', () => {
  let component: ViewForm;
  let fixture: ComponentFixture<ViewForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewForm],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
