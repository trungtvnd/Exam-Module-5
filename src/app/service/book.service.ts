import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Book} from "../model/book";
import {environment} from "../../environments/environment";

const API_BOOK = `${environment.apiUrl}`

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private  httpClient:HttpClient) { }

  public getAllBook():Observable<Book[]>{
    return this.httpClient.get<Book[]>(API_BOOK)
  }

  public saveBook(book:Book):Observable<Book>{
    return this.httpClient.post<Book>(API_BOOK, book)
  }

  public updateBook(book:Book , id: number){
    return this.httpClient.put<Book>(API_BOOK + id, book)
  }

  public deleteBook(id:number):Observable<Book>{
    return this.httpClient.delete<Book>(API_BOOK + id )
  }

  public getBookById(id:number):Observable<Book>{
    return this.httpClient.get<Book>(API_BOOK + id);
  }

}
