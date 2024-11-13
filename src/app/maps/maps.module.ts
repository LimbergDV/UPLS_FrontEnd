import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { ViewMapComponent } from './view-map/view-map.component';
import { PointInfoComponent } from './point-info/point-info.component';



@NgModule({
  declarations: [
    MapComponent,
    ViewMapComponent,
    PointInfoComponent
  ],
  imports: [
    CommonModule
  ]
})
export class MapsModule { }
