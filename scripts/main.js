// Global variable containing all the Dataset
let nutData;
let fasceEta = [0, 0, 0, 0, 0];
let idpersona = [];
let lastId = null;


function calculateAgeArray(subject, eta) {
    let flag = false;
    for (let i = 0; i < idpersona.length; i++) {
        if (subject == idpersona[i]) {  // controllo l'esistenza della persona nell'array IDENTIFICA la persona UNIVOCA
            flag = true;
        }
    }
    if (flag == false) {
        idpersona.push(subject);
        if (eta < 30) {
            fasceEta[0]++; // 20+ perché abbiamo controllato che non esistono persone di meno di 20 anni
        }
        else if (eta < 40) {
            fasceEta[1]++; //30+
        }
        else if (eta < 50) {
            fasceEta[2]++; // 40+
        }
        else if (eta < 60) {
            fasceEta[3]++; // 50+
        }
        else {
            fasceEta[4]++; // 60+
        }
    }
}


function calculateNumberOfProducts(nutData) {
    let univokeProducts = [];
    let product = { id: "", pricekgl: "", name: "", score: "" };
    product["id"] = nutData[0].CODE;
    product["pricekgl"] = nutData[0].PRICE_KG_L;
    product["name"] = nutData[0].PRODUCT;
    product["score"] = nutData[0].SCORE;
    product["kcal100g"] = nutData[0].KCAL_100G;
    product["lipides100g"] = nutData[0].LIPIDES_100G;
    product["ags100g"] = nutData[0].AGS_100G;
    product["glucides100g"] = nutData[0].GLUCIDES_100G;
    product["sucres100g"] = nutData[0].SUCRES_100G;
    product["proteines100g"] = nutData[0].PROTEINES_100G;
    product["sel100g"] = nutData[0].SEL_100G;
    product["fibres100g"] = nutData[0].FIBRES_100G;

    univokeProducts.push(product);
    for (let i = 1; i < nutData.length; i++) {
        let exist = false;
        let product = { id: "", price: "", name: "", score: "" };
        for (let j = 0; j < univokeProducts.length; j++) {

            // if ((univokeProducts[j].localeCompare(nutData[i].CODE)) == 0) {
            //     exist = true;
            //     break;
            // }
            if (univokeProducts[j]["id"] == nutData[i].CODE) {
                exist = true;
                break;
            }

        }
        if (exist == false) {
            product["id"] = nutData[i].CODE;
            product["pricekgl"] = nutData[i].PRICE_KG_L;
            product["name"] = nutData[i].PRODUCT;
            product["score"] = nutData[i].SCORE;
            product["kcal100g"] = nutData[i].KCAL_100G;
            product["lipides100g"] = nutData[i].LIPIDES_100G;
            product["ags100g"] = nutData[i].AGS_100G;
            product["glucides100g"] = nutData[i].GLUCIDES_100G;
            product["sucres100g"] = nutData[i].SUCRES_100G;
            product["proteines100g"] = nutData[i].PROTEINES_100G;
            product["sel100g"] = nutData[i].SEL_100G;
            product["fibres100g"] = nutData[i].FIBRES_100G;
            univokeProducts.push(product);
        }
    }
    //console.log(univokeProducts);
    return univokeProducts;
}



