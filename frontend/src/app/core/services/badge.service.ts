import { Apollo } from 'apollo-angular';
import { assignBadges, getAllbadges } from './../graphql/queries/badge.graphql.queries';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Badge } from '../models/badge';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class BadgeService {

  constructor(private apollo: Apollo,
    private toastr: ToastrService,
  ) { }

  getAllbadges() {
    return this.apollo.watchQuery({
      query: getAllbadges
    }).valueChanges.pipe(
      map((res: any) => {
        const badge = res.data.getAllbadges as Badge[];
        return badge;
      })
    )
  }
  assignBadges(userId: string) {
    return this.apollo.mutate({
      mutation: assignBadges,
      variables: { userId: userId }
    }).subscribe({
      next: (res: any) => {
        console.log("result", res);

        const result = res.data.assignBadges;
        const badgeName = result.name;
        const badgeImg = `<img class="badge-img" src="data:image/png;base64,${result.image}">`;
        const toastContent = badgeImg + '<span class="title_toast"> new achievement unlocked !</span>'; 

        if (badgeName) {
          this.toastr.show(toastContent, badgeName, {
            enableHtml: true,
            timeOut: 3000,
            progressBar: true,
            toastClass: 'custom-toast-container'
          });
        }

      }
    })
  }
}
