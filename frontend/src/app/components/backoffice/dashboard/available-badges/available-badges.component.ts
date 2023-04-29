import { Component, OnInit } from '@angular/core';
import { Apollo, Subscription } from 'apollo-angular';
import { Observable } from 'apollo-client/util/Observable';
import { getAllbadges } from 'src/app/core/graphql/queries/badge.graphql.queries';
import { Badge } from 'src/app/core/models/badge';
import { BadgeService } from 'src/app/core/services/badge.service';

@Component({
  selector: 'app-available-badges',
  templateUrl: './available-badges.component.html',
  styleUrls: ['./available-badges.component.css']
})
export class AvailableBadgesComponent implements OnInit {
  badges: Badge[];
  constructor(private badgeService: BadgeService, private apollo: Apollo) { }

  ngOnInit(): void {
    this.badgeService.getAllbadges().subscribe({
      next: (res: any) => {
        this.badges = res;
      }
    });
  }
}
