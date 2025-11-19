import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { JogosService } from '../services/jogos';
import { HttpClientModule } from '@angular/common/http';
import { Router,RouterModule  } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-jogos',
  templateUrl: './jogos.page.html',
  styleUrls: ['./jogos.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, HttpClientModule, RouterModule, FormsModule ]
})
export class JogosPage implements OnInit {
  folder = '';
  jogos: any[] = [];
  loading = false;
  error = '';
  dataFiltro: string = '';
  termoBusca: string = '';

  constructor(
    public jogosService: JogosService,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit(): void {
    this.folder = 'jogos';
    this.carregarJogos();
  }

  ionViewWillEnter(): void {
    if (this.loading) return;
    this.carregarJogos();
  }

  carregarJogos(data?: string, time?: string): void {
    this.loading = true;
    this.error = '';

    this.jogosService.loadJogos(data, time).subscribe({
      next: (data) => {
        this.jogos = [...data];
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar jogos:', err);
        this.error = 'Erro ao carregar jogos';
        this.loading = false;
      }
    });
  }

  buscar(): void {
    this.carregarJogos(this.dataFiltro, this.termoBusca);
  }

  filtrarPorData(): void {
    this.carregarJogos(this.dataFiltro, this.termoBusca);
  }

  limparFiltro(): void {
    this.dataFiltro = '';
    this.termoBusca = '';
    this.carregarJogos();
  }

  deletar(id: string): void {
    this.jogosService.removerJogo(id).subscribe({
      next: () => this.carregarJogos(),
      error: (err) => console.error('Erro ao remover jogo:', err)
    });
  }

  editarJogo(id: string): void {
    this.router.navigate(['/editar-jogo', id]);
  }

  refresh(ev: any): void {
    this.carregarJogos();
    setTimeout(() => ev.detail.complete(), 1000);
  }

  async confirmDelete(id: string): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Confirmar exclusão',
      message: 'Deseja realmente excluir este jogo?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Excluir',
          role: 'destructive',
          handler: () => {
            this.deletar(id);
          }
        }
      ]
    });

    await alert.present();
  }
}
