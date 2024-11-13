import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  @Output() setId = new EventEmitter<number>();
  private geojsonFeature: iFeatureMaps[] = [];

  constructor(private _mapsService: MapsService) {}

  ngOnInit(): void {
    this._mapsService.getUbicationPlaces().subscribe({
      next: (features) => {
        this.geojsonFeature = features;
        this.mapConstructor();
      },
      error: (err) => {
        console.error('Error al cargar los datos:', err);
      },
    });
  }

  mapConstructor(): void {
    // Construcción del mapa
    const map = new Map('map').setView([16.510742971586264, -92.70662557658262], 7);
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    // Por cada punto se hará lo sigiente:
    this.geojsonFeature.forEach((feature: iFeatureMaps) => {
      const coordinates = feature.geometry.coordinates;
      const popupContent = feature.properties.popupContent;

      // Crear el ícono personalizado
      const customIcon = icon({
        iconUrl: 'ubi.png', // URL de un ícono personalizado (puedes poner una URL a una imagen)
        iconSize: [70, 70], // Tamaño del ícono
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
        this.setId.emit(feature.properties.name);
        map.setView([coordinates[1], coordinates[0]], 17);
      });
    });

    map.invalidateSize();
  }
}
