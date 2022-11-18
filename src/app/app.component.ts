import { Component } from '@angular/core';
import { latLng, tileLayer } from 'leaflet';
import "@geoman-io/leaflet-geoman-free";
import * as L from 'leaflet';
// Leaflet.KoreanTmsProviders.js
// import './proj4';
// import './proj4leaflet';
// import './Leaflet.KoreanTmsProviders';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  map: any;
  vworldApiKey = "86128BEF-240C-353F-8263-51F44030A03A"
  /* 
                          var map = L.map('map', {
                              crs: L.CRS.EPSG4326
                          });
                          
                          var wmsLayer = L.tileLayer.wms('http://ows.mundialis.de/services/service?', {
                              layers: 'TOPO-OSM-WMS'
                          }).addTo(map);
  
  
  
  
                          */

  /*
  http://api.vworld.kr/req/wms?key=인증키&domain=인증받은도메인&[WMS Param]
http://api.vworld.kr/req/wms?SERVICE=WMS&REQUEST=GetMap&VERSION=1.3.0&LAYERS=lp_pa_cbnd_bonbun,lp_pa_cbnd_bubun&STYLES=lp_pa_cbnd_bonbun_line,lp_pa_cbnd_bubun_line&CRS=EPSG:900913&BBOX=14133818.022824,4520485.8511757,14134123.770937,4520791.5992888&WIDTH=256&HEIGHT=256&FORMAT=image/png&TRANSPARENT=false&BGCOLOR=0xFFFFFF&EXCEPTIONS=text/xml&KEY=86128BEF-240C-353F-8263-51F44030A03A


&
DOMAIN=[DOMAIN]
  
  */



  imageBounds = L.bounds(
    [145323.20011251318, 475418.56045463786],
    [175428.80013969325, 499072.9604685671]
  );
  isEPSG3857 = true; 
  options = {
    crs: this.isEPSG3857 ? L.CRS.EPSG3857 : L.CRS.EPSG4326, //
    // crs: L.CRS.EPSG4326, //
    layers: [
      // tileLayer("http://api.vworld.kr/req/wmts/1.0.0/" + this.vworldApiKey + "/Base/{z}/{y}/{x}.png")
      // tileLayer("http://api.vworld.kr/req/wmts/1.0.0/" + this.vworldApiKey + "/Satellite/{z}/{y}/{x}.png")
      // tileLayer('http://xdworld.vworld.kr:8080/2d/Base/service/{z}/{x}/{y}.png'), //.addTo(mymap); //브이월드 지도
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
      // tileLayer('http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}', { maxZoom: 18, attribution: '...' }),
      // tileLayer.wms('http://ows.mundialis.de/services/service?', { layers: 'TOPO-WMS,OSM-Overlay-WMS'/* 'SRTM30-Colored-Hillshade' */ /* 'TOPO-OSM-WMS' */ }),
      // tileLayer.wms('https://api.vworld.kr/req/wms?SERVICE=WMS&REQUEST=GetMap&VERSION=1.3.0&LAYERS=lp_pa_cbnd_bonbun,lp_pa_cbnd_bubun&STYLES=lp_pa_cbnd_bonbun_line,lp_pa_cbnd_bubun_line&CRS=EPSG:900913&BBOX=14133818.022824,4520485.8511757,14134123.770937,4520791.5992888&WIDTH=256&HEIGHT=256&FORMAT=image/png&TRANSPARENT=false&BGCOLOR=0xFFFFFF&EXCEPTIONS=text/xml&KEY=86128BEF-240C-353F-8263-51F44030A03A&DOMAIN=http://localhost:4200', { layers: 'lp_pa_cbnd_bonbun,lp_pa_cbnd_bubun'/* 'SRTM30-Colored-Hillshade' */ /* 'TOPO-OSM-WMS' */ }),
      // tileLayer.wms("https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi", {
      //   layers: 'nexrad-n0r-900913',
      //   format: 'image/png',
      //   transparent: true,
      //   attribution: "Weather data © 2012 IEM Nexrad"
      // }),
      // tileLayer.wms('http://ows.mundialis.de/services/service?', {
      //   layers: 'TOPO-OSM-WMS'
      // }),
      // 'TMap Street Map': L.tileLayer.koreaProvider('TMap.Street'),
      // 'TMap Satellite Map': L.tileLayer.koreaProvider('TMap.Satellite'),

      // tileLayer('https://map.ngii.go.kr/openapi/Gettile.do?service=WMTS&request=GetTile&version=1.0.0&layer=korean_map&style=korean&format=image/png&tilematrixset=korean&tilematrix=L{z}&tilerow={y}&tilecol={x}&apikey=04trYP9_xwLAfALjwZ-B8g'), //.addTo(mymap); //브이월드 지도
    ],
    zoom: 12,
    center: latLng(37, 127.726909),
    // center: latLng(40.721567, -73.996868),
    continuousWorld: false,
    worldCopyJump: false,
  };

  baseLayers = {
    // 'Offline Map': L.tileLayer('http://127.0.0.1:8080/L{z}/{x}/{y}.png', {  // 타일맵 서버에서 폴더명이 L05, L06 과 같이 L 다음에 0 이 있는 경우 0을 빼서 L5, L6 으로 변경해줘야 지도 옵션에서 minZoom 값을 10보다 작은 값으로 설정해도 에러가 발생하지 않음
    //   minzoom: 10,
    //   zoom: 13,
    //   maxZoom: 23,
    //   maxNativeZoom: 13,
    //   tileSize: 256,
    //   tms: false,
    //   center: latLng(37.5642135, 127.0016985),
    //   crs: L.Proj.CRS.UTMKCRS  // offline 바로e맵 L.Proj.CRS.UTMKCRS,
    // }),
    // 'TMap Street Map': L.tileLayer.koreaProvider('TMap.Street'),
    // 'TMap Satellite Map': L.tileLayer.koreaProvider('TMap.Satellite'),
    // 'TMap Gray Map': L.tileLayer.koreaProvider('TMap.Gray'),
    // 'TMap Midnight Map': L.tileLayer.koreaProvider('TMap.Midnight'),
    'google satellite': tileLayer('http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}', { maxZoom: 18, attribution: '...' }),
    'vworld hybrid': tileLayer('https://xdworld.vworld.kr/2d/Hybrid/service/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
    'vworld satellite': tileLayer('https://xdworld.vworld.kr/2d/Satellite/service/{z}/{x}/{y}.jpeg', { maxZoom: 18, attribution: '...' }),
    'Open Street Map': tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'Open Street Map' }),

    // baroEmap: tileLayer('https://map.ngii.go.kr/openapi/Gettile.do?service=WMTS&request=GetTile&version=1.0.0&layer=korean_map&style=korean&format=image/png&tilematrixset=korean&tilematrix=L{z}&tilerow={y}&tilecol={x}&apikey=04trYP9_xwLAfALjwZ-B8g')
  };


  public async onMapReady(map: L.Map): Promise<void> {


    // fetch("https://api.vworld.kr/req/wms?SERVICE=WMS&REQUEST=GetMap&VERSION=1.3.0&LAYERS=lp_pa_cbnd_bonbun,lp_pa_cbnd_bubun&STYLES=lp_pa_cbnd_bonbun_line,lp_pa_cbnd_bubun_line&CRS=EPSG:900913&BBOX=14133818.022824,4520485.8511757,14134123.770937,4520791.5992888&WIDTH=256&HEIGHT=256&FORMAT=image/png&TRANSPARENT=false&BGCOLOR=0xFFFFFF&EXCEPTIONS=text/xml&KEY=86128BEF-240C-353F-8263-51F44030A03A&DOMAIN=http://localhost:4200").then((response) =>
    //   console.log('response', response)
    // );

    this.map = map;
    const _this = this;

    // var wmsLayer = L.tileLayer.wms('http://ows.mundialis.de/services/service?', {
    //   layers: 'TOPO-OSM-WMS'
    // }).addTo(map);

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
      rotateMode: false,
    };

    // add leaflet.pm controls to the map
    map.pm.addControls(options);

    const radarFilterAreas = localStorage['radarFilterAreas'] ? JSON.parse(localStorage['radarFilterAreas']) : {
      "type": "FeatureCollection",
      "features": []
    }
    L.geoJSON(radarFilterAreas, {
      onEachFeature(feature, layer) {
        layer.on('pm:edit', (e) => _this.generateGeoJson());
        layer.on('pm:remove', (e) => _this.generateGeoJson());
      }
    }).addTo(map);

    map.on('pm:create', (e) => {
      this.generateGeoJson()
      var layer = e.layer;
      layer.on('pm:edit', (e) => _this.generateGeoJson());
      layer.on('pm:remove', (e) => _this.generateGeoJson());
    });
    map.on('pm:edit', e => this.generateGeoJson())
    map.on('pm:delete', e => this.generateGeoJson())
  }

  generateGeoJson() {
    var fg = L.featureGroup();
    var layers = this.findLayers(this.map);
    layers.forEach(function (layer: any) {
      fg.addLayer(layer);
    });
    const radarFilterAreas = fg.toGeoJSON()
    console.log(radarFilterAreas);
    localStorage.setItem('radarFilterAreas', JSON.stringify(radarFilterAreas))
  }

  findLayers(map: any) {
    var layers: any = [];
    map.eachLayer((layer: any) => {
      // if (
      //   layer instanceof L.Polyline || //Don't worry about Polygon and Rectangle they are included in Polyline
      //   layer instanceof L.Marker ||
      //   layer instanceof L.Circle ||
      //   layer instanceof L.CircleMarker
      // ) {
      // }
      layers.push(layer);
    });

    // filter out layers that don't have the leaflet-geoman instance
    layers = layers.filter((layer: any) => !!layer.pm);

    // filter out everything that's leaflet-geoman specific temporary stuff
    layers = layers.filter((layer: any) => !layer._pmTempLayer);

    return layers;
  }

}