// D3 code
function createLeftBarChart() {
    var data = [{
        "name": "60+",
        "value": fasceEta[4],
    },
    {
        "name": "50-59",
        "value": fasceEta[3],
    },
    {
        "name": "40-49",
        "value": fasceEta[2],
    },
    {
        "name": "30-39",
        "value": fasceEta[1],
    },
    {
        "name": "20-29",
        "value": fasceEta[0],
    }];

    // Create left horizontal bar chart
    var margin = {
        top: 15,
        right: 25,
        bottom: 15,
        left: 35
    };
    var barPadding = 2;

    var width = 200 - margin.left - margin.right,
        height = 200 - margin.top - margin.bottom;

    var svg = d3.select("#hBarchart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleLinear()
        .range([0, width])
        .domain([0, d3.max(data, function (d) {
            return d.value;
        })]);

    var y = d3.scaleBand()
        .range([height, 0], .1)
        .domain(data.map(function (d) {
            return d.name;
        }));


    //make y axis to show bar names
    var yAxis = d3.axisLeft()
        .scale(y)
        //no tick marks
        .tickSize(0);

    var gy = svg.append("g")
        .attr("class", "label")
        .call(yAxis)

    var bars = svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("g")

    var t = d3.transition()
        .duration(1000)
        .ease(d3.easePoly);

    //append rects
    bars.append("rect")
        .attr("y", function (d) {
            return y(d.name);
        })
        .transition(t)
        .attr("class", "bar")
        .attr("fill", "#69b3a2")
        .attr("height", y.bandwidth() - barPadding)
        .attr("x", 0)
        .attr("width", function (d) {
            return x(d.value);
        });

    //add a value label to the right of each bar
    bars.append("text")
        .attr("y", function (d) {
            return y(d.name) + y.bandwidth() / 2 + 4;
        })
        .transition(t)
        .attr("class", "label")
        .attr("fill", "#69b3a2")
        .attr("x", function (d) {
            return x(d.value) + 3;
        })
        .text(function (d) {
            return d.value;
        });

    d3.select(".domain").remove();

};

// function createMidScatterplot() {
//     var margin = { top: 30, right: 50, bottom: 40, left: 40 };
//     var width = 960 - margin.left - margin.right;
//     var height = 500 - margin.top - margin.bottom;

//     var svg = d3.select('#scatterplot')
//         .append('svg')
//         .attr('width', width + margin.left + margin.right)
//         .attr('height', height + margin.top + margin.bottom)
//         .append('g')
//         .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


//     // The API for scales have changed in v4. There is a separate module d3-scale which can be used instead. The main change here is instead of d3.scale.linear, we have d3.scaleLinear.
//     var xScale = d3.scaleLinear()
//         .range([0, width]);

//     var yScale = d3.scaleLinear()
//         .range([height, 0]);

//     // square root scale.
//     var radius = d3.scaleSqrt()
//         .range([2, 5]);

//     // the axes are much cleaner and easier now. No need to rotate and orient the axis, just call axisBottom, axisLeft etc.
//     var xAxis = d3.axisBottom()
//         .scale(xScale);

//     var yAxis = d3.axisLeft()
//         .scale(yScale);

//     // again scaleOrdinal
//     var color = d3.scaleOrdinal(d3.schemeCategory20);

//     xScale.domain(d3.extent(nutData, function (d) {
//         return d.SCORE;
//     })).nice();

//     yScale.domain(d3.extent(nutData, function (d) {
//         return d.PRICE_KG_L;
//     })).nice();

//     // grandezza bubble, esempio numero di prodotti acquistati
//     // radius.domain(d3.extent(data, function (d) {
//     //     return d.PetalLength;
//     // })).nice();

//     // adding axes is also simpler now, just translate x-axis to (0,height) and it's alread defined to be a bottom axis. 
//     svg.append('g')
//         .attr('transform', 'translate(0,' + height + ')')
//         .attr('class', 'x axis')
//         .call(xAxis);

//     // y-axis is translated to (0,0)
//     svg.append('g')
//         .attr('transform', 'translate(0,0)')
//         .attr('class', 'y axis')
//         .call(yAxis);


//     var bubble = svg.selectAll('.bubble')
//         .data(nutData)
//         .enter().append('circle')
//         .attr('class', 'bubble')
//         .attr('cx', function (d) { return xScale(d.SCORE); })
//         .attr('cy', function (d) { return yScale(d.PRICE_KG_L); });
//     // .attr('r', function (d) { return radius(d.PetalLength); })
//     // .style('fill', function (d) { return color(d.Species); });

//     bubble.append('title')
//         .attr('x', function (d) { return radius(d.SCORE); })
//         .text(function (d) {
//             return d.PRODUCT;
//         });

//     // adding label. For x-axis, it's at (10, 10), and for y-axis at (width, height-10).
//     // Label Y-axis
//     svg.append('text')
//         .attr('x', 10)
//         .attr('y', 10)
//         .attr('class', 'label')
//         .text('Price €/Kg €/L');

//     // Label X-axis
//     svg.append('text')
//         .attr('x', width)
//         .attr('y', height - 10)
//         .attr('text-anchor', 'end')
//         .attr('class', 'label')
//         .text('Score FSA');

//     // // define a group element for each color i, and translate it to (0, i * 20). 
//     // var legend = svg.selectAll('legend')
//     //     .data(color.domain())
//     //     .enter().append('g')
//     //     .attr('class', 'legend')
//     //     .attr('transform', function (d, i) { return 'translate(0,' + i * 20 + ')'; });

//     // // give x value equal to the legend elements. 
//     // // no need to define a function for fill, this is automatically fill by color.
//     // legend.append('rect')
//     //     .attr('x', width)
//     //     .attr('width', 18)
//     //     .attr('height', 18)
//     //     .style('fill', color);

//     // // add text to the legend elements.
//     // // rects are defined at x value equal to width, we define text at width - 6, this will print name of the legends before the rects.
//     // legend.append('text')
//     //     .attr('x', width - 6)
//     //     .attr('y', 9)
//     //     .attr('dy', '.35em')
//     //     .style('text-anchor', 'end')
//     //     .text(function (d) { return d; });


//     // // d3 has a filter fnction similar to filter function in JS. Here it is used to filter d3 components.
//     // legend.on('click', function (type) {
//     //     d3.selectAll('.bubble')
//     //         .style('opacity', 0.15)
//     //         .filter(function (d) {
//     //             return d.Species == type;
//     //         })
//     //         .style('opacity', 1);
//     // })


// };

function createMidScatterplot2() {

    let nutProducts = calculateNumberOfProducts(nutData);

    // set the dimensions and margins of the graph
    var margin = { top: 10, right: 30, bottom: 30, left: 60 },
        width = 460 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#scatterplot")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");


    // Add X axis
    var x = d3.scaleLinear()
        .domain([d3.min(nutProducts, function (d) { return d.score - 3; }), d3.max(nutProducts, function (d) { return d.score + 3; })])
        .range([0, width]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([d3.min(nutProducts, function (d) { return d.pricekgl; }), d3.max(nutProducts, function (d) { return d.pricekgl + 1.33; })])
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));


    // Add dots

    svg.append('g')
        .selectAll("dot")
        .data(nutProducts)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return x(d.score); })
        .attr("cy", function (d) { return y(d.pricekgl); })
        .attr("r", 3)
        .attr("id", function (d) { return d.id; })
        .style("fill", "#69b3a2")
        .on("mouseover", function () {
            if (lastId != null) {
                d3.select('[id='+'\"'+lastId+'\"'+']').style("fill", "#69b3a2");
                d3.select('[id='+'\"'+lastId+'\"'+']').attr("r", 3);
                //console.log("id selezionato: ", event.target.id);
            }
            //console.log("last id: ", lastId);
            d3.select(this).style("fill", "red");
            d3.select(this).attr("r", 3*2);
            loadInfo(nutProducts, event.target.id);
            lastId = event.target.id;
        })


    // Label Y-axis
    svg.append('text')
        .attr('x', 10)
        .attr('y', 10)
        .attr('class', 'label')
        .text('Price €/Kg €/L');

    // Label X-axis
    svg.append('text')
        .attr('x', width)
        .attr('y', height - 10)
        .attr('text-anchor', 'end')
        .attr('class', 'label')
        .text('Score FSA');
}

