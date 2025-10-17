import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarJogoPage } from './editar-jogo.page';

describe('EditarJogoPage', () => {
  let component: EditarJogoPage;
  let fixture: ComponentFixture<EditarJogoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarJogoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
