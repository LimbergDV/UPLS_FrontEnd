import { Component, OnInit } from '@angular/core';
import {
  geoJSON,
  icon,
  ImageOverlay,
  imageOverlay,
  Map,
  Marker,
  tileLayer,
} from 'leaflet';
import { iFeatureMaps } from '../../models/iFeatureMap';
import { MapsService } from '../../service/maps.service';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  private geojsonFeature: iFeatureMaps[] = [];

  constructor(private _mapsService: MapsService) {}

  ngOnInit(): void {
    this.getPlaces();

    setTimeout(() => {
      this.mapConstructor();
    }, 0);
  }

  getPlaces(): void {
    this.geojsonFeature = this._mapsService.getUbicationPlaces();
    console.log(this.geojsonFeature);
  }

  mapConstructor(): void {
    // Construcción del mapa
    const map = new Map('map').setView([16.7569, -93.1292], 8);
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    // Por cada punto se hará lo sigiente:
    this.geojsonFeature.forEach((feature: iFeatureMaps) => {
      const coordinates = feature.geometry.coordinates;
      const popupContent = feature.properties.popupContent;

      // Crear el ícono personalizado
      const customIcon = icon({
        iconUrl: 'logo.png', // URL de un ícono personalizado (puedes poner una URL a una imagen)
        iconSize: [25, 41], // Tamaño del ícono
        iconAnchor: [12, 41], // Punto de anclaje del ícono (en el fondo)
        popupAnchor: [1, -34], // Donde aparece el popup
      });

      // Crear marcador
      const marker = new Marker([coordinates[1], coordinates[0]], {
        icon: customIcon,
      })
        .bindPopup(popupContent) // Asignar el contenido del popup
        .addTo(map);

      // Callbacks
      marker.on('click', () => {
        alert('Hola Mundo');
      });
    });

    map.invalidateSize();
  }
}
