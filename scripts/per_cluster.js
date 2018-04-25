


var chart1;
var chart2;
var chart3;
var chart4;


function pick_drop(pick,drop)
{

   var data=[];


   data.push(Math.floor(((pick)/(pick+drop))*100));
   data.push(Math.ceil(((drop)/(pick+drop))*100));

    var width = 270,
    height = 230,
    radius = Math.min(width, height) / 2;

    var color = d3.scaleOrdinal()
    .range(["#1a66ff","#10AB79"]);

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
      .attr("transform", function(d) { return "translate(" + labelArc.centroid(d)+ ")"; })
      .attr("dy", ".35em")
      .text(function(d,i) { var str; if(i==0) {str="PickUp("+d.data+"%)";} else {str="DropOff("+d.data+"%)";}  return str; });

}


function fare(data){
  console.log(data)


  var chart_data1=[];
  var temp={};


  var w= data.length;

  var width=300-40;

  var height= 250-18;

  var box_width= (width/w);

  var max= Math.max.apply(null, data)

 console.log(max)


  for(var i=0;i<data.length;i++)
  {
        var temp={};

       temp.width= box_width;
       temp.height=(data[i]/max)*(250-18);
       temp.x=(box_width*i);
       temp.y=(250-18 -temp.height);
       temp.value=data[i];
       chart_data1.push(temp);

  }

    // Define the div for the tooltip
var div = d3.select("body").append("div") 
    .attr("class", "tooltip")       
    .style("opacity", 0);

console.log(chart_data1);
   chart2= d3.select('#modal_fare')
      .append('svg');
      // .attr('width', width)
      // .attr('height', height)
      // .append('g')
      // .attr('transform', 'translate(' + margin.left + ',' + margin.right + ')');


   var boxes1= chart2.selectAll(".rect")
    .data(chart_data1)
    .enter()
    .append("rect")
    .attr("class","rect")
    .style("fill","#C56262")
    .attr("stroke", "black")
    .attr("stroke-width", 1)
    .attr("x",function(d){ return d.x})
    .attr("y",function(d){ return d.y})
    .attr("height",function(d){ return d.height})
    .attr("width",function(d){ return d.width})
     .on("mouseover",function(d,i){
      
     d3.select(this).style("fill","orange");

     var x=d.x;
     var y=d.y;
     var value=d.value;


      div.transition()   
      .duration(200)    
      .style("opacity", .9);    
      div .html(value + "<br/>")  
                .style("left", (d3.event.pageX) + "px")   
                .style("top", (d3.event.pageY - 28) + "px");  


    })
    .on("mouseout",function(d,i){

        d3.select(this).style("fill","#C56262");

        div.transition()    
           .duration(500)    
            .style("opacity", 0); 

    });



    //Create the Scale we will use for the Axis
var axisScale = d3.scalePoint()
                        .domain([0,4,8,12,16,20,"max"])
                        .rangeRound([0,width]);

//Create the Axis
var xAxis = d3.axisBottom(axisScale);
                  


//Create an SVG group Element for the Axis elements and call the xAxis function
var xAxisGroup = chart2.append("g")
                 .attr("transform","translate(0,"+height+")")
                 .call(xAxis);

    //Create the Scale we will use for the Axis
var axisScale_y = d3.scaleBand()
                        .domain([3*max/4,max/2,max/4])
                        .rangeRound([0,height]);

//Create the Axis
var yAxis = d3.axisRight(axisScale_y);
                  


//Create an SVG group Element for the Axis elements and call the xAxis function
var yAxisGroup = chart2.append("g")
                 .attr("transform","translate("+width+",0)")
                 .call(yAxis);


}

