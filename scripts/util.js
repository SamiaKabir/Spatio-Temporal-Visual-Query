

var svg1;
var svg2;
var svg3;





function fareChart(data){
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

console.log(chart_data1);
   svg1= d3.select('#fare')
      .append('svg');
      // .attr('width', width)
      // .attr('height', height)
      // .append('g')
      // .attr('transform', 'translate(' + margin.left + ',' + margin.right + ')');


   var boxes1= svg1.selectAll(".rect")
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
    .attr("width",function(d){ return d.width});


    //Create the Scale we will use for the Axis
var axisScale = d3.scalePoint()
                        .domain([0,4,8,12,16,20,"max"])
                        .rangeRound([0,width]);

//Create the Axis
var xAxis = d3.axisBottom(axisScale);
                  


//Create an SVG group Element for the Axis elements and call the xAxis function
var xAxisGroup = svg1.append("g")
                 .attr("transform","translate(0,"+height+")")
                 .call(xAxis);

    //Create the Scale we will use for the Axis
var axisScale_y = d3.scaleBand()
                        .domain([3*max/4,max/2,max/4])
                        .rangeRound([0,height]);

//Create the Axis
var yAxis = d3.axisRight(axisScale_y);
                  


//Create an SVG group Element for the Axis elements and call the xAxis function
var yAxisGroup = svg1.append("g")
                 .attr("transform","translate("+width+",0)")
                 .call(yAxis);


}

function distanceChart(data){
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

console.log(chart_data2);
   svg2= d3.select('#distance')
      .append('svg');
      // .attr('width', width)
      // .attr('height', height)
      // .append('g')
      // .attr('transform', 'translate(' + margin.left + ',' + margin.right + ')');


   var boxes2= svg2.selectAll(".rect")
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
    .attr("width",function(d){ return d.width});



    //Create the Scale we will use for the Axis
var axisScale2 = d3.scalePoint()
                        .domain([0,2,4,6,8,10,"max"])
                        .rangeRound([0,width]);

//Create the Axis
var xAxis2 = d3.axisBottom(axisScale2);
                  


//Create an SVG group Element for the Axis elements and call the xAxis function
var xAxisGroup2 = svg2.append("g")
                 .attr("transform","translate(0,"+height+")")
                 .call(xAxis2);


    //Create the Scale we will use for the Axis
var axisScale_y2 = d3.scaleBand()
                        .domain([3*max/4,max/2,max/4])
                        .rangeRound([0,height]);

//Create the Axis
var yAxis2 = d3.axisRight(axisScale_y2);
                  


//Create an SVG group Element for the Axis elements and call the xAxis function
var yAxisGroup2 = svg2.append("g")
                 .attr("transform","translate("+width+",0)")
                 .call(yAxis2);



}

function passengerChart(data){
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

console.log(chart_data3);
   svg3= d3.select('#passenger')
      .append('svg');
      // .attr('width', width)
      // .attr('height', height)
      // .append('g')
      // .attr('transform', 'translate(' + margin.left + ',' + margin.right + ')');




   var boxes3= svg3.selectAll(".rect")
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
    .attr("width",function(d){ return d.width});

        //Create the Scale we will use for the Axis
var axisScale3 = d3.scalePoint()
                        .domain([0,1,2,3,4,5,6])
                        .rangeRound([0,width]);

//Create the Axis
var xAxis3 = d3.axisBottom(axisScale3);
                  


//Create an SVG group Element for the Axis elements and call the xAxis function
var xAxisGroup3 = svg3.append("g")
                 .attr("transform","translate(0,"+height+")")
                 .call(xAxis3);



    //Create the Scale we will use for the Axis
var axisScale_y3 = d3.scaleBand()
                        .domain([3*max/4,max/2,max/4])
                        .rangeRound([0,height]);

//Create the Axis
var yAxis3 = d3.axisRight(axisScale_y3);
                  


//Create an SVG group Element for the Axis elements and call the xAxis function
var yAxisGroup3 = svg3.append("g")
                 .attr("transform","translate("+width+",0)")
                 .call(yAxis3);




}


function reset_chart()
{

	svg1.remove();
	svg2.remove();
	svg3.remove();

}