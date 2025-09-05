import { Component, inject, OnInit } from '@angular/core';
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
  IonIcon 
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.page.html',
  styleUrls: ['./noticias.page.scss'],
  standalone: true, // <-- precisa estar presente
  imports: [
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
    IonIcon 
  ],
})
export class NoticiasPage implements OnInit {
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);

  alertButtons = [
    {
      text: 'Cancelar',
      role: 'cancel',
      cssClass: 'btn-cancelar'
    },
    {
      text: 'OK',
      role: 'confirm',
      cssClass: 'btn-ok'
    }
  ];

  constructor() {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }
}
