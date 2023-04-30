import { Component, OnInit,AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit,AfterViewInit {
 
  private map: L.Map;
  
  private initMap(): void {
    var baseLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  });
    this.map = L.map('map', {
      center: [ 26.0198, 32.2778 ],
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
  constructor() { }

  ngOnInit(): void {
  }

  
  ngAfterViewInit(): void {
    this.initMap();
    const startIcon = L.icon({
      iconUrl: '/frontend/src/assets/map-marker-green.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      shadowSize: [41, 41],
      shadowAnchor: [12, 41]
    });

    const destIcon = L.icon({
      iconUrl: '/frontend/src/assets/map-marker-2-xxl.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      shadowSize: [41, 41],
      shadowAnchor: [12, 41]
    });
    const source = L.marker([36.8065, 10.1815],{icon: startIcon});
    const distination = L.marker([34.4311,8.7757], {icon: destIcon}).addTo(this.map);;
    source.bindPopup('<b>Hi</b>').openPopup();

     
    // Update the position of the source marker dynamically
    navigator.geolocation.watchPosition((position) => {
      const latLng = L.latLng(position.coords.latitude, position.coords.longitude);
      source.setLatLng(latLng);
    });
   
    distination.addTo(this.map);

    //route
    L.Routing.control({
      waypoints: [
          L.latLng(36.8065, 10.1815),
          L.latLng(34.4311,8.7757)
      ],
      routeWhileDragging: true, // Show route line but hide direction window
      show: false // Hide direction window when map is first loaded
  }).addTo(this.map);
    
   }
}
