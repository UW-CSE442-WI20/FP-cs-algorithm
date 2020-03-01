
// You can require libraries
const d3 = require('d3')

// set the dimensions of the visualization
var width = 800;
var height = 200;

var personRadius = 40;
var femColor = "#ffe4e1";
var malColor = "#7fe5f0"

var circleData = [
  { "x_axis": 50, "y_axis": 50, "radius": personRadius, "color" : malColor, "person_id": "M1" },
  { "x_axis": 50, "y_axis": 150, "radius": personRadius, "color" : malColor, "person_id": "M2"},
  { "x_axis": 400, "y_axis": 50, "radius": personRadius, "color" : femColor, "person_id": "W1" },
  { "x_axis": 400, "y_axis": 150, "radius": personRadius, "color" : femColor, "person_id": "W2"}];

var svg = d3.select("#problem-explanation1").append("svg")
    .attr("width", width)
    .attr("height", height);

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
prefText = svg.selectAll("personText")
	.data(circleData)
	.enter()
	.append("text");

//Add the text attributes
var personLabels = prefText
    .attr("x", function(d) { return d.x_axis - 27; })
    .attr("y", function(d) { return d.y_axis + 13; })
    .text( function (d) { return d.person_id; })
    .attr("font-family", "sans-serif")
    .attr("font-size", "40px")
    .attr("fill", "blue");

// Add the SVG Line Element to the svgContainer
 var line1 = svg.append("line")
                .attr("x1", 88)
                .attr("y1", 50)
                .attr("x2", 362)
                .attr("y2", 50)
                .attr("stroke", "green")
                .attr("stroke-width", 4);

 var line2 = svg.append("line")
                .attr("x1", 88)
                .attr("y1", 150)
                .attr("x2", 362)
                .attr("y2", 150)
                .attr("stroke", "green")
                .attr("stroke-width", 4);

 var line3 = svg.append("line")
                .attr("x1", 88)
                .attr("y1", 54)
                .attr("x2", 362)
                .attr("y2", 146)
                .attr("stroke", "red")
                .attr("stroke-width", 4);

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
