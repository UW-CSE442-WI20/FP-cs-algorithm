// You can require libraries
const d3 = require('d3')

// set the dimensions of the visualization
var width = 1000;
var height = 400;

// width not raidus... too lazy to change
var personRadius = 100;
var femColor2 = "#F7347A";
var malColor2 = "#4ca3dd"
var femColor = "#fFa6b1";
var malColor = "#a6c2ff";

var genderLabelData = [
	{ "x_axis": 20, "y_axis": 120, "text": "♂️:" },
	{ "x_axis": 20, "y_axis": 350, "text": "♀️:" }
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

var svg = d3.select("#identify").append("svg")
			.attr("width", width)
			.attr("height", height);
init()
function init() {
  
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
}
