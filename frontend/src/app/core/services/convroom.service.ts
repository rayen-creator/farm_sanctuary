import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import {convroom} from '../models/convroom'
@Injectable({
  providedIn: 'root'
})
export class ConvroomService {
  private socket: Socket;

  constructor(private http: HttpClient) {
    // Connect to Socket.io server
    this.socket = io('http://localhost:3001');
   }
   addroom(room: convroom,iduser1:String,iduser2:String): Observable<any>{
    return this.http.post(`http://localhost:3001/Room/add/`+iduser1+'/'+iduser2,room)
   }
}
  