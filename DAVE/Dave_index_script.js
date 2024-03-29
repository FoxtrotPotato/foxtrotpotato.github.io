/*
    Dull Activities Virtual Executant (DAVE)
    Copyright (C) 2022  Federico Perrone
    This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
    This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.
    You should have received a copy of the GNU General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.
    Contact me: fedeperrone@gmail.com or fede_perrone@hotmail.com
*/

// clear localstorage
localStorage.clear();


//calcular cuotas

function ccalc() {
  var inputMonto = document.getElementById("input_monto").value;

  var contado = inputMonto;
  var ahora3 = (inputMonto * 1.05 / 3).toFixed(2);
  var ahora6 = (inputMonto * 1.10 / 6).toFixed(2);
  var ahora12 = (inputMonto * 1.15 / 12).toFixed(2);
  var ahora18 = (inputMonto * 1.20 / 18).toFixed(2);

  document.getElementById("contado_li").innerHTML = contado;
  document.getElementById("ahora3_li").innerHTML = ahora3;
  document.getElementById("ahora6_li").innerHTML = ahora6;
  document.getElementById("ahora12_li").innerHTML = ahora12;
  document.getElementById("ahora18_li").innerHTML = ahora18;

  // escribir en el textarea
  var texto = "> Contado $" + contado + "\n"
    + ">> 3 cuotas de $" + ahora3 + "\n"
    + ">> 6 cuotas de $" + ahora6 + "\n"
    + ">> 12 cuotas de $" + ahora12 + "\n"
    + ">> 18 cuotas de $" + ahora18 + "\n"
    + "-" + "\n"
    + "\n"
    + "Los precios expresados son en pesos finales y están sujetos a variaciones en cualquier momento y sin previo aviso." + "\n"
    + "> Precio de contado a abonar en efectivo, por transferencia o depósito bancario, MercadoPago, Tarjetas de Débito y Crédito en un pago. 3 cuotas sin interés con Naranja en plan ZETA." + "\n"
    + ">> Planes de financiación en 3, 6, 12 y 18 cuotas con tarjetas Visa, Mastercard, AMEX y Cabal emitidas por bancos.";

  document.getElementById("creditCard_text").innerHTML = texto;
}


// copiar creditcard al portapapeles

function copy_creditCard_text() {
  var copy_creditCard_text = document.querySelector('#copy_creditCard_text');
  copy_creditCard_text.addEventListener('click', function (event) {
    var creditCard_text = document.querySelector('#creditCard_text');
    creditCard_text.focus();
    creditCard_text.select();

    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      console.log('Copying text command was ' + msg);
    } catch (err) {
      console.log('Oops, unable to copy');
    }
  });
}


// Calcular Sobrefacturacion

function calcularSobrefac() {
  var inputPfinal = document.getElementById("input_precioFinal").value;
  var inputCosto = document.getElementById("input_precioGremio").value;

  var comision = (((inputPfinal - inputCosto) / 1.21) - ((inputPfinal - inputCosto) / 1.21) * 0.1).toFixed(0);
  var apagar = (inputPfinal - comision).toFixed(0);

  document.getElementById("output_comision").innerHTML = comision;
  document.getElementById("output_apagar").innerHTML = apagar;

  // escribir en el textarea1
  var texto1 = "Comisión $" + comision + "\n" + "Monto a pagar $" + apagar + "\n";
  document.getElementById("sobrefac_text1").innerHTML = texto1;

  // escribir en el textarea2
  var texto2 = comision;
  document.getElementById("sobrefac_text2").innerHTML = texto2;
}


// copiar sobrefac al portapapeles

function copiarComisionApagar() {
  var copiarComisionApagar = document.querySelector('#copiarComisionApagar');
  copiarComisionApagar.addEventListener('click', function (event) {
    var sobrefac_text1 = document.querySelector('#sobrefac_text1');
    sobrefac_text1.focus();
    sobrefac_text1.select();

    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      console.log('Copying text command was ' + msg);
    } catch (err) {
      console.log('Oops, unable to copy');
    }
  });
}


// copiar comision al portapapeles

function copiarComision() {
  var copiarComision = document.querySelector('#copiarComision');
  copiarComision.addEventListener('click', function (event) {
    var sobrefac_text2 = document.querySelector('#sobrefac_text2');
    sobrefac_text2.focus();
    sobrefac_text2.select();

    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      console.log('Copying text command was ' + msg);
    } catch (err) {
      console.log('Oops, unable to copy');
    }
  });
}



