import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [`
    .map-container{
      width: 100%;
      height: 100%
    }

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
  `
  ]
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {

  @ViewChild('map') divMap!: ElementRef; 
  map!:mapboxgl.Map; 
  zoomLevel: number = 17; 
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
