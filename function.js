// https://www.chartjs.org/


window.function = function (coordinates,center,zoom) {

  // data
 coordinates = coordinates.value ?? "";
 center = center.value ?? "";
 zoom = zoom.value ?? "5";
 

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
#menu {
position: absolute;
background: #efefef;
padding: 10px;
font-family: 'Open Sans', sans-serif;
}
</head>
<body>
<div id="map"></div>
<div id="menu">
<input id="satellite-v9" type="radio" name="rtoggle" value="satellite" checked="checked">
<!-- See a list of Mapbox-hosted public styles at -->
<!-- https://docs.mapbox.com/api/maps/styles/#mapbox-styles -->
<label for="satellite-v9">satellite</label>
<input id="light-v10" type="radio" name="rtoggle" value="light">
<label for="light-v10">light</label>
<input id="dark-v10" type="radio" name="rtoggle" value="dark">
<label for="dark-v10">dark</label>
<input id="streets-v11" type="radio" name="rtoggle" value="streets">
<label for="streets-v11">streets</label>
<input id="outdoors-v11" type="radio" name="rtoggle" value="outdoors">
<label for="outdoors-v11">outdoors</label>
</div>
<script>
	mapboxgl.accessToken = 'pk.eyJ1IjoiZHlsYW5kaWNrbWFuIiwiYSI6ImNrdWlqcHdzazBzbXYyd29mM2hmaTVvdHEifQ.HlV_ER1WGiQiDwItCNMisg';
const map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v11',
center: [${center}],
zoom: ${zoom}
});

const layerList = document.getElementById('menu');
const inputs = layerList.getElementsByTagName('input');
 
for (const input of inputs) {
input.onclick = (layer) => {
const layerId = layer.target.id;
map.setStyle('mapbox://styles/mapbox/' + layerId);
};
}

const nav = new mapboxgl.NavigationControl({
visualizePitch: true
});
map.addControl(nav, 'bottom-right');
 
map.on('load', () => {
map.addSource('route', {
'type': 'geojson',
'data': {
'type': 'Feature',
'properties': {},
'geometry': {
'type': 'LineString',
'coordinates': [${coordinates}]
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
