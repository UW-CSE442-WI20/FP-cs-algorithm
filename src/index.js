
// You can require libraries
const d3 = require('d3')

var started = false;

// set the dimensions of the visualization
var width = 1400;
var height = 500;

// width not raidus... too lazy to change
var personRadius = 100;
var femColor = "#ffe4e1";
var malColor = "#7fe5f0"
var femColor2 = "#efd4d1";
var malColor2 = "#5fc5d0";

var genderLabelData = [
	{ "x_axis": 65, "y_axis": 120, "text": "♂️:" },
	{ "x_axis": 65, "y_axis": 350, "text": "♀️:" }
];

// user should be able to edit prefs
var personData = [
  { "x_axis": 150, "y_axis": 120, "radius": personRadius, "id": "A", "prefs": ["1", "2", "3", "4"], "free": true, "gender": "m", "fiance": null, "url": "https://avataaars.io/?topType=ShortHairShortRound", "proposals": 0 },
  { "x_axis": 400, "y_axis": 120, "radius": personRadius, "id": "B", "prefs": ["1", "2", "3", "4"], "free": true, "gender": "m", "fiance": null, "url": "https://avataaars.io/?topType=ShortHairShortRound", "proposals": 0 },
  { "x_axis": 650, "y_axis": 120, "radius": personRadius, "id": "C", "prefs": ["1", "2", "3", "4"], "free": true, "gender": "m", "fiance": null, "url": "https://avataaars.io/?topType=ShortHairShortRound", "proposals": 0 },
  { "x_axis": 900, "y_axis": 120, "radius": personRadius, "id": "D", "prefs": ["1", "2", "3", "4"], "free": true, "gender": "m", "fiance": null, "url": "https://avataaars.io/?topType=ShortHairShortRound", "proposals": 0 },
  { "x_axis": 150, "y_axis": 350, "radius": personRadius, "id": "1", "prefs": ["A", "B", "C", "D"], "free": true, "gender": "f", "fiance": null, "url": "https://avataaars.io/" },
  { "x_axis": 400, "y_axis": 350, "radius": personRadius, "id": "2", "prefs": ["B", "A", "D", "C"], "free": true, "gender": "f", "fiance": null, "url": "https://avataaars.io/" },
  { "x_axis": 650, "y_axis": 350, "radius": personRadius, "id": "3", "prefs": ["B", "A", "C", "D"], "free": true, "gender": "f", "fiance": null, "url": "https://avataaars.io/" },
  { "x_axis": 900, "y_axis": 350, "radius": personRadius, "id": "4", "prefs": ["A", "D", "C", "B"], "free": true, "gender": "f", "fiance": null, "url": "https://avataaars.io/" }]
var men = ["A", "B", "C", "D"];
var women = ["1", "2", "3", "4"];
assignPrefs();
function assignPrefs() {
	for (var i = 0; i < personData.length; i++) {
		if (personData[i].gender == "m") {
			personData[i].prefs = [...women]; // copy array

		}
		else {
			personData[i].prefs = [...men];
		}
		shuffle(personData[i].prefs);
	}
}
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
}

var fem_tops = ["LongHairBigHair", "LongHairBob", "LongHairBun", "LongHairCurly", "LongHairFro", "LongHairFroBand", "LongHairMiaWallace", "LongHairStraight", "LongHairStraight2", "LongHairStraightStrand"];
var mal_tops = ["NoHair", "ShortHairDreads01", "ShortHairShortCurly", "ShortHairShortFlat", "ShortHairShortRound", "ShortHairShortWaved", "ShortHairSides", "ShortHairTheCaesar"];
var opt_acc = ["Prescription02", "Round"];
var hair_colors = ["Auburn", "Black", "Blonde", "BlondeGolden", "Brown", "BrownDark", "SilverGray"];
var facial_hairs = ["BeardLight", "BeardMagestic", "MoustacheMagnum"];
var clothes = ["BlazerShirt", "BlazerSweater", "CollarSweater", "Hoodie", "Overall", "ShirtCrewNeck", "ShirtScoopNeck", "ShirtVNeck"];
var clothes_color = ["Black", "Blue02", "Blue03", "Gray02", "Heather", "PastelBlue", "Pink", "Red", "White"];
var skins = ["Pale", "Light", "Brown", "DarkBrown"]

