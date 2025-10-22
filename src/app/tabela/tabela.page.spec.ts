import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabelaPage } from './tabela.page';

describe('TabelaPage', () => {
  let component: TabelaPage;
  let fixture: ComponentFixture<TabelaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
