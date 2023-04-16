import { Component, VERSION,OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { ChatService } from '../../../core/services/chat.service';
import { ConvroomService } from '../../../core/services/convroom.service';
import {convroom} from '../../../core/models/convroom';
@Component({
  selector: 'app-realtimechat',
  templateUrl: './realtimechat.component.html',
  styleUrls: ['./realtimechat.component.css']
})
export class RealtimechatComponent implements OnInit {
   messages: any[] = [];
   conversationName: string = '';
   userName: string = '';
   messageContent: string = '';
   name = 'Angular ' + VERSION.major;
   room: convroom;
   iduser1:String;
   iduser2:String;
  constructor(private chatService: ChatService,private RoomService:ConvroomService ) { 
   }

  ngOnInit(): void {
    console.log(this.randomString())  
      // Listen for new messages
     this.chatService.getMessages().subscribe((message) => {
       this.messages.push(message);
     });
   }
   randomString() {
    
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( var i = 0; i < 10; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
}

   createRoom(): void {
    
    this.RoomService.addroom(this.room,this.iduser1,this.iduser2)
   }
 
   joinChat(): void {
     // Join the chat room and fetch existing chat history
     this.chatService.joinChat(this.conversationName, this.userName)
       .subscribe((data: any) => {
         this.messages = data;
         console.log(this.messages);
        
       });

   }
 
   leaveChat(): void {
     // Leave the chat room
     this.chatService.leaveChat(this.conversationName, this.userName);
     this.messages = [];
   }
 
   sendMessage(): void {
     // Send a new message
     this.chatService.sendMessage(this.conversationName, this.userName, this.messageContent);
     this.messageContent = '';
   }
 }
    
 
  


