import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JogosService } from '../services/jogos';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-editar-jogo',
  templateUrl: './editar-jogo.page.html',
  styleUrls: ['./editar-jogo.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule]
})
export class EditarJogoPage implements OnInit {
  jogoForm!: FormGroup;
  id!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jogosService: JogosService,
    private fb: FormBuilder,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit(): void {
    // ✅ Captura o id da rota
    this.id = this.route.snapshot.paramMap.get('id')!;

    // ✅ Cria o formulário (sem campo _id)
    this.jogoForm = this.fb.group({
      timeCasa: ['', Validators.required],
      placarCasa: [0, [Validators.required, Validators.min(0)]],
      placarVisitante: [0, [Validators.required, Validators.min(0)]],
      timeVisitante: ['', Validators.required],
      rodada: [1, [Validators.required, Validators.min(1)]]
    });
    
    // ✅ Substituir a captura simples do id por uma subscription
  this.route.paramMap.subscribe(params => {
    const id = params.get('id');
    console.log('Param id:', id);
    if (!id) {
      console.error('Param id ausente na rota');
      return;
    }
    this.id = id;

    // Carrega os dados do jogo pelo id
    this.jogosService.buscarPorId(this.id).subscribe({
      next: (jogo) => this.jogoForm.patchValue(jogo),
      error: (err) => console.error('Erro ao carregar jogo:', err)
    });
  });
}

  async salvar(): Promise<void> {
    if (this.jogoForm.invalid) {
      const toast = await this.toastCtrl.create({
        message: 'Preencha todos os campos obrigatórios',
        duration: 2000,
        color: 'warning'
      });
      toast.present();
      return;
    }

    const loader = await this.loadingCtrl.create({ message: 'Salvando alterações...' });
    await loader.present();

    // ✅ Usa o id da rota
    this.jogosService.atualizarJogo(this.id, this.jogoForm.value).subscribe({
      next: async () => {
        loader.dismiss();
        const toast = await this.toastCtrl.create({
          message: 'Jogo atualizado com sucesso!',
          duration: 2000,
          color: 'success'
        });
        toast.present();
        this.router.navigate(['/jogos']);
      },
      error: async (err) => {
        loader.dismiss();
        const toast = await this.toastCtrl.create({
          message: 'Erro ao salvar alterações',
          duration: 2000,
          color: 'danger'
        });
        toast.present();
        console.error('Erro ao atualizar jogo:', err);
      }
    });
  }
}
