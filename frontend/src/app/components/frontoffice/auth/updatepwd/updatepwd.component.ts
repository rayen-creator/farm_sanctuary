import { DecodedToken } from '../../../../core/graphql/decodedToken';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-updatepwd',
  templateUrl: './updatepwd.component.html',
  styleUrls: ['./updatepwd.component.css']
})
export class UpdatepwdComponent implements OnInit {

  constructor(private router:ActivatedRoute) { }

  ngOnInit(): void {
    const resetpwdToken=this.router.snapshot.params['token'];
    // const decoded = jwt_decode(resetpwdToken);
    const decoded: DecodedToken = jwt_decode(resetpwdToken) as DecodedToken;

    console.log("user : "+decoded.id);
    console.log("expdate : "+decoded.exp);

  }

}
