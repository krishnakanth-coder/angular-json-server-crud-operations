import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRecipiComponent } from './add-recipi.component';

describe('AddRecipiComponent', () => {
  let component: AddRecipiComponent;
  let fixture: ComponentFixture<AddRecipiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRecipiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRecipiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
