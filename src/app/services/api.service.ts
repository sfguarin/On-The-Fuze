import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  //Endpoints de comunicación con el backend
  postUser(data: any){
    return this.http.post<any>("http://localhost:8080/api/usuarios", data);
  }

  getUser(){
    return this.http.get<any>("http://localhost:8080/api/usuarios");
  }

  putUser(data:any, id : number){
    return this.http.put<any>("http://localhost:8080/api/usuarios/"+id, data);
  }

  deleteUser(id : number){
    return this.http.delete<any>("http://localhost:8080/api/usuarios/"+id);
  }
}
