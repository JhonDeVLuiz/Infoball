
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logoLinkedin, trophyOutline, trophy, trophySharp, accessibility, accessibilityOutline, accessibilitySharp, footballSharp, footballOutline, football, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp, man, manOutline } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [RouterLink, RouterLinkActive, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterLink, IonRouterOutlet, ],
  
})
export class AppComponent {
  public appPages = [
    { title: 'Brasileirão', url: '/folder/inbox', icon: 'football' },
    { title: 'Campeonatos', url: '/noticias', icon: 'trophy' },
    { title: 'Sobre', url: '/about', icon: 'accessibility' },
    { title: 'Jogos', url: '/jogos', icon: 'archive' },
    { title: 'Editar Jogo', url: '/editar-jogo', icon: 'archive' },
  ];
 
  constructor() {
    addIcons({logoLinkedin,trophyOutline,trophy,trophySharp, accessibility,accessibilityOutline, accessibilitySharp,  football, footballOutline, footballSharp, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp,man, manOutline});
  }
}


