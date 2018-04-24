


var chart1;
var chart2;
var chart3;
var chart4;


function pick_drop(pick,drop)
{

   var data=[];

   data.push(((pick)/(pick+drop))*100);
   data.push(((drop)/(pick+drop))*100);

    var width = 270,
    height = 220,
    radius = Math.min(width, height) / 2;

    var color = d3.scaleOrdinal()
    .range(["#98abc5", "#8a89a6", "#7b6888"]);

    var arc = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

    var labelArc = d3.arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40);

    var pie = d3.pie()
    .sort(null)
    .value(function(d) { return d; });

    chart1 = d3.select("#modal_pick").append('svg')
       .attr("width", width)
       .attr("height", height)
       .append("g")
       .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var g = chart1.selectAll(".arc")
      .data(pie(data))
      .enter().append("g")
      .attr("class", "arc");

    g.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.data); });

    g.append("text")
      .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .text(function(d) { return d.data; });
     

    // chart1= d3.select('#modal_pick')
    //   .append('svg');

    // var boxes1= chart1.selectAll(".rect")
    // .data(data)
    // .enter()
    // .append("rect")
    // .attr("class","rect")
    // .style("fill","#C56262")
    // .attr("stroke", "black")
    // .attr("stroke-width", 1)
    // .attr("x",function(d){ return 0;})
    // .attr("y",function(d){ return 0;})
    // .attr("height",function(d){ return d;})
    // .attr("width",function(d){ return 10;});

}


function fare(data){
  console.log(data)
  // var bb=["0-4","4-8","8-12","12-16","16-20",">20"]
  // var fd=[]
  // for (i=0;i<6;i++){
  // 	fd.push({"bin": bb[i], "fare": data[i]})
  // }
  // console.log(fd)

  var chart_data1=[];
  var temp={};


  var w= data.length;

  var width=document.getElementById("fare").offsetWidth-44;

  var height= document.getElementById("fare").clientHeight-18;

  var box_width= (width/w);

   var max= Math.max.apply(null, data)

 console.log(max)


  for(var i=0;i<data.length;i++)
  {
        var temp={};

       temp.width= box_width;
       temp.height=(data[i]/max)*(document.getElementById("fare").clientHeight-18);
       temp.x=(box_width*i);
       temp.y=(document.getElementById("fare").clientHeight-18 -temp.height);
       chart_data1.push(temp);

  }

// console.log(chart_data1);
//    svg1= d3.select('#fare')
//       .append('svg');
//       // .attr('width', width)
//       // .attr('height', height)
//       // .append('g')
//       // .attr('transform', 'translate(' + margin.left + ',' + margin.right + ')');


//    var boxes1= svg1.selectAll(".rect")
//     .data(chart_data1)
//     .enter()
//     .append("rect")
//     .attr("class","rect")
//     .style("fill","#C56262")
//     .attr("stroke", "black")
//     .attr("stroke-width", 1)
//     .attr("x",function(d){ return d.x})
//     .attr("y",function(d){ return d.y})
//     .attr("height",function(d){ return d.height})
//     .attr("width",function(d){ return d.width});


//     //Create the Scale we will use for the Axis
// var axisScale = d3.scalePoint()
//                         .domain([0,4,8,12,16,20,"max"])
//                         .rangeRound([0,width]);

// //Create the Axis
// var xAxis = d3.axisBottom(axisScale);
                  


// //Create an SVG group Element for the Axis elements and call the xAxis function
// var xAxisGroup = svg1.append("g")
//                  .attr("transform","translate(0,"+height+")")
//                  .call(xAxis);

//     //Create the Scale we will use for the Axis
// var axisScale_y = d3.scaleBand()
//                         .domain([max/2,max/4,max/8])
//                         .rangeRound([0,height]);

// //Create the Axis
// var yAxis = d3.axisRight(axisScale_y);
                  


// //Create an SVG group Element for the Axis elements and call the xAxis function
// var yAxisGroup = svg1.append("g")
//                  .attr("transform","translate("+width+",0)")
//                  .call(yAxis);


}

