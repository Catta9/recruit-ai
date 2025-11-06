import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cronologia } from './cronologia';

describe('Cronologia', () => {
  let component: Cronologia;
  let fixture: ComponentFixture<Cronologia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cronologia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cronologia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
