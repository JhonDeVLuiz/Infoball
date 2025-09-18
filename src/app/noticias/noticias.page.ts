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

  apiKey = 'live_212bb356b6636b66129e445b631c64';
   apiUrl = 'https://api.api-futebol.com.br/v1/campeonatos';


   futebolApiKey = 'live_212bb356b6636b66129e445b631c64';
 futebolApiUrl = 'https://api.api-futebol.com.br/v1/';

  futebolData: any[] = [];

  constructor() {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.loadNews();
    this.loadFutebol();
  }

//   loadNews() {
//   this.loading = true;
//   this.error = '';

//   this.http.get('https://api.api-futebol.com.br/v1/campeonatos', {
//     headers: {
//       'Authorization': `Bearer ${this.apiKey}`
//     }
//   }).subscribe({
//     next: (response: any) => {
//       this.articles = response; // ajuste conforme o formato retornado
//       this.filteredArticles = [...this.articles];
//       this.loading = false;
//     },
//     error: (err) => {
//       this.error = 'Erro ao carregar notícias. Tente novamente.';
//       this.loading = false;
//       console.error('Erro API:', err);
//     }
//   });
// }

loadNews() {
  this.loading = true;
  this.error = '';

  this.http.get('https://api.api-futebol.com.br/v1/campeonatos', {
    headers: {
      'Authorization': `Bearer ${this.apiKey}`
    }
  }).subscribe({
    next: (response: any) => {
      // Se a API retorna um array diretamente
      const rawArticles = Array.isArray(response) ? response : (response.articles || response.data || []);

      this.articles = rawArticles.map((item: any) => ({
        title: item.title || item.nome || item.headline,
        description: item.description || item.descricao || item.summary,
        urlToImage: item.urlToImage || item.imagem || item.image_url || 'https://via.placeholder.com/150',
        publishedAt: item.publishedAt || item.data_inicio || item.date
      }));

      this.filteredArticles = [...this.articles];
      this.loading = false;
    },
    error: (err) => {
      this.error = 'Erro ao carregar notícias. Tente novamente.';
      this.loading = false;
      console.error('Erro API:', err);
    }
  });
}



//   loadFutebol() {
//     this.loading = true;
//     this.error = '';

//     this.http.get(this.futebolApiUrl, {
//       headers: {
//         'Authorization': `Bearer ${this.futebolApiKey}`
//       }
//     }).subscribe({
//       next: (response: any) => {
//         this.futebolData = response;
//         this.loading = false;
//       },
//       error: (err) => {
//         this.error = 'Erro ao carregar dados de futebol.';
//         this.loading = false;
//         console.error('Erro API Futebol:', err);
//       }
//     });
//   }


//       filterArticles() {
//     const query = this.searchQuery.toLowerCase();
//     this.filteredArticles = this.articles.filter(article =>
//       article.title?.toLowerCase().includes(query)
//     );
//   }
// }

//  loadFutebol() {
//     this.loading = true;
//     this.error = '';

//     this.http.get(this.futebolApiUrl, {
//       headers: {
//         'Authorization': `Bearer ${this.futebolApiKey}`
//       }
//     }).subscribe({
//       next: (response: any) => {
//         this.futebolData = response;
//         this.loading = false;
//       },
//       error: (err) => {
//         this.error = 'Erro ao carregar dados de futebol.';
//         this.loading = false;
//         console.error('Erro API Futebol:', err);
//       }
//     });
//   }

  loadFutebol() {
  this.loading = true;
  this.error = '';

  this.http.get('https://api.api-futebol.com.br/v1/campeonatos', {
    headers: {
      'Authorization': `Bearer ${this.futebolApiKey}`
    }
  }).subscribe({
    next: (response: any) => {
      this.futebolData = response;
      this.loading = false;
    },
    error: (err) => {
      this.error = 'Erro ao carregar dados de futebol.';
      this.loading = false;
      console.error('Erro API Futebol:', err);
    }
  });
}

  filterArticles() {
    const query = this.searchQuery.toLowerCase();
    this.filteredArticles = this.articles.filter(article =>
      article.title?.toLowerCase().includes(query)
    );
  }
}

//  apiKey = 'live_212bb356b6636b66129e445b631c64';
//    apiUrl = 'https://api.api-futebol.com.br/v1/campeonatos';


//    futebolApiKey = 'live_212bb356b6636b66129e445b631c64';
//  futebolApiUrl = 'https://api.api-futebol.com.br/v1/';
