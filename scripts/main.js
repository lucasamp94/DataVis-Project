// Global variable containing all the Dataset
let nutData;
let fasceEta = [0, 0, 0, 0, 0];
let idpersona = [];
let lastId = null;
let caddy1 = [];
let caddy2 = [];

let asseX = null;
let lchart1 = null;
let lchart2 = null;


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

function initInfo() {
    document.getElementById("name").innerHTML = "-";
    document.getElementById("score").innerHTML = "-";
    document.getElementById("pricekgl").innerHTML = "-";
    document.getElementById("energy").innerHTML = "-";
    document.getElementById("protein").innerHTML = "-";
    document.getElementById("glucides").innerHTML = "-";
    document.getElementById("sucres").innerHTML = "-";
    document.getElementById("lipides").innerHTML = "-";
    document.getElementById("ags").innerHTML = "-";
    document.getElementById("fibers").innerHTML = "-";
    document.getElementById("salt").innerHTML = "-";
}

function loadInfo(nutProducts, dotId) {
    for (let i = 0; i < nutProducts.length; i++) {
        if (nutProducts[i].id == dotId) {
            document.getElementById("name").innerHTML = nutProducts[i].name;
            document.getElementById("score").innerHTML = nutProducts[i].score;
            document.getElementById("pricekgl").innerHTML = nutProducts[i].pricekgl + " €";
            document.getElementById("energy").innerHTML = nutProducts[i].kcal100g + " kcal";
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

function caddyFilterBought(nutData) {
    // verifica che non ci siano prodotti in più o in meno tra i due esperimenti: con etk o senza etk
    caddy1 = [];
    caddy2 = [];
    let senzaetk = 0;
    let conetk = 0;
    for (let i = 0; i < nutData.length; i++) {
        if (nutData[i].BOUGHTPRODUCT == 1) {
            if (nutData[i].CADDY == 1) {
                caddy1[senzaetk] = nutData[i];
                senzaetk++;
            } else if (nutData[i].CADDY == 2) {
                caddy2[conetk] = nutData[i];
                conetk++;
            } else { // se mai esistesse un CADDY diverso da 1 e 2
                console.log(nutData[i]);
            }
        }
    }
    // console.log(caddy1);
    // console.log(caddy2);
}


function conversioneInDataset(A, B, C, D, E) {
    let oggetto = {
        "countItem": "",
        "fasceEta": "",
        "lettera": "",
    };

    let dataset = [];
    let fEta = ["20-29", "30-39", "40-49", "50-59", "60+"];

    for (let i = 0; i < 5; i++) {
        // Pusho la i-esima colonna, 
        oggetto = {};
        oggetto.countItem = A[i];
        oggetto.fasceEta = fEta[i];
        oggetto.lettera = "A";
        dataset.push({ oggetto: oggetto });
        oggetto = {};
        oggetto.countItem = B[i];
        oggetto.fasceEta = fEta[i];
        oggetto.lettera = "B";
        dataset.push({ oggetto: oggetto });
        oggetto = {};
        oggetto.countItem = C[i];
        oggetto.fasceEta = fEta[i];
        oggetto.lettera = "C";
        dataset.push({ oggetto: oggetto });
        oggetto = {};
        oggetto.countItem = D[i];
        oggetto.fasceEta = fEta[i];
        oggetto.lettera = "D";
        dataset.push({ oggetto: oggetto });
        oggetto = {};
        oggetto.countItem = E[i];
        oggetto.fasceEta = fEta[i];
        oggetto.lettera = "E";
        dataset.push({ oggetto: oggetto });
    }
    console.log(dataset);
    return dataset;
}

function filterAge5C(nutData) {
    caddyFilterBought(nutData);

    // NutriScore
    let A = [0, 0, 0, 0, 0];
    let B = [0, 0, 0, 0, 0];
    let C = [0, 0, 0, 0, 0];
    let D = [0, 0, 0, 0, 0];
    let E = [0, 0, 0, 0, 0];
    for (let i = 0; i < caddy1.length; i++) {
        if (caddy1[i].TREATMENT.localeCompare("5C") == 0) {
            if (caddy1[i].NUTRISCORE[1].localeCompare("A") == 0) {
                if (caddy1[i].AGE < 30) {
                    A[0] -= caddy1[i].NPRODUCTS; // 20+ perché abbiamo controllato che non esistono persone di meno di 20 anni
                }
                else if (caddy1[i].AGE < 40) {
                    A[1] -= caddy1[i].NPRODUCTS; //30+
                }
                else if (caddy1[i].AGE < 50) {
                    A[2] -= caddy1[i].NPRODUCTS; // 40+
                }
                else if (caddy1[i].AGE < 60) {
                    A[3] -= caddy1[i].NPRODUCTS; // 50+
                }
                else {
                    A[4] -= caddy1[i].NPRODUCTS; // 60+
                }

            } else if (caddy1[i].NUTRISCORE[1].localeCompare("B") == 0) {
                if (caddy1[i].AGE < 30) {
                    B[0] -= caddy1[i].NPRODUCTS; // 20+ perché abbiamo controllato che non esistono persone di meno di 20 anni
                }
                else if (caddy1[i].AGE < 40) {
                    B[1] -= caddy1[i].NPRODUCTS; //30+
                }
                else if (caddy1[i].AGE < 50) {
                    B[2] -= caddy1[i].NPRODUCTS; // 40+
                }
                else if (caddy1[i].AGE < 60) {
                    B[3] -= caddy1[i].NPRODUCTS; // 50+
                }
                else {
                    B[4] -= caddy1[i].NPRODUCTS; // 60+
                }
            } else if (caddy1[i].NUTRISCORE[1].localeCompare("C") == 0) {
                if (caddy1[i].AGE < 30) {
                    C[0] -= caddy1[i].NPRODUCTS; // 20+ perché abbiamo controllato che non esistono persone di meno di 20 anni
                }
                else if (caddy1[i].AGE < 40) {
                    C[1] -= caddy1[i].NPRODUCTS; //30+
                }
                else if (caddy1[i].AGE < 50) {
                    C[2] -= caddy1[i].NPRODUCTS; // 40+
                }
                else if (caddy1[i].AGE < 60) {
                    C[3] -= caddy1[i].NPRODUCTS; // 50+
                }
                else {
                    C[4] -= caddy1[i].NPRODUCTS; // 60+
                }
            } else if (caddy1[i].NUTRISCORE[1].localeCompare("D") == 0) {
                if (caddy1[i].AGE < 30) {
                    D[0] -= caddy1[i].NPRODUCTS; // 20+ perché abbiamo controllato che non esistono persone di meno di 20 anni
                }
                else if (caddy1[i].AGE < 40) {
                    D[1] -= caddy1[i].NPRODUCTS; //30+
                }
                else if (caddy1[i].AGE < 50) {
                    D[2] -= caddy1[i].NPRODUCTS; // 40+
                }
                else if (caddy1[i].AGE < 60) {
                    D[3] -= caddy1[i].NPRODUCTS; // 50+
                }
                else {
                    D[4] -= caddy1[i].NPRODUCTS; // 60+
                }
            } else if (caddy1[i].NUTRISCORE[1].localeCompare("E") == 0) {
                if (caddy1[i].AGE < 30) {
                    E[0] -= caddy1[i].NPRODUCTS; // 20+ perché abbiamo controllato che non esistono persone di meno di 20 anni
                }
                else if (caddy1[i].AGE < 40) {
                    E[1] -= caddy1[i].NPRODUCTS; //30+
                }
                else if (caddy1[i].AGE < 50) {
                    E[2] -= caddy1[i].NPRODUCTS; // 40+
                }
                else if (caddy1[i].AGE < 60) {
                    E[3] -= caddy1[i].NPRODUCTS; // 50+
                }
                else {
                    E[4] -= caddy1[i].NPRODUCTS; // 60+
                }
            }
        }

    }
    for (let i = 0; i < caddy2.length; i++) {
        if (caddy2[i].TREATMENT.localeCompare("5C") == 0) {
            if (caddy2[i].NUTRISCORE[1].localeCompare("A") == 0) {
                if (caddy2[i].AGE < 30) {
                    A[0] += caddy2[i].NPRODUCTS; // 20+ perché abbiamo controllato che non esistono persone di meno di 20 anni
                }
                else if (caddy2[i].AGE < 40) {
                    A[1] += caddy2[i].NPRODUCTS; //30+
                }
                else if (caddy2[i].AGE < 50) {
                    A[2] += caddy2[i].NPRODUCTS; // 40+
                }
                else if (caddy2[i].AGE < 60) {
                    A[3] += caddy2[i].NPRODUCTS; // 50+
                }
                else {
                    A[4] += caddy2[i].NPRODUCTS; // 60+
                }

            } else if (caddy2[i].NUTRISCORE[1].localeCompare("B") == 0) {
                if (caddy2[i].AGE < 30) {
                    B[0] += caddy2[i].NPRODUCTS; // 20+ perché abbiamo controllato che non esistono persone di meno di 20 anni
                }
                else if (caddy2[i].AGE < 40) {
                    B[1] += caddy2[i].NPRODUCTS; //30+
                }
                else if (caddy2[i].AGE < 50) {
                    B[2] += caddy2[i].NPRODUCTS; // 40+
                }
                else if (caddy2[i].AGE < 60) {
                    B[3] += caddy2[i].NPRODUCTS; // 50+
                }
                else {
                    B[4] += caddy2[i].NPRODUCTS; // 60+
                }
            } else if (caddy2[i].NUTRISCORE[1].localeCompare("C") == 0) {
                if (caddy2[i].AGE < 30) {
                    C[0] += caddy2[i].NPRODUCTS; // 20+ perché abbiamo controllato che non esistono persone di meno di 20 anni
                }
                else if (caddy2[i].AGE < 40) {
                    C[1] += caddy2[i].NPRODUCTS; //30+
                }
                else if (caddy2[i].AGE < 50) {
                    C[2] += caddy2[i].NPRODUCTS; // 40+
                }
                else if (caddy2[i].AGE < 60) {
                    C[3] += caddy2[i].NPRODUCTS; // 50+
                }
                else {
                    C[4] += caddy2[i].NPRODUCTS; // 60+
                }
            } else if (caddy2[i].NUTRISCORE[1].localeCompare("D") == 0) {
                if (caddy2[i].AGE < 30) {
                    D[0] += caddy2[i].NPRODUCTS; // 20+ perché abbiamo controllato che non esistono persone di meno di 20 anni
                }
                else if (caddy2[i].AGE < 40) {
                    D[1] += caddy2[i].NPRODUCTS; //30+
                }
                else if (caddy2[i].AGE < 50) {
                    D[2] += caddy2[i].NPRODUCTS; // 40+
                }
                else if (caddy2[i].AGE < 60) {
                    D[3] += caddy2[i].NPRODUCTS; // 50+
                }
                else {
                    D[4] += caddy2[i].NPRODUCTS; // 60+
                }
            } else if (caddy2[i].NUTRISCORE[1].localeCompare("E") == 0) {
                if (caddy2[i].AGE < 30) {
                    E[0] += caddy2[i].NPRODUCTS; // 20+ perché abbiamo controllato che non esistono persone di meno di 20 anni
                }
                else if (caddy2[i].AGE < 40) {
                    E[1] += caddy2[i].NPRODUCTS; //30+
                }
                else if (caddy2[i].AGE < 50) {
                    E[2] += caddy2[i].NPRODUCTS; // 40+
                }
                else if (caddy2[i].AGE < 60) {
                    E[3] += caddy2[i].NPRODUCTS; // 50+
                }
                else {
                    E[4] += caddy2[i].NPRODUCTS; // 60+
                }
            }
        }
    }
    console.log('Nutriscore 5C: A,B,C,D,E.');
    // console.log(A);
    // console.log(B);
    // console.log(C);
    // console.log(D);
    // console.log(E);

    let dataset5C = conversioneInDataset(A, B, C, D, E);
    return dataset5C;
}

function filterAgeTL(nutData) {
    caddyFilterBought(nutData);

    // Traffic Lights
    let A = [0, 0, 0, 0, 0];
    let B = [0, 0, 0, 0, 0];
    let C = [0, 0, 0, 0, 0];
    let D = [0, 0, 0, 0, 0];
    let E = [0, 0, 0, 0, 0];
    for (let i = 0; i < caddy1.length; i++) {
        if (caddy1[i].TREATMENT.localeCompare("TL") == 0) {
            if (caddy1[i].NUTRISCORE[1].localeCompare("A") == 0) {
                if (caddy1[i].AGE < 30) {
                    A[0] -= caddy1[i].NPRODUCTS; // 20+ perché abbiamo controllato che non esistono persone di meno di 20 anni
                }
                else if (caddy1[i].AGE < 40) {
                    A[1] -= caddy1[i].NPRODUCTS; //30+
                }
                else if (caddy1[i].AGE < 50) {
                    A[2] -= caddy1[i].NPRODUCTS; // 40+
                }
                else if (caddy1[i].AGE < 60) {
                    A[3] -= caddy1[i].NPRODUCTS; // 50+
                }
                else {
                    A[4] -= caddy1[i].NPRODUCTS; // 60+
                }

            } else if (caddy1[i].NUTRISCORE[1].localeCompare("B") == 0) {
                if (caddy1[i].AGE < 30) {
                    B[0] -= caddy1[i].NPRODUCTS; // 20+ perché abbiamo controllato che non esistono persone di meno di 20 anni
                }
                else if (caddy1[i].AGE < 40) {
                    B[1] -= caddy1[i].NPRODUCTS; //30+
                }
                else if (caddy1[i].AGE < 50) {
                    B[2] -= caddy1[i].NPRODUCTS; // 40+
                }
                else if (caddy1[i].AGE < 60) {
                    B[3] -= caddy1[i].NPRODUCTS; // 50+
                }
                else {
                    B[4] -= caddy1[i].NPRODUCTS; // 60+
                }
            } else if (caddy1[i].NUTRISCORE[1].localeCompare("C") == 0) {
                if (caddy1[i].AGE < 30) {
                    C[0] -= caddy1[i].NPRODUCTS; // 20+ perché abbiamo controllato che non esistono persone di meno di 20 anni
                }
                else if (caddy1[i].AGE < 40) {
                    C[1] -= caddy1[i].NPRODUCTS; //30+
                }
                else if (caddy1[i].AGE < 50) {
                    C[2] -= caddy1[i].NPRODUCTS; // 40+
                }
                else if (caddy1[i].AGE < 60) {
                    C[3] -= caddy1[i].NPRODUCTS; // 50+
                }
                else {
                    C[4] -= caddy1[i].NPRODUCTS; // 60+
                }
            } else if (caddy1[i].NUTRISCORE[1].localeCompare("D") == 0) {
                if (caddy1[i].AGE < 30) {
                    D[0] -= caddy1[i].NPRODUCTS; // 20+ perché abbiamo controllato che non esistono persone di meno di 20 anni
                }
                else if (caddy1[i].AGE < 40) {
                    D[1] -= caddy1[i].NPRODUCTS; //30+
                }
                else if (caddy1[i].AGE < 50) {
                    D[2] -= caddy1[i].NPRODUCTS; // 40+
                }
                else if (caddy1[i].AGE < 60) {
                    D[3] -= caddy1[i].NPRODUCTS; // 50+
                }
                else {
                    D[4] -= caddy1[i].NPRODUCTS; // 60+
                }
            } else if (caddy1[i].NUTRISCORE[1].localeCompare("E") == 0) {
                if (caddy1[i].AGE < 30) {
                    E[0] -= caddy1[i].NPRODUCTS; // 20+ perché abbiamo controllato che non esistono persone di meno di 20 anni
                }
                else if (caddy1[i].AGE < 40) {
                    E[1] -= caddy1[i].NPRODUCTS; //30+
                }
                else if (caddy1[i].AGE < 50) {
                    E[2] -= caddy1[i].NPRODUCTS; // 40+
                }
                else if (caddy1[i].AGE < 60) {
                    E[3] -= caddy1[i].NPRODUCTS; // 50+
                }
                else {
                    E[4] -= caddy1[i].NPRODUCTS; // 60+
                }
            }
        }

    }
    for (let i = 0; i < caddy2.length; i++) {
        if (caddy2[i].TREATMENT.localeCompare("TL") == 0) {
            if (caddy2[i].NUTRISCORE[1].localeCompare("A") == 0) {
                if (caddy2[i].AGE < 30) {
                    A[0] += caddy2[i].NPRODUCTS; // 20+ perché abbiamo controllato che non esistono persone di meno di 20 anni
                }
                else if (caddy2[i].AGE < 40) {
                    A[1] += caddy2[i].NPRODUCTS; //30+
                }
                else if (caddy2[i].AGE < 50) {
                    A[2] += caddy2[i].NPRODUCTS; // 40+
                }
                else if (caddy2[i].AGE < 60) {
                    A[3] += caddy2[i].NPRODUCTS; // 50+
                }
                else {
                    A[4] += caddy2[i].NPRODUCTS; // 60+
                }

            } else if (caddy2[i].NUTRISCORE[1].localeCompare("B") == 0) {
                if (caddy2[i].AGE < 30) {
                    B[0] += caddy2[i].NPRODUCTS; // 20+ perché abbiamo controllato che non esistono persone di meno di 20 anni
                }
                else if (caddy2[i].AGE < 40) {
                    B[1] += caddy2[i].NPRODUCTS; //30+
                }
                else if (caddy2[i].AGE < 50) {
                    B[2] += caddy2[i].NPRODUCTS; // 40+
                }
                else if (caddy2[i].AGE < 60) {
                    B[3] += caddy2[i].NPRODUCTS; // 50+
                }
                else {
                    B[4] += caddy2[i].NPRODUCTS; // 60+
                }
            } else if (caddy2[i].NUTRISCORE[1].localeCompare("C") == 0) {
                if (caddy2[i].AGE < 30) {
                    C[0] += caddy2[i].NPRODUCTS; // 20+ perché abbiamo controllato che non esistono persone di meno di 20 anni
                }
                else if (caddy2[i].AGE < 40) {
                    C[1] += caddy2[i].NPRODUCTS; //30+
                }
                else if (caddy2[i].AGE < 50) {
                    C[2] += caddy2[i].NPRODUCTS; // 40+
                }
                else if (caddy2[i].AGE < 60) {
                    C[3] += caddy2[i].NPRODUCTS; // 50+
                }
                else {
                    C[4] += caddy2[i].NPRODUCTS; // 60+
                }
            } else if (caddy2[i].NUTRISCORE[1].localeCompare("D") == 0) {
                if (caddy2[i].AGE < 30) {
                    D[0] += caddy2[i].NPRODUCTS; // 20+ perché abbiamo controllato che non esistono persone di meno di 20 anni
                }
                else if (caddy2[i].AGE < 40) {
                    D[1] += caddy2[i].NPRODUCTS; //30+
                }
                else if (caddy2[i].AGE < 50) {
                    D[2] += caddy2[i].NPRODUCTS; // 40+
                }
                else if (caddy2[i].AGE < 60) {
                    D[3] += caddy2[i].NPRODUCTS; // 50+
                }
                else {
                    D[4] += caddy2[i].NPRODUCTS; // 60+
                }
            } else if (caddy2[i].NUTRISCORE[1].localeCompare("E") == 0) {
                if (caddy2[i].AGE < 30) {
                    E[0] += caddy2[i].NPRODUCTS; // 20+ perché abbiamo controllato che non esistono persone di meno di 20 anni
                }
                else if (caddy2[i].AGE < 40) {
                    E[1] += caddy2[i].NPRODUCTS; //30+
                }
                else if (caddy2[i].AGE < 50) {
                    E[2] += caddy2[i].NPRODUCTS; // 40+
                }
                else if (caddy2[i].AGE < 60) {
                    E[3] += caddy2[i].NPRODUCTS; // 50+
                }
                else {
                    E[4] += caddy2[i].NPRODUCTS; // 60+
                }
            }
        }
    }
    console.log('Traffic Lights score: A,B,C,D,E.');
    // console.log(A);
    // console.log(B);
    // console.log(C);
    // console.log(D);
    // console.log(E);

    let datasetTL = conversioneInDataset(A, B, C, D, E);
    return datasetTL;
}

function filterAgeRIGDA(nutData) {
    // GDA guideline daily amounts per tutti
    caddyFilterBought(nutData);

    let A = [0, 0, 0, 0, 0];
    let B = [0, 0, 0, 0, 0];
    let C = [0, 0, 0, 0, 0];
    let D = [0, 0, 0, 0, 0];
    let E = [0, 0, 0, 0, 0];
    for (let i = 0; i < caddy1.length; i++) {
        if (caddy1[i].TREATMENT.localeCompare("RI-GDA") == 0) {
            if (caddy1[i].NUTRISCORE[1].localeCompare("A") == 0) {
                if (caddy1[i].AGE < 30) {
                    A[0] -= caddy1[i].NPRODUCTS; // 20+ perché abbiamo controllato che non esistono persone di meno di 20 anni
                }
                else if (caddy1[i].AGE < 40) {
                    A[1] -= caddy1[i].NPRODUCTS; //30+
                }
                else if (caddy1[i].AGE < 50) {
                    A[2] -= caddy1[i].NPRODUCTS; // 40+
                }
                else if (caddy1[i].AGE < 60) {
                    A[3] -= caddy1[i].NPRODUCTS; // 50+
                }
                else {
                    A[4] -= caddy1[i].NPRODUCTS; // 60+
                }

            } else if (caddy1[i].NUTRISCORE[1].localeCompare("B") == 0) {
                if (caddy1[i].AGE < 30) {
                    B[0] -= caddy1[i].NPRODUCTS; // 20+ perché abbiamo controllato che non esistono persone di meno di 20 anni
                }
                else if (caddy1[i].AGE < 40) {
                    B[1] -= caddy1[i].NPRODUCTS; //30+
                }
                else if (caddy1[i].AGE < 50) {
                    B[2] -= caddy1[i].NPRODUCTS; // 40+
                }
                else if (caddy1[i].AGE < 60) {
                    B[3] -= caddy1[i].NPRODUCTS; // 50+
                }
                else {
                    B[4] -= caddy1[i].NPRODUCTS; // 60+
                }
            } else if (caddy1[i].NUTRISCORE[1].localeCompare("C") == 0) {
                if (caddy1[i].AGE < 30) {
                    C[0] -= caddy1[i].NPRODUCTS; // 20+ perché abbiamo controllato che non esistono persone di meno di 20 anni
                }
                else if (caddy1[i].AGE < 40) {
                    C[1] -= caddy1[i].NPRODUCTS; //30+
                }
                else if (caddy1[i].AGE < 50) {
                    C[2] -= caddy1[i].NPRODUCTS; // 40+
                }
                else if (caddy1[i].AGE < 60) {
                    C[3] -= caddy1[i].NPRODUCTS; // 50+
                }
                else {
                    C[4] -= caddy1[i].NPRODUCTS; // 60+
                }
            } else if (caddy1[i].NUTRISCORE[1].localeCompare("D") == 0) {
                if (caddy1[i].AGE < 30) {
                    D[0] -= caddy1[i].NPRODUCTS; // 20+ perché abbiamo controllato che non esistono persone di meno di 20 anni
                }
                else if (caddy1[i].AGE < 40) {
                    D[1] -= caddy1[i].NPRODUCTS; //30+
                }
                else if (caddy1[i].AGE < 50) {
                    D[2] -= caddy1[i].NPRODUCTS; // 40+
                }
                else if (caddy1[i].AGE < 60) {
                    D[3] -= caddy1[i].NPRODUCTS; // 50+
                }
                else {
                    D[4] -= caddy1[i].NPRODUCTS; // 60+
                }
            } else if (caddy1[i].NUTRISCORE[1].localeCompare("E") == 0) {
                if (caddy1[i].AGE < 30) {
                    E[0] -= caddy1[i].NPRODUCTS; // 20+ perché abbiamo controllato che non esistono persone di meno di 20 anni
                }
                else if (caddy1[i].AGE < 40) {
                    E[1] -= caddy1[i].NPRODUCTS; //30+
                }
                else if (caddy1[i].AGE < 50) {
                    E[2] -= caddy1[i].NPRODUCTS; // 40+
                }
                else if (caddy1[i].AGE < 60) {
                    E[3] -= caddy1[i].NPRODUCTS; // 50+
                }
                else {
                    E[4] -= caddy1[i].NPRODUCTS; // 60+
                }
            }
        }

    }
    for (let i = 0; i < caddy2.length; i++) {
        if (caddy2[i].TREATMENT.localeCompare("RI-GDA") == 0) {
            if (caddy2[i].NUTRISCORE[1].localeCompare("A") == 0) {
                if (caddy2[i].AGE < 30) {
                    A[0] += caddy2[i].NPRODUCTS; // 20+ perché abbiamo controllato che non esistono persone di meno di 20 anni
                }
                else if (caddy2[i].AGE < 40) {
                    A[1] += caddy2[i].NPRODUCTS; //30+
                }
                else if (caddy2[i].AGE < 50) {
                    A[2] += caddy2[i].NPRODUCTS; // 40+
                }
                else if (caddy2[i].AGE < 60) {
                    A[3] += caddy2[i].NPRODUCTS; // 50+
                }
                else {
                    A[4] += caddy2[i].NPRODUCTS; // 60+
                }

            } else if (caddy2[i].NUTRISCORE[1].localeCompare("B") == 0) {
                if (caddy2[i].AGE < 30) {
                    B[0] += caddy2[i].NPRODUCTS; // 20+ perché abbiamo controllato che non esistono persone di meno di 20 anni
                }
                else if (caddy2[i].AGE < 40) {
                    B[1] += caddy2[i].NPRODUCTS; //30+
                }
                else if (caddy2[i].AGE < 50) {
                    B[2] += caddy2[i].NPRODUCTS; // 40+
                }
                else if (caddy2[i].AGE < 60) {
                    B[3] += caddy2[i].NPRODUCTS; // 50+
                }
                else {
                    B[4] += caddy2[i].NPRODUCTS; // 60+
                }
            } else if (caddy2[i].NUTRISCORE[1].localeCompare("C") == 0) {
                if (caddy2[i].AGE < 30) {
                    C[0] += caddy2[i].NPRODUCTS; // 20+ perché abbiamo controllato che non esistono persone di meno di 20 anni
                }
                else if (caddy2[i].AGE < 40) {
                    C[1] += caddy2[i].NPRODUCTS; //30+
                }
                else if (caddy2[i].AGE < 50) {
                    C[2] += caddy2[i].NPRODUCTS; // 40+
                }
                else if (caddy2[i].AGE < 60) {
                    C[3] += caddy2[i].NPRODUCTS; // 50+
                }
                else {
                    C[4] += caddy2[i].NPRODUCTS; // 60+
                }
            } else if (caddy2[i].NUTRISCORE[1].localeCompare("D") == 0) {
                if (caddy2[i].AGE < 30) {
                    D[0] += caddy2[i].NPRODUCTS; // 20+ perché abbiamo controllato che non esistono persone di meno di 20 anni
                }
                else if (caddy2[i].AGE < 40) {
                    D[1] += caddy2[i].NPRODUCTS; //30+
                }
                else if (caddy2[i].AGE < 50) {
                    D[2] += caddy2[i].NPRODUCTS; // 40+
                }
                else if (caddy2[i].AGE < 60) {
                    D[3] += caddy2[i].NPRODUCTS; // 50+
                }
                else {
                    D[4] += caddy2[i].NPRODUCTS; // 60+
                }
            } else if (caddy2[i].NUTRISCORE[1].localeCompare("E") == 0) {
                if (caddy2[i].AGE < 30) {
                    E[0] += caddy2[i].NPRODUCTS; // 20+ perché abbiamo controllato che non esistono persone di meno di 20 anni
                }
                else if (caddy2[i].AGE < 40) {
                    E[1] += caddy2[i].NPRODUCTS; //30+
                }
                else if (caddy2[i].AGE < 50) {
                    E[2] += caddy2[i].NPRODUCTS; // 40+
                }
                else if (caddy2[i].AGE < 60) {
                    E[3] += caddy2[i].NPRODUCTS; // 50+
                }
                else {
                    E[4] += caddy2[i].NPRODUCTS; // 60+
                }
            }
        }
    }
    console.log('RIGDA score: A,B,C,D,E.');
    // console.log(A);
    // console.log(B);
    // console.log(C);
    // console.log(D);
    // console.log(E);

    let datasetRIGDA = conversioneInDataset(A, B, C, D, E);
    return datasetRIGDA;
}

function filterAgeNeutre(nutData) {
    // GDA guideline daily amounts per tutti
    caddyFilterBought(nutData);

    let A = [0, 0, 0, 0, 0];
    let B = [0, 0, 0, 0, 0];
    let C = [0, 0, 0, 0, 0];
    let D = [0, 0, 0, 0, 0];
    let E = [0, 0, 0, 0, 0];
    for (let i = 0; i < caddy1.length; i++) {
        if (caddy1[i].TREATMENT.localeCompare("neutre") == 0) {
            if (caddy1[i].NUTRISCORE[1].localeCompare("A") == 0) {
                if (caddy1[i].AGE < 30) {
                    A[0] -= caddy1[i].NPRODUCTS; // 20+ perché abbiamo controllato che non esistono persone di meno di 20 anni
                }
                else if (caddy1[i].AGE < 40) {
                    A[1] -= caddy1[i].NPRODUCTS; //30+
                }
                else if (caddy1[i].AGE < 50) {
                    A[2] -= caddy1[i].NPRODUCTS; // 40+
                }
                else if (caddy1[i].AGE < 60) {
                    A[3] -= caddy1[i].NPRODUCTS; // 50+
                }
                else {
                    A[4] -= caddy1[i].NPRODUCTS; // 60+
                }

            } else if (caddy1[i].NUTRISCORE[1].localeCompare("B") == 0) {
                if (caddy1[i].AGE < 30) {
                    B[0] -= caddy1[i].NPRODUCTS; // 20+ perché abbiamo controllato che non esistono persone di meno di 20 anni
                }
                else if (caddy1[i].AGE < 40) {
                    B[1] -= caddy1[i].NPRODUCTS; //30+
                }
                else if (caddy1[i].AGE < 50) {
                    B[2] -= caddy1[i].NPRODUCTS; // 40+
                }
                else if (caddy1[i].AGE < 60) {
                    B[3] -= caddy1[i].NPRODUCTS; // 50+
                }
                else {
                    B[4] -= caddy1[i].NPRODUCTS; // 60+
                }
            } else if (caddy1[i].NUTRISCORE[1].localeCompare("C") == 0) {
                if (caddy1[i].AGE < 30) {
                    C[0] -= caddy1[i].NPRODUCTS; // 20+ perché abbiamo controllato che non esistono persone di meno di 20 anni
                }
                else if (caddy1[i].AGE < 40) {
                    C[1] -= caddy1[i].NPRODUCTS; //30+
                }
                else if (caddy1[i].AGE < 50) {
                    C[2] -= caddy1[i].NPRODUCTS; // 40+
                }
                else if (caddy1[i].AGE < 60) {
                    C[3] -= caddy1[i].NPRODUCTS; // 50+
                }
                else {
                    C[4] -= caddy1[i].NPRODUCTS; // 60+
                }
            } else if (caddy1[i].NUTRISCORE[1].localeCompare("D") == 0) {
                if (caddy1[i].AGE < 30) {
                    D[0] -= caddy1[i].NPRODUCTS; // 20+ perché abbiamo controllato che non esistono persone di meno di 20 anni
                }
                else if (caddy1[i].AGE < 40) {
                    D[1] -= caddy1[i].NPRODUCTS; //30+
                }
                else if (caddy1[i].AGE < 50) {
                    D[2] -= caddy1[i].NPRODUCTS; // 40+
                }
                else if (caddy1[i].AGE < 60) {
                    D[3] -= caddy1[i].NPRODUCTS; // 50+
                }
                else {
                    D[4] -= caddy1[i].NPRODUCTS; // 60+
                }
            } else if (caddy1[i].NUTRISCORE[1].localeCompare("E") == 0) {
                if (caddy1[i].AGE < 30) {
                    E[0] -= caddy1[i].NPRODUCTS; // 20+ perché abbiamo controllato che non esistono persone di meno di 20 anni
                }
                else if (caddy1[i].AGE < 40) {
                    E[1] -= caddy1[i].NPRODUCTS; //30+
                }
                else if (caddy1[i].AGE < 50) {
                    E[2] -= caddy1[i].NPRODUCTS; // 40+
                }
                else if (caddy1[i].AGE < 60) {
                    E[3] -= caddy1[i].NPRODUCTS; // 50+
                }
                else {
                    E[4] -= caddy1[i].NPRODUCTS; // 60+
                }
            }
        }

    }
    for (let i = 0; i < caddy2.length; i++) {
        if (caddy2[i].TREATMENT.localeCompare("neutre") == 0) {
            if (caddy2[i].NUTRISCORE[1].localeCompare("A") == 0) {
                if (caddy2[i].AGE < 30) {
                    A[0] += caddy2[i].NPRODUCTS; // 20+ perché abbiamo controllato che non esistono persone di meno di 20 anni
                }
                else if (caddy2[i].AGE < 40) {
                    A[1] += caddy2[i].NPRODUCTS; //30+
                }
                else if (caddy2[i].AGE < 50) {
                    A[2] += caddy2[i].NPRODUCTS; // 40+
                }
                else if (caddy2[i].AGE < 60) {
                    A[3] += caddy2[i].NPRODUCTS; // 50+
                }
                else {
                    A[4] += caddy2[i].NPRODUCTS; // 60+
                }

            } else if (caddy2[i].NUTRISCORE[1].localeCompare("B") == 0) {
                if (caddy2[i].AGE < 30) {
                    B[0] += caddy2[i].NPRODUCTS; // 20+ perché abbiamo controllato che non esistono persone di meno di 20 anni
                }
                else if (caddy2[i].AGE < 40) {
                    B[1] += caddy2[i].NPRODUCTS; //30+
                }
                else if (caddy2[i].AGE < 50) {
                    B[2] += caddy2[i].NPRODUCTS; // 40+
                }
                else if (caddy2[i].AGE < 60) {
                    B[3] += caddy2[i].NPRODUCTS; // 50+
                }
                else {
                    B[4] += caddy2[i].NPRODUCTS; // 60+
                }
            } else if (caddy2[i].NUTRISCORE[1].localeCompare("C") == 0) {
                if (caddy2[i].AGE < 30) {
                    C[0] += caddy2[i].NPRODUCTS; // 20+ perché abbiamo controllato che non esistono persone di meno di 20 anni
                }
                else if (caddy2[i].AGE < 40) {
                    C[1] += caddy2[i].NPRODUCTS; //30+
                }
                else if (caddy2[i].AGE < 50) {
                    C[2] += caddy2[i].NPRODUCTS; // 40+
                }
                else if (caddy2[i].AGE < 60) {
                    C[3] += caddy2[i].NPRODUCTS; // 50+
                }
                else {
                    C[4] += caddy2[i].NPRODUCTS; // 60+
                }
            } else if (caddy2[i].NUTRISCORE[1].localeCompare("D") == 0) {
                if (caddy2[i].AGE < 30) {
                    D[0] += caddy2[i].NPRODUCTS; // 20+ perché abbiamo controllato che non esistono persone di meno di 20 anni
                }
                else if (caddy2[i].AGE < 40) {
                    D[1] += caddy2[i].NPRODUCTS; //30+
                }
                else if (caddy2[i].AGE < 50) {
                    D[2] += caddy2[i].NPRODUCTS; // 40+
                }
                else if (caddy2[i].AGE < 60) {
                    D[3] += caddy2[i].NPRODUCTS; // 50+
                }
                else {
                    D[4] += caddy2[i].NPRODUCTS; // 60+
                }
            } else if (caddy2[i].NUTRISCORE[1].localeCompare("E") == 0) {
                if (caddy2[i].AGE < 30) {
                    E[0] += caddy2[i].NPRODUCTS; // 20+ perché abbiamo controllato che non esistono persone di meno di 20 anni
                }
                else if (caddy2[i].AGE < 40) {
                    E[1] += caddy2[i].NPRODUCTS; //30+
                }
                else if (caddy2[i].AGE < 50) {
                    E[2] += caddy2[i].NPRODUCTS; // 40+
                }
                else if (caddy2[i].AGE < 60) {
                    E[3] += caddy2[i].NPRODUCTS; // 50+
                }
                else {
                    E[4] += caddy2[i].NPRODUCTS; // 60+
                }
            }
        }
    }
    console.log('Neutre score: A,B,C,D,E.');
    // console.log(A);
    // console.log(B);
    // console.log(C);
    // console.log(D);
    // console.log(E);

    let datasetNeutre = conversioneInDataset(A, B, C, D, E);
    return datasetNeutre;
}

//da fare
function filterSalary5C(nutData) {

}

function filterSalaryTL(nutData) {

}

function filterSalaryRIGDA(nutData) {

}

function chooseAsseX(option) {
    asseX = option;
    if ((lchart1 != null) && (lchart2 != null)) { // se sono all'iterazione successiva al primo
        createLabelChart1(asseX, lchart1);
        createLabelChart2(asseX, lchart2);
    }
}

function chooseLChart1(label) {
    lchart1 = label;
    if (asseX != null) { // se sono all'iterazione successiva al primo
        createLabelChart1(asseX, lchart1);
    }
}

function chooseLChart2(label) {
    lchart2 = label;
    if (asseX != null) { // se sono all'iterazione successiva al primo
        createLabelChart2(asseX, lchart2);
    }
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

    // console.log(data);

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

function createMidScatterplot2() {

    let nutProducts = calculateNumberOfProducts(nutData);

    // set the dimensions and margins of the graph
    var margin = { top: 10, right: 30, bottom: 30, left: 60 },
        width = 800 - margin.left - margin.right,
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
                d3.select('[id=' + '\"' + lastId + '\"' + ']').style("fill", "#69b3a2");
                d3.select('[id=' + '\"' + lastId + '\"' + ']').attr("r", 3);
                //console.log("id selezionato: ", event.target.id);
            }
            //console.log("last id: ", lastId);
            d3.select(this).style("fill", "red");
            d3.select(this).attr("r", 3 * 2);
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

function createLabelChart1(asseX, label) {
    let dataset;
    if (asseX.localeCompare('anni') == 0) {
        if (label.localeCompare('5C') == 0) {
            dataset = filterAge5C(nutData);
        } else if (label.localeCompare('TL') == 0) {
            dataset = filterAgeTL(nutData);
        } else if (label.localeCompare('RIGDA') == 0) {
            dataset = filterAgeRIGDA(nutData);
        } else if (label.localeCompare('neutre') == 0) {
            dataset = filterAgeNeutre(nutData);
        }
    }
    // fare ELSE IF asseX == 'stipendio'

    // D3 code

    var n = 10, // number of samples
        m = 5; // number of series

    var data = d3.range(m).map(function () {
        return d3.range(n).map(Math.random);
    });

    var margin = { top: 20, right: 30, bottom: 30, left: 40 },
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var y = d3.scaleLinear()
        .domain([0, 1])
        .range([height, 0]);

    var x0 = d3.scaleBand()
        .domain(d3.range(n))
        .range([0, width], .2);

    var x1 = d3.scaleBand()
        .domain(d3.range(m))
        .range([0, x0.bandwidth() - 10]);

    var z = d3.scaleOrdinal()
        .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("g").selectAll("g")
        .data(data)
        .enter().append("g")
        .style("fill", function (d, i) { return z(i); })
        .attr("transform", function (d, i) { return "translate(" + x1(i) + ",0)"; })
        .selectAll("rect")
        .data(function (d) { return d; })
        .enter().append("rect")
        .attr("width", x1.bandwidth())
        .attr("height", y)
        .attr("x", function (d, i) { return x0(i); })
        .attr("y", function (d) { return height - y(d); });

}

function createLabelChart2(asseX, label) {

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

    calculateNumberOfProducts(nutData);
    createLeftBarChart();
    createMidScatterplot2();
    caddyFilterBought(nutData);
    filterAge5C(nutData);
    filterAgeTL(nutData);
    filterAgeRIGDA(nutData);
});

