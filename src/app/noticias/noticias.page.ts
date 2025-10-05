import { Component, inject, OnInit } from '@angular/core';
import { HttpClient  } from '@angular/common/http';

import { ActivatedRoute } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonList,
  IonThumbnail,
  IonAlert,
  IonButton,
  IonIcon,
  IonSpinner,
  IonSearchbar
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.page.html',
  styleUrls: ['./noticias.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle,
    IonContent,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonItem,
    IonLabel,
    IonList,
    IonThumbnail,
    IonAlert,
    IonButton,
    IonIcon,
    IonSpinner,
    IonSearchbar,
      
  ],
})
export class NoticiasPage implements OnInit {
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);
  private http = inject(HttpClient);
  filteredArticles: any[] = []
  articles: any[] = [];
  loading: boolean = false;
  error: string = '';
  searchQuery: string = '';
  futebolDataOriginal: any[] = [];
  futebolData: any[] = [];

  
  
  futebolApiKey = 'live_8c5a3a39bb0e39223f5457be1471f5';


  
  constructor() {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.loadFutebol(); 
  }
  
  loadFutebol() {
    this.loading = true;
    this.error = '';

    this.http.get('https://api.api-futebol.com.br/v1/campeonatos', {
      headers: {
        'Authorization': `Bearer ${this.futebolApiKey}`
      }
    }).subscribe({
      next: (response: any) => {
        this.futebolDataOriginal = response; // Guardar dados originais
        this.futebolData = [...response]; // Criar cópia para filtrar
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erro ao carregar dados de futebol.';
        this.loading = false;
        console.error('Erro API Futebol:', err);
      }
    });
  }

  filterFutebol() {
    if (!this.searchQuery) {
      this.futebolData = [...this.futebolDataOriginal];
      return;
    }

    const query = this.searchQuery.toLowerCase().trim();
    this.futebolData = this.futebolDataOriginal.filter((item: any) =>
      item.nome?.toLowerCase().includes(query) ||
      item.nome_popular?.toLowerCase().includes(query) ||
      item.tipo?.toLowerCase().includes(query)
    );
  }
}

//  apiKey = 'live_212bb356b6636b66129e445b631c64';
//    apiUrl = 'https://api.api-futebol.com.br/v1/campeonatos';


//    futebolApiKey = 'live_212bb356b6636b66129e445b631c64';
//  futebolApiUrl = 'https://api.api-futebol.com.br/v1/';