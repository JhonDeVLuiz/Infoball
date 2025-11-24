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
  private apiUrl = 'https://backend-infoboll.onrender.com';

  constructor(private http: HttpClient) {}

  loadJogos(data?: string, time?: string): Observable<any[]> {
  this.loading = true;
  this.error = '';
  
  let url = `${this.apiUrl}/jogos`;
  const params = new URLSearchParams();

  if (data) {
    const dataObj = new Date(data);
    const dataFormatada = dataObj.toISOString().split('T')[0];
    params.append('data', dataFormatada);
  }
  if (time) {
    params.append('time', time);
  }

  const queryString = params.toString();
  if (queryString) {
    url += `?${queryString}`;
  }
  
    return new Observable<any[]>(observer => {
    this.http.get<any[]>(url).subscribe({
      next: (response) => {
        console.log('Dados recebidos do backend:', response); // Adicionado para depuração
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
        console.error('Detalhes do erro (após edição):', err); // Modificado para depuração
        observer.error(err);
      }
    });
  });
}

 getTabela(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/tabela`);
}

  // utilitários
  buscarPorId(id: string) {
    return this.http.get<any>(`${this.apiUrl}/jogos/${id}`);
  }

 
  // renomeado para combinar com a página Cadastrar Jogo
  cadastrarJogo(payload: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/jogos/`, payload);
  }

  atualizarJogo(id: string, payload: any) {
    return this.http.put<any>(`${this.apiUrl}/jogos/${id}`, payload);
  }

  removerJogo(id: string) {
    return this.http.delete<any>(`${this.apiUrl}/jogos/${id}`);
  }
}
