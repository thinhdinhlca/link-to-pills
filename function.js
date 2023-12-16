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
<title>A simple map</title>
<meta name='viewport' content='initial-scale=1,maximum-scale=1,user-scalable=no' />
<script src='https://api.mapbox.com/mapbox.js/v3.3.1/mapbox.js'></script>
<link href='https://api.mapbox.com/mapbox.js/v3.3.1/mapbox.css' rel='stylesheet' />
<style>
  body { margin:0; padding:0; }
  #map { position:absolute; top:0; bottom:0; width:100%; }
</style>
</head>
<body>
<div id='map'></div>
<script>
L.mapbox.accessToken = '${accessToken}';
var map = L.mapbox.map('map')
    .setView([${centerString}], ${radius})
    .addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v11'));
</script>
</body>
</html>`;

  // Encode the HTML content to a data URI
  let encodedHtmlContent = encodeURIComponent(htmlContent);
  let dataUri = `data:text/html;charset=utf-8,${encodedHtmlContent}`;
  return dataUri;
}