///////////////////////// CSV UPDATER /////////////////////////

var inputMELI = localStorage;
var inputZEUS = localStorage;
var sheetName1 = "";
var sheetName2 = "";
var sheetName_aux = "";

var currency_exchange = parseFloat(document.getElementById("input_currency_exchange").value);
var benefit_price = parseFloat(document.getElementById("input_benefit_price").value);
var markup_classic = parseFloat(document.getElementById("input_markup_classic").value);
var markup_premium = parseFloat(document.getElementById("input_markup_premium").value);
var markup_min = parseFloat(document.getElementById("input_markup_min").value);
var shipping_nonbenefit = parseFloat(document.getElementById("input_shipping_nonbenefit").value);
var shipping_benefit = parseFloat(document.getElementById("input_shipping_benefit").value);
document.getElementById("pbenefit1").innerHTML = benefit_price;
document.getElementById("pbenefit2").innerHTML = benefit_price;
document.getElementById("pbenefit3").innerHTML = benefit_price;

window.onchange = function getsetModifiers() {
  currency_exchange = parseFloat(document.getElementById("input_currency_exchange").value);
  benefit_price = parseFloat(document.getElementById("input_benefit_price").value);
  markup_classic = parseFloat(document.getElementById("input_markup_classic").value);
  markup_premium = parseFloat(document.getElementById("input_markup_premium").value);
  markup_min = parseFloat(document.getElementById("input_markup_min").value);
  shipping_nonbenefit = parseFloat(document.getElementById("input_shipping_nonbenefit").value);
  shipping_benefit = parseFloat(document.getElementById("input_shipping_benefit").value);
  document.getElementById("pbenefit1").innerHTML = benefit_price;
  document.getElementById("pbenefit2").innerHTML = benefit_price;
  document.getElementById("pbenefit3").innerHTML = benefit_price;

}

// xls/csv MELI
/* keys:   "ITEM_ID",  "VARIATION_ID",  "SKU",  "TITLE",  "VARIATIONS",  "QUANTITY",  "PRICE",  
"CURRENCY_ID",  "SHIPPING_METHOD",  "LISTING_TYPE",  "FEE_PER_SALE",  "STATUS",  "MANUFACTURING_TIME" */
var file1 = document.getElementById('input_meli');
file1.addEventListener('change', importFile1);

// xls/csv ZEUS
/* keys:  "SKU",  "DESCRIPCION",  "PRECIO",  "CANTIDAD" */
var file2 = document.getElementById('input_adc');
file2.addEventListener('change', importFile2);


// Read XLS/CSV

function importFile1(evt) {
  var f = evt.target.files[0];

  if (f) {
    var r = new FileReader();
    r.onload = e => {
      localStorage.setItem("inputMELI", processExcel(e.target.result));
      sheetName1 = sheetName_aux;
      console.log(inputMELI, sheetName1);
    }
    r.readAsBinaryString(f);

  } else {
    console.log("Failed to load file");
  }
}

function importFile2(evt) {
  var f = evt.target.files[0];

  if (f) {
    var r = new FileReader();
    r.onload = e => {
      localStorage.setItem("inputZEUS", processExcel(e.target.result));
      sheetName2 = sheetName_aux;
      console.log(inputZEUS, sheetName2);
    }
    r.readAsBinaryString(f);
  } else {
    console.log("Failed to load file");
  }
}

function processExcel(data) {
  var workbook = XLSX.read(data, {
    type: 'binary'
  });

  var firstSheet = workbook.SheetNames[0];
  var data = to_json(workbook);
  return data
};

function to_json(workbook) {
  var result = {};
  workbook.SheetNames.forEach(function (sheetName) {
    var roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
      header: 1
    });
    if (roa.length) result[sheetName] = roa;
    sheetName_aux = sheetName;
  });

  return JSON.stringify(result);
};


