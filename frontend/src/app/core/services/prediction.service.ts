import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PredictionService {

  constructor(private http: HttpClient) { }

  predict(formData: any): Observable<any> {
    return this.http.post<any>(environment.flask+'/predict', { data: formData }, {headers : { "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"},} );
  }
}
