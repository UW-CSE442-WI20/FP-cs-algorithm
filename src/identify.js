// You can require libraries
const d3 = require('d3')

// set the dimensions of the visualization
var width = 1200;
var height = 560;

// width not raidus... too lazy to change
var personRadius = 100;
var femColor2 = "#F7347A";
var malColor2 = "#4ca3dd"
var femColor = "#fFa6b1";
var malColor = "#a6c2ff";

var genderLabelData = [
	{ "x_axis": 20, "y_axis": 120, "text": "♂️:" },
	{ "x_axis": 20, "y_axis": 330, "text": "♀️:" }
];

// user should be able to edit prefs
var personData = []
var men = [];
var women = [];
var numMen = 0;

var fem_tops = ["LongHairBigHair", "LongHairBob", "LongHairBun", "LongHairCurly", "LongHairFro", "LongHairFroBand", "LongHairMiaWallace", "LongHairStraight", "LongHairStraight2", "LongHairStraightStrand"];
var mal_tops = ["NoHair", "ShortHairDreads01", "ShortHairShortCurly", "ShortHairShortFlat", "ShortHairShortRound", "ShortHairShortWaved", "ShortHairSides", "ShortHairTheCaesar"];
var opt_acc = ["Prescription02", "Round"];
var all_hair_colors = ["Auburn", "Black", "BlondeGolden", "Brown", "BrownDark", "SilverGray"];
var dark_hair_colors = ["Black", "Brown", "BrownDark", "SilverGray"];
var facial_hairs = ["BeardLight", "BeardMajestic", "MoustacheMagnum"];
var clothes = ["BlazerShirt", "BlazerSweater", "CollarSweater", "Hoodie", "Overall", "ShirtCrewNeck", "ShirtScoopNeck", "ShirtVNeck"];
var clothes_color = ["Black", "Blue02", "Blue03", "Gray02", "Heather", "PastelBlue", "Pink", "Red", "White"];
var skins = ["Pale", "Light", "Brown", "DarkBrown"]

// 150 most common male and female names
var femaleNames = ["Emily","Hannah","Madison","Ashley","Sarah","Alexis","Samantha","Jessica","Elizabeth","Taylor","Lauren","Alyssa","Kayla","Abigail","Brianna","Olivia","Emma","Megan","Grace","Victoria","Rachel","Anna","Sydney","Destiny","Morgan","Jennifer","Jasmine","Haley","Julia","Kaitlyn","Nicole","Amanda","Katherine","Natalie","Hailey","Alexandra","Savannah","Chloe","Rebecca","Stephanie","Maria","Sophia","Mackenzie","Allison","Isabella","Amber","Mary","Danielle","Gabrielle","Jordan","Brooke","Michelle","Sierra","Katelyn","Andrea","Madeline","Sara","Kimberly","Courtney","Erin","Brittany","Vanessa","Jenna","Jacqueline","Caroline","Faith","Makayla","Bailey","Paige","Shelby","Melissa","Kaylee","Christina","Trinity","Mariah","Caitlin","Autumn","Marissa","Breanna","Angela","Catherine","Zoe","Briana","Jada","Laura","Claire","Alexa","Kelsey","Kathryn","Leslie","Alexandria","Sabrina","Mia","Isabel","Molly","Leah","Katie","Gabriella","Cheyenne","Cassandra","Tiffany","Erica","Lindsey","Kylie","Amy","Diana","Cassidy","Mikayla","Ariana","Margaret","Kelly","Miranda","Maya","Melanie","Audrey","Jade","Gabriela","Caitlyn","Angel","Jillian","Alicia","Jocelyn","Erika","Lily","Heather","Madelyn","Adriana","Arianna","Lillian","Kiara","Riley","Crystal","Mckenzie","Meghan","Skylar","Ana","Britney","Angelica","Kennedy","Chelsea","Daisy","Kristen","Veronica","Isabelle","Summer","Hope","Brittney","Lydia","Hayley","Evelyn"];
var maleNames = ["Jacob","Michael","Matthew","Joshua","Christopher","Nicholas","Andrew","Joseph","Daniel","Tyler","William","Brandon","Ryan","John","Zachary","David","Anthony","James","Justin","Alexander","Jonathan","Christian","Austin","Dylan","Ethan","Benjamin","Noah","Samuel","Robert","Nathan","Cameron","Kevin","Thomas","Jose","Hunter","Jordan","Kyle","Caleb","Jason","Logan","Aaron","Eric","Brian","Gabriel","Adam","Jack","Isaiah","Juan","Luis","Connor","Charles","Elijah","Isaac","Steven","Evan","Jared","Sean","Timothy","Luke","Cody","Nathaniel","Alex","Seth","Mason","Richard","Carlos","Angel","Patrick","Devin","Bryan","Cole","Jackson","Ian","Garrett","Trevor","Jesus","Chase","Adrian","Mark","Blake","Sebastian","Antonio","Lucas","Jeremy","Gavin","Miguel","Julian","Dakota","Alejandro","Jesse","Dalton","Bryce","Tanner","Kenneth","Stephen","Jake","Victor","Spencer","Marcus","Paul","Brendan","Jeremiah","Xavier","Jeffrey","Tristan","Jalen","Jorge","Edward","Riley","Wyatt","Colton","Joel","Maxwell","Aidan","Travis","Shane","Colin","Dominic","Carson","Vincent","Derek","Oscar","Grant","Eduardo","Peter","Henry","Parker","Hayden","Collin","George","Bradley","Mitchell","Devon","Ricardo","Shawn","Taylor","Nicolas","Francisco","Gregory","Liam","Kaleb","Preston","Erik","Owen","Omar","Diego","Dustin","Corey","Fernando","Clayton"];

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


