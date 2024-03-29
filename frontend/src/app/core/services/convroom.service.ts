import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import {convroom} from '../models/convroom'
import { environment } from 'src/environments/environment';
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
    return this.http.post(`http://localhost:3001/Room/add/${iduser1}/${iduser2}`,room)
   }
   getroombyuser12(iduser1:String,iduser2:String){
    return this.http.get(`http://localhost:3001/Room/getroom/${iduser1}/${iduser2}`)
   }
   getallrooms(iduser1:String){
    return this.http.get(`http://localhost:3001/Room/rooms/${iduser1}`)
   }
}
  