for (var i = 0; i < personData.length; i++) {
	personData[i].url = generateAvatar(personData[i].gender);
}

var numMen = personData.length / 2;

var svg = d3.select("#solution").append("svg")
    .attr("width", width)
    .attr("height", height);

// define image filters here
var bright = svg.append("defs")
      .append("filter")
      .attr("id", "brightness")
      .append("feComponentTransfer")
bright.append("feFuncR").attr("type","linear").attr("slope","1.2");
bright.append("feFuncG").attr("type","linear").attr("slope","1.2");
bright.append("feFuncB").attr("type","linear").attr("slope","1.2");

// person preference lists (4 prefs per person)
for (var i = 1; i <= numMen; i++) {
	// display rectangles
	var prefSquares = svg.selectAll("prefSquare")
		.data(personData)
		.enter()
		.append("rect")
	var rectAttributes = prefSquares
		.attr("x", function (d) { return d.x_axis + 40 * i - 1; })
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
		.attr("x", function(d) { return d.x_axis + 40 * i + 18; })
		.attr("y", function(d) { return d.y_axis - 35; })
		.text( function (d) {
			// get pref from personData
			return d.prefs[i-1];
		})
		.attr("font-family", "sans-serif")
		.attr("font-size", "30px")
		.attr("text-anchor", "middle")
		.attr("fill", function(d) { return d.gender == "m" ? femColor : malColor })
		.attr("class", "pref-text" + i);
}

for (var i = 1; i <= numMen; i++) {

	var prefImgs = svg.selectAll("prefImg")
		.data(personData)
		.enter()
		.append("image")
	var rectAttributes = prefImgs
		.attr("x", function (d) { return d.x_axis + 40 * i - 6; })
		.attr("y", function (d) { return d.y_axis - 37; })
		.attr("width", function (d) { return 50; })
		.attr("height", function (d) { return 60; })
		.attr("xlink:href", function (d) {
			var person = personData[personData.findIndex(p => p.id == d.prefs[i-1])];
			return person.url;
		})
		.attr("class", "pref-img" + i)
}

// add person circles
var personCircles = svg.selectAll("personCircle")
    .data(personData)
    .enter()
    .append("image");
var circleAttributes = personCircles
    .attr("x", function (d) { return d.x_axis - d.radius / 2; })
    .attr("y", function (d) { return d.y_axis - d.radius / 2 - 10; })
    .attr("width", function (d) { return d.radius; })
	.attr("xlink:href", function (d) { return d.url + "&avatarStyle=Circle"; })
	.attr("class", "person-circle")
	.on("click",function(d){
		if (started) {
			updateAlert("Reset to set your own preferences!");
		}
		else {
			if (!selecting) {
				// should indicate selection somehow
			}
			onCircleClick(d);
		}
	})
	.on("mouseover",function(d, i){
		// highlight only when interactable
		if (!started && 
			(!selecting || 
				(d.gender != selectPerson.gender && !selectPerson.prefs.includes(d.id))
			)
		) {
			d3.select(this).transition()
				.duration('200')
				.attr('filter', 'url(#brightness)');
		}
		else {
			d3.select(this).transition()
            .duration('200')
            .attr('filter', 'null');
		}
	})
	.on("mouseout",function(d, i){
		d3.select(this).transition()
            .duration('200')
            .attr('filter', 'null');
	});

// add text to person labels (circles)

var personText = svg.selectAll("personText")
	.data(personData)
	.enter()
	.append("text");
var personLabels = personText
    .attr("x", function(d) { return d.x_axis; })
    .attr("y", function(d) { return d.y_axis - 60; })
    .text( function (d) { return d.id; })
    .attr("font-family", "sans-serif")
    .attr("font-size", "40px")
	.attr("text-anchor", "middle")
    .attr("fill", function(d) { return d.gender == "m" ? malColor2 : femColor2 })
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
    .attr("fill", "black");
	