newPersonData(3);
function newPersonData(numPairs) {
	personData = [];
	men = [];
	women = [];
	// add men
	for (var i = 0; i < numPairs; i++) {
		personData.push({ "x_axis": 100 + i * (40 * numPairs + 120), "y_axis": 120, "radius": personRadius, "id": i, "prefs": [], "free": true, "gender": "m", "fiance": null, "url": "https://avataaars.io/?topType=ShortHairShortRound", "exes": [], "proposals": 0, "taken": false });
	}
	// add women
	for (var i = 0; i < numPairs; i++) {
		personData.push({ "x_axis": 100 + i * (40 * numPairs + 120), "y_axis": 330, "radius": personRadius, "id": i, "prefs": [], "free": true, "gender": "f", "fiance": null, "url": "https://avataaars.io/", "exes": [], "proposals": 0, "taken": false });
	}
	numMen = personData.length / 2;

	for (var i = 0; i < personData.length; i++) {
		// generate picture
		personData[i].url = generateAvatar(personData[i].gender);

		// generate names
		var men_initials = [];
		var women_initials = [];
		for (var a = 0; a < men.length; a++) {
			men_initials.push(men[a].charAt(0));
		}
		for (var a = 0; a < women.length; a++) {
			women_initials.push(women[a].charAt(0));
		}

		// the starting letter mustbe unique
		do {
			if (personData[i].gender == "m") {
				personData[i].id = maleNames[Math.floor(Math.random() * maleNames.length)];
			}
			else {
				personData[i].id = femaleNames[Math.floor(Math.random() * femaleNames.length)];
			}
		} while (men_initials.includes(personData[i].id.charAt(0)) || women_initials.includes(personData[i].id.charAt(0)));

		if (personData[i].gender == "m") {
			men.push(personData[i].id);
		}
		else {
			women.push(personData[i].id);
		}
	}
	assignPrefs();
	var women_init = women.slice();
	for (var i = 0; i < numMen; i++) {
		var person = personData[i];
		var name = women_init[Math.floor(Math.random() * women_init.length)];
		var index = women_init.indexOf(name);
		women_init.splice(index, 1);

		var woman = personData[personData.findIndex(p => p.id == name)];
		woman.fiance = person.id;
		person.fiance = name;
	}
}

