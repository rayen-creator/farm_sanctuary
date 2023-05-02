

import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as L from 'leaflet';
import { Browser, Map, map, tileLayer } from 'leaflet';

import 'leaflet-routing-machine';
import { Order } from 'src/app/core/models/order';
import { OrderService } from 'src/app/core/services/order.service';
import { MapService } from 'src/app/core/services/map.service';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {

  private map: L.Map;
  idoforder: any;
  theorder: Order;
  address: string;
  lat: any;
  att: any;

  constructor(private route: ActivatedRoute, private orderService: OrderService,
    private mapService: MapService) {}
  ngOnInit() {}
  private initMap(): void {
    var baseLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    });
    this.map = L.map('map', {
      center: [26.0198, 32.2778],
      zoom: 3,
      layers: [baseLayer]
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.idoforder = this.route.snapshot.paramMap.get('id');

    this.orderService.getOrder(this.idoforder).subscribe({
      next: (order) => {
        this.theorder = order;
        this.address = this.theorder.location.city + ' ,'+this.theorder.location.houseStreetnumber + ' ,'
          + this.theorder.location.state + ' ,' + this.theorder.location.country + ' ,' + this.theorder.location.codePostal;

        this.mapService.getcord(this.address).subscribe({
          next: (cord) => {
            console.log('cord:', cord)
            this.att = cord.latitude;
            this.lat = cord.longitude;
            console.log("att", this.att);
            console.log("lat", this.lat);
            // const startIcon = L.icon({
            //   iconUrl: '/frontend/src/assets/map-marker-green.png',
            //   iconSize: [25, 41],
            //   iconAnchor: [12, 41],
            //   popupAnchor: [1, -34],

            // });

            // const destIcon = L.icon({
            //   iconUrl: '/frontend/src/assets/map-marker-2-xxl.png',
            //   iconSize: [25, 41],
            //   iconAnchor: [12, 41],
            //   popupAnchor: [1, -34],

            // });
            const source = L.marker([36.8065, 10.1815]).addTo(this.map);
            L.Routing.control({
              waypoints: [
                L.latLng(36.8065, 10.1815),
                L.latLng(this.att,this.lat)
                
              ],
              addWaypoints: false, // disable adding waypoints and displaying the route line
              routeWhileDragging: false, // Show route line but hide direction window
              show: false // Hide direction window when map is first loaded
            })
              .on("routesfound", function (e) {
                e.routes[0].coordinates.forEach((c: any, i: any) => {
                  setTimeout(() => {
                    const latLng = L.latLng(c.lat, c.lng);
                    source.setLatLng(latLng);
                     console.log("cord:", c.lat, c.lng)
                  }, 1000 * i);
                });

              })
              .addTo(this.map);

          }, error: (err) => {
            console.log('err0', err);
            throw err;
          }
        })




      }, error: (err) => {
        console.log('err0', err);
        throw err;
      }
    })


  }
}
