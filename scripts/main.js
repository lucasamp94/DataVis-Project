// Global variable containing all the Dataset
let nutData;
let fasceEta = [0, 0, 0, 0, 0];
let idpersona = [];


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
    let product = {id:"", price:""};
    product["id"] = nutData[0].CODE;
    product["price"] = nutData[0].PRICE_KG_L;
    univokeProducts.push(product);
    for (let i = 1; i < nutData.length; i++) {
        let exist = false;
        let product = {id:"", price:""};
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
            product["price"] = nutData[i].PRICE_KG_L;
            univokeProducts.push(product);
        }
    }
    console.log(univokeProducts);
}


// D3 code
function createLeftBarChart() {

    //     // dimensions and margins of the graph
    //     let margin = {
    //         top: 5,
    //         right: 10,
    //         bottom: 5,
    //         left: 40
    //     }

    //     let width = 200 - margin.left - margin.right;
    //     let height = 200 - margin.top - margin.bottom;
    //     let altezzaBar = 30;
    //     let barPadding = 10;
    //     // ranges
    //     let x = d3.scaleLinear()
    //         .range([0, width]);

    //     let y = d3.scaleBand()
    //         .range([height, 0])
    //         .padding(0.1);

    //     // append svg object to body of the page
    //     let svg = d3.select("#persone").append("svg")
    //         .attr("id", "svg1")
    //         .attr("width", width + margin.left + margin.right)
    //         .attr("height", height + margin.top + margin.bottom)
    //         .append("g")
    //         .attr("transform", "translate(" + margin.left + "," + -5 + ")");

    //     // scale
    //     x.domain([0, d3.max(fasceEta, function (d) {
    //         return d;
    //     })]);

    //     y.domain(["60+","50-59","40-49","30-39","20-29"]);


    //     // append rectangles for the bar chart
    //     svg.selectAll(".bar")
    //         .data(fasceEta)
    //         .enter().append("rect")
    //         .attr("class", "bar")
    //         .attr("fill", "rgb(0,0,255)")
    //         .attr("width", function (d) {
    //             return x(d);
    //         })
    //         .attr("y", function (d,i) {
    //             return 150 - (140 - (altezzaBar+barPadding)*i);
    //         })
    //         .attr("height", altezzaBar);

    // //     // append text asse y
    // //     svg.selectAll("g")
    // //         .data(data)
    // //         .enter()
    // //         .append("g")
    // //         .append("text")
    // //         .attr("class", "label")
    // //         .attr("y", barHeight / 2)
    // //         .attr("dy", ".35em") //vertical align middle
    // //         .text(function(d){
    // //             return d.label;
    // //         }).each(function() {
    // //     labelWidth = Math.ceil(Math.max(labelWidth, this.getBBox().width));
    // // }); 

    //         let yAxis = d3.axisLeft()
    //             .scale(y)
    //             .ticks(5);

    //     // create Y axis
    //         d3.select("#svg1").append("g")
    //         .attr("class", "y axis")
    //         .attr("transform", "translate(0,0)")
    //         .call(yAxis)
    //         .selectAll("text")
    //         .attr("y", 0)
    //         .attr("x", 0)
    //         .attr("dy", ".35em")
    //         .style("text-anchor", "start");

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
        .attr("fill", "rgb(0,0,255)")
        .attr("height", y.bandwidth()-barPadding)
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
        .attr("fill", "rgb(0,0,255")
        .attr("x", function (d) {
            return x(d.value) + 3;
        })
        .text(function (d) {
            return d.value;
        });

    d3.select(".domain").remove();

};


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
});

