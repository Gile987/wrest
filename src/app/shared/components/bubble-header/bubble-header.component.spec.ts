import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BubbleHeaderComponent } from './bubble-header.component';

describe('BubbleHeaderComponent', () => {
  let component: BubbleHeaderComponent;
  let fixture: ComponentFixture<BubbleHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BubbleHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BubbleHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
