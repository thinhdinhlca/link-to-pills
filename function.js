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
<meta charset="utf-8">
<title>Map with Circle</title>
<meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no">
<link href="https://api.mapbox.com/mapbox-gl-js/v2.9.2/mapbox-gl.css" rel="stylesheet">
<script src="https://api.mapbox.com/mapbox-gl-js/v2.9.2/mapbox-gl.js"></script>
<script src='https://api.mapbox.com/mapbox.js/plugins/turf/v2.0.2/turf.min.js'></script>
<style>
body {
margin: 0;
padding: 0;
}

#map {
position: absolute;
top: 0;
bottom: 0;
width: 100%;
}
</style>
</head>
<body>
<div id="map"></div>
<script>
mapboxgl.accessToken = '${accessToken}';
const center = [${centerString}];
const radius = ${radius};
const options = {steps: 50, units: 'kilometers'};
const map = new mapboxgl.Map({
    container: 'map',
    center: [${centerString}],
    zoom: 2
});

map.on('load', function () {
    // Use Turf to create a circle feature
    var circle = turf.circle(center, radius, options);

    // Add the circle to the map
    map.addSource('circle', {
        type: 'geojson',
        data: circle
    });

    map.addLayer({
        id: 'circle',
        type: 'fill',
        source: 'circle',
        paint: {
            'fill-color': '#ADD8E6',
            'fill-opacity': 0.5
        }
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
