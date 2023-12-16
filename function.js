window.function = function (centerString, radius) {

  // data
 centerString = centerString.value ?? "";
 radius = radius.value ?? "5";

  // Define your Mapbox access token and the style URL here
  const accessToken = 'pk.eyJ1IjoiZHlsYW5kaWNrbWFuIiwiYSI6ImNrdWlqcHdzazBzbXYyd29mM2hmaTVvdHEifQ.HlV_ER1WGiQiDwItCNMisg';

  // Encode the HTML content for the map
  let htmlContent = `<!DOCTYPE html>
<html>
<head>
<meta charset=utf-8 />
<meta name='viewport' content='initial-scale=1,maximum-scale=1,user-scalable=no' />
<link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.40.1/mapbox-gl.css' rel='stylesheet' />
<link rel="stylesheet" href="style.css">
<script src='https://api.tiles.mapbox.com/mapbox-gl-js/v0.40.1/mapbox-gl.js'></script>
<style>
  body { margin:0; padding:0; }
  #map { position:absolute; top:0; bottom:0; width:100%; }
</style>
</head>
<body>
<div id='map'></div>
<script>
mapboxgl.accessToken = '${accessToken}';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v8',
    center: [${centerString}],
    zoom: 3,
    interactive: true
});

map.on('style.load', function (e) {
    map.addSource('markers', {
        "type": "geojson",
        "data": {
            "type": "FeatureCollection",
            "features": [{
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [${centerString}]
                },
                "properties": {
                    "modelId": 1,
                },
            }]
        }
    });
    map.addLayer({
        "id": "circles1",
        "source": "markers",
        "type": "circle",
        "paint": {
            "circle-radius": ${radius},
            "circle-color": "#007cbf",
            "circle-opacity": 0.5,
            "circle-stroke-width": 0,
        },
        "filter": ["==", "modelId", 1],
    });
});
</script>
</body>
</html>`;

  // Encode the HTML content to a data URI
  let encodedHtmlContent = encodeURIComponent(htmlContent);
  let dataUri = `data:text/html;charset=utf-8,${encodedHtmlContent}`;
  return dataUri;
}
