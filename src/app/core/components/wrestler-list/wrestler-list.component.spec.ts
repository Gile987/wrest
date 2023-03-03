import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrestlerListComponent } from './wrestler-list.component';

describe('WrestlerListComponent', () => {
  let component: WrestlerListComponent;
  let fixture: ComponentFixture<WrestlerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrestlerListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WrestlerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
