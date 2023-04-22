import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatBotService {

  constructor(private http: HttpClient) { }

  chatbot(formData: any): Observable<String> {
    console.log(environment.flask+'/chat');
    console.log(formData);
    return this.http.post<any>(environment.flask+'/chat', { "text": formData }, {headers : { "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"},} );
  }
}