function sheetUpdater() {

  ////// Processing data

  if (inputMELI !== null && inputZEUS !== null) {

    if (sheetName1 === "Ayuda" || sheetName1 === "Help") { sheetName1 = "Publicaciones" }

    var icount = 0;
    var allcount = 0;
    var notUpdated = [];
    var updated = [];
    var tempMELI = JSON.parse(localStorage.getItem('inputMELI'));
    var tempZEUS = JSON.parse(localStorage.getItem('inputZEUS'));
    var specials = [];
    var specials_indeed = [];
    console.log(tempMELI);
    console.log(tempZEUS);

    for (var i = 1; i < tempMELI[sheetName1].length; i++) {
      allcount++;
      var skuMELI = (JSON.stringify(tempMELI[sheetName1][i][2])).toUpperCase();
      var priceMELI = parseFloat(tempMELI[sheetName1][i][7]);
      var quantityMELI = parseFloat(tempMELI[sheetName1][i][5]);
      var shipping = JSON.stringify(tempMELI[sheetName1][i][11]);
      var isPremium = JSON.stringify(tempMELI[sheetName1][i][13]);

      var repeatedLine = JSON.stringify(tempMELI[sheetName1][i][0]) === JSON.stringify(tempMELI[sheetName1][+i - 1][0]);

      for (var j = 1; j < tempZEUS[sheetName2].length; j++) {

        var skuZEUS = (JSON.stringify(tempZEUS[sheetName2][j][0])).toUpperCase();
        var priceZEUS = parseFloat(tempZEUS[sheetName2][j][2]);
        var quantityZEUS = parseFloat(tempZEUS[sheetName2][j][3]);

        if (repeatedLine === false && isPremium !== 0 && skuMELI === skuZEUS) {

          icount++;
          updated.push(skuZEUS);

          var newPrice = (priceZEUS * currency_exchange).toFixed(0);
          console.log(newPrice, shipping);
          if (newPrice < benefit_price) {
            newPrice = +newPrice + +markup_min;
            if (shipping.includes("gratis") === true) {
              newPrice = +newPrice + +shipping_nonbenefit;
            }
          } else if (shipping.includes("gratis") === true) {
            newPrice = +newPrice + +shipping_benefit;
          }
          console.log(newPrice);
          if (isPremium.includes("Premium") === true) {
            newPrice = (+newPrice / (1 - (+markup_premium / 100))).toFixed();
          } else {
            newPrice = (+newPrice / (1 - (+markup_classic / 100))).toFixed();
          }
          console.log(newPrice);
          tempMELI[sheetName1][i][7] = (+newPrice).toFixed(0);
          tempMELI[sheetName1][i][8] = (+newPrice).toFixed(0);

          if (document.getElementById("stock_checkbox").checked === true) {
            tempMELI[sheetName1][i][5] = quantityZEUS;
          }

          console.log("old data: " + skuMELI + ", " + priceMELI + ", " + quantityMELI);
          console.log("new data: " + skuMELI + ", " + tempMELI[sheetName1][i][7] + ", " + tempMELI[sheetName1][i][5]);

        } else {
          ///// special update for catalogue products
          var g = 0;

          if (JSON.stringify(tempMELI[sheetName1][i][10]) === "0") {
            if (specials.includes(i) === false) {
              specials.push(i);
              g = i;
              while (JSON.stringify(tempMELI[sheetName1][g][10]) === "0") {
                g--;
              }
              if (specials_indeed.includes(g) === false) {
                specials_indeed.push(g);
              }
            }
          }
        }
      }
    }
    console.log("especiales: " + specials + " a modificar: " + specials_indeed);

    for (let element of specials_indeed) {
      console.log(element);
      allcount++;

      if ((skuMELI) === true) {
        var skuMELI = (JSON.stringify(tempMELI[sheetName1][element][2])).toUpperCase();
      } else {
        skuMELI = (JSON.stringify(tempMELI[sheetName1][+element + 1][2])).toUpperCase();
      }

      var priceMELI = parseFloat(tempMELI[sheetName1][element][7]);
      var quantityMELI = parseFloat(tempMELI[sheetName1][element][5]);
      var shipping = JSON.stringify(tempMELI[sheetName1][element][11]);
      var isPremium = JSON.stringify(tempMELI[sheetName1][element][13]);

      for (var j = 1; j < tempZEUS[sheetName2].length; j++) {

        var skuZEUS = (JSON.stringify(tempZEUS[sheetName2][j][0])).toUpperCase();
        var priceZEUS = parseFloat(tempZEUS[sheetName2][j][2]);
        var quantityZEUS = parseFloat(tempZEUS[sheetName2][j][3]);

        if (isPremium !== 0 && skuMELI === skuZEUS) {

          icount++;
          updated.push(skuZEUS);

          var newPrice = (priceZEUS * currency_exchange).toFixed(0);
          console.log(newPrice, shipping);
          if (newPrice < benefit_price) {
            newPrice = +newPrice + +markup_min;
            if (shipping.includes("gratis") === true) {
              newPrice = +newPrice + +shipping_nonbenefit;
            }
          } else if (shipping.includes("gratis") === true) {
            newPrice = +newPrice + +shipping_benefit;
          }
          console.log(newPrice);
          if (isPremium.includes("Premium") === true) {
            newPrice = (+newPrice / (1 - (+markup_premium / 100))).toFixed();
          } else {
            newPrice = (+newPrice / (1 - (+markup_classic / 100))).toFixed();
          }
          console.log(newPrice);
          tempMELI[sheetName1][element][7] = (+newPrice).toFixed(0);
          tempMELI[sheetName1][element][8] = (+newPrice).toFixed(0);

          if (document.getElementById("stock_checkbox").checked === true) {
            tempMELI[sheetName1][element][5] = quantityZEUS;
          }

          console.log("old data: " + skuMELI + ", " + priceMELI + ", " + quantityMELI);
          console.log("new data: " + skuMELI + ", " + tempMELI[sheetName1][element][7] + ", " + tempMELI[sheetName1][element][5]);
        }
      }
    }


    alert("Se actualizaron " + icount + " de " + allcount + " productos");


    /// show not updated
    for (var i = 1; i < tempMELI[sheetName1].length; i++) {
      for (var j = 1; j < tempZEUS[sheetName2].length; j++) {
        var skuMELI = tempMELI[sheetName1][i][2];
        var skuZEUS = tempZEUS[sheetName2][j][0];
        if (updated.includes(skuZEUS) === false && notUpdated.includes(skuZEUS) === false) {
          notUpdated.push(skuZEUS);
        }
      }
    }
    console.dir(notUpdated);


    ///// Package and Download xlsx

    date = new Date();
    timestamp = date.getTime();

    if (typeof XLSX == 'undefined') XLSX = require('xlsx');
    var workbook = XLSX.utils.book_new();
    var worksheet = XLSX.utils.json_to_sheet(tempMELI[sheetName1]);
    var hiddenworksheet = XLSX.utils.json_to_sheet(tempMELI.hidden);
    var helpworksheet = XLSX.utils.json_to_sheet(tempMELI.Ayuda);

    // delete a specific row
    function ec(r, c) {
      return XLSX.utils.encode_cell({ r: r, c: c });
    }
    function delete_row(ws, row_index) {
      var variable = XLSX.utils.decode_range(ws["!ref"])
      for (var R = row_index; R < variable.e.r; ++R) {
        for (var C = variable.s.c; C <= variable.e.c; ++C) {
          ws[ec(R, C)] = ws[ec(R + 1, C)];
        }
      }
      variable.e.r--
      ws['!ref'] = XLSX.utils.encode_range(variable.s, variable.e);
    }
    delete_row(worksheet, 0);
    delete_row(hiddenworksheet, 0);
    delete_row(helpworksheet, 0);

    XLSX.utils.book_append_sheet(workbook, helpworksheet, "Ayuda");
    XLSX.utils.book_append_sheet(workbook, hiddenworksheet, "hidden");
    XLSX.utils.book_append_sheet(workbook, worksheet, "Publicaciones");



    XLSX.writeFileXLSX(workbook, ("Actualizacion-MELI-" + timestamp + ".xlsx"), { type: "file" });



  }

}


/// Tabs navigator

const TABS = [...document.querySelectorAll('#tabs li')];
const CONTENT = [...document.querySelectorAll('#tab-content span')];
const ACTIVE_CLASS = 'is-active';

function initTabs() {
  TABS.forEach((tab) => {
    tab.addEventListener('click', (e) => {
      let selected = tab.getAttribute('data-tab');
      updateActiveTab(tab);
      updateActiveContent(selected);
    })
  })
}

function updateActiveTab(selected) {
  TABS.forEach((tab) => {
    if (tab && tab.classList.contains(ACTIVE_CLASS)) {
      tab.classList.remove(ACTIVE_CLASS);
    }
  });
  selected.classList.add(ACTIVE_CLASS);

}

function updateActiveContent(selected) {
  CONTENT.forEach((item) => {
    if (item && item.classList.contains(ACTIVE_CLASS)) {
      item.classList.remove(ACTIVE_CLASS);
    }
    let data = item.getAttribute('data-content');
    if (data === selected) {
      item.classList.add(ACTIVE_CLASS);
    }
  });
}

initTabs();





