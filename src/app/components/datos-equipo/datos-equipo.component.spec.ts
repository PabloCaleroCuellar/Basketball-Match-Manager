import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosEquipoComponent } from './datos-equipo.component';

describe('DatosEquipoComponent', () => {
  let component: DatosEquipoComponent;
  let fixture: ComponentFixture<DatosEquipoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosEquipoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
