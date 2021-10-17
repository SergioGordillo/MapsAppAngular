import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
    }
  `
  ]
})
export class ZoomRangeComponent implements AfterViewInit {

  @ViewChild('map') divMap!: ElementRef; 
  map!:mapboxgl.Map; 
  zoomLevel: number = 17; 

  constructor() { }

  ngAfterViewInit(): void {
    this.map = new mapboxgl.Map({
    container: this.divMap.nativeElement,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [13.378491055638413, 52.51636916493755],
    zoom: this.zoomLevel
  });
 }

 zoomIn(){
  this.map.zoomIn();
  this.zoomLevel=this.map.getZoom();
 }

 zoomOut(){
  this.map.zoomOut();
  this.zoomLevel=this.map.getZoom();
}
}
