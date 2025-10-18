import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router,RouterModule } from '@angular/router';
import { JogosService } from '../services/jogos';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController, LoadingController } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
//import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cadastrar-jogo',
  templateUrl: './cadastrar-jogo.page.html',
  styleUrls: ['./cadastrar-jogo.page.scss'],
  standalone: true,
  imports: [ CommonModule,IonicModule,ReactiveFormsModule, HttpClientModule,RouterModule]
})
export class CadastrarJogoPage implements OnInit {
  jogoForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private jogosService: JogosService,
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit(): void {
    this.jogoForm = this.fb.group({
      timeCasa: ['', Validators.required],
      placarCasa: [0, [Validators.required, Validators.min(0)]],
      placarVisitante: [0, [Validators.required, Validators.min(0)]],
      timeVisitante: ['', Validators.required],
      rodada: [1, [Validators.required, Validators.min(1)]]
    });
  }

  async salvar(): Promise<void> {
    if (this.jogoForm.invalid) {
      const t = await this.toastCtrl.create({ message: 'Preencha os campos corretamente', duration: 1500, color: 'warning' });
      t.present();
      return;
    }

    const loader = await this.loadingCtrl.create({ message: 'Cadastrando jogo...' });
    await loader.present();

    this.jogosService.cadastrarJogo(this.jogoForm.value).subscribe({
      next: async (res) => {
        await loader.dismiss();
        const t = await this.toastCtrl.create({ message: 'Jogo cadastrado com sucesso', duration: 1500, color: 'success' });
        t.present();
        this.router.navigate(['/jogos']);
      },
      error: async (err) => {
        await loader.dismiss();
        const t = await this.toastCtrl.create({ message: 'Erro ao cadastrar jogo', duration: 2000, color: 'danger' });
        t.present();
        console.error('Erro criarJogo:', err);
      }
    });
  }
}

