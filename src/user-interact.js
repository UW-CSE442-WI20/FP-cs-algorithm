// You can require libraries
const d3 = require('d3')

WebFont.load({
    google: {
        families: ['Nunito']
    }
});

var started = false;

// set the dimensions of the visualization
// todo: width should be dynamic
var width = 1650;
var height = 500;

// width not raidus... too lazy to change
var personRadius = 100;
var femColor2 = "#F7347A";
var malColor2 = "#4ca3dd"
var femColor = "#fFa6b1";
var malColor = "#a6c2ff";

var genderLabelData = [
    {"x_axis": 20, "y_axis": 120, "text": "♂️:"},
    {"x_axis": 20, "y_axis": 350, "text": "♀️:"}
];

// user should be able to edit prefs
var personData = [];
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
var skins = ["Pale", "Light", "Brown", "DarkBrown"];

// 150 most common male and female names
var femaleNames = ["Emily","Hannah","Madison","Ashley","Sarah","Alexis","Samantha","Jessica","Elizabeth","Taylor","Lauren","Alyssa","Kayla","Abigail","Brianna","Olivia","Emma","Megan","Grace","Victoria","Rachel","Anna","Sydney","Destiny","Morgan","Jennifer","Jasmine","Haley","Julia","Kaitlyn","Nicole","Amanda","Katherine","Natalie","Hailey","Alexandra","Savannah","Chloe","Rebecca","Stephanie","Maria","Sophia","Mackenzie","Allison","Isabella","Amber","Mary","Danielle","Gabrielle","Jordan","Brooke","Michelle","Sierra","Katelyn","Andrea","Madeline","Sara","Kimberly","Courtney","Erin","Brittany","Vanessa","Jenna","Jacqueline","Caroline","Faith","Makayla","Bailey","Paige","Shelby","Melissa","Kaylee","Christina","Trinity","Mariah","Caitlin","Autumn","Marissa","Breanna","Angela","Catherine","Zoe","Briana","Jada","Laura","Claire","Alexa","Kelsey","Kathryn","Leslie","Alexandria","Sabrina","Mia","Isabel","Molly","Leah","Katie","Gabriella","Cheyenne","Cassandra","Tiffany","Erica","Lindsey","Kylie","Amy","Diana","Cassidy","Mikayla","Ariana","Margaret","Kelly","Miranda","Maya","Melanie","Audrey","Jade","Gabriela","Caitlyn","Angel","Jillian","Alicia","Jocelyn","Erika","Lily","Heather","Madelyn","Adriana","Arianna","Lillian","Kiara","Riley","Crystal","Mckenzie","Meghan","Skylar","Ana","Britney","Angelica","Kennedy","Chelsea","Daisy","Kristen","Veronica","Isabelle","Summer","Hope","Brittney","Lydia","Hayley","Evelyn","Anushka"];
var maleNames = ["Jacob","Michael","Matthew","Joshua","Christopher","Nicholas","Andrew","Joseph","Daniel","Tyler","William","Brandon","Ryan","John","Zachary","David","Anthony","James","Justin","Alexander","Jonathan","Christian","Austin","Dylan","Ethan","Benjamin","Noah","Samuel","Robert","Nathan","Cameron","Kevin","Thomas","Jose","Hunter","Jordan","Kyle","Caleb","Jason","Logan","Aaron","Eric","Brian","Gabriel","Adam","Jack","Isaiah","Juan","Luis","Connor","Charles","Elijah","Isaac","Steven","Evan","Jared","Sean","Timothy","Luke","Cody","Nathaniel","Alex","Seth","Mason","Richard","Carlos","Angel","Patrick","Devin","Bryan","Cole","Jackson","Ian","Garrett","Trevor","Jesus","Chase","Adrian","Mark","Blake","Sebastian","Antonio","Lucas","Jeremy","Gavin","Miguel","Julian","Dakota","Alejandro","Jesse","Dalton","Bryce","Tanner","Kenneth","Stephen","Jake","Victor","Spencer","Marcus","Paul","Brendan","Jeremiah","Xavier","Jeffrey","Tristan","Jalen","Jorge","Edward","Riley","Wyatt","Colton","Joel","Maxwell","Aidan","Travis","Shane","Colin","Dominic","Carson","Vincent","Derek","Oscar","Grant","Eduardo","Peter","Henry","Parker","Hayden","Collin","George","Bradley","Mitchell","Devon","Ricardo","Shawn","Taylor","Nicolas","Francisco","Gregory","Liam","Kaleb","Preston","Erik","Owen","Omar","Diego","Dustin","Corey","Fernando","Clayton","Judah","Joon","Ruthvik"];

