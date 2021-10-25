import { Component } from '@angular/core';

interface realEstate {
  title: string;
  description: string;
  lngLat: [number, number];
}

@Component({
  selector: 'app-real-estate',
  templateUrl: './real-estate.component.html',
  styles: [
  ]
})
export class RealEstateComponent{

  realEstate: realEstate[] = [
    {
      title: 'Residential house, Canada',
      description: 'Beautiful house in Katana, Canadá',
      lngLat: [ -75.92722289474008, 45.280015511264466]
    },
    {
      title: 'Beach house, Mexico',
      description: 'Amazing beach house in Acapulco, Mexico',
      lngLat: [ -99.91287720907991, 16.828940930185748]
    },
    {
      title: 'Apartament, Argentina',
      description: 'Luxurious apartment in the heart of Buenos Aires, Argentina',
      lngLat: [ -58.430166677283445, -34.57150108832866 ]
    },
    {
      title: 'Commercial Premise, Spain',
      description: 'Available Commercial Premise in Madrid, Spain, close to El Jardín Secreto.',
      lngLat: [ -3.7112735618380177, 40.42567285425766 ]
    },
  ]

}
