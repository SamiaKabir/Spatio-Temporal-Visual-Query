
mapDraw()


function mapDraw(){

mapboxgl.accessToken = 'pk.eyJ1Ijoic2FtaWFrYWJpciIsImEiOiJjamZraHZ3bTgwMGJzMzNvZGVjbjdqMGZzIn0.omykYYmBQbk67ijS0UXXhw';

    // var x=40.730610;
    // var y= -73.935242;
    // var z= 11;
  
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/outdoors-v9',
    zoom: 11,
    center: [-74.0060, 40.7128],
  
});

var canvas = map.getCanvasContainer();
        // Overlay d3 on the map
var svg = d3.select(canvas).append("svg");

 //   map.scrollZoom.disable();
    // map.addControl(new mapboxgl.Navigation())

var query= d3.select("#submit");

query.on("click",function(){
//map.on('load', load_data);
load_data();

});
        // Load map and dataset


        // Project GeoJSON coordinate to the map's current state

function project(d) {

            console.log("in");
            return map.project(new mapboxgl.LngLat(d[0], d[1]));
}




        //////////////
        // D3 stuff
        //////////////
        // Draw GeoJSON data with d3
var circles;
var layout;
var circles2;
var layout2;



function drawData(data1,data2) {
console.log("draw data");
//data=project_point(data);
            // Add circles
//pick up points
layout = svg.selectAll(".circle")
        .data(data1);

circles= layout .enter()
        .append("circle")
        .attr("class", "circle")
        .attr("r", 4.5)
        .attr("fill", "#2d2d86");

//dropoff points

layout2 = svg.selectAll(".point")
        .data(data2);

circles2= layout2 .enter()
        .append("circle")
        .attr("class", "point")
        .attr("r", 4.5)
        .attr("fill", "red");
            // Call the update function
        update();
        map.on("viewreset", update);
        map.on("move",      update);
        map.on("moveend",   update);


 }
        // Update d3 shapes' positions to the map's current state
        function update() {
            console.log("update");
        
       // console.log(project(d).x);

        circles.attr("cx", function(d,i) { return project(d).x;})
                  .attr("cy", function(d,i) { return project(d).y;});


        circles2.attr("cx", function(d,i) { return project(d).x;})
                  .attr("cy", function(d,i) { return project(d).y;});
        }

        


function load_data(){

var fileID = 'demo0-2.csv'
var d = {}
var info = {}
var dataTable = []
console.log("aaaa")


d3.text(fileID, function(filename) {
    d = d3.csvParse('startTime,endTime,pickup_long,pickup_lat,dropoff_long,dropoff_lat\n' + filename)
    for (var j = 1; j < 100; j++) {
      d[j].pickup = [+d[j].pickup_long , +d[j].pickup_lat]
      d[j].dropoff = [+d[j].dropoff_long , +d[j].dropoff_lat]
    }
   console.log(d);
    
    var pick= [];
    for (var j = 1; j < 100; j++) {
          pick.push(d[j].pickup);
    }

    var drop= [];
    for (var j = 1; j < 100; j++) {
          drop.push(d[j].dropoff);
    }
   drawData(pick,drop);


});


}

}