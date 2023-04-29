import { Conversation } from 'src/app/core/models/conversation';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { io, Socket } from 'socket.io-client';
import { Observable, Subject, tap, BehaviorSubject, catchError, throwError } from 'rxjs';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket: Socket;
  private _refreshrequired = new Subject<void>();
  private _messages = new BehaviorSubject<Conversation[]>([]);
  public messages$ = this._messages.asObservable();
  listUpdated = new Subject<any[]>();

  constructor(private http: HttpClient) {
    // Connect to Socket.io server
    this.socket = io('http://localhost:3001');
  }

  get Refreshrequired() {
    return this._refreshrequired;
  }

  joinChat(conversationName: string): Observable<Conversation[]> {
    // Fetch existing chat history
    return this.http.get<Conversation[]>(`http://localhost:3001/Message/showmessage/${conversationName}`).pipe(
      tap((messages: Conversation[]) => {
        // Save the messages to the messages property
        this._messages.next(messages);
      })
    );
  }

  
  sendMessage(conversationName: string, userid: string, messageContent: Message): Observable<any> {
    // Send a new message
    return this.http.post(`http://localhost:3001/Message/addmessage/${userid}/${conversationName}`, messageContent).pipe(
      catchError((error) => {
        console.error('Error sending message:', error);
        return throwError(error);
      }),
      tap((response: any) => {
        // Convert response to a Message object
        const newMessage: Conversation = response;
        // Add the new message to the messages property
        const currentMessages = this._messages.getValue();
        if (Array.isArray(currentMessages)) {
          this._messages.next([...currentMessages, newMessage]);
        } else {
          this._messages.next([newMessage]);
        }
        this.Refreshrequired.next();
      })
    );
  }

  getMessage(){
    return this._messages.asObservable();
  }
}