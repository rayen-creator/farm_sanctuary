import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket: Socket;

  constructor(private http: HttpClient) {
    // Connect to Socket.io server
    this.socket = io('http://localhost:3001');
  }

  joinChat(conversationName: string, userName: string): Observable<any> {
    // Join the chat room
    this.socket.emit('subscribe', { conversationName: conversationName, userName: userName });

    // Fetch existing chat history
    return this.http.get(`http://localhost:3001/Message?roomName=${conversationName}`);
  }

  leaveChat(conversationName: string, userName: string): void {
    // Leave the chat room
    this.socket.emit('unsubscribe', { conversationName: conversationName, userName: userName });
  }

  sendMessage(conversationName: string, userName: string, messageContent: string): void {
    // Send a new message
    const chatData = { conversationName: conversationName, userName: userName, messageContent: messageContent };
    this.socket.emit('newMessage', chatData);
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