// var svg = d3.select("#identify")
//   .append("svg")
//   .attr("width", width)
//   .attr("height", height);

var svg;
init();
function init() {
	if (svg != null) {
		svg.selectAll("*").remove();
		svg.attr("width", width);
	}
	else {
		svg = d3.select("#identify").append("svg")
			.attr("width", width)
			.attr("height", height);
	}
  // person preference lists (2 prefs per person)
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
			.attr("fill", function(d) {	return "#b0e0e6"; })
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
			.attr("y", function(d) { return d.y_axis + 40; })
			.text( function (d) {
				// get pref from personData
				return d.prefs[i-1].charAt(0);
			})
			.attr("font-family", "Nunito, sans-serif")
			.attr("font-size", "22px")
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
		.attr("class", "person-circle");

  // add text to person labels (circles)
	var personText = svg.selectAll("personText")
		.data(personData)
		.enter()
		.append("text");
	var personLabels = personText
		.attr("x", function(d) { return d.x_axis; })
		.attr("y", function(d) {
			if (d.gender == "m") {
				return d.y_axis - 58;
			} else {
				return d.y_axis + 70;
			}
		})
		.text( function (d) { return d.id; })
		.attr("font-family", "Nunito, sans-serif")
		.attr("font-size", "30px")
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
		.attr("font-family", "Nunito, sans-serif")
		.attr("font-size", "40px")
		.attr("text-anchor", "middle")
		.attr("fill", "black");

	// for displaying alert texts
	var alertText = svg
		.append("text")
		.attr("x", 500)
		.attr("y", 460)
		.text( function () { return alertText; })
		.attr("font-family", "Nunito, sans-serif")
		.attr("font-size", "30px")
		.attr("fill", "black")
		.style("text-anchor", "middle")
		.attr("class", "alertText");
	var alertText2 = svg
		.append("text")
		.attr("x", 500)
		.attr("y", 510)
		.text( function () { return alertText2; })
		.attr("font-family", "Nunito, sans-serif")
		.attr("font-size", "30px")
		.attr("fill", "black")
		.style("text-anchor", "middle")
		.attr("class", "alertText2");

	updateVis();
}

function generateAvatar(gender) {
	var skinColor = skins[Math.floor(Math.random() * skins.length)];
	if (skinColor == "Pale" || skinColor == "Light") {
		var hairColor = all_hair_colors[Math.floor(Math.random() * all_hair_colors.length)];
	}
	else {
		var hairColor = dark_hair_colors[Math.floor(Math.random() * dark_hair_colors.length)];
	}
	// 30% chance of facial hair for males only
	var facialHair = "Blank";
	if(Math.random() < .3 && gender == "m") {
		facialHair = facial_hairs[Math.floor(Math.random() * facial_hairs.length)];
	}
	var avatar = "https://avataaars.io/" +
		"?topType=" + (gender == "m" ? mal_tops[Math.floor(Math.random() * mal_tops.length)] : fem_tops[Math.floor(Math.random() * fem_tops.length)]) +
		"&accessoriesType=" + (Math.random() > .3 ? "Blank" : opt_acc[Math.floor(Math.random() * opt_acc.length)]) +
		"&hairColor=" + hairColor +
		"&facialHairType=" + facialHair +
		"&clotheType=" + clothes[Math.floor(Math.random() * clothes.length)] +
		"&clotheColor=" + clothes_color[Math.floor(Math.random() * clothes_color.length)] +
		"&skinColor=" + skinColor;
	if (hairColor != "SilverGray") {
		avatar += "&facialHairColor=" + hairColor;
	}
	return avatar;
}

