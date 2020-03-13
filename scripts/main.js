// Load CSV file
d3.csv("data/dc.csv", function (error, csv) {
    if (error) {
        console.log(error);  //Log the error.
        throw error;
    }

    csv.forEach(function (d) {

        // Convert numeric values to 'numbers'
        d.subject = +d.SUBJECT;
        // date
        // session
        d.qn_score = +d.QN_SCORE;
        d.age = +d.AGE;
        d.familysize = +d.FAMILYSIZE;
        // children
        d.income = +d.INCOME;
        // female
        d.boughtproduct = +d.BOUGHTPRODUCT;
        d.code = +d.CODE;
        d.quantity = +d.QUANTITY; // 6 bottiglie
        d.nproducts = +d.NPRODUCTS; // 1 cesta di acqua
        d.nitem = +d.NITEM; // quantity * nproducts = 6*1 = 6 total items
        d.caddy = +d.CADDY; 
        // bought
        // disp
        // ingr
        // nutr
        // Ndisp
        // Ningr
        // Nnutr
        d.price_kg_l = +d.PRICE_KG_L;
        d.price = +d.PRICE;
        d.weight = +d.WEIGHT;

        d.kcal_100g = +d.KCAL_100G;
        d.lipides_100g = +d.LIPIDES_100G;
        d.ags_100g = +d.AGS_100G;
        d.glucides_100g = +d.GLUCIDES_100G;
        d.sucres_100g = +d.SUCRES_100G;
        d.proteines_100g = +d.PROTEINES_100G;
        d.sel_100g = +d.SEL_100G;
        d.fibres_100g = +d.FIBRES_100G;
        d.kcal_portion = +d.KCAL_PORTION;
        d.kcal_pourcent = +d.KCAL_POURCENT;
        d.lipides_portion = +d.LIPIDES_PORTION;
        d.lipides_pourcent = +d.LIPIDES_POURCENT;
        d.ags_portion = +d.AGS_PORTION;
        d.ags_pourcent = +d.AGS_POURCENT;
        d.sucre_portion = +d.SUCRE_PORTION;
        d.sucre_pourcent = +d.SUCRE_POURCENT;
        d.sel_portion = +d.SEL_PORTION;
        d.sel_pourcent = +d.SEL_POURCENT;
        d.score = +d.SCORE;
        // lim, non presente in csv

        // labels
        d.nutriscore = [+d.NUTRISCORE_COLOR, +d.NUTRISCORE_LETTER];
        d.trafficlight = [+d.TL_FAT_COLOR, +d.TL_AGS_COLOR, +d.TL_SUGAR_COLOR, +d.TL_SALT_COLOR];
        d.nutriscorepartial = [+d.NUTRISCORE_PARTIAL_COLOR, +d.NUTRISCORE_PARTIAL_LETTER];


        //Break up lists into javascript arrays
        d.treatment = d3.csvParse(d.TREATMENT).columns;
        d.profession = d3.csvParse(d.PROFESSION).columns;
        d.product = d3.csvParse(d.PRODUCT).columns;
        d.brand = d3.csvParse(d.BRAND).columns;
        d.unit_prix_kg_l = d3.csvParse(d.UNIT_PRIX_KG_L).columns;
        d.unit_weight = d3.csvParse(d.UNIT_WEIGHT).columns;
        // portion
        


    });

    // Store csv data in a global variable
    nutData = csv;
    // Draw the Bar chart for the first time
    createBarChart('attendance');

    console.log(nutData);
});