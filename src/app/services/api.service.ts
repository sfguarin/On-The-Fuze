import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http : HttpClient) { }

  //Endpoints de comunicación con el backend
  postUser(data: any){
    return this.http.post<any>(this.baseUrl+"/api/usuarios", data);
  }

  getUser(){
    return this.http.get<any>(this.baseUrl+"/api/usuarios");
  }

  putUser(data:any, id : number){
    return this.http.put<any>(this.baseUrl+"/api/usuarios/"+id, data);
  }

  deleteUser(id : number){
    return this.http.delete<any>(this.baseUrl+"/api/usuarios/"+id);
  }
}
