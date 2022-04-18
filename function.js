// https://www.chartjs.org/


window.function = function (data, width, height, max) {

  // data
  data = data.value ?? "";
  max = max.value ?? "";
  width = width.value ?? "100";
  height = height.value ?? "80";
 

  let ht = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Glide Yes-Code</title>

<script src="https://cdn.amcharts.com/lib/4/core.js"></script>
<script src="https://cdn.amcharts.com/lib/4/charts.js"></script>
<script src="https://cdn.amcharts.com/lib/4/themes/animated.js"></script>
  </head>
  <body>
<div id="chartdiv"></div>
<style>
#chartdiv {
  width: ${width}vw;
  height: ${height}vh;
}

</style>
    <script>
am4core.ready(function() {

// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

var chart = am4core.create("chartdiv", am4charts.XYChart);
chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
chart.paddingRight = 20;
chart.paddingLeft = 0;
chart.dateFormatter.inputDateFormat = "yyyy-MM-dd HH:mm:ss";

chart.data = [
  ${data}
];

var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "name";
categoryAxis.renderer.grid.template.location = 0;
categoryAxis.renderer.inversed = true;
categoryAxis.renderer.labels.template.fontSize = 12;

var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
dateAxis.dateFormatter.dateFormat = "yyyy-MM-dd HH:mm:ss";
dateAxis.renderer.minGridDistance = 50;
dateAxis.baseInterval = { count: 6, timeUnit: "seconds" };
dateAxis.max = "${max}";
dateAxis.strictMinMax = true;
dateAxis.renderer.tooltipLocation = 0;
dateAxis.renderer.labels.template.fontSize = 12;

var series1 = chart.series.push(new am4charts.ColumnSeries());
series1.columns.template.width = am4core.percent(40);
series1.columns.template.tooltipText = "{tag}: {fromX} - {toX}";

series1.dataFields.openDateX = "fromDate";
series1.dataFields.dateX = "toDate";
series1.dataFields.tagX = "tag";
series1.dataFields.categoryY = "name";
series1.dataFields.fromX = "fromTime";
series1.dataFields.toX = "toTime";
series1.columns.template.propertyFields.fill = "color"; // get color from data
series1.columns.template.propertyFields.stroke = "color";
series1.columns.template.strokeOpacity = 1;


chart.scrollbarX = new am4core.Scrollbar();
chart.scrollbarX.startGrip.background.fill = am4core.color("black");
chart.scrollbarX.endGrip.background.fill = am4core.color("black");
chart.scrollbarX.thumb.background.fill = am4core.color("black");

var buttonContainer = chart.plotContainer.createChild(am4core.Container);
buttonContainer.shouldClone = false;
buttonContainer.align = "right";
buttonContainer.valign = "top";
buttonContainer.zIndex = Number.MAX_SAFE_INTEGER;
buttonContainer.marginTop = 5;
buttonContainer.marginRight = 5;
buttonContainer.layout = "horizontal";

var zoomInButton = buttonContainer.createChild(am4core.Button);
zoomInButton.label.text = "+";
zoomInButton.events.on("hit", function(ev) {
  var diff = dateAxis.maxZoomed - dateAxis.minZoomed;
  var delta = diff * 0.1;
  dateAxis.zoomToDates(new Date(dateAxis.minZoomed + delta), new Date(dateAxis.maxZoomed - delta));
});

var zoomOutButton = buttonContainer.createChild(am4core.Button);
zoomOutButton.label.text = "-";
zoomOutButton.events.on("hit", function(ev) {
  var diff = dateAxis.maxZoomed - dateAxis.minZoomed;
  var delta = diff * 0.1;
  dateAxis.zoomToDates(new Date(dateAxis.minZoomed - delta), new Date(dateAxis.maxZoomed + delta));
  });
}); // end am4core.ready()
</script>


  </body>
</html>`

  let enc = encodeURIComponent(ht);
  let uri = `data:text/html;charset=utf-8,${enc}`
  return uri; 
}