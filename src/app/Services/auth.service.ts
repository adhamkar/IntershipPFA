import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl="http://localhost:8085/auth";
  isAuthtenticated: boolean=false;
  roles:any;
  email:any;
  accessToken!:any;
  
  constructor(private http:HttpClient,private router:Router) { }

  public login(email:string,password:string){
    let params=new HttpParams().set("email",email).set("password",password);
    let options={
      headers:
       new HttpHeaders().set("Content-Type","application/x-www-form-urlencoded")
    }
    return this.http.post(`${this.authUrl}/login`,params,options)
  }

  LoadProfile(data: any) {
    this.isAuthtenticated=true;
    this.accessToken=data['access-token'];
    let decodedJwt:any=jwtDecode(this.accessToken);
    this.email=decodedJwt.sub;
    this.roles=decodedJwt.scope;
    window.localStorage.setItem("jwt-Token",this.accessToken);
  }
  LoadJwtTokenFromLocalStorage(){
    let token=this.accessToken=window.localStorage.getItem("jwt-Token");
    if(token){
      this.LoadProfile({"access-Token":token})
     }
  }
  getAuthenticatedUser(){
    let decodedJwt:any=jwtDecode(this.accessToken);
    return decodedJwt.sub;
  }
  logout(){
    this.isAuthtenticated=false;
    this.accessToken=undefined;
    this.email=undefined;
    this.roles=undefined;
    window.localStorage.removeItem("jwt-Token");
    location.reload();
  }
}
