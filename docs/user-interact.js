
// You can require libraries
const d3 = require('d3')

// set the dimensions of the visualization
var width = 1400;
var height = 400;

var personRadius = 40;
var femColor = "#ffe4e1";
var malColor = "#7fe5f0"
 
var genderLabelData = [
	{ "x_axis": 50, "y_axis": 50, "text": "M:" },
	{ "x_axis": 50, "y_axis": 350, "text": "F:" }
];

// todo fill more as needed
var personData = [
  { "x_axis": 150, "y_axis": 50, "radius": personRadius, "id": "A", "prefs": ["X", "Y", "W", "Z"], "free": true, "gender": "m", "fiance": null, "proposals": 0 },
  { "x_axis": 400, "y_axis": 50, "radius": personRadius, "id": "B", "prefs": ["X", "W", "Z", "Y"], "free": true, "gender": "m", "fiance": null, "proposals": 0 },
  { "x_axis": 650, "y_axis": 50, "radius": personRadius, "id": "C", "prefs": ["W", "Z", "Y", "X"], "free": true, "gender": "m", "fiance": null, "proposals": 0 },
  { "x_axis": 900, "y_axis": 50, "radius": personRadius, "id": "D", "prefs": ["Y", "W", "X", "Z"], "free": true, "gender": "m", "fiance": null, "proposals": 0 },
  { "x_axis": 150, "y_axis": 350, "radius": personRadius, "id": "W", "prefs": ["A", "B", "C", "D"], "free": true, "gender": "f", "fiance": null},
  { "x_axis": 400, "y_axis": 350, "radius": personRadius, "id": "X", "prefs": ["B", "A", "D", "C"], "free": true, "gender": "f", "fiance": null},
  { "x_axis": 650, "y_axis": 350, "radius": personRadius, "id": "Y", "prefs": ["B", "A", "C", "D"], "free": true, "gender": "f", "fiance": null},
  { "x_axis": 900, "y_axis": 350, "radius": personRadius, "id": "Z", "prefs": ["A", "D", "C", "B"], "free": true, "gender": "f", "fiance": null}]
  
var numMen = personData.length / 2;

var svg = d3.select("#user-interact").append("svg")
    .attr("width", width)
    .attr("height", height);

// person preference lists (4 prefs per person)
for (var i = 1; i <= numMen; i++) {
	// display rectangles
	var prefSquares = svg.selectAll("prefSquare")
		.data(personData)
		.enter()
		.append("rect")
	var rectAttributes = prefSquares
		.attr("x", function (d) { return d.x_axis + 40 * i - 7; })
		.attr("y", function (d) { return d.y_axis - 20; })
		.attr("width", function (d) { return 40; })
		.attr("height", function (d) { return 40; })
		.attr("fill", function(d) {
			if(d.proposals > i - 1) {
				return "#70a0a6";
			}
			else {
				return "#b0e0e6";
			}
		})
		.attr("stroke-width", 1)
		.attr("stroke", "#003366")
		.attr("class", "pref-square" + i)

	// add text to person preference list
	var prefText = svg.selectAll("prefTexts")
		.data(personData)
		.enter()
		.append("text");
	var prefLabels = prefText
		.attr("x", function(d) { return d.x_axis + 40 * i + 14; })
		.attr("y", function(d) { return d.y_axis + 11; })
		.text( function (d) {
			// get pref from personData
			return d.prefs[i-1];
		})
		.attr("font-family", "sans-serif")
		.attr("font-size", "30px")
		.attr("text-anchor", "middle")
		.attr("fill", "#000")
		.attr("class", "pref-text");

}

// add person circles
var personCircles = svg.selectAll("personCircle")
    .data(personData)
    .enter()
    .append("circle");
var circleAttributes = personCircles
    .attr("cx", function (d) { return d.x_axis; })
    .attr("cy", function (d) { return d.y_axis; })
    .attr("r", function (d) { return d.radius; })
	.attr("stroke", function(d) {
		// determine if free from personData
		if(d.free) {
			return "#ccc";
		}
		else {
			return "black";
		}
	})
    .attr("fill", function(d) {
		if(d.gender == "m") {
			return malColor; 
		}
		else {
			return femColor;
		}
	})
	.attr("stroke-width", 3)
	.attr("class", "person-circle");

// add text to person labels (circles)
var personText = svg.selectAll("personText")
	.data(personData)
	.enter()
	.append("text");
var personLabels = personText
    .attr("x", function(d) { return d.x_axis; })
    .attr("y", function(d) { return d.y_axis + 14; })
    .text( function (d) { return d.id; })
    .attr("font-family", "sans-serif")
    .attr("font-size", "40px")
	.attr("text-anchor", "middle")
    .attr("fill", "red")
	.attr("class", "person-label");

// gender labels
var genderLabelText = svg.selectAll("genderText")
	.data(genderLabelData)
	.enter()
	.append("text");
var genderLabels = genderLabelText
	.attr("x", function(d) { return d.x_axis; })
    .attr("y", function(d) { return d.y_axis + 14; })
    .text( function (d) { return d.text; })
    .attr("font-family", "sans-serif")
    .attr("font-size", "40px")
	.attr("text-anchor", "middle")
	.attr("font-weight", "bold")
    .attr("fill", "black");

var curManIndex = null;

/* 
w := first woman on m's list to whom m has not yet proposed
	if w is free then
		(m, w) become engaged
	else some pair (m', w) already exists
		if w prefers m to m' then
			m' becomes free
			(m, w) become engaged 
		else
			(m', w) remain engaged
		end if
	end if 
*/

// use this function to pair two ppl based on user input
function pair(manId, womanId) {
	// remember to unpair ppl before engaging them
}
function makeEngaged(man, woman) {
	// update data
	man.free = false;
	woman.free = false;
	man.fiance = woman.id;
	woman.fiance = man.id;
	updateVis();
	alert(man.id + " is now engaged to " + woman.id);
}
function updateVis() {
	// update free indicator
	svg.selectAll(".person-circle")
		.data(personData)
            .attr("stroke", function(d) {
			// determine if free from personData
			if(d.free) {
				return "#ccc";
			}
			else {
				return "black";
			}
		});
	
	// update prefs list
	for (var i = 1; i <= numMen; i++) {
		svg.selectAll(".pref-square" + i)
			.data(personData)
			.attr("fill", function(d) {
				if(d.proposals > i - 1) {
					return "#70a0a6";
				}
				else {
					return "#b0e0e6";
				}
			});
	}
	
	// add lines to engaged couples
	// warning: the code you are about to see is very dumb. i dont know how to do it the right way	
	svg.selectAll(".engage-line").remove();
	for (var i = 0; i < numMen; i++)
	{
		
		d = personData[i];
		svg.append("line")
			.attr("x1", function() { return d.x_axis; })
			.attr("y1", function() { return d.y_axis; })
			.attr("x2", function() {
				if (d.fiance != null) {
					var other = personData[personData.findIndex(p => p.id == d.fiance)];
					return other.x_axis;
				}
				else {
					return 0;
				}
			})
			.attr("y2", function() {
				if (d.fiance != null) {
					var other = personData[personData.findIndex(p => p.id == d.fiance)];
					return other.y_axis;
				}
				else {
					return 0;
				}
			})
			.attr("stroke-width",
				function() {
					// display lines only when necessary
					if (d.fiance != null) {
						return 2;
					}
					else {
						return 0;
					}
				})
			.attr("stroke", "green")
			.attr("class", "engage-line");
	}
}


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
