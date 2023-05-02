import { AgentService } from './../../../../core/services/agent.service';
import { Component, OnInit } from '@angular/core';
import {DatePipe} from "@angular/common";
import {Order} from "../../../../core/models/order";
import {Apollo} from "apollo-angular";
import {OrderService} from "../../../../core/services/order.service";
import {orders, ordersByUser} from "../../../../core/graphql/queries/graphql.queries.order";
import Swal from "sweetalert2";
import {DecodedToken} from "../../../../core/graphql/graphqlResponse/decodedToken";
import {Subscription} from "rxjs";
import jwt_decode from "jwt-decode";
import {AuthService} from "../../../../core/services/auth.service";
import { Agent } from 'src/app/core/models/deliveryAgent';


@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css'],
  providers: [DatePipe]
})
export class OrdersListComponent implements OnInit {
  orderList: Order[];
  pagedItems: Order[];
  filteredItems: Order[] = [];
  pageSize = 5;
  currentPage = 1;
  totalPages: number;
  pages: number[];
  visibleOrderList: Order[];
  myOrder: Order;
  token: string;
  decodedToken: DecodedToken;
  userId: string;
  AvailableAgent : Agent;
  private tokenSubs: Subscription;
  searchText = '';
  constructor(private apollo: Apollo, public datePipe: DatePipe,
     private orderService: OrderService, private auth: AuthService,
     private AgentService: AgentService) { }

  ngOnInit(): void {
    this.tokenSubs = this.auth.getToken().subscribe((token) => {
      this.token = token
      this.decodedToken = jwt_decode(this.token) as DecodedToken;
      this.userId = this.decodedToken.id;
    });
    this.loadOrders();

  }

  setPage(page: number): void {
    this.currentPage = page;
    const startIndex = (page - 1) * this.pageSize;
    let endIndex = startIndex + this.pageSize;

    this.visibleOrderList = this.orderList

    // Update total pages based on filtered order list
    this.totalPages = Math.ceil(this.visibleOrderList.length / this.pageSize);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);

    // Adjust end index if last page contains only admin orders
    if (this.currentPage === this.totalPages && endIndex > this.visibleOrderList.length) {
      endIndex = this.visibleOrderList.length;
    }

    this.pagedItems = this.visibleOrderList.slice(startIndex, endIndex);
    this.filteredItems = this.pagedItems;
  }

  loadOrders() {
    this.orderService.getOrderByFarmer(this.userId).subscribe((orders) => {
      this.orderList = orders;
      this.totalPages = Math.ceil(this.orderList.length / this.pageSize);
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
      this.setPage(1);
    });
  }


  updateOrderConfirmationStatus(id: string) {
    Swal.fire({
      title: 'Are you sure you want to confirm this order ?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.orderService.updateOrderConfirmationStatus(id, true, this.userId);
        
          this.AgentService.getAvailableAgent().subscribe((agent =>{
            console.log("available agent id", agent.id)
            console.log("order id id", id)
            this.AgentService.addOrdertoagent(id,agent.id)
      
          }))
          

        }
      }
    )
  }


  
  


  deleteOrder(id: string) {
    Swal.fire({
      title: 'Are you sure you want to delete this order?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete',
    }).then((result) => {
      if (result.isConfirmed) {
        this.orderService.deleteOrder(id);


        // Update total pages based on new visibleOrderList length
        this.totalPages = Math.ceil(this.visibleOrderList.length / this.pageSize);
        this.pages = Array.from({length: this.totalPages}, (_, i) => i + 1);

        // Adjust current page if necessary
        if (this.currentPage > this.totalPages) {
          this.currentPage = this.totalPages;
        }

        // Update filteredItems to display new visibleOrderList
        const startIndex = (this.currentPage - 1) * this.pageSize;
        let endIndex = startIndex + this.pageSize;

        // Adjust end index if last page contains only admin orders
        if (this.currentPage === this.totalPages && endIndex > this.visibleOrderList.length) {
          endIndex = this.visibleOrderList.length;
        }

        this.filteredItems = this.visibleOrderList.slice(startIndex, endIndex);

        Swal.fire('Deleted', 'Order has been deleted successfully.', 'success');


        // Remove deleted order from filteredItems array
        // this.filteredItems = this.filteredItems.filter((order) => order.id !== deletedOrder.id);
      }

    });
  }
}