var alertText = svg.selectAll("alertText")
	.data(personData)
    .enter()
    .append("text")
	.attr("x", 600)
    .attr("y", 450)
    .text( function () { return alertText; })
    .attr("font-family", "sans-serif")
    .attr("font-size", "35px")
    .attr("fill", "black")
	.style("text-anchor", "middle")
	.attr("class", "alertText");

var curManIndex = null;

/*
algo:
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

var alertQueue = [];
function solutionNextStep() {
	if (!started && selecting) {
		updateAlert("You must select preferences first!");
		return;
	}
	if (alertQueue.length > 0) {
		updateAlert(alertQueue.shift());
		return;
	}
    started = true;
	if (curManIndex == null) {
		curManIndex = 0;
	}
	else {
		curManIndex++;
		if (curManIndex >= numMen) {
			curManIndex = 0;
		}
	}
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
			updateAlert("Everyone now has a match. Matching is complete!");
			clearInterval(interval);
			d3.select("#play-button").text("Play Algorithm");
		}
	}
}
function propose(manId, womanId) {
	var man = personData[personData.findIndex(p => p.id == manId)];
	var woman = personData[personData.findIndex(p => p.id == womanId)];
	updateAlert(man.id + " is proposing to " + woman.id);
	if (woman.free) {
		alertQueue.push(woman.id + " is free.");
		man.proposals++;
		makeEngaged(man, woman);
	}
	else {
		alertQueue.push(woman.id + " is not free.");

		// new guy is better than old guy (sorry bro)
		if (woman.prefs.indexOf(man.id) < woman.prefs.indexOf(woman.fiance)) {
			alertQueue.push(woman.id + " prefers " + man.id + " over her current fiance, " + woman.fiance + ".");

			// set old guy to free
			var oldGuy = personData[personData.findIndex(p => p.id == woman.fiance)]
			oldGuy.free = true;
			oldGuy.fiance = null;
			man.proposals++;
			makeEngaged(man, woman);
		}
		else {
			alertQueue.push(woman.id + " still prefers her current fiance, " + woman.fiance + ". Tough luck, pal!");
			man.proposals++;
			updateVis();
		}
	}
}
function makeEngaged(man, woman) {
	// update data
	man.free = false;
	woman.free = false;
	man.fiance = woman.id;
	woman.fiance = man.id;
	updateVis();
	alertQueue.push(man.id + " is now engaged to " + woman.id);
}
function updateAlert(alertText) {
	svg.selectAll(".alertText")
		.data(personData)
		.each(function(d) {
			d3.select(this).text(alertText);
		});
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
		svg.selectAll(".pref-text" + i)
			.data(personData)
			.each(function(d) {
				if(d.prefs[i-1] == null) {
					d3.select(this).text("");
				}
				else {
					d3.select(this).text(d.prefs[i-1]);
				}
			});
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
		svg.selectAll(".pref-img" + i)
			.data(personData)
			.attr("xlink:href", function (d) {
				if(d.prefs[i-1] == null) {
					return null;
				}
				else {
					var person = personData[personData.findIndex(p => p.id == d.prefs[i-1])];
					return person.url;
				}
			});
	}

	// add lines to engaged couples
	// warning: the code you are about to see is very dumb. i dont know how to do it the right way
	svg.selectAll(".engage-line").remove();
	for (var i = 0; i < numMen; i++)
	{
		d = personData[i];
		if (d.fiance != null) {
			var other = personData[personData.findIndex(p => p.id == d.fiance)];
			var link = d3.linkVertical()({
				source: [d.x_axis, d.y_axis + personRadius / 2 - 5],
				target: [other.x_axis, other.y_axis - personRadius / 2 - 2]
			});

			svg
				.append('path')
				.attr('d', link)
				.attr('stroke', 'red')
				.attr('stroke-width', 2)
				.attr('fill', 'none')
				.attr("class", "engage-line");
		}
	}
}

var selecting = false;
var selectPerson = null;
var selectIndex = 0;
var prevState = null;
function onCircleClick(d) {
	if (selecting) {
		if (d.gender != selectPerson.gender) {
			if (!selectPerson.prefs.includes(d.id)) {
				selectPerson.prefs[selectIndex] = d.id;
				selectIndex++;
				updateVis();
				if (selectIndex >= numMen) {
					selecting = false;
				}
			}
		} else {
			selectPerson.prefs = prevState;
			selecting = false;
			updateVis();
		}
	}
	else {
		selecting = true;
		selectPerson = d;
		prevState = d.prefs;
		d.prefs = [null, null, null, null];
		selectIndex = 0;
		updateVis();
	}
}

// on reset button click
function reset() {
	// reset proposals/partners
	for (var i = 0; i < personData.length; i++) {
		personData[i].fiance = null;
		personData[i].free = true;
		if (personData[i].gender == "m") {
			personData[i].proposals = 0;
		}
	}
    curManIndex = null;
	started = false;
	d3.select("#play-button").text("Play Algorithm");
	clearInterval(interval);
	updateAlert();
    updateVis();
}

var interval;
function playSolution() {
	if (started) {
		d3.select(this).text("Play Algorithm");
		clearInterval(interval);
	}
	else {
		interval = setInterval(function(){ 
			solutionNextStep();
		}, 1000);
		d3.select(this).text("Pause Algorithm");
	}
}

d3.select("#play-button").on("click", playSolution);
d3.select("#solution-next").on("click", solutionNextStep);
d3.select("#solution-reset").on("click", reset);
d3.select("#shuffle-prefs").on("click", function() { 
	if (!started) { 
		assignPrefs();
		selecting = false;
		updateVis();
	}
	else {
		updateAlert("Reset before you can set preferences!");
	}
});

// generates a URL to the avatar (thanks to https://getavataaars.com/)
function generateAvatar(gender) {
	var hairColor = hair_colors[Math.floor(Math.random() * hair_colors.length)];
	var avatar = "https://avataaars.io/" +
		"?topType=" + (gender == "m" ? mal_tops[Math.floor(Math.random() * mal_tops.length)] : fem_tops[Math.floor(Math.random() * fem_tops.length)]) +
		"&accessoriesType=" + (Math.random() > .3 ? "Blank" : opt_acc[Math.floor(Math.random() * opt_acc.length)]) +
		"&hairColor=" + hairColor +
		"&facialHairColor=" + hairColor +
		"&facialHairType=" + (Math.random() > .3 || gender == "f" ? "Blank" : facial_hairs[Math.floor(Math.random() * facial_hairs.length)]) +
		"&clotheType=" + clothes[Math.floor(Math.random() * clothes.length)] +
		"&clotheColor=" + clothes_color[Math.floor(Math.random() * clothes_color.length)] +
		"&eyeType=Default" +
		"&eyebrowType=Default" +
		"&mouthType=Default" +
		"&skinColor=" + skins[Math.floor(Math.random() * skins.length)];
	return avatar;
}





// useless
function onCircleClick2(d) {
	var prefStr = "";
	var successfulInput = false;
	if (d.gender == "m") {
		var womenNames = "";
		for (var i = numMen; i < numMen * 2; i++) {
			womenNames += personData[i].id;
		}
		prefStr = prompt("Input the preference list for " + d.id + " like so: " + womenNames
			+ "\nEach letter represents a different woman. You cannot repeat or exclude a name.").toUpperCase();
		if (prefStr.length != numMen) {
		alert("Error. You must have " + numMen + " names in your input.");
		}
		else if (prefStr.split('').sort().join('') != womenNames.split('').sort().join('')) {
			alert("Error. Make sure you are including the correct names, and that each name appears once.");
		}
		else {
			successfulInput = true;
		}
	}
	else {
		var menNames = "";
		for (var i = 0; i < numMen; i++) {
			menNames += personData[i].id;
		}
		prefStr = prompt("Input the preference list for " + d.id + " like so: " + menNames
			+ "\nEach letter represents a different man. You cannot repeat or exclude a name.").toUpperCase();
		if (prefStr.length != numMen) {
		alert("Error. You must have " + numMen + " names in your input.");
		}
		else if (prefStr.split('').sort().join('') != menNames.split('').sort().join('')) {
			alert("Error. Make sure you are including the correct names, and that each name appears once.");
		}
		else {
			successfulInput = true;
		}
	}
	if (successfulInput) {
		for (var i = 0; i < prefStr.length; i++) {
			d.prefs[i] = prefStr[i];
		}
		updateVis();
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