function loadInfo(nutProducts, dotId) {
    for (let i = 0; i < nutProducts.length; i++) {
        if (nutProducts[i].id == dotId) {
            document.getElementById("name").innerHTML = nutProducts[i].name;
            document.getElementById("score").innerHTML = nutProducts[i].score;
            document.getElementById("pricekgl").innerHTML = nutProducts[i].pricekgl + " €";
            document.getElementById("energy").innerHTML = nutProducts[i].kcal100g + " Kcal";
            document.getElementById("protein").innerHTML = nutProducts[i].proteines100g + " g";
            document.getElementById("glucides").innerHTML = nutProducts[i].glucides100g + " g";
            document.getElementById("sucres").innerHTML = nutProducts[i].sucres100g + " g";
            document.getElementById("lipides").innerHTML = nutProducts[i].lipides100g + " g";
            document.getElementById("ags").innerHTML = nutProducts[i].ags100g + " g";
            document.getElementById("fibers").innerHTML = nutProducts[i].fibres100g + " g";
            document.getElementById("salt").innerHTML = nutProducts[i].sel100g + " g";
            
        }
    }
}


// Load CSV file
d3.csv("data/dc.csv", function (error, csv) {
    if (error) {
        console.log(error);  //Log the error.
        throw error;
    }
    console.log('helloworld');
    csv.forEach(function (d) {

        // Convert numeric values to 'numbers'
        d.SUBJECT = +d.subject;
        // date
        // session
        d.QN_SCORE = +d.QN_score;
        d.AGE = +d.age;
        d.FAMILYSIZE = +d.familysize;
        // children

        // female
        d.BOUGHTPRODUCT = +d.boughtproduct;
        d.CODE = +d.code;
        d.QUANTITY = +d.quantity; // 6 bottiglie
        d.NPRODUCTS = +d.Nproducts; // 1 cesta di acqua
        d.NITEM = +d.Nitem; // quantity * nproducts = 6*1 = 6 total items
        d.CADDY = +d.caddy;
        // bought
        // disp
        // ingr
        // nutr
        // Ndisp
        // Ningr
        // Nnutr
        d.PRICE_KG_L = +d.Price_kg_l;
        d.PRICE = +d.price;
        d.WEIGHT = +d.weight;

        d.KCAL_100G = +d.Kcal_100g;
        d.LIPIDES_100G = +d.Lipides_100g;
        d.AGS_100G = +d.AGS_100g;
        d.GLUCIDES_100G = +d.Glucides_100g;
        d.SUCRES_100G = +d.Sucres_100g;
        d.PROTEINES_100G = +d.Proteines_100g;
        d.SEL_100G = +d.Sel_100g;
        d.FIBRES_100G = +d.Fibres_100g;
        d.KCAL_PORTION = +d.kcal_portion;
        d.KCAL_POURCENT = +d.Kcal_pourcent;
        d.LIPIDES_PORTION = +d.Lipides_portion;
        d.LIPIDES_POURCENT = +d.Lipides_pourcent;
        d.AGS_PORTION = +d.AGS_portion;
        d.AGS_POURCENT = +d.AGS_pourcent;
        d.SUCRE_PORTION = +d.Sucre_portion;
        d.SUCRE_POURCENT = +d.Sucre_pourcent;
        d.SEL_PORTION = +d.Sel_portion;
        d.SEL_POURCENT = +d.Sel_pourcent;
        // lim, non presente in csv

        // labels
        d.SCORE = +d.score; // score FSA
        d.NUTRISCORE = [d.NutriScore_color, d.NutriScore_letter];
        d.TRAFFICLIGHT = [d.TL_fat_color, d.TL_AGS_color, d.TL_sugar_color, d.TL_salt_color];
        d.NUTRISCOREPARTIAL = [d.NutriScore_partial_color, d.NutriScore_partial_letter];


        //Break up lists into javascript arrays
        d.INCOME = d.income;
        d.TREATMENT = d.treatment;
        d.PROFESSION = d.profession;
        d.PRODUCT = d.product;
        d.BRAND = d.brand;
        d.UNIT_PRIX_KG_L = d.Unit_prix_kg_l;
        d.UNIT_WEIGHT = d.unit_weight;
        // portion


        // Function that checks Subject uniqueness
        calculateAgeArray(d.SUBJECT, d.AGE);


    });

    // Store csv data in a global variable
    nutData = csv;

    console.log(idpersona);
    console.log(nutData);

    calculateNumberOfProducts(nutData);
    createLeftBarChart();
    createMidScatterplot2();
});