function assignPrefs() {
    for (var i = 0; i < personData.length; i++) {
        if (personData[i].gender == "m") {
            personData[i].prefs = [...women]; // copy array

        } else {
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

newPersonData(4);
function newPersonData(numPairs) {
	personData = [];
	men = [];
	women = [];
	var x_offset = 100;
	if (numPairs == 1) {
		x_offset = 590;
	}
	else if (numPairs == 2) {
		x_offset = 470;
	}
	else if (numPairs == 3) {
		x_offset = 310;
	}
	else if (numPairs == 4) {
		x_offset = 100;
	}
	// add men
	for (var i = 0; i < numPairs; i++) {
		personData.push({ "x_axis": x_offset + i * (40 * numPairs + 120), "y_axis": 120, "radius": personRadius, "id": i, "prefs": [], "free": true, "gender": "m", "fiance": null, "url": "https://avataaars.io/?topType=ShortHairShortRound", "exes": [], "proposals": 0 });
	}
	// add women
	for (var i = 0; i < numPairs; i++) {
		personData.push({ "x_axis": x_offset + i * (40 * numPairs + 120), "y_axis": 350, "radius": personRadius, "id": i, "prefs": [], "free": true, "gender": "f", "fiance": null, "url": "https://avataaars.io/", "exes": [], "proposals": 0 });
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
}

var svg;
init();
function init() {
	if (svg != null) {
		svg.selectAll("*").remove();
		svg.attr("width", width);
	}
	else {
		svg = d3.select("#user-interact").append("svg")
			.attr("width", width)
			.attr("height", height);
	}

	// define image filters here
	var bright = svg.append("defs")
		.append("filter")
		.attr("id", "brightness")
		.append("feComponentTransfer")
	bright.append("feFuncR").attr("type", "linear").attr("slope", "1.2");
	bright.append("feFuncG").attr("type", "linear").attr("slope", "1.2");
	bright.append("feFuncB").attr("type", "linear").attr("slope", "1.2");

	// person preference lists (4 prefs per person)
	for (var i = 1; i <= numMen; i++) {
		// display rectangles
		var prefSquares = svg.selectAll("prefSquare")
			.data(personData)
			.enter()
			.append("rect")
		var rectAttributes = prefSquares
			.attr("x", function (d) {
				return d.x_axis + 40 * i - 1;
			})
			.attr("y", function (d) {
				return d.y_axis - 20;
			})
			.attr("width", function (d) {
				return 40;
			})
			.attr("height", function (d) {
				return 40;
			})
			.attr("fill", function (d) {
				if (d.proposals > i - 1) {
					return "#70a0a6";
				} else {
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
			.attr("x", function (d) {
				return d.x_axis + 40 * i + 18;
			})
			.attr("y", function (d) {
				return d.y_axis + 40;
			})
			.text(function (d) {
				// get pref from personData
				return d.prefs[i - 1].charAt(0);
			})
			.attr("font-family", "Nunito, sans-serif")
			.attr("font-size", "22px")
			.attr("text-anchor", "middle")
			.attr("fill", function (d) {
				return d.gender == "m" ? femColor : malColor
			})
			.attr("class", "pref-text" + i);
	}

	for (var i = 1; i <= numMen; i++) {

		var prefImgs = svg.selectAll("prefImg")
			.data(personData)
			.enter()
			.append("image")
		var rectAttributes = prefImgs
			.attr("x", function (d) {
				return d.x_axis + 40 * i - 6;
			})
			.attr("y", function (d) {
				return d.y_axis - 37;
			})
			.attr("width", function (d) {
				return 50;
			})
			.attr("height", function (d) {
				return 60;
			})
			.attr("xlink:href", function (d) {
				var person = personData[personData.findIndex(p => p.id == d.prefs[i - 1])];
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
		.attr("x", function (d) {
			return d.x_axis - d.radius / 2;
		})
		.attr("y", function (d) {
			return d.y_axis - d.radius / 2 - 10;
		})
		.attr("width", function (d) {
			return d.radius;
		})
		.attr("xlink:href", function (d) {
			return d.url + "&avatarStyle=Circle";
		})
		.attr("class", "person-circle")
		.on("click", function (d) {
			if (started) {
				// no need
			} else {
				if (!selecting) {
					// should indicate selection somehow
				}
				onCircleClick(d);
			}
		})
		.on("mouseover", function (d, i) {
			d3.select(this).transition()
				.duration('200')
				.attr('filter', 'url(#brightness)');
		})
		.on("mouseout", function (d, i) {
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
		.attr("x", function (d) {
			return d.x_axis;
		})
		.attr("y", function (d) {
			if (d.gender == "m") {
				return d.y_axis - 58;
			} else {
				return d.y_axis + 70;
			}
		})
		.text(function (d) {
			return d.id;
		})
		.attr("font-family", "Nunito, sans-serif")
		.attr("font-size", "30px")
		.attr("text-anchor", "middle")
		.attr("fill", function (d) {
			return d.gender == "m" ? malColor2 : femColor2
		})
		.attr("class", "person-label");


	// gender labels
	var genderLabelText = svg.selectAll("genderText")
		.data(genderLabelData)
		.enter()
		.append("text");
	var genderLabels = genderLabelText
		.attr("x", function (d) {
			return d.x_axis;
		})
		.attr("y", function (d) {
			return d.y_axis + 14;
		})
		.text(function (d) {
			return d.text;
		})
		.attr("font-family", "Nunito, sans-serif")
		.attr("font-size", "40px")
		.attr("text-anchor", "middle")
		.attr("fill", "black");

	var alertText = svg
		.append("text")
		.attr("x", 610)
		.attr("y", 480)
		.text( function () { return alertText; })
		.attr("font-family", "Nunito, sans-serif")
		.attr("font-size", "35px")
		.attr("fill", "black")
		.attr("stroke", "none")
		.style("text-anchor", "middle")
		.attr("class", "alertText");
}

var curManIndex = null;

var currentAlert = "";
function solutionNextStep() {
    if(!getMatches()) {
        currentAlert = "Incomplete number of matches. Please finish matching first.";
        updateAlert(currentAlert);
    } else {
        for(var i = 0; i < numMen; i++) {
            var woman = personData[personData.length - 1 - i];
            var higher = woman.prefs.slice(0, woman.prefs.indexOf(woman.fiance));
            for(var j = 0; j < higher.length; j++) {
                var man = personData[personData.findIndex(p => p.id == higher[j])];
                if(man.prefs.indexOf(woman.id) < man.prefs.indexOf(man.fiance)){
                    currentAlert = "Matching failed. Try again.";
                    updateAlert(currentAlert);
                    return;
                }
            }
        }
        currentAlert = "Matching successful. Everyone now has a match.";
        updateAlert(currentAlert);
    }
}

function getMatches() {
    for(var i = 0; i < personData.length; i++) {
        if(personData[i].free) {
            return false;
        }
    }
    return true;
}

function propose(manId, womanId) {
    var man = personData[personData.findIndex(p => p.id == manId)];
    var woman = personData[personData.findIndex(p => p.id == womanId)];
    if(woman.id == man.fiance) {
        return;
    }
	if (!man.free) {
		var prevGf = personData[personData.findIndex(p => p.id == man.fiance)]
		prevGf.free = true;
		prevGf.fiance = null;
		prevGf.proposals = 0;
	}
	if (!woman.free) {
		var oldGuy = personData[personData.findIndex(p => p.id == woman.fiance)]
		oldGuy.free = true;
		oldGuy.fiance = null;
		oldGuy.proposals = 0;
	}
	makeEngaged(man, woman);
}

function makeEngaged(man, woman) {
    // update data
    man.free = false;
    woman.free = false;
    man.fiance = woman.id;
    woman.fiance = man.id;
	man.proposals = man.prefs.indexOf(woman.id) + 1;
	woman.proposals = woman.prefs.indexOf(man.id) + 1;
    updateVis();
}

function updateAlert(alertText) {
    svg.selectAll(".alertText")
        .data(personData)
        .each(function(d) {
            d3.select(this).text(alertText);
        });
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
            .each(function (d) {
                if (d.prefs[i - 1] == null) {
                    d3.select(this).text("");
                } else {
                    d3.select(this).text(d.prefs[i - 1].charAt(0));
                }
            });
        svg.selectAll(".pref-square" + i)
            .data(personData)
            .attr("fill", function (d) {
                if (d.proposals == i) {
                    return "#70a0a6";
                } else {
                    return "#b0e0e6";
                }
            });
        svg.selectAll(".pref-img" + i)
            .data(personData)
            .attr("xlink:href", function (d) {
                if (d.prefs[i - 1] == null) {
                    return null;
                } else {
                    var person = personData[personData.findIndex(p => p.id == d.prefs[i - 1])];
                    return person.url;
                }
            });
    }

    // add lines to engaged couples
    // warning: the code you are about to see is very dumb. i dont know how to do it the right way
    svg.selectAll(".engage-line").remove();
    for (var i = 0; i < numMen; i++) {
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

function displayText(txt, time) {
    setInterval(function () {
        alert("Hello");
    }, time);
}

var selecting = false;
var selectPerson = null;

function onCircleClick(d) {
    let temp;
    if (selecting) {
        if (d.gender != selectPerson.gender) {
            if (selectPerson.gender != 'm') {
                temp = d;
                d = selectPerson;
                selectPerson = temp;
            }
            propose(selectPerson.id, d.id);
            if(currentAlert != "") {
                currentAlert = "";
                updateAlert(currentAlert);
            }
            selecting = false;
        } else {
            selectPerson = d;
        }
    } else {
        selecting = true;
        selectPerson = d;
        updateVis();
    }
}

// on reset button click
function reset() {
    // reset proposals/partners
    for (var i = 0; i < personData.length; i++) {
        personData[i].fiance = null;
        personData[i].free = true;
        personData[i].proposals = 0;
    }
    curManIndex = null;
    started = false;
    updateAlert();
    updateVis();
}

d3.select("#check-work").on("click", solutionNextStep);
d3.select("#try-reset").on("click", reset);
d3.select('#pairs2').on('change', function() {
	var value = d3.select(this).property('value');
    newPersonData(value);
	init();
	reset();
	if (value == 5) {
		d3.select('#pairswarning3').style("display", "block");
		d3.select("#user-interact").style("width", "1650px");
	}
	else {
		d3.select('#pairswarning3').style("display", "none");
		d3.select("#user-interact").style("width", "1200px");
	}
});
d3.select("#try-new").on("click", function() {
	newPersonData(numMen);
	init();
	reset();
});

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
        } else if (prefStr.split('').sort().join('') != womenNames.split('').sort().join('')) {
            alert("Error. Make sure you are including the correct names, and that each name appears once.");
        } else {
            successfulInput = true;
        }
    } else {
        var menNames = "";
        for (var i = 0; i < numMen; i++) {
            menNames += personData[i].id;
        }
        prefStr = prompt("Input the preference list for " + d.id + " like so: " + menNames
            + "\nEach letter represents a different man. You cannot repeat or exclude a name.").toUpperCase();
        if (prefStr.length != numMen) {
            alert("Error. You must have " + numMen + " names in your input.");
        } else if (prefStr.split('').sort().join('') != menNames.split('').sort().join('')) {
            alert("Error. Make sure you are including the correct names, and that each name appears once.");
        } else {
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
