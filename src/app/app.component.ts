import { Component, OnInit, Renderer2, Inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink, IonToggle, Platform, NavController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logoLinkedin, trophyOutline, trophy, trophySharp, accessibility, accessibilityOutline, accessibilitySharp, footballSharp, footballOutline, football, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp, man, manOutline, moonOutline } from 'ionicons/icons';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [RouterLink, RouterLinkActive, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterLink, IonRouterOutlet, IonToggle],
  
})
export class AppComponent implements OnInit {
  public appPages = [
    { title: 'Brasileirão', url: '/tabela', icon: 'football' },
    { title: 'Campeonatos', url: '/noticias', icon: 'trophy' },
    { title: 'Sobre', url: '/about', icon: 'accessibility' },
    { title: 'Jogos', url: '/jogos', icon: 'archive' },
    
  ];
 
  constructor(
    private platform: Platform,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {
    addIcons({logoLinkedin,trophyOutline,trophy,trophySharp, accessibility,accessibilityOutline, accessibilitySharp,  football, footballOutline, footballSharp, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp,man, manOutline});
    
  }

  ngOnInit() {
    // This can be used for additional setup if needed
  }
}
