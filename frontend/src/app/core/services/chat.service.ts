import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { io, Socket } from 'socket.io-client';
import { Observable , Subject, tap } from 'rxjs';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket: Socket;
  private _refreshrequired = new Subject<void>();

  constructor(private http: HttpClient) {
    // Connect to Socket.io server
    this.socket = io('http://localhost:3001');
  }

  
  get Refreshrequired() {
    return this._refreshrequired;
  }
  joinChat(conversationName: string): Observable<any> {
    // Fetch existing chat history
    return this.http.get(`http://localhost:3001/Message/showmessage/${conversationName}`);
  }


  sendMessage(conversationName: string, userid :string, messageContent: Message): Observable<any> {
    // Send a new message
    return this.http.post(`http://localhost:3001/Message/addmessage/${userid}/${conversationName}`,messageContent).pipe(
      tap(() => {
        this.Refreshrequired.next();

      })
    );
  }

  getMessages(): Observable<any> {
    // Listen for new messages
    return new Observable<any>((observer) => {
      this.socket.on('updateChat', (data: any) => {
        const message = JSON.parse(data);
        observer.next(message);
      });
    });
  }
}