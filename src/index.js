
// You can require libraries
const d3 = require('d3')

// set the dimensions of the visualization
var width = 1400;
var height = 400;

var personRadius = 40;
var femColor = "#ffe4e1";
var malColor = "#7fe5f0"

var circleData = [
  { "x_axis": 150, "y_axis": 50, "radius": personRadius, "person_id": "A" },
  { "x_axis": 400, "y_axis": 50, "radius": personRadius, "person_id": "B"},
  { "x_axis": 650, "y_axis": 50, "radius": personRadius, "person_id": "C"},
  { "x_axis": 900, "y_axis": 50, "radius": personRadius, "person_id": "D"},
  { "x_axis": 150, "y_axis": 350, "radius": personRadius, "person_id": "W" },
  { "x_axis": 400, "y_axis": 350, "radius": personRadius, "person_id": "X"},
  { "x_axis": 650, "y_axis": 350, "radius": personRadius, "person_id": "Y"},
  { "x_axis": 900, "y_axis": 350, "radius": personRadius, "person_id": "Z"}];
 
var genderLabelData = [
	{ "x_axis": 50, "y_axis": 50, "text": "M:" },
	{ "x_axis": 50, "y_axis": 350, "text": "F:" }
];

// todo fill more as needed
var personData = [
  { "id": "A", "prefs": ["X", "Y", "W", "Z"], "free": true, "gender": "m", "fiance": null, "proposals": 0 },
  { "id": "B", "prefs": ["X", "W", "Z", "Y"], "free": true, "gender": "m", "fiance": null, "proposals": 0 },
  { "id": "C", "prefs": ["W", "Z", "Y", "X"], "free": true, "gender": "m", "fiance": null, "proposals": 0 },
  { "id": "D", "prefs": ["Y", "W", "Y", "X"], "free": true, "gender": "m", "fiance": null, "proposals": 0 },
  { "id": "W", "prefs": ["A", "B", "C", "D"], "free": true, "gender": "f", "fiance": null},
  { "id": "X", "prefs": ["B", "A", "D", "C"], "free": true, "gender": "f", "fiance": null},
  { "id": "Y", "prefs": ["B", "A", "C", "D"], "free": true, "gender": "f", "fiance": null},
  { "id": "Z", "prefs": ["A", "D", "C", "B"], "free": true, "gender": "f", "fiance": null}]

var svg = d3.select("#solution").append("svg")
    .attr("width", width)
    .attr("height", height);

// person preference lists (4 prefs per person)
for (var i = 1; i <= 4; i++) {
	// display rectangles
	var prefSquares = svg.selectAll("prefSquare")
		.data(circleData)
		.enter()
		.append("rect")
	var rectAttributes = prefSquares
		.attr("x", function (d) { return d.x_axis + 40 * i - 7; })
		.attr("y", function (d) { return d.y_axis - 20; })
		.attr("width", function (d) { return 40; })
		.attr("height", function (d) { return 40; })
		.attr("fill", function(d) {
			var index = personData.findIndex(p => p.id == d.person_id);
			if(personData[index].proposals > i - 1) {
				return "#70a0a6";
			}
			else {
				return "#b0e0e6";
			}
		})
		.attr("stroke-width", 1)
		.attr("stroke", "#003366")

	// add text to person preference list
	var prefText = svg.selectAll("prefTexts")
		.data(circleData)
		.enter()
		.append("text");
	var prefLabels = prefText
		.attr("x", function(d) { return d.x_axis + 40 * i + 14; })
		.attr("y", function(d) { return d.y_axis + 11; })
		.text( function (d) {
			// get pref from personData
			var index = personData.findIndex(p => p.id == d.person_id);
			return personData[index].prefs[i-1];
		})
		.attr("font-family", "sans-serif")
		.attr("font-size", "30px")
		.attr("text-anchor", "middle")
		.attr("fill", "#000");

}

// add person circles
var personCircles = svg.selectAll("personCircle")
    .data(circleData)
    .enter()
    .append("circle");
var circleAttributes = personCircles
    .attr("cx", function (d) { return d.x_axis; })
    .attr("cy", function (d) { return d.y_axis; })
    .attr("r", function (d) { return d.radius; })
	.style("stroke", function(d) {
		// determine if free from personData
		var index = personData.findIndex(p => p.id == d.person_id);
		if(personData[index].free) {
			return "#ccc";
		}
		else {
			return "black";
		}
	})
    .style("fill", function(d) {
		var index = personData.findIndex(p => p.id == d.person_id);
		if(personData[index].gender == "m") {
			return malColor; 
		}
		else {
			return femColor;
		}
	})
	.style("stroke-width", 3);

// add text to person labels (circles)
var personText = svg.selectAll("personText")
	.data(circleData)
	.enter()
	.append("text");
var personLabels = personText
    .attr("x", function(d) { return d.x_axis; })
    .attr("y", function(d) { return d.y_axis + 14; })
    .text( function (d) { return d.person_id; })
    .attr("font-family", "sans-serif")
    .attr("font-size", "40px")
	.attr("text-anchor", "middle")
    .attr("fill", "red");

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

var curManIndex = 0;
var numMen = personData.length / 2;
console.log(numMen)
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
function solutionNextStep() {
	// use to catch repeats
	var lastManIndex = curManIndex;
	
	// do first check
	if (personData[curManIndex].proposals < numMen && personData[curManIndex].free) {
		var curMan = personData[curManIndex];
		var curWoman = personData[personData.findIndex(p => p.id == curMan.prefs[curMan.proposals])];
		propose(curMan.id, curWoman.id);
	}
	else {
		curManIndex++;
		if (curManIndex >= numMen) {
			curManIndex = 0;
		}
		// while there exists a free man who still has a proposal to make
		while (!(personData[curManIndex].proposals < numMen && personData[curManIndex].free) && curManIndex != lastManIndex) {
			curManIndex++;
			if (curManIndex >= numMen) {
				curManIndex = 0;
			}
		}
		if(curManIndex != lastManIndex) {
			var curMan = personData[curManIndex];
			var curWoman = personData[personData.findIndex(p => p.id == curMan.prefs[curMan.proposals])];
			propose(curMan.id, curWoman.id);
		}
		else {
			alert("no one is free! matching is complete!");
		}
	}
}
function propose(manId, womanId) {
	man = personData[personData.findIndex(p => p.id == manId)];
	woman = personData[personData.findIndex(p => p.id == womanId)];
	alert(man.id + " is proposing to " + woman.id);
	if (woman.free) {
		// this does not update visuals :/
		man.free = false;
		woman.free = false;
		man.fiance = woman.id;
		woman.fiance = man.id;
		alert(woman.id + " is free. " + man.id + " is now engaged to " + woman.id);
	} 
	else {
		alert(woman.id + " is not free.");
	}
	
	
}

d3.select("#solution-next").on("click", solutionNextStep)


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
