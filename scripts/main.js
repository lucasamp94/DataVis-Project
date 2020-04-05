// Global variable containing all the Dataset
let nutData;

let fasceEta = [100, 25, 25, 50, 25];
let idpersona = [];


function calculateAgeArray(subject, eta) {
    let flag = false;
    for (let i = 0; i < idpersona.length; i++) {
        if (subject == idpersona[i]) {  // controllo l'esistenza della persona nell'array
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


// D3 code
function createLeftBarChart() {

    // dimensions and margins of the graph
    let margin = {
        top: 5,
        right: 10,
        bottom: 5,
        left: 20
    }

    let width = 200 - margin.left - margin.right;
    let height = 200 - margin.top - margin.bottom;
    let altezzaBar = 30;
    // ranges
    let x = d3.scaleLinear()
        .range([0, width]);

    let y = d3.scaleBand()
        .range([height, 0])
        .padding(0.1);

    // append svg object to body of the page
    let svg = d3.select("#persone").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // scale
    x.domain([0, d3.max(fasceEta, function (d) {
        return d;
    })]);
    y.domain(fasceEta.map(function (d) {
        return d;                           // <--- Check qua, guardare esercizi prof per BARCHAR ORIZZONTALE
    }));

    // append rectangles for the bar chart
    svg.selectAll(".bar")
        .data(fasceEta)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("width", function (d) {
            return x(d);
        })
        .attr("y", function (d) {
            return 200 - altezzaBar - y(d); // <--- PROBLEMA QUI o su asse Y in generale
                                            // creare append per il g TEXT + BAR
        })
        .attr("height", altezzaBar);


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
        d.SCORE = +d.score;
        // lim, non presente in csv

        // labels
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
        //calculateAgeArray(d.SUBJECT, d.AGE);
    });

    // Store csv data in a global variable
    nutData = csv;
    // Draw the Bar chart for the first time
    console.log(fasceEta);
    console.log(idpersona);
    console.log(nutData);
    createLeftBarChart();
});

