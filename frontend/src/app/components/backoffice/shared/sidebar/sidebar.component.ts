import { AuthService } from 'src/app/core/services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
 
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
   
  }

 


  log_out() {
    this.auth.logout();
  }
}
