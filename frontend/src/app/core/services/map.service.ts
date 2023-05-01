import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { getcord } from '../graphql/queries/graphql.queries.map';
import { Subscription, map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor( private appolo: Apollo) { }

  getcord(address:String) {
    return this.appolo.watchQuery({
      query: getcord
    }).valueChanges.pipe(
      map((res: any) => {
        const cord = res.data.getcord;
        return cord;
      })
    )
  }
}