function distance(data){
console.log(data)

 var chart_data2=[];
  var temp={};


  var w= data.length;

  var width=document.getElementById("distance").clientWidth-44;
  var height= document.getElementById("fare").clientHeight-18;

  var box_width= (width/w);



   var max= Math.max.apply(null, data)

  for(var i=0;i<data.length;i++)
  {
        var temp={};

       temp.width= box_width;
       temp.height=(data[i]/max)*(document.getElementById("fare").clientHeight-18);
       temp.x=(box_width*i)+1;
       temp.y=(document.getElementById("distance").clientHeight-18 -temp.height);
       chart_data2.push(temp);

  }

// console.log(chart_data2);
//    svg2= d3.select('#distance')
//       .append('svg');
//       // .attr('width', width)
//       // .attr('height', height)
//       // .append('g')
//       // .attr('transform', 'translate(' + margin.left + ',' + margin.right + ')');


//    var boxes2= svg2.selectAll(".rect")
//     .data(chart_data2)
//     .enter()
//     .append("rect")
//     .attr("class","rect")
//     .style("fill","#93C562")
//     .attr("stroke", "black")
//     .attr("stroke-width", 1)
//     .attr("x",function(d){ return d.x})
//     .attr("y",function(d){ return d.y})
//     .attr("height",function(d){ return d.height})
//     .attr("width",function(d){ return d.width});



//     //Create the Scale we will use for the Axis
// var axisScale2 = d3.scalePoint()
//                         .domain([0,2,4,6,8,10,"max"])
//                         .rangeRound([0,width]);

// //Create the Axis
// var xAxis2 = d3.axisBottom(axisScale2);
                  


// //Create an SVG group Element for the Axis elements and call the xAxis function
// var xAxisGroup2 = svg2.append("g")
//                  .attr("transform","translate(0,"+height+")")
//                  .call(xAxis2);


//     //Create the Scale we will use for the Axis
// var axisScale_y2 = d3.scaleBand()
//                         .domain([max/2,max/4,max/8])
//                         .rangeRound([0,height]);

// //Create the Axis
// var yAxis2 = d3.axisRight(axisScale_y2);
                  


// //Create an SVG group Element for the Axis elements and call the xAxis function
// var yAxisGroup2 = svg2.append("g")
//                  .attr("transform","translate("+width+",0)")
//                  .call(yAxis2);



}

function passenger(data){
	console.log(data)
	var chart_data3=[];
    var temp={};


  var w= data.length;

  var width=document.getElementById("passenger").clientWidth-44;
  var height= document.getElementById("fare").clientHeight-18;

  var box_width= (width/w);

  var max= Math.max.apply(null, data)

  console.log(max)


  for(var i=0;i<data.length;i++)
  {
        var temp={};

       temp.width= box_width;
       temp.height=(data[i]/max)*(document.getElementById("passenger").clientHeight-18);
       temp.x=(box_width*i);
       temp.y=(document.getElementById("fare").clientHeight-18 -temp.height);
       chart_data3.push(temp);

  }

// console.log(chart_data3);
//    svg3= d3.select('#passenger')
//       .append('svg');
//       // .attr('width', width)
//       // .attr('height', height)
//       // .append('g')
//       // .attr('transform', 'translate(' + margin.left + ',' + margin.right + ')');




//    var boxes3= svg3.selectAll(".rect")
//     .data(chart_data3)
//     .enter()
//     .append("rect")
//     .attr("class","rect")
//     .style("fill","#871CF1")
//     .attr("stroke", "black")
//     .attr("stroke-width", 1)
//     .attr("x",function(d){ return d.x})
//     .attr("y",function(d){ return d.y})
//     .attr("height",function(d){ return d.height})
//     .attr("width",function(d){ return d.width});

//         //Create the Scale we will use for the Axis
// var axisScale3 = d3.scalePoint()
//                         .domain([0,1,2,3,4,5,6])
//                         .rangeRound([0,width]);

// //Create the Axis
// var xAxis3 = d3.axisBottom(axisScale3);
                  


// //Create an SVG group Element for the Axis elements and call the xAxis function
// var xAxisGroup3 = svg3.append("g")
//                  .attr("transform","translate(0,"+height+")")
//                  .call(xAxis3);



//     //Create the Scale we will use for the Axis
// var axisScale_y3 = d3.scaleBand()
//                         .domain([max/2,max/4,max/8])
//                         .rangeRound([0,height]);

// //Create the Axis
// var yAxis3 = d3.axisRight(axisScale_y3);
                  


// //Create an SVG group Element for the Axis elements and call the xAxis function
// var yAxisGroup3 = svg3.append("g")
//                  .attr("transform","translate("+width+",0)")
//                  .call(yAxis3);




}


// function reset_chart()
// {

// 	svg1.remove();
// 	svg2.remove();
// 	svg3.remove();

// }