import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-markers',
  templateUrl: './markers.component.html',
  styles: [
    `
    .map-container{
      width: 100%;
      height: 100%
    }

    #zoom-level {
      background-color: white;
      position: fixed;
      bottom: 50px;
      left: 50px;
      padding: 10px;
      border-radius: 5px;
      z-index: 999;
      width: 400px;
    }

    #add-marker{
      position: fixed; 
      bottom: 50px;
      left: 40px;
      width: 400px;
      height: 200px;
    }
  `
  ]
})
export class MarkersComponent implements AfterViewInit{

  @ViewChild('map') divMap!: ElementRef; 
  map!:mapboxgl.Map; 
  zoomLevel: number = 15; 
  mapCenter: [number, number] = [13.378491055638413, 52.51636916493755]

  constructor() { }

  ngOnDestroy(): void {
    this.map.off('zoom', ()=>{})
    this.map.off('zoomend', ()=>{})
    this.map.off('move', ()=>{})
  }

  ngAfterViewInit(): void {
    this.map = new mapboxgl.Map({
    container: this.divMap.nativeElement,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: this.mapCenter,
    zoom: this.zoomLevel
  });

  this.map.on('zoom', ()=> {
    this.zoomLevel=this.map.getZoom(); 
  });

  this.map.on('zoomend', ()=> {
    if (this.map.getZoom()>18){
      this.map.zoomTo(18);
    }
  })

  this.map.on('move', (event)=> {
    const target = event.target;
    const {lng, lat}=target.getCenter(); 
    this.mapCenter=[lng, lat];
  });

  const marker=new mapboxgl.Marker()
    .setLngLat(this.mapCenter)
    .addTo(this.map);

 }

 zoomIn(){
  this.map.zoomIn();
 }

 zoomOut(){
  this.map.zoomOut();
}

  zoomChanges(value:string){
    this.map.zoomTo(Number(value));
  }
}
