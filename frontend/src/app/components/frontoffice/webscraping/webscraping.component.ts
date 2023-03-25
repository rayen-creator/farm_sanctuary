import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/core/models/product';
import { ProductService } from 'src/app/core/services/recProduct.service';

@Component({
  selector: 'app-webscraping',
  templateUrl: './webscraping.component.html',
  styleUrls: ['./webscraping.component.css']
})
export class WebscrapingComponent implements OnInit {
  product : Product
  constructor(private ProductService : ProductService) { }

  ngOnInit(): void {
    const asin = 'B01DFK2S0';
    this.ProductService.getProduct(asin).subscribe(product =>{
      this.product = product;
    })
  }

}
