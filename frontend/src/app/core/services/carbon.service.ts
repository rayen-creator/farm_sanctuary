import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { createCarbon } from '../graphql/queries/carbon.queries';
import { Carbon } from '../models/carbon';

@Injectable({
  providedIn: 'root'
})
export class CarbonService {

  constructor(private appolo: Apollo) { }
  
  createCarbonfootprint(dieselFuelConsumption: any,gasolineFuelConsumption: any,
    usageInKwh: any, typeofcarbon: any,
    fertilizerConsumption: any,fertilizerType: any,
    numBeefCattle: any,numDairyCattle: any, numPigs: any, numPoultry: any, numSheep: any, numGoats: any,
    cropTransportDistance: any, cropProduction: any, typeofcrop: any, fuelused: any,typeoffuel: any, landsize: any){
      const input = {
        dieselFuelConsumption : dieselFuelConsumption,
        gasolineFuelConsumption : gasolineFuelConsumption,
        usageInKwh: usageInKwh,
        typeofcarbon: typeofcarbon,
        fertilizerConsumption:  fertilizerConsumption,
        fertilizerType: fertilizerType,
        numBeefCattle :numBeefCattle,
        numDairyCattle : numDairyCattle,
        numPigs: numPigs,
        numPoultry: numPoultry,
        numSheep: numSheep,
        numGoats: numGoats,
        cropTransportDistance :cropTransportDistance,
        cropProduction : cropProduction,
        typeofcrop : typeofcrop,
        fuelused: fuelused,
        typeoffuel : typeoffuel,
        landsize : landsize
      }
      
    return this.appolo
    .mutate({
      mutation: createCarbon,
      variables: {
        input: input,  
      }
    })
      

  }




}

  
  