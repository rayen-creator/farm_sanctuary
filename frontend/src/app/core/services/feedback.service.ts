import { Injectable } from '@angular/core';
import { Feedback } from '../models/feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  isDesc: boolean=false;
  data: any;

  constructor() { }



  sortString(list:Feedback[],property: any){ 
    this.data=list;
    this.isDesc=!this.isDesc; 
    let direction =this.isDesc?1: -1; 
    this.data.sort(function(a: { [x: string]: number; },b: { [x: string]: number; }){
      if(a[property]< b[property]){
        return -1 * direction ; 
      }
      else if (a[property]> b[property]){
        return 1 * direction ; 
      } 
      else { 
        return 0; 
  
      }
    });
    
   }
}
