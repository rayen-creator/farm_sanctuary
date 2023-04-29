import { Component, OnInit } from '@angular/core';
import {
  IPayPalConfig,
  ICreateOrderRequest
} from 'ngx-paypal';
import {Router} from "@angular/router";
import {environment} from "../../../../../environments/environment";
import {CartService} from "../../../../core/services/cart.service";
@Component({
  selector: 'app-payement',
  templateUrl: './payement.component.html',
  styleUrls: ['./payement.component.css']
})
export class PayementComponent implements OnInit {
cartTotal!: any
  showSuccess!: any;

  public payPalConfig ? : IPayPalConfig;
  constructor(private router: Router, private cartService: CartService) { }

  ngOnInit(): void {
    this.initConfig();
    this.cartTotal = JSON.parse(localStorage.getItem('cart_total') as any) || []
    console.log(this.cartTotal)
  }
  private initConfig(): void {
    this.payPalConfig = {
      currency: 'USD',
      clientId: `${environment.Client_ID}`,
      createOrderOnClient: (data) =>
        <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                value: `${this.cartTotal}`,
                breakdown: {
                  item_total: {
                    currency_code: 'USD',
                    value: `${this.cartTotal}`,
                  },
                },
              },
              items: [
                {
                  name: 'Enterprise Subscription',
                  quantity: '1',
                  category: 'DIGITAL_GOODS',
                  unit_amount: {
                    currency_code: 'USD',
                    value: `${this.cartTotal}`,
                  },
                },
              ],
            },
          ],
        },
      advanced: {
        commit: 'true',
      },
      style: {
        label: 'paypal',
        layout: 'vertical',
      },
      onApprove: (data, actions) => {
        console.log(
          'onApprove - transaction was approved, but not authorized',
          data,
          actions
        );
        actions.order.get().then((details: any) => {
          console.log(
            'onApprove - you can get full order details inside onApprove: ',
            details
          );
        });
      },
      onClientAuthorization: (data) => {
        console.log(
          'onClientAuthorization - you should probably inform your server about completed transaction at this point',
          data
        );
        if (data.status === 'COMPLETED') {
          this.router.navigate(['/marketplace/success']);
          this.cartService.clearCart()
        }
        this.showSuccess = true;
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: (err) => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }
}
