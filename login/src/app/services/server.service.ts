import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { throwError } from 'rxjs';
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  hostAddress="";


  constructor(private httpClient: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    Swal.fire("Error",errorMessage,"error");
    // window.alert(errorMessage);
    return throwError(errorMessage);
  }

  loginCheck(url, data) {
    
    var  header = new HttpHeaders({ 'Content-Type' : 'application/json' });
    // header.append('Access-Control-Allow-Origin', 'http://localhost:3000');
    return this.httpClient.post<any>(url,data,{headers:header}).pipe(catchError(this.handleError));

  }
  getLoginData(url){
    var  header = new HttpHeaders({ 'Content-Type' : 'application/json' });
    // header.append('Access-Control-Allow-Origin', 'http://localhost:3000');
    return this.httpClient.get<any>(url,{headers:header}).pipe(catchError(this.handleError));

  }
  getData(url) {
    // const token = localStorage.getItem('BTokeniser');
    const token = "SE2Cqj/Ip19yY7qo2xo9depnix2mcAy8LO5dzCRrrToAQ7rt2H/Yh2G9cy9BpJlOTEx1Iu40IbzyLlXv23TdagZPTSXOQOosjZIOSg4w1MO0v2iwrYA9XC5yPqjOjrwscpJh8u9mxA8Hdc1K3d4W+xWPrDGxDLVRel6PuuN1/5hHl+K7zA6oJT8uajP2PHegHMGWsgb4hSebI8WkbcaUyrNcpAHKnTZdRReBFvVQxFtmqjf9UdwyXG9Kf/QWOlDnuqsnxOtsKaS9KlScSl5AYTc068iSsSh/SB7wSMZpw29lg4VInie3Omm1LxTfKXaZPqgFEx37kocGb4l/70bfFQ=="
    // var header = new HttpHeaders({ Authorization: 'JWT ' + token });
    var header = new HttpHeaders({ 'in-auth-token' : token, 'Content-Type' : 'application/json'});

    // header.append('Access-Control-Allow-Origin', 'http://localhost:3000');

    return this.httpClient.get<any>(this.hostAddress+url,{headers:header}).pipe(catchError(this.handleError));

  }
  postData(url,data) {
    const token = localStorage.getItem('BTokeniser');
    const header = new HttpHeaders({ Authorization: 'JWT ' + token });
    return this.httpClient.post<any>(this.hostAddress+url,data,{headers:header}).pipe(catchError(this.handleError));

  }
  putData(url,data) {
    const token = localStorage.getItem('BTokeniser');
    const header = new HttpHeaders({ Authorization: 'JWT ' + token });
    return this.httpClient.put<any>(this.hostAddress+url,data,{headers:header}).pipe(catchError(this.handleError));

  }
  patChData(url,data) {
    const token = localStorage.getItem('BTokeniser');
    const header = new HttpHeaders({ Authorization: 'JWT ' + token });
    return this.httpClient.patch<any>(this.hostAddress+url,data,{headers:header}).pipe(catchError(this.handleError));

  }
}
