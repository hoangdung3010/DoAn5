import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  url = environment.apiUrl;

  constructor(private httpClient:HttpClient) { }

  add(data:any){
    return this.httpClient.post(this.url + 
      "/department/add/",data,{
        headers: new HttpHeaders().set('Content-Type',"application/json")
      })
  }

  update(data:any){
    return this.httpClient.patch(this.url + 
      "/department/update/",data,{
        headers: new HttpHeaders().set('Content-Type',"application/json")
      })
  }

  getDepartments(){
    return this.httpClient.get(this.url + "/department/get/");
  }
}