function updateVis() {
	// update faces to reflect the quality of match
	svg.selectAll(".person-circle")
		.data(personData)
		.attr("xlink:href", function (d) {
			var url = d.url + "&avatarStyle=Circle"
			if (d.fiance == null) {
				return url;
			}
			else {
				var fianceIndex = d.prefs.indexOf(d.fiance);
				if (fianceIndex == 0) {
					return url + "&mouthType=Smile" + "&eyeType=Happy";
				}
				else if (fianceIndex == 1) {
					return url + "&eyebrowType=RaisedExcited";
				}
				else if (fianceIndex == 2) {
					return url + "&mouthType=Serious" + "&eyebrowType=SadConcerned";
				}
				else if (fianceIndex == 3) {
					return url + "&mouthType=Sad" + "&eyebrowType=SadConcerned";
				}
				else {
					return url + "&eyeType=Surprised" + "&eyebrowType=SadConcerned" + "&mouthType=Concerned"
				}
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
					d3.select(this).text(d.prefs[i-1].charAt(0));
				}
			});
		svg.selectAll(".pref-x-text" + i)
			.data(personData)
			.each(function(d) {
				if(d.exes.includes(d.prefs[i-1])) {
					d3.select(this).text("X");
				}
				else {
					d3.select(this).text("");
				}
			});
		svg.selectAll(".pref-square" + i)
			.data(personData)
			.attr("fill", function(d) {
				if(d.prefs[i-1] != null && d.prefs[i-1] == d.fiance) {
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
				.attr('stroke', 'green')
				.attr('stroke-width', 2)
				.attr('fill', 'none')
				.attr("class", "engage-line");
		}
	}
}

function updateAlert(alertText) {
	svg.selectAll(".alertText")
		.data(personData)
		.each(function(d) {
			d3.select(this).text(alertText);
		});
}

function updateAlert2(alertText2) {
	svg.selectAll(".alertText2")
		.data(personData)
		.each(function(d) {
			d3.select(this).text(alertText2);
		});
}

// function to check if unstable pairs exist
function checkUnstablity() {
	unstable_pairs = [];
	for (var i = 0; i < numMen; i++) {
		var person = personData[i];
		var currWifeIndex = women.findIndex(p => p == person.fiance);
		for (var j = 0; j < numMen; j++) {
			var woman = women[j];
			var womanIndex = women.findIndex(p => p == woman);
			if (woman != person.fiance && womanIndex < currWifeIndex) {
				var womanData = personData[3 + j];
				var currHusbandIndex = men.findIndex(p => p == womanData.fiance);
				var personIndex = men.findIndex(p => p == men[i]);
				if (personIndex < currHusbandIndex) {
					unstable_pairs.push(men[i] + "-" + woman);
				}
			}
		}
	}
	return unstable_pairs;
}

function checkUnstableYes() {
	unstable_pairs = checkUnstablity();
	if (unstable_pairs.length == 0) {
		updateAlert("Oops! There does not exist any unstable pairs!");
	} else if (unstable_pairs.length == 1) {
		updateAlert("You are right! There is one unstable pair and that is " + unstable_pairs.shift());
	} else {
		var msg = "You are right! There are " + unstable_pairs.length + " unstable pairs.";
		var msg2 = "They are : " + unstable_pairs.shift();
		while (unstable_pairs.length > 1) {
			msg2 += ", " + unstable_pairs.shift();
		}
		msg2 += " and " + unstable_pairs.shift();
		updateAlert(msg);
		updateAlert2(msg2);
	}
}

function checkUnstableNo() {
	unstable_pairs = checkUnstablity();
	if (unstable_pairs.length == 0) {
		updateAlert("You are right! There are no unstable pairs!");
	} else if (unstable_pairs.length == 1) {
		updateAlert("Oops! There is one unstable pair and that is " + unstable_pairs.shift());
	} else {
		var msg = "Oops! There are " + unstable_pairs.length + " unstable pairs.";
		var msg2 = "They are : " + unstable_pairs.shift();
		while (unstable_pairs.length > 1) {
			msg2 += ", " + unstable_pairs.shift();
		}
		msg2 += " and " + unstable_pairs.shift();
		updateAlert(msg);
		updateAlert2(msg2);
	}
}


function generateNewProblem() {
	newPersonData(3);
	init();
}

d3.select("#yes-button").on("click", checkUnstableYes);
d3.select("#no-button").on("click", checkUnstableNo);
d3.select("#new-button").on("click", generateNewProblem);
