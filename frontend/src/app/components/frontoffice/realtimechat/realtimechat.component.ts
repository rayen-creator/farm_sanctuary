import { Component, VERSION, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DecodedToken } from 'src/app/core/graphql/graphqlResponse/decodedToken';
import { ChatService } from '../../../core/services/chat.service';
import { ConvroomService } from '../../../core/services/convroom.service';
import { convroom } from '../../../core/models/convroom';
import { ActivatedRoute, Router } from '@angular/router';
import jwt_decode from "jwt-decode";
import { AuthService } from 'src/app/core/services/auth.service';
import { Message } from 'src/app/core/models/message';

@Component({
  selector: 'app-realtimechat',
  templateUrl: './realtimechat.component.html',
  styleUrls: ['./realtimechat.component.css']
})
export class RealtimechatComponent implements OnInit {
  
  messages = new Map<String, String>();
  id: string;
  conversationName: string = '';
  userName: string = '';
  messageContent: string = '';
  name = 'Angular ' + VERSION.major;
  room=new convroom();
  convrname: string;
  message = new Message();
  private tokenSubs: Subscription;
  token: string;
  decodedToken: DecodedToken;
  userId: string;
  constructor(private auth: AuthService, private activatedRoute: ActivatedRoute,
    private chatService: ChatService, private RoomService: ConvroomService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.tokenSubs = this.auth.getToken().subscribe((token) => {
      this.token = token
      this.decodedToken = jwt_decode(this.token) as DecodedToken;
      this.userId = this.decodedToken.id;
    });
    this.id = this.activatedRoute.snapshot.params['id'];
    console.log(this.id);
    console.log(this.userId);
    // check if room exist and get it 
    this.RoomService.getroombyuser12(this.id, this.userId).subscribe({
      next: (response:any) => {
        this.convrname = response.room;
        console.log(this.convrname);
        if (response.room == null) {
          this.createRoom();
        } else {
          this.chatService.joinChat(response.room).subscribe({
            next: (response:any) => {
              console.log("list",response.list)
              if (response.list == null){
                console.log("no message")
              }else{
                this.messages = response.list;
                
                
              }
           

        }});
        }
      }, error: (err) => {
        throw err;
      }
    });
  }

  private randomString() {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for (var i = 0; i < 10; i++) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
  }

  createRoom() {
    this.room.ConvName = this.randomString();
    this.room.User1 = this.userId;
    this.room.User2 = this.id;
   
    this.RoomService.addroom(this.room, this.id, this.userId).subscribe({
      next:(response)=>{
      },error:(err)=>{
        throw err;
      }
    });
    return this.room.ConvName;

  }



  sendMessage(): void {
    this.RoomService.getroombyuser12(this.id, this.userId).subscribe({
      next: (response:any) => {
       
        if (response.room == null) {
         console.log("room desnt exist");
        } else {
        this.convrname = response.room;
       
        }
      }, error: (err) => {
        throw err;
      }
    });
    console.log("get room name ",this.convrname);
    this.message.ConvName = this.convrname;
    this.message.UserM1 = this.userId;
    this.message.UserM2 = this.id;
    this.message.messageUser1 = this.messageContent;
    console.log("sendMessage",this.message)
    this.chatService.sendMessage(this.convrname, this.userId, this.message).subscribe({
      next:(response)=>{
      
      },error:(err)=>{
        throw err;
      }
    });
   
   
  }
}





