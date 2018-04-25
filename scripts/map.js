
mapDraw()


function mapDraw(){

var svg;

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
// var svg = d3.select(canvas).append("svg");

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
//zoomIn();

});


var query3= d3.select("#submit3");

query3.on("click",function(){
//map.on('load', load_data);
//draw_lines();
//location.href="./index.html";
svg.remove();
reset_chart();
//load_data();

});

// Get the modal
var modal = document.getElementById('myModal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
// function displaymodal(index) {
    
// }

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


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
var flag=0;
var flag2=0;



function drawData(data) {

svg = d3.select(canvas).append("svg");
console.log("draw data");
//data=project_point(data);
            // Add circles
//pick up points
// console.log(data)

// console.log(data2)

layout = svg.selectAll(".circle")
        .data(data);

circles= layout .enter()
        .append("circle")
        .attr("class", "circle")
        .attr("fill", "#3F3FBF");
//             // Call the update function
        update(data);
        map.on("viewreset", update);
        map.on("move",      update);
        map.on("moveend",   update);





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
        function update(data) {
            console.log("update");

            var paths;
            var paths_all;
            var path_data;
        
       // console.log(project(d).x);
        
        circles.attr("cx", function(d,i) { return project(d.center).x;})
               .attr("cy", function(d,i) { return project(d.center).y;})
               .attr("r", function(d){
          //console.log(map.getZoom())
          return d.size*25;
        })
        .on("click",function(d){

           

            if(flag>0)
            {
              
            reset_allchart();
            }


            pick_drop(d.pickup,d.dropoff);
            fare(d.fare);
            distance(d.distance);
            passenger(d.passenger);

            flag++;

            modal.style.display = "block"; 

            
          //  draw_paths(d.center,d.destination,flag2);

 

        //     if(flag2>0)
        //     {
        //     var s= d3.selectAll('line');
        //     s.remove();

        //     }


        //   flag2++;
          
        //   path_data=[];

        //    for(var i=0; i<data.length; i++)
        //    {

        //      var temp={};
        //      var color= d.destination[i]*2;

        //      temp.source=d.center;
        //      temp.destination=data[i].center;
        //      temp.color=d3.hsl(color,0,color);

        //      path_data.push(temp);

        //    }

        //   paths_all= svg.selectAll('.line').data(path_data);



        //   paths= paths_all.enter()
        //    .append("line")
        //    .attr("class","line");

        //    update2();

        // map.on("viewreset", update2);
        // map.on("move",update2);
        // map.on("moveend",   update2);




      });


      // function update2(){
    
      // paths.attr("x1", function(d){return project(d.source).x;})
      //      .attr("y1", function(d){return project(d.source).y;})
      //      .attr("x2", function(d){return project(d.destination).x;})
      //      .attr("y2", function(d){return project(d.destination).y;})
      //      .attr("stroke-width","1px")
      //      .style("stroke-dasharray", ("10,3"))
      //      .attr("stroke", function(d){return d.color});

      //      update(data);
      //  }
     }




    function draw_lines(){
     var lineGenerator = d3.line()
    .curve(d3.curveCardinal);


   var pathData = lineGenerator(interpolate);

  var path=  d3.select('path')
    .attr('d', pathData);

    svg.append("path")
  .attr("stroke", "firebrick")
  .attr("stroke-width", 2)
  .attr("fill", "none");
 }

        


function load_data(){
// var sss = (document.getElementById('bday').value)
var date_sel = (+(document.getElementById('dropdown').value.substring(8,10)))
var startTime = (+document.getElementById("dropdown1").value)
var endTime = (+document.getElementById("dropdown2").value)
console.log(date_sel,startTime,endTime)
// console.log(sss.substring(8,10))
var temporalID = './data/t'
var fdpID = './data/FDP'
var sptID = './data/spt_data'

// console.log("startTime"+startTime);

var tFile = temporalID.concat(date_sel.toString().concat(".json"))
var fdpFile = fdpID.concat(date_sel.toString().concat(".json"))
var sptFile = sptID.concat(date_sel.toString().concat(".json"))

d3.json(tFile, function(d1){
  d3.json(fdpFile, function(d2){
    d3.json(sptFile, function(dn){
      temporalFilter(d1,d2,dn,startTime,endTime)
    })
    
    
  });

});
}

function temporalFilter(d1,d2,dn,t_start,t_end){

  var cluster_center = []
  var cluster_info = []
  var cluster_size = []
  var fdp_info = []
  // var cluster_data.dropoff = []
//   console.log(d1)
// console.log(dn)
  for (var i=0; i<d1.length;i++){
    
    var pickup=0
    var dropoff=0
    var dest_num=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    var c_fare = [0,0,0,0,0,0]
    var c_distance = [0,0,0,0,0,0]
    var c_passenger = [0,0,0,0,0,0]

    
    for (var j=t_start; j<t_end;j++){
      pickup += d1[i].pickup_point[j]
      dropoff += d1[i].dropoff_point[j]
      for (var k=0; k<30;k++){
        dest_num[k] += d1[i].destination[j][k]
        if (k<6){
          c_fare[k] += dn[i].fare_cl[j][k] 
          c_distance[k] += dn[i].distance_cl[j][k] 
          c_passenger[k] += dn[i].passenger_cl[j][k] 
        }
       
        
      }

    }
    cluster_info.push({"center":d1[i].center, "size": (pickup+dropoff), "pickup":pickup, "dropoff":dropoff, "destination":dest_num, "fare":c_fare, "distance":c_distance, "passenger":c_passenger})
    cluster_size.push(pickup+dropoff)
    
  }

  var rmax=d3.max(cluster_size)
  // console.log("this")
  // console.log(rmax)
  for (var i=0;i<cluster_info.length;i++){
    cluster_info[i].size = (cluster_info[i].size)/rmax
  }

  drawData(cluster_info);

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
  

  
  fareChart(fdp_info[0].fare_hist)
  distanceChart(fdp_info[0].distance_hist)
  passengerChart(fdp_info[0].passenger_hist)
  
}

}



