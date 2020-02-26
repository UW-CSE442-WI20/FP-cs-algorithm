
// You can require libraries
const d3 = require('d3')

// set the dimensions of the visualization
var width = 800;
var height = 500;

var personRadius = 40;
var femColor = "#ffe4e1";
var malColor = "#7fe5f0"

var circleData = [
  { "x_axis": 50, "y_axis": 50, "radius": personRadius, "color" : malColor, "person_id": "A" },
  { "x_axis": 50, "y_axis": 150, "radius": personRadius, "color" : malColor, "person_id": "B"},
  { "x_axis": 50, "y_axis": 250, "radius": personRadius, "color" : malColor, "person_id": "C"},
  { "x_axis": 50, "y_axis": 350, "radius": personRadius, "color" : malColor, "person_id": "D"},
  { "x_axis": 400, "y_axis": 50, "radius": personRadius, "color" : femColor, "person_id": "W" },
  { "x_axis": 400, "y_axis": 150, "radius": personRadius, "color" : femColor, "person_id": "X"},
  { "x_axis": 400, "y_axis": 250, "radius": personRadius, "color" : femColor, "person_id": "Y"},
  { "x_axis": 400, "y_axis": 350, "radius": personRadius, "color" : femColor, "person_id": "Z"}];

// todo fill more as needed
var personData = [
  { "id": "A", "prefs": ["W", "X", "Y", "Z"] },
  { "id": "B",  "prefs": ["X", "W", "Y", "Z"] },
  { "id": "C", "prefs": ["W", "X", "Y", "Z"] },
  { "id": "D", "prefs": ["W", "X", "Y", "Z"] },
  { "id": "W", "prefs": ["A", "B", "C", "D"] },
  { "id": "X", "prefs": ["A", "B", "C", "D"] },
  { "id": "Y", "prefs": ["A", "B", "C", "D"] },
  { "id": "Z", "prefs": ["A", "B", "C", "D"] }]

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

for (var i = 1; i <= 4; i++) {
	var prefSquares = svg.selectAll("prefSquare")
		.data(circleData)
		.enter()
		.append("rect")


	var rectAttributes = prefSquares
		.attr("x", function (d) { return d.x_axis + 40 * i - 5; })
		.attr("y", function (d) { return d.y_axis - 20; })
		.attr("width", function (d) { return 40; })
		.attr("height", function (d) { return 40; })
		.attr("fill", function(d) { return "#b0e0e6"; })
		.attr("stroke-width", 1)
		.attr("stroke", "#003366")

	//Add the SVG Text Element to the svgContainer
	var prefText = svg.selectAll("texts")
		.data(circleData)
		.enter()
		.append("text");



	//Add the text attributes
	var prefLabels = prefText
		.attr("x", function(d) { return d.x_axis + 40 * i + 4; })
		.attr("y", function(d) { return d.y_axis + 8; })
		.text( function (d) {
			// get pref from personData
			var index = personData.findIndex(p => p.id == d.person_id);
			console.log(index);
			return personData[index].prefs[i-1];
		})
		.attr("font-family", "sans-serif")
		.attr("font-size", "30px")
		.attr("fill", "#000");

}

var personCircles = svg.selectAll("personCircle")
    .data(circleData)
    .enter()
    .append("circle");

var circleAttributes = personCircles
    .attr("cx", function (d) { return d.x_axis; })
    .attr("cy", function (d) { return d.y_axis; })
    .attr("r", function (d) { return d.radius; })
    .style("fill", function(d) { return d.color; });

//Add the SVG Text Element to the svgContainer
prefText = svg.selectAll("prefText")
	.data(circleData)
	.enter()
	.append("text");

//Add the text attributes
var personLabels = prefText
    .attr("x", function(d) { return d.x_axis - 16; })
    .attr("y", function(d) { return d.y_axis + 12; })
    .text( function (d) { return d.person_id; })
    .attr("font-family", "sans-serif")
    .attr("font-size", "40px")
    .attr("fill", "red");

// You can include local JS files:
// const MyClass = require('./my-class');
// const myClassInstance = new MyClass();
// myClassInstance.sayHi();


// You can load JSON files directly via require.
// Note this does not add a network request, it adds
// the data directly to your JavaScript bundle.
//const exampleData = require('./example-data.json');


// Anything you put in the static folder will be available
// over the network, e.g.
// d3.csv('carbon-emissions.csv')
  // .then((data) => {
    // console.log('Dynamically loaded CSV data', data);
  // })
