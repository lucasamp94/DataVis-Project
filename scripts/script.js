// Global var for FIFA world cup data
var allWorldCupData;
var projection;

/**
 * Render and update the bar chart based on the selection of the data type in the drop-down box
 *
 * @param selectedDimension a string specifying which dimension to render in the bar chart
 */
function createBarChart(selectedDimension) {

    var idwc;

    //var svgBounds = d3.select("#barChart").node().getBoundingClientRect();
    var xpad = 100;
    var ypad = 70;
    var barPadding = 5;

    var data = [];
    var year = [];

    if (selectedDimension == 'attendance') {
        for (var i = 0; i < allWorldCupData.length; i++) {
            data[allWorldCupData.length - i - 1] = allWorldCupData[i].attendance;
            year[allWorldCupData.length - i - 1] = allWorldCupData[i].year;
        }
    } else if (selectedDimension == "teams") {
        for (var i = 0; i < allWorldCupData.length; i++) {
            data[allWorldCupData.length - i - 1] = allWorldCupData[i].teams;
            year[allWorldCupData.length - i - 1] = allWorldCupData[i].year;
        }
    } else if (selectedDimension == "matches") {
        for (var i = 0; i < allWorldCupData.length; i++) {
            data[allWorldCupData.length - i - 1] = allWorldCupData[i].matches;
            year[allWorldCupData.length - i - 1] = allWorldCupData[i].year;
        }
    } else if (selectedDimension == "goals") {
        for (var i = 0; i < allWorldCupData.length; i++) {
            data[allWorldCupData.length - i - 1] = allWorldCupData[i].goals;
            year[allWorldCupData.length - i - 1] = allWorldCupData[i].year;
        }
    }

    // console.log(data);
    // console.log(year);

    // ******* TODO: PART I *******

    // Create the x and y scales; make
    // sure to leave room for the axes

    var margin = { top: 0, right: 0, bottom: 70, left: 100 };
    var w = 500 - margin.left - margin.right;
    var h = 400 - margin.top - margin.bottom;

    var yearAxis = d3.scaleBand()
        .range([0, w - ypad])
        //.domain([year.forEach(function (d) { return d; })])
        .domain([1930, 1934, 1938, 1950, 1954, 1958, 1962, 1966, 1970, 1974, 1978, 1982, 1986, 1990, 1994, 1998, 2002, 2006, 2010, 2014]);

    var xScale = d3.scaleLinear()
        .range([0, w - ypad])
        .domain([0, year.length]);

    var yScale = d3.scaleLinear()
        .range([h, 0])
        .domain([0, d3.max(data, function (d) { return d; })]);

    // Create colorScale

    var colorScale = d3.scaleLinear()
        .domain([0, d3.max(data, function (d) { return d; })])
        .range([h, 0]); // continuare (?)

    // Create the axes (hint: use #xAxis and #yAxis)

    // add the x Axis
    var xAxis = d3.select("#xAxis").append("g")
        .attr("transform", "translate(" + xpad + "," + h + ")")
        .call(d3.axisBottom(yearAxis));

    xAxis.selectAll("text")
        .attr("x", 10)
        .attr("y", 0)
        .attr("transform", "rotate(70)")
        .style("text-anchor", "start");

    // add the y Axis
    d3.select("#yAxis").append("g")
        .attr("transform", "translate(" + xpad + ",0)")
        .call(d3.axisLeft(yScale));


    // Update & Exit Axis

    d3.select("#xAxis")
        .call(d3.axisBottom(yearAxis))
        .selectAll("text")
        .attr("x", 10)
        .attr("y", 0)
        .attr("transform", "rotate(70)")
        .style("text-anchor", "start");

    d3.select("#yAxis")
        .transition(t)
        .call(d3.axisLeft(yScale));


    // Create the bars (hint: use #bars) lol

    var svg = d3.select("#bars").append("svg")
        .attr("width", w + margin.left + margin.right)
        .attr("height", h + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("id", function (d, i) {
            return year[i];
        })
        .attr("x", function (d, i) {
            return (xScale(i));
        })
        .attr("y", function (d) {
            return (yScale(d));
        })
        .attr("width", w / data.length - barPadding)
        .attr("height", function (d) {
            return (h - yScale(d));
        })
        .attr("fill", function (d, i) {
            return "rgb(0,0," + colorScale(d) + ")";
        })
        .on("click", function () {
            d3.selectAll("rect").attr("fill", function (d, i) {
                return "rgb(0,0," + colorScale(d) + ")";
            });
            d3.select(this).attr("fill", "red");
            idwc = event.target.id;
            //console.log(idwc);
            updateInfo(idwc);
        });

    // Exit bars
    d3.select("#bars").selectAll("rect").data(data).exit().remove();

    // Update bars
    var t = d3.transition()
        .duration(300)
        .ease(d3.easePoly);

    d3.select("#bars")
        .selectAll("rect")
        .data(data)
        .transition(t)
        .attr("x", function (d, i) {
            return (xScale(i));
        })
        .attr("y", function (d) {
            return (yScale(d));
        })
        .attr("width", w / data.length - barPadding)
        .attr("height", function (d) {
            return (h - yScale(d));
        })
        .attr("fill", function (d, i) {
            return "rgb(0,0," + colorScale(d) + ")";
        });


    // ******* TODO: PART II *******

    // Implement how the bars respond to click events
    // Color the selected bar to indicate it has been selected.
    // Make sure only the selected bar has this new color.

    // Call the necessary update functions for when a user clicks on a bar.
    // Note: think about what you want to update when a different bar is selected.


}

/**
 *  Check the drop-down box for the currently selected data type and update the bar chart accordingly.
 *
 *  There are 4 attributes that can be selected:
 *  goals, matches, attendance and teams.
 */
function chooseData(v) {

    console.log(v);


    // ******* TODO: PART I *******
    // Change the selected data when a user selects a different
    // menu item from the drop down.
    createBarChart(v);
}

/**
 * Update the info panel to show info about the currently selected world cup
 *
 * @param oneWorldCup the currently selected world cup
 */
function updateInfo(oneWorldCup) {

    // ******* TODO: PART III *******

    // Update the text elements in the infoBox to reflect:
    // World Cup Title, host, winner, runner_up, and all participating teams that year

    // Hint: For the list of teams, you can create an list element for each team.
    // Hint: Select the appropriate ids to update the text content.

    //console.log(oneWorldCup);

    // Delete old info
    var list = document.getElementById("teamlist");
    if (list != null) {
        while (list.firstChild) {
            list.removeChild(list.firstChild);
        }
    }

    // Retrieve index of the selected bar
    var index = 0;
    for (var i = 0; i < allWorldCupData.length; i++) {
        if (oneWorldCup == allWorldCupData[i].year) {
            index = i;
            break;
        }
    }

    // Info
    document.getElementById("edition").innerHTML = allWorldCupData[index].EDITION;
    document.getElementById("host").innerHTML = allWorldCupData[index].host;
    document.getElementById("winner").innerHTML = allWorldCupData[index].winner;
    document.getElementById("silver").innerHTML = allWorldCupData[index].runner_up;


    // List of Teams
    for (var i = 0; i < allWorldCupData[index].teams_names.length; i++) {
        var point = document.createElement("li");
        var team = document.createTextNode(allWorldCupData[index].teams_names[i]);
        point.appendChild(team);
        document.getElementById("teamlist").appendChild(point);
    }

}

/**
 * Renders and updates the map and the highlights on top of it
 *
 * @param the json data with the shape of all countries
 */
function drawMap(world) {

    //(note that projection is global!
    // updateMap() will need it to add the winner/runner_up markers.)

    projection = d3.geoConicConformal().scale(150).translate([400, 350]);

    // ******* TODO: PART IV *******

    // Draw the background (country outlines; hint: use #map)
    // Make sure and add gridlines to the map

    // Hint: assign an id to each country path to make it easier to select afterwards
    // we suggest you use the variable in the data element's .id field to set the id

    // Make sure and give your paths the appropriate class (see the .css selectors at
    // the top of the provided html file)
    var graticule = d3.geoGraticule();
    var path = d3.geoPath().projection(projection);
    d3.select("#map")
        .append("path")
        .datum(graticule)
        .attr("class", "grat")
        .attr("d", path);

    d3.select("#map")
        .selectAll("path")
        .data(topojson.feature(world, world.objects.countries).features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("class", "countries")
        .attr("id", function (d) {
            //console.log(d);
            return d.id;
        });
}

/**
 * Clears the map
 */
function clearMap() {

    // ******* TODO: PART V*******
    //Clear the map of any colors/markers; You can do this with inline styling or by
    //defining a class style in styles.css

    //Hint: If you followed our suggestion of using classes to style
    //the colors and markers for hosts/teams/winners, you can use
    //d3 selection and .classed to set these classes on and off here.
    d3.select("#points")
        .selectAll("circle")
        .remove();

    d3.select("#map")
        .select(".host")
        .attr("class", "countries");

    d3.select("#map").
        selectAll(".team")
        .attr("class", "countries");

}


/**
 * Update Map with info for a specific FIFA World Cup
 * @param the data for one specific world cup
 */
function updateMap(worldcupData) {

    //Clear any previous selections;
    clearMap();

    // ******* TODO: PART V *******

    // Add a marker for the winner and runner up to the map.

    //Hint: remember we have a conveniently labeled class called .winner
    // as well as a .silver. These have styling attributes for the two
    //markers.

    var index = 0;
    for (var i = 0; i < allWorldCupData.length; i++) {

        if (worldcupData == allWorldCupData[i].year) {
            index = i;
            break;
        }
    }

    //Select the host country and change it's color accordingly.

    // Winner ??? perché non stampa i cerchi?
    var coordinates = projection([allWorldCupData[index].win_pos[0], allWorldCupData[index].win_pos[1]]);
    d3.select("#points")
        .append("circle")
        .attr("cx", coordinates[0])
        .attr("cy", coordinates[1])
        .attr("r", 8)
        .attr("class", 'gold');

    // Silver
    var coordinates = projection([allWorldCupData[index].ru_pos[0], allWorldCupData[index].ru_pos[1]]);
    d3.select("#points")
        .append("circle")
        .attr("cx", coordinates[0])
        .attr("cy", coordinates[1])
        .attr("r", 8)
        .attr("class", 'silver');


    document.getElementById(allWorldCupData[index].host_country_code).setAttribute("class", 'host');

    //Iterate through all participating teams and change their color as well.

    for (var i = 0; i < allWorldCupData[index].teams_iso.length; i++)
        document.getElementById(allWorldCupData[index].teams_iso[i]).setAttribute("class", 'team');


    //We strongly suggest using classes to style the selected countries.



}

/* DATA LOADING */

// This is where execution begins; everything
// above this is just function definitions
// (nothing actually happens)
//Load in json data to make map

d3.json("data/world.json", function (error, world) {
    if (error) {
        console.log(error);  //Log the error.
        throw error;
    }

    drawMap(world);
});


// Load CSV file
d3.csv("data/fifa-world-cup.csv", function (error, csv) {
    if (error) {
        console.log(error);  //Log the error.
        throw error;
    }

    csv.forEach(function (d) {

        // Convert numeric values to 'numbers'
        d.year = +d.YEAR;
        d.teams = +d.TEAMS;
        d.matches = +d.MATCHES;
        d.goals = +d.GOALS;
        d.avg_goals = +d.AVERAGE_GOALS;
        d.attendance = +d.AVERAGE_ATTENDANCE;
        //Lat and Lons of gold and silver medals teams
        d.win_pos = [+d.WIN_LON, +d.WIN_LAT];
        d.ru_pos = [+d.RUP_LON, +d.RUP_LAT];

        //Break up lists into javascript arrays
        d.teams_iso = d3.csvParse(d.TEAM_LIST).columns;
        d.teams_names = d3.csvParse(d.TEAM_NAMES).columns;

    });

    // Store csv data in a global variable
    allWorldCupData = csv;
    // Draw the Bar chart for the first time
    createBarChart('attendance');

    console.log(allWorldCupData);
});
