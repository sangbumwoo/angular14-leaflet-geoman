import { Component } from '@angular/core';
import { latLng, tileLayer } from 'leaflet';
import "@geoman-io/leaflet-geoman-free";
import * as L from 'leaflet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  map: any;
  title = 'angular14-leaflet-geoman';
  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 12,
    // center: latLng(37, 127.726909)
    center: latLng(40.721567, -73.996868)
  };

  public onMapReady(map: L.Map): void {

    this.map = map;
    const _this = this;

    var json: any =
    // {
    //   type: 'Feature',
    //   geometry: {
    //     type: 'Polygon',
    //     coordinates: [
    //       [
    //         [-81.909315, 30.333176],
    //         [-81.909315, 30.37643],
    //         [-81.84133, 30.37643],
    //         [-81.84133, 30.333176],
    //         [-81.909315, 30.333176],
    //       ],
    //     ],
    //   },
    // };
    {
      "type": "FeatureCollection",
      "features": [{
        "type": "Feature",
        "properties": {
          "shape": "Polygon",
          "name": "Unnamed Layer",
          "category": "default"
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [-73.996868, 40.721567],
              [-73.999186, 40.71929],
              [-73.991804, 40.717144],
              [-73.996868, 40.721567]
            ]
          ]
        },
        // "id": "1f1850c1-de51-4d56-b765-46762258e639"
      },
        // {
        // "type": "Feature",
        // "properties": {
        //   "shape": "Polygon",
        //   "name": "Unnamed Layer",
        //   "category": "default"
        // },
        // "geometry": {
        //   "type": "Polygon",
        //   "coordinates": [
        //     [
        //       [-73.98159, 40.721567],
        //       [-73.985109, 40.717339],
        //       [-73.978415, 40.716233],
        //       [-73.98159, 40.721567]
        //     ]
        //   ]
        // },
        // // "id": "22e8e6f4-bc14-4810-95d1-f5a9ce4eaa37"
        // }
      ]
    }
    //L.geoJSON(data, { style: polystyle, pmIgnore: true }).addTo(map)
    L.geoJSON(json, {
      onEachFeature(feature, layer) {
        layer.on('pm:edit', (e) => _this.generateGeoJson());
        layer.on('pm:remove', (e) => _this.generateGeoJson());
      }
    }).addTo(map);




    // @ts-ignore
    // map.pm.addControls({
    //   position: "topleft"
    // });


    // @ts-ignore
    var options: any = {
      // position: 'topleft', // toolbar position, options are 'topleft', 'topright', 'bottomleft', 'bottomright'
      // drawPolygon: true, // adds button to draw a polygon
      // deleteLayer: true, // adds a button to delete layers
      // dragMode: true, // adds button to toggle global move mode
      // editMode: true, // adds button to toggle global edit mode
      drawText: false,
      drawMarker: false, // adds button to draw markers
      drawPolyline: false, // adds button to draw a polyline
      drawCircle: false, // adds button to draw a cricle
      drawCircleMarker: false, // adds button to draw a cricleMarker
      drawRectangle: false, // adds button to draw a rectangle
      cutPolygon: false, // adds a button to cut layers
    };

    // add leaflet.pm controls to the map
    map.pm.addControls(options);
    // map.on('pm:create', function (e) {
    //   console.log(e);
    // });

    map.on('pm:create', (e) => {
      // You need to add the layers in the default leaflet way or over geojson.
      // When you listen on layer.on('pm:edit',(e)=>{console.log(e)}) you can get the new latlngs
      // When you listen on layer.on('pm:remove',(e)=>{console.log(e)}) you can catch the removed layer

      // const layer: any = e.layer;
      // console.log(layer.getLatLngs(), e);
      // var fg: any = map.pm.getGeomanDrawLayers(true); // or getGeomanLayers() <-- "true" make that it returns a FeatureGroup instead of an array
      // console.log(fg.toGeoJSON());
      this.generateGeoJson()

      // if (e.shape === 'Circle') {
      //   var layer = e.layer;
      //   // sendToYourPhpApi(layer.getLatLngs(), layer.getRadius());
      // }

      var layer = e.layer;
      layer.on('pm:edit', (e) => _this.generateGeoJson());
      layer.on('pm:remove', (e) => _this.generateGeoJson());

      // sendToYourPhpApi(layer.getLatLngs(), layer.getRadius());

      // onEachFeature(feature, layer) {
      //   layer.on('pm:edit', (e) => _this.generateGeoJson());
      //   layer.on('pm:remove', (e) => _this.generateGeoJson());
      // }
    });

    map.on('pm:edit', e => this.generateGeoJson())
    map.on('pm:delete', e => this.generateGeoJson())

    function generateGeoJson() {
      // var fg = L.featureGroup();
      // var layers = map.pm.getGeomanDrawLayers(); // or getGeomanLayers()
      // layers.forEach(function (layer) {
      //   fg.addLayer(layer);
      // });
      // console.log(fg.toGeoJSON());
    }

    function generateGeoJson2() {
      var fg: any = map.pm.getGeomanDrawLayers(true); // or getGeomanLayers() <-- "true" make that it returns a FeatureGroup instead of an array
      console.log(fg.toGeoJSON());
    }



  }


  generateGeoJson() {
    var fg = L.featureGroup();
    var layers = this.findLayers(this.map);
    layers.forEach(function (layer: any) {
      fg.addLayer(layer);
    });
    const drawFeatureGroup = fg.toGeoJSON()
    console.log(drawFeatureGroup);
    localStorage.setItem('drawFeatureGroup', JSON.stringify(drawFeatureGroup))
  }

  findLayers(map: any) {
    var layers: any = [];
    map.eachLayer((layer: any) => {
      if (
        layer instanceof L.Polyline || //Don't worry about Polygon and Rectangle they are included in Polyline
        layer instanceof L.Marker ||
        layer instanceof L.Circle ||
        layer instanceof L.CircleMarker
      ) {
        layers.push(layer);
      }
    });

    // filter out layers that don't have the leaflet-geoman instance
    layers = layers.filter((layer: any) => !!layer.pm);

    // filter out everything that's leaflet-geoman specific temporary stuff
    layers = layers.filter((layer: any) => !layer._pmTempLayer);

    return layers;
  }

}