function distance(data){
console.log(data)

 var chart_data2=[];
  var temp={};


  var w= data.length;

  var width=300-40;
  var height= 250-18;

  var box_width= (width/w);



   var max= Math.max.apply(null, data)

  for(var i=0;i<data.length;i++)
  {
        var temp={};

       temp.width= box_width;
       temp.height=(data[i]/max)*(height);
       temp.x=(box_width*i)+1;
       temp.y=(height-temp.height);
       temp.value=data[i];
       chart_data2.push(temp);

  }

    // Define the div for the tooltip
var div = d3.select("body").append("div") 
    .attr("class", "tooltip")       
    .style("opacity", 0);

console.log(chart_data2);
   chart3= d3.select('#modal_distance')
      .append('svg');
      // .attr('width', width)
      // .attr('height', height)
      // .append('g')
      // .attr('transform', 'translate(' + margin.left + ',' + margin.right + ')');


   var boxes2= chart3.selectAll(".rect")
    .data(chart_data2)
    .enter()
    .append("rect")
    .attr("class","rect")
    .style("fill","#93C562")
    .attr("stroke", "black")
    .attr("stroke-width", 1)
    .attr("x",function(d){ return d.x})
    .attr("y",function(d){ return d.y})
    .attr("height",function(d){ return d.height})
    .attr("width",function(d){ return d.width})
     .on("mouseover",function(d,i){
      
     d3.select(this).style("fill","orange");

     var x=d.x;
     var y=d.y;
     var value=d.value;


      div.transition()   
      .duration(200)    
      .style("opacity", .9);    
      div .html(value + "<br/>")  
                .style("left", (d3.event.pageX) + "px")   
                .style("top", (d3.event.pageY - 28) + "px");  


    })
    .on("mouseout",function(d,i){

        d3.select(this).style("fill","#93C562");

        div.transition()    
           .duration(500)    
            .style("opacity", 0); 

    });




    //Create the Scale we will use for the Axis
var axisScale2 = d3.scalePoint()
                        .domain([0,2,4,6,8,10,"max"])
                        .rangeRound([0,width]);

//Create the Axis
var xAxis2 = d3.axisBottom(axisScale2);
                  


//Create an SVG group Element for the Axis elements and call the xAxis function
var xAxisGroup2 = chart3.append("g")
                 .attr("transform","translate(0,"+height+")")
                 .call(xAxis2);


    //Create the Scale we will use for the Axis
var axisScale_y2 = d3.scaleBand()
                        .domain([3*max/4,max/2,max/4])
                        .rangeRound([0,height]);

//Create the Axis
var yAxis2 = d3.axisRight(axisScale_y2);
                  


//Create an SVG group Element for the Axis elements and call the xAxis function
var yAxisGroup2 = chart3.append("g")
                 .attr("transform","translate("+width+",0)")
                 .call(yAxis2);



}

function passenger(data){
	console.log(data)
	var chart_data3=[];
    var temp={};


  var w= data.length;

  var width=300-40;
  var height= 250-18;

  var box_width= (width/w);

  var max= Math.max.apply(null, data)

  console.log(max)


  for(var i=0;i<data.length;i++)
  {
        var temp={};

       temp.width= box_width;
       temp.height=(data[i]/max)*(height);
       temp.x=(box_width*i);
       temp.y=(height -temp.height);
       temp.value=data[i];
       chart_data3.push(temp);

  }

    // Define the div for the tooltip
var div = d3.select("body").append("div") 
    .attr("class", "tooltip")       
    .style("opacity", 0);

console.log(chart_data3);
   chart4= d3.select('#modal_passenger')
      .append('svg');
      // .attr('width', width)
      // .attr('height', height)
      // .append('g')
      // .attr('transform', 'translate(' + margin.left + ',' + margin.right + ')');




   var boxes3= chart4.selectAll(".rect")
    .data(chart_data3)
    .enter()
    .append("rect")
    .attr("class","rect")
    .style("fill","#cc6699")
    .attr("stroke", "black")
    .attr("stroke-width", 1)
    .attr("x",function(d){ return d.x})
    .attr("y",function(d){ return d.y})
    .attr("height",function(d){ return d.height})
    .attr("width",function(d){ return d.width})
     .on("mouseover",function(d,i){
      
     d3.select(this).style("fill","orange");

     var x=d.x;
     var y=d.y;
     var value=d.value;


      div.transition()   
      .duration(200)    
      .style("opacity", .9);    
      div .html(value + "<br/>")  
                .style("left", (d3.event.pageX) + "px")   
                .style("top", (d3.event.pageY - 28) + "px");  


    })
    .on("mouseout",function(d,i){

        d3.select(this).style("fill","#cc6699");

        div.transition()    
           .duration(500)    
            .style("opacity", 0); 

    });


        //Create the Scale we will use for the Axis
var axisScale3 = d3.scalePoint()
                        .domain([0,1,2,3,4,5,6])
                        .rangeRound([0,width]);

//Create the Axis
var xAxis3 = d3.axisBottom(axisScale3);
                  


//Create an SVG group Element for the Axis elements and call the xAxis function
var xAxisGroup3 = chart4.append("g")
                 .attr("transform","translate(0,"+height+")")
                 .call(xAxis3);



    //Create the Scale we will use for the Axis
var axisScale_y3 = d3.scaleBand()
                        .domain([3*max/4,max/2,max/4])
                        .rangeRound([0,height]);

//Create the Axis
var yAxis3 = d3.axisRight(axisScale_y3);
                  


//Create an SVG group Element for the Axis elements and call the xAxis function
var yAxisGroup3 = chart4.append("g")
                 .attr("transform","translate("+width+",0)")
                 .call(yAxis3);




}


function reset_allchart()
{

	chart1.remove();
	chart2.remove();
	chart3.remove();
  chart4.remove();

}