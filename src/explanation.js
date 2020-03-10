
// You can require libraries
const d3 = require('d3')

// set the dimensions of the visualization
var width = 1000;
var height = 400;

// var personRadius = 40;
// var femColor = "#ffe4e1";
// var malColor = "#7fe5f0"
//
// var circleData = [
//   { "x_axis": 50, "y_axis": 50, "radius": personRadius, "color" : malColor, "person_id": "M1" },
//   { "x_axis": 50, "y_axis": 150, "radius": personRadius, "color" : malColor, "person_id": "M2"},
//   { "x_axis": 400, "y_axis": 50, "radius": personRadius, "color" : femColor, "person_id": "W1" },
//   { "x_axis": 400, "y_axis": 150, "radius": personRadius, "color" : femColor, "person_id": "W2"}];
//
// var svg = d3.select("#explanation").append("svg")
//     .attr("width", width)
//     .attr("height", height);
//
// var personCircles = svg.selectAll("personCircle")
//     .data(circleData)
//     .enter()
//     .append("circle");
//
// // add person circles
// var circleAttributes = personCircles
//     .attr("cx", function (d) { return d.x_axis; })
//     .attr("cy", function (d) { return d.y_axis; })
//     .attr("r", function (d) { return d.radius; })
//     .style("fill", function(d) { return d.color; });
//
// //Add the SVG Text Element to the svgContainer
// prefText = svg.selectAll("personText")
// 	.data(circleData)
// 	.enter()
// 	.append("text");
//
// //Add the text attributes
// var personLabels = prefText
//     .attr("x", function(d) { return d.x_axis - 27; })
//     .attr("y", function(d) { return d.y_axis + 13; })
//     .text( function (d) { return d.person_id; })
//     .attr("font-family", "sans-serif")
//     .attr("font-size", "40px")
//     .attr("fill", "blue");
//
// // Add the SVG Line Element to the svgContainer
//  var line1 = svg.append("line")
//                 .attr("x1", 88)
//                 .attr("y1", 50)
//                 .attr("x2", 362)
//                 .attr("y2", 50)
//                 .attr("stroke", "green")
//                 .attr("stroke-width", 4);
//
//  var line2 = svg.append("line")
//                 .attr("x1", 88)
//                 .attr("y1", 150)
//                 .attr("x2", 362)
//                 .attr("y2", 150)
//                 .attr("stroke", "green")
//                 .attr("stroke-width", 4);
//
//  var line3 = svg.append("line")
//                 .attr("x1", 88)
//                 .attr("y1", 54)
//                 .attr("x2", 362)
//                 .attr("y2", 146)
//                 .attr("stroke", "red")
//                 .attr("stroke-width", 4);

var personRadius = 100;
var femColor2 = "#F7347A";
var malColor2 = "#4ca3dd"
var femColor = "#fFa6b1";
var malColor = "#a6c2ff";

var genderLabelData = [
	{ "x_axis": 20, "y_axis": 120, "text": "♂️:" },
	{ "x_axis": 20, "y_axis": 300, "text": "♀️:" }
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

// generates a URL to the avatar (thanks to https://getavataaars.com/)
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

function desc(numPairs) {
	personData = [];
	men = [];
	women = [];
  names = ["Jim", "Dwight", "Angela", "Pam"]
	// add men
	for (var i = 0; i < numPairs; i++) {
		personData.push({ "x_axis": 100 + i * (40 * numPairs + 200), "y_axis": 120, "radius": personRadius, "id": i, "prefs": [], "free": true, "gender": "m", "fiance": null, "url": "https://avataaars.io/?topType=ShortHairShortRound", "exes": [], "proposals": 0 });
	}
	// add women
	for (var i = 0; i < numPairs; i++) {
		personData.push({ "x_axis": 100 + i * (40 * numPairs + 200), "y_axis": 300, "radius": personRadius, "id": i, "prefs": [], "free": true, "gender": "f", "fiance": null, "url": "https://avataaars.io/", "exes": [], "proposals": 0 });
	}
	numMen = personData.length / 2;

	for (var i = 0; i < personData.length; i++) {
    // add name
    personData[i].id = names[i]

		// generate picture
		personData[i].url = generateAvatar(personData[i].gender);

	}
}
desc(2);

var svg = d3.select("#explanation").append("svg")
    .attr("width", width)
    .attr("height", height);

for (var i = 1; i <= numMen; i++) {
  var prefImgs = svg.selectAll("prefImg")
    .data(personData)
    .enter()
    .append("image")
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

// connecting lines
var link = d3.linkVertical()({
	source: [100, 165],
	target: [380, 250]
});

svg
	.append('path')
	.attr('d', link)
	.attr('stroke', 'red')
	.attr('stroke-width', 3)
	.attr('fill', 'none')
	.attr("class", "engage-line");

svg.append("line")
  .attr("x1", 100)
  .attr("y1", 165)
  .attr("x2", 100)
  .attr("y2", 250)
  .attr("stroke", "green")
  .attr("stroke-width", 3);

  svg.append("line")
    .attr("x1", 380)
    .attr("y1", 165)
    .attr("x2", 380)
    .attr("y2", 250)
    .attr("stroke", "green")
    .attr("stroke-width", 3);
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
