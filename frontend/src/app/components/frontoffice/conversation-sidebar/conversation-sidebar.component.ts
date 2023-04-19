import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import jwt_decode from "jwt-decode";
import { DecodedToken } from 'src/app/core/graphql/graphqlResponse/decodedToken';
import { AuthService } from 'src/app/core/services/auth.service';
import { Subscription } from 'rxjs';
import { ConvroomService } from "src/app/core/services/convroom.service";
import { ActivatedRoute } from "@angular/router";
import { convroom } from "src/app/core/models/convroom";
import { User } from "src/app/core/models/user";
@Component({
  selector: 'app-conversation-sidebar',
  templateUrl: './conversation-sidebar.component.html',
  styleUrls: ['./conversation-sidebar.component.css']
})
export class ConversationSidebarComponent implements OnInit {
  @Output() roomClicked: EventEmitter<string> = new EventEmitter<string>();
    reciverid:string;
    currentuser: string;
    List : convroom[];
    ListUsers : User[] = [];
    private tokenSubs: Subscription;
    token: string;
    decodedToken: DecodedToken;
    msgsub : Subscription;
  constructor(private UserService: UserService, 
    private auth: AuthService, private activatedRoute: ActivatedRoute, private RoomService: ConvroomService) { }

  ngOnInit(): void {
    this.tokenSubs = this.auth.getToken().subscribe((token) => {
      this.token = token
      this.decodedToken = jwt_decode(this.token) as DecodedToken;
      this.currentuser  = this.decodedToken.id;
    });
     

    this.RoomService.getallrooms( this.currentuser).subscribe({
      next: (response:any) => {
        
        this.List = response;
        console.log(this.List);
        for (let i = 0; i < this.List.length; i++) {
          const conv = this.List[i];
          if(this.currentuser !== conv.User1){
            this.reciverid = conv.User1
            this.UserService.getUserById(conv.User1).subscribe({
              next: (response:User) => {
                this.ListUsers.push(response);

              }
            })
          }else{
            this.reciverid = conv.User2
            this.UserService.getUserById(conv.User2).subscribe({
              next: (response:User) => {
                this.ListUsers.push(response);
              }
            })

          }
          

      }

      }
  })
  }
  
  onRoomClick(reciver : string) {
   return this.roomClicked.emit(reciver);
  }

}
