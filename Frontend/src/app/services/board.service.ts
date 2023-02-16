import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  endpoint: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getPosts() {
    return this.http.get(this.endpoint + '/api/board');
  }

  createPost(body: any) {
    return this.http.post(this.endpoint + '/api/board/create', body);
  }
}
