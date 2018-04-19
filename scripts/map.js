
mapDraw()


function mapDraw(){

mapboxgl.accessToken = 'pk.eyJ1Ijoic2FtaWFrYWJpciIsImEiOiJjamZraHZ3bTgwMGJzMzNvZGVjbjdqMGZzIn0.omykYYmBQbk67ijS0UXXhw';

    // var x=40.730610;
    // var y= -73.935242;
    // var z= 11;
  
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/outdoors-v9',
    zoom: 10.5,
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


var query2= d3.select("#submit2");

query2.on("click",function(){
//map.on('load', load_data);
//draw_lines();
zoomIn();

});


var query3= d3.select("#submit3");

query3.on("click",function(){
//map.on('load', load_data);
//draw_lines();
//location.href="./index.html";
console.log("abar")
svg.remove();
load_data();

});


        // Load map and dataset


        // Project GeoJSON coordinate to the map's current state

function project(d) {

          //  console.log(d);
            //console.log(map.project(new mapboxgl.LngLat(d[0], d[1])))
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
var interpolate=[];
var start=[];
var end=[];
var Zoom=12;
var count=0;



function drawData(data) {
console.log("draw data");
//data=project_point(data);
            // Add circles
//pick up points
console.log(data)

// console.log(data2)

layout = svg.selectAll(".circle")
        .data(data);

circles= layout .enter()
        .append("circle")
        .attr("class", "circle")
        .attr("r", function(d){
        //  console.log(d.size)
          return d.size
        })
        .attr("fill", "#ff3333");
       // .on("click",function(d){start.x=d.x ; start.y=d.y; var temp= [project(d).x,project(d).y]; interpolate.push(temp); });

// var ff= d3.selectAll("circle")

// ff.data(sizeinfo)

// ff.attr("r", function(d){
//     console.log(d)
//     return d
//   })

//dropoff points

// layout2 = svg.selectAll(".point")
//         .data(data2);

// circles2= layout2 .enter()
//         .append("circle")
//         .attr("class", "point")
//         .attr("r", 4.5)
//         .attr("fill", " #ff3333");
//         //.on("click",function(d){end.x=d.x ; end.y=d.y;var temp= [project(d).x,project(d).y]; interpolate.push(temp);});
//             // Call the update function
        update();
        map.on("viewreset", update);
        map.on("move",      update);
        map.on("moveend",   update);

// var paths;


// for(var i=0; i<data1.length; i++)
// {

//           svg.append("line")
//          .attr("x1", project(data1[i]).x)
//          .attr("y1", project(data1[i]).y)
//          .attr("x2", project(data2[i]).x)
//          .attr("y2", project(data2[i]).y)
//          .attr("stroke-width", 2)
//          .attr("stroke", "black");
// }



}



//zoomIn(start,end);   // to Zoom in to that point


function zoomIn(){

var temp=[];

temp[0]= (start[0]+end[0])/2;
temp[1]= (start[1]+end[1])/2;



var dist= ((start[0]-end[0])*(start[0]-end[0]))+((start[1]-end[1])*(start[1]-end[1]));
dist= Math.sqrt(dist);

if((dist*1000)<1)
    Zoom=15;
else if((dist*100)<1)
    Zoom=14;
else if((dist*10)<1)
    Zoom=13; 
else if(dist>1 && dist <10)
    Zoom=12;

else 
    Zoom=11;


var newCenter=[temp[0],temp[1]];
//console.log(dist);
map.setZoom(Zoom);

map.setCenter(newCenter);

if(count==0)
   count++;

//map.flyto({center: newCenter});
}


 
        // Update d3 shapes' positions to the map's current state
        function update() {
            console.log("update");
        
       // console.log(project(d).x);
        
        circles.attr("cx", function(d,i) { return project(d.center).x;})
                  .attr("cy", function(d,i) { return project(d.center).y;})
             //     .on("click",function(d){start[0]= d[0] ; start[1]=d[1]; var temp= [project(d).x,project(d).y]; interpolate.push(temp); });


        // circles2.attr("cx", function(d,i) { return project(d).x;})
        //           .attr("cy", function(d,i) { return project(d).y;})
        //           .on("click",function(d){end[0]=d[0] ; end[1]=d[1];var temp= [project(d).x,project(d).y]; interpolate.push(temp);});
        }

    function draw_lines(){
     var lineGenerator = d3.line()
    .curve(d3.curveCardinal);

// for(var i=0; i<99; i++)
// {
  
//     var points=[];

//     var value1=[project(data1[i]).x,project(data1[i]).y];
//     var value2=[project(data2[i]).x,project(data2[i]).y];

//     points=[value1,value2];

//     console.log(points);
//     // points.push(data1[i]);
//     // points.push(data2[i]);

   var pathData = lineGenerator(interpolate);

  var path=  d3.select('path')
    .attr('d', pathData);

    svg.append("path")
  .attr("stroke", "firebrick")
  .attr("stroke-width", 2)
  .attr("fill", "none");
 }

        


function load_data(){

var date_sel = (+document.getElementById('dropdown').value)
var startTime = (+document.getElementById("dropdown1").value)
var endTime = (+document.getElementById("dropdown2").value)
    console.log(date_sel,startTime,endTime)

var temporalID = './data/t'
var fdpID = './data/FDP'

var tFile = temporalID.concat(date_sel.toString().concat(".json"))
var fdpFile = fdpID.concat(date_sel.toString().concat(".json"))


d3.json(tFile, function(d1){
  d3.json(fdpFile, function(d2){
    temporalFilter(d1,d2,startTime,endTime)
    
  })

})
// var mainID = 'yellow_tripdata_2016-01-'
// var fileID = mainID.concat(date_sel.toString().concat(".json")) // Converts dropdown selection to corresponding filename
// var taxiData = {}
// console.log(fileID)


// d3.json(fileID, function(d){
  
//   console.log(d.length)
//       var pick= [];
//       var drop= [];
//     for (var j = 1; j <1000; j++) {
//           if(d[j].pickupHr>=startTime && d[j].pickupHr<=endTime){
//           pick.push(d[j].pickupLoc)
//           drop.push(d[j].dropoffLoc)
//         }
//     }
//     console.log(pick)
//    drawData(pick,drop);})
}

function temporalFilter(d1,d2,t_start,t_end){
  var cluster_center = []
  var cluster_info = []
 var cluster_size = []
 var fdp_info = []
  // var cluster_data.dropoff = []
//   console.log(d1)
// console.log(d2)
  for (var i=0; i<d1.length;i++){
    
    var pickup=0
    var dropoff=0
    var dest_num=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    
    for (var j=t_start; j<t_end;j++){
      pickup += d1[i].pickup_point[j]
      dropoff += d1[i].dropoff_point[j]
      for (var k=0; k<30;k++){
        dest_num[k] += d1[i].destination[j][k]
       
        
      }

    }
    cluster_info.push({"center":d1[i].center, "size": (pickup+dropoff), "pickup":pickup, "dropoff":dropoff, "destination":dest_num})
    cluster_size.push(pickup+dropoff)
    
  }

  var rmax=d3.max(cluster_size)
 // console.log(rmax)
  for (var i=0;i<cluster_info.length;i++){
    cluster_info[i].size = (cluster_info[i].size*20)/rmax
  }


  var fare_num=[0,0,0,0,0,0]
  var distance_num=[0,0,0,0,0,0]
  var passenger_num=[0,0,0,0,0,0]
  for (var i=t_start; i<t_end;i++){
    for (var j=0; j<6;j++){
      fare_num[j] += d2[0].fare_hist[i][j]
      distance_num[j] += d2[0].distance_hist[i][j]
      passenger_num[j] += d2[0].passenger_hist[i][j]
    }

  }
  fdp_info.push({"fare_hist":fare_num, "distance_hist":distance_num, "passenger_hist":passenger_num})

  console.log(cluster_info)
  console.log(fdp_info)
  

  drawData(cluster_info)
  fareChart(fdp_info[0].fare_hist)
  distanceChart(fdp_info[0].distance_hist)
  passengerChart(fdp_info[0].passenger_hist)
  
}

}



