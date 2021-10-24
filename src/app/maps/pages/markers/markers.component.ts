import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface markerColor{
  color: string;
  marker: mapboxgl.Marker;
}

@Component({
  selector: 'app-markers',
  templateUrl: './markers.component.html',
  styles: [
    `
    .map-container{
      width: 100%;
      height: 100%
    }

    /* No puedo manejar el zoom-level así, así que a ver cómo puedo hacerlo */
    .row {
      background-color: white;
      position: fixed;
      bottom: 50px;
      left: 50px;
      padding: 10px;
      border-radius: 5px;
      z-index: 999;
      width: 400px;
    }

    button{
      cursor: pointer;
    }

    #add-marker{
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 99;
      width: 420px;
      height: 200px;
      z-index: 999;
    }

    #add-marker .list-group{
      cursor: pointer;
    }

  `
  ]
})
export class MarkersComponent implements AfterViewInit{

  @ViewChild('map') divMap!: ElementRef; 
  map!:mapboxgl.Map; 
  zoomLevel: number = 15; 
  mapCenter: [number, number] = [13.378491055638413, 52.51636916493755]

  markers:markerColor[]=[];

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

addMarker(){

  //It generates a random color
  const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));

  const newMarker= new mapboxgl.Marker({
    draggable: true,
    color: color
  })
    .setLngLat(this.mapCenter)
    .addTo(this.map);

    this.markers.push({
      color: color,
      marker: newMarker
    });
  }

  goMarker(marker:mapboxgl.Marker){
    this.map.flyTo({
      center: marker.getLngLat()
    })
  }

  saveMarkersLocalStorage(){
    this.markers.forEach(m=>{
      const color=m.color;
      const lngLat=m.marker.getLngLat();
    })
  }

  readlocalStorage(){

  }
}
