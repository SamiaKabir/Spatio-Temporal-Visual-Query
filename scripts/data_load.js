
function load_data(){

var fileID = 'demo0-2.csv'
var d = {}
var info = {}
var dataTable = []
console.log("aaaa")


d3.text(fileID, function(filename) {
    d = d3.csvParse('startTime,endTime,pickup_long,pickup_lat,dropoff_long,dropoff_lat\n' + filename)
    for (var j = 0; j < d.length; j++) {
      d[j].pickup = [+d[j].pickup_long , +d[j].pickup_lat]
      d[j].dropoff = [+d[j].dropoff_long , +d[j].dropoff_lat]
    }

})

}
