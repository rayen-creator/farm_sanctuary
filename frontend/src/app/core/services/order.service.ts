import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';
import {Observable, of, Subscription} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  createOrder,
  deleteOrder,
  order,
  orders, ordersByFarmer,
  ordersByUser, updateOrderConfirmationStatus,
  updateOrderDeliveryStatus
} from "../graphql/queries/graphql.queries.order";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "./auth.service";
import {CartItem} from "../models/cartItem";
import {DecodedToken} from "../graphql/graphqlResponse/decodedToken";
import jwt_decode from "jwt-decode";
import {Order} from "../models/order";
import {CreateProductResponse} from "../graphql/graphqlResponse/createProductResponse";



@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private tokenSubs: Subscription;
  token: string;
  decodedToken: DecodedToken;
  userId: string;
  constructor( private appolo: Apollo,
               private router: Router,
               private toastr: ToastrService,
               private auth: AuthService) {
  }



  getOrder(id: string): Observable<Order> {
    // @ts-ignore
    return this.appolo
      .watchQuery({
        query: order,
        variables: {id},
      }).valueChanges.pipe(
        // @ts-ignore
        map((res) => res.data.getOrder as Order),
        catchError((err) => {
          console.log(err);
          return of(null);
        })
      );
  }

  getOrders(): Observable<Order[]> {
    // @ts-ignore
    return this.appolo
      .watchQuery({
        query: orders,
      }).valueChanges.pipe(
        // @ts-ignore
        map((res) => res.data.getOrders as Order[]),
        catchError((err) => {
          console.log(err);
          return of([]);
        })
      );
  }
  getOrderByUser(userId: string): Observable<Order[]> {
    return this.appolo.watchQuery({
      query: ordersByUser,
      variables: { userId },
    }).valueChanges.pipe(
      map((res) => {
        // @ts-ignore
        const orders = res.data.getOrdersByUser;
        return orders as Order[];
      })
    );
  }

  getOrderByFarmer(farmerId: string): Observable<Order[]> {
    return this.appolo.watchQuery({
      query: ordersByFarmer,
      variables: { farmerId },
    }).valueChanges.pipe(
      map((res) => {

        // @ts-ignore
        const orders = res.data.getOrdersByFarmer;
        return orders as Order[];
      })
    );
  }
  createOrder(cartItems: CartItem[], totalPrice: number, location: any) {
    this.tokenSubs = this.auth.getToken().subscribe((token) => {
      this.token = token
      this.decodedToken = jwt_decode(this.token) as DecodedToken;
      this.userId = this.decodedToken.id;
    });
    const input = {
      cartItems: cartItems,
      totalPrice: totalPrice,
      userId: this.userId,
      farmerId: "641b200da38bfe5417ef4c20",
      location: location
    };

    return this.appolo
      .mutate({
        mutation: createOrder,
        variables: {
          input: input
        },
        refetchQueries: [
          {
            query: orders
          },  {
            query: ordersByUser,
            variables: { userId: this.userId },
          }]
      })
      .subscribe({
        next: (res) => {
          // Get the response
          const createOrderRes = res.data as CreateProductResponse;

          // Handle the response as needed
          const message = createOrderRes.createProduct.message;
        },
        error: (err) => {
          console.log(err);
          // Handle the error as needed
        },
      });
  }

  updateOrderDeliveryStatus(id: string, isDelivered: boolean): Observable<Order> {
    // @ts-ignore
    return this.appolo
      .mutate({
        mutation: updateOrderDeliveryStatus,
        variables: {
          id,
          isDelivered
        },
        refetchQueries: [
          {
            query: orders
          }]
      })
      .subscribe({
        next: (res) => {
          //get the response
          const order = res.data as Order;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  updateOrderConfirmationStatus(id: string, isConfirmed: boolean, farmerId: string): Observable<Order> {
    // @ts-ignore
    return this.appolo
      .mutate({
        mutation: updateOrderConfirmationStatus,
        variables: {
          id,
          isConfirmed
        },
        refetchQueries: [
          {
            query: ordersByFarmer,
            variables: {farmerId}
          }]
      })
      .subscribe({
        next: (res) => {
          //get the response
          const order = res.data as Order;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }


  deleteOrder(id: string){
    this.tokenSubs = this.auth.getToken().subscribe((token) => {
      this.token = token
      this.decodedToken = jwt_decode(this.token) as DecodedToken;
      this.userId = this.decodedToken.id;
    });
    return this.appolo
      .mutate({
        mutation: deleteOrder,
        variables: {id},
        refetchQueries: [
          {
            query: ordersByUser,
            variables: { userId: this.userId },
          }, {
            query: orders
          }],
      }).subscribe({
        next: (res) => {
          //get the response
          const order = res.data as Order;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
