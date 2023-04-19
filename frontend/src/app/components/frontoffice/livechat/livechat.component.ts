import { Component, VERSION, OnInit, Input  } from '@angular/core';
import { Subscription } from 'rxjs';
import { DecodedToken } from 'src/app/core/graphql/graphqlResponse/decodedToken';
import { ChatService } from '../../../core/services/chat.service';
import { ConvroomService } from '../../../core/services/convroom.service';
import { convroom } from '../../../core/models/convroom';
import { ActivatedRoute, Router } from '@angular/router';
import jwt_decode from "jwt-decode";
import { AuthService } from 'src/app/core/services/auth.service';
import { Message } from 'src/app/core/models/message';
import { Conversation } from 'src/app/core/models/conversation';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'app-livechat',
  templateUrl: './livechat.component.html',
  styleUrls: ['./livechat.component.css']
})
export class LivechatComponent implements OnInit {
  mymap  = new Map()
  myobj :  Conversation[] = []
  messages = new Map();
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
  msgsub : Subscription;
  newMsg = new Conversation();
  ReciverUser :User;
  constructor(private UserService: UserService ,private auth: AuthService, private activatedRoute: ActivatedRoute,
    private chatService: ChatService, private RoomService: ConvroomService,
    private router: Router) {
  }

  ngOnInit(): void {
   this.id=this.activatedRoute.snapshot.params['id'];
    this.UserService.getUserById(this.id).subscribe({
      next: (response:User) => {
        console.log("user1",response)
        this.ReciverUser = response

      }
    })
    this.msgsub = this.chatService.getMessage().subscribe({
      next: (msg : any) => {
       
          for (const innerArray of msg) {
            const key = innerArray[0].key; // using dot notation
            const value = innerArray[0]["value"]; // using bracket notation
           
            this.newMsg.key = key;
            this.newMsg.value = value;
            this.myobj.push( this.newMsg)
            
          }
      },
      error: () => {
        console.log("an error occrred");
      }
    });
    
  
    this.tokenSubs = this.auth.getToken().subscribe((token) => {
      this.token = token
      this.decodedToken = jwt_decode(this.token) as DecodedToken;
      this.userId = this.decodedToken.id;
    });
   
    // check if room exist and get it 
    this.RoomService.getroombyuser12(this.id, this.userId).subscribe({
      next: (response:any) => {
        this.convrname = response.room;
      
        if (response.room == null) {
          this.createRoom();
        } else {
          this.chatService.joinChat(response.room).subscribe({
            next: (response:any) => {
              if (response.list == null){
              
              }else{
                this.mymap =  response.list;
            
                this.mymap.forEach((value, key) => {
                 const obj= value as Conversation;

                 this.myobj.push(obj);
                
                });
               
                
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
          console.log("room doesnt exist",response.room)
        } else {
        this.convrname = response.room;
        console.log("convrname1", this.convrname)
        }
      }, error: (err) => {
        throw err;
      }
    });
    this.message.ConvName = this.convrname;
    console.log("message convrname",  this.message)

    this.message.UserM1 = this.userId;
    this.message.UserM2 = this.id;
    this.message.messageUser1 = this.messageContent;
    this.chatService.sendMessage(this.convrname, this.userId, this.message).subscribe({
      next:(response)=>{
        //this.messages.set("user1",this.messageContent)
        this.messageContent = ""
      },error:(err)=>{
        throw err;
      }
    });
   
   
  }
}






