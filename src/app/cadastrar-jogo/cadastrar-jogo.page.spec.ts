import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastrarJogoPage } from './cadastrar-jogo.page';

describe('CadastrarJogoPage', () => {
  let component: CadastrarJogoPage;
  let fixture: ComponentFixture<CadastrarJogoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarJogoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
