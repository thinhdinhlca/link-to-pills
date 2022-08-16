// https://www.chartjs.org/


window.function = function (coordinates,center) {

  // data
 coordinates = coordinates.value ?? "";
 center = center.value ?? "";
 

  let ht = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Add a line to a map using a GeoJSON source</title>
<meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no">
<link href="https://api.mapbox.com/mapbox-gl-js/v2.9.2/mapbox-gl.css" rel="stylesheet">
<script src="https://api.mapbox.com/mapbox-gl-js/v2.9.2/mapbox-gl.js"></script>
<style>
body { margin: 0; padding: 0; }
#map { position: absolute; top: 0; bottom: 0; width: 100%; }
</style>
</head>
<body>
<div id="map"></div>
<script>
	mapboxgl.accessToken = 'pk.eyJ1IjoiZHlsYW5kaWNrbWFuIiwiYSI6ImNrdWlqcHdzazBzbXYyd29mM2hmaTVvdHEifQ.HlV_ER1WGiQiDwItCNMisg';
const map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v11',
center: [-122.486052, 37.830348],
zoom: 15
});
 
map.on('load', () => {
map.addSource('route', {
'type': 'geojson',
'data': {
'type': 'Feature',
'properties': {},
'geometry': {
'type': 'LineString',
'coordinates': [
[-122.483696, 37.833818],
[-122.483482, 37.833174],
[-122.483396, 37.8327],
[-122.483568, 37.832056],
[-122.48404, 37.831141],
[-122.48404, 37.830497],
[-122.483482, 37.82992],
[-122.483568, 37.829548],
[-122.48507, 37.829446],
[-122.4861, 37.828802],
[-122.486958, 37.82931],
[-122.487001, 37.830802],
[-122.487516, 37.831683],
[-122.488031, 37.832158],
[-122.488889, 37.832971],
[-122.489876, 37.832632],
[-122.490434, 37.832937],
[-122.49125, 37.832429],
[-122.491636, 37.832564],
[-122.492237, 37.833378],
[-122.493782, 37.833683]
]
}
}
});
map.addLayer({
'id': 'route',
'type': 'line',
'source': 'route',
'layout': {
'line-join': 'round',
'line-cap': 'round'
},
'paint': {
'line-color': '#888',
'line-width': 8
}
});
});
</script>
 
</body>
</html>`

  let enc = encodeURIComponent(ht);
  let uri = `data:text/html;charset=utf-8,${enc}`
  return uri; 
}
