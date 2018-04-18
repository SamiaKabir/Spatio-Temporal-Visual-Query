


function mapPlot(num){
       

    var x=40.730610;
    var y= -73.935242;
    var z= 11;
   	//Google Map 初期化
	const map = new google.maps.Map(document.getElementById('map'), {
		zoom: z,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		center: new google.maps.LatLng(x, y),       
	});
		
	const overlay = new google.maps.OverlayView(); 

	overlay.onAdd = function () {
		const layer = d3.select(this.getPanes().overlayLayer).append("div").attr("class", "SvgOverlay");
		const svg = layer.append("svg");
		const svgOverlay = svg.append("g").attr("class", "AdminDivisions");
		const pointLayer = svgOverlay.append("g");
		const voronoiLayer = svgOverlay.append("g");
		const markerOverlay = this;
		const overlayProjection = markerOverlay.getProjection();
		//Google Mapの投影法設定
		const googleMapProjection =  coordinates =>  {
			const googleCoordinates = new google.maps.LatLng(coordinates[1], coordinates[0]);
			const pixelCoordinates = overlayProjection.fromLatLngToDivPixel(googleCoordinates);
			return [pixelCoordinates.x + 4000, pixelCoordinates.y + 4000];
		}
		
			
			
   
		overlay.draw = function () {
			const width = svg.node().clientWidth;
			const height = svg.node().clientHeight;
			//母点位置情報
			const pointdata = num;	
			// console.log(pointdata)		
			//ピクセルポジション情報
			const positions = [];

			pointdata.forEach(d => {
					
				positions.push(googleMapProjection(d.pickup)); //位置情報→ピクセル
			});
			console.log(positions)
			
	
		
			const updatePoint = pointLayer.selectAll(".point").data(positions)				
			const enterPoint = updatePoint.enter()
				.append("circle")
				.attr("class", "point")
				.attr("r", 2);
				
			const point = updatePoint.merge(enterPoint)
				.attr("transform", d =>  `translate(${d[0]}, ${d[1]})` )
}
}
	overlay.setMap(map);



}