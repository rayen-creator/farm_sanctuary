import {Injectable} from "@angular/core";
import {Apollo} from "apollo-angular";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "./auth.service";
import {productsByUser} from "../graphql/queries/graphql.queries.product";
import {Product} from "../models/product";
import {createEventsFromScenario} from "../graphql/queries/graphql.queries.scenario";
import {Event} from "../models/event";



@Injectable({
  providedIn: 'root',
})
export class ScenarioService {
  constructor(
    private appolo: Apollo,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  createEventsFromScenario(label: string){
    return this.appolo
      .mutate({
        mutation: createEventsFromScenario,
        variables: {label},
      }).subscribe({
        next: (res) => {
          //get the response
          return res.data as Event[];
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
