import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { JogosService } from '../services/jogos';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.page.html',
  styleUrls: ['./tabela.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule]
})
export class TabelaPage implements OnInit {
  tabela: any[] = [];
  loading = false;
  error = '';

  constructor(private jogosService: JogosService) {}

  ngOnInit(): void {
    
    this.carregarTabela();
  }
  
  carregarTabela(): void {
    this.loading = true;
    this.error = '';

    this.jogosService.getTabela().subscribe({
      next: (data) => {
        if (Array.isArray(data)) {
          this.tabela = data;
        } else {
          console.warn('Resposta inesperada da API:', data);
          this.tabela = [];
          this.error = 'Formato inválido da resposta';
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar tabela:', err);
        this.error = err?.status
          ? `Erro ${err.status}: ${err.statusText || 'falha na requisição'}`
          : 'Erro ao carregar tabela';
        this.loading = false;
      }
    });
  }
}
