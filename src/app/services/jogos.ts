import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JogosService {
  public jogosDataOriginal: any[] = [];
  public jogosData: any[] = [];
  public loading = false;
  public error = '';

  // Se testar no celular substitua "localhost" pelo IP da sua máquina: ex 'http://192.168.0.100:3000/jogos'
  private apiUrl = 'http://localhost:3000/jogos';

  constructor(private http: HttpClient) {}

  loadJogos(): Observable<any[]> {
  this.loading = true;
  this.error = '';
  

    return new Observable<any[]>(observer => {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (response) => {
        this.jogosDataOriginal = response || [];
        this.jogosData = [...this.jogosDataOriginal];
        this.loading = false;
        observer.next(this.jogosData);
        observer.complete();
      },
      error: (err) => {
        this.error = 'Erro ao carregar jogos.';
        this.loading = false;
        console.error('Erro API Jogos:', err);
        observer.error(err);
      }
    });
  });
}
  // utilitários
  buscarPorId(id: string) {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  criarJogo(payload: any) {
    return this.http.post<any>(this.apiUrl, payload);
  }

  atualizarJogo(id: string, payload: any) {
    return this.http.put<any>(`${this.apiUrl}/${id}`, payload);
  }

  removerJogo(id: string) {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
