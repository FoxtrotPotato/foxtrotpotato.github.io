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

function ccalc(){
  var inputMonto=document.getElementById("input_monto").value;

  var contado=inputMonto;
  var ahora3=(inputMonto*1.05/3).toFixed(2);
  var ahora6=(inputMonto*1.10/6).toFixed(2);
  var ahora12=(inputMonto*1.15/12).toFixed(2);
  var ahora18=(inputMonto*1.20/18).toFixed(2);
 
  document.getElementById("contado_li").innerHTML = contado;
  document.getElementById("ahora3_li").innerHTML = ahora3;
  document.getElementById("ahora6_li").innerHTML = ahora6;
  document.getElementById("ahora12_li").innerHTML = ahora12;
  document.getElementById("ahora18_li").innerHTML = ahora18;
 
  // escribir en el textarea
  var texto="> Contado $"+contado+"\n"
  +">> 3 cuotas de $"+ahora3+"\n"
  +">> 6 cuotas de $"+ahora6+"\n"
  +">> 12 cuotas de $"+ahora12+"\n"
  +">> 18 cuotas de $"+ahora18+"\n"
  +"-"+"\n"
  +"\n"
  +"Los precios expresados son en pesos finales y están sujetos a variaciones en cualquier momento y sin previo aviso."+"\n"
  +"> Precio de contado a abonar en efectivo, por transferencia o depósito bancario, MercadoPago, Tarjetas de Débito y Crédito en un pago. 3 cuotas sin interés con Naranja en plan ZETA."+"\n"
  +">> Planes de financiación en 3, 6, 12 y 18 cuotas con tarjetas Visa, Mastercard, AMEX y Cabal emitidas por bancos.";
 
  document.getElementById("creditCard_text").innerHTML = texto;
}


// copiar creditcard al portapapeles

function copy_creditCard_text(){
  var copy_creditCard_text = document.querySelector('#copy_creditCard_text');
  copy_creditCard_text.addEventListener('click', function(event) {
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

function calcularSobrefac(){
  var inputPfinal=document.getElementById("input_precioFinal").value;
  var inputCosto=document.getElementById("input_precioGremio").value;

  var comision=(((inputPfinal-inputCosto)/1.21)-((inputPfinal-inputCosto)/1.21)*0.1).toFixed(0);
  var apagar=(inputPfinal-comision).toFixed(0);

  document.getElementById("output_comision").innerHTML = comision;
  document.getElementById("output_apagar").innerHTML = apagar;

  // escribir en el textarea1
  var texto1="Comisión $"+comision+"\n"+"Monto a pagar $"+apagar+"\n";
  document.getElementById("sobrefac_text1").innerHTML = texto1;

  // escribir en el textarea2
  var texto2=comision;
  document.getElementById("sobrefac_text2").innerHTML = texto2;
}


// copiar sobrefac al portapapeles

function copiarComisionApagar(){
  var copiarComisionApagar = document.querySelector('#copiarComisionApagar');
  copiarComisionApagar.addEventListener('click', function(event) {
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

function copiarComision(){
  var copiarComision = document.querySelector('#copiarComision');
  copiarComision.addEventListener('click', function(event) {
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

var inputMELI=localStorage;
var inputZEUS=localStorage;

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
      console.log(inputMELI);
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
      console.log(inputZEUS);
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
  workbook.SheetNames.forEach(function(sheetName) {
    var roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
      header: 1
    });
    if (roa.length) result[sheetName] = roa;
  });
  return JSON.stringify(result,2,2);
  
};


////// Processing data



function downloadCSV(){

  //var retrievedObject = localStorage.getItem('inputMELI');
  //console.log(JSON.parse(retrievedObject));

  //console.log(inputMELI);
  //console.log(inputZEUS);


  var tempMELI = JSON.parse(localStorage.getItem('inputMELI'));
  var tempZEUS = JSON.parse(localStorage.getItem('inputZEUS'));
  console.log(tempMELI);
  console.log(tempZEUS);

  //var ilength = tempMELI.Publicaciones.length;
  //var jlength = tempZEUS.ExpArt.length;
  //console.log(ilength);
  //console.log(jlength);
  

  for (var i = 0; i < tempMELI.Publicaciones.length; i++){
    for (var j = 0; j < tempZEUS.ExpArt.length; j++){

      var skuMELI = tempMELI.Publicaciones[i][2];
      var skuZEUS = tempZEUS.ExpArt[j][0];
    
      if(skuMELI===skuZEUS){
        console.log("i="+i+" j="+j);

        var newPrice = tempZEUS.ExpArt[j][2];
        var newQuantity = tempZEUS.ExpArt[j][3];
       
        tempMELI.Publicaciones[i][5] = tempZEUS.ExpArt[j][2];
        tempMELI.Publicaciones[i][4] = tempZEUS.ExpArt[j][3];

        console.log(skuMELI+", "+tempMELI.Publicaciones[i][5]+", "+tempMELI.Publicaciones[i][4]);
        console.log(skuZEUS+", "+newPrice+", "+newQuantity);
      }
    }
  }
  
 // localStorage.setItem("inputMELI",(tempMELI));
 // console.log(inputMELI);

}







/*

var newItem = {
  title: $('#title').val(),
  description: $('#description').val()
}

if (localStorage.getItem("newData") === null) {
  localStorage.setItem("newData", JSON.stringify([newItem]));
} else {
  var oldItems = JSON.parse(localStorage.getItem('newData'));
  oldItems.push(newItem);
  localStorage.setItem('newData', JSON.stringify(oldItems));
}

var newArr = JSON.parse(window.localStorage.getItem('newData'));

for (var i = 0, len = newArr.length; i < len; i++) {
  var savedPerson = newArr[i];
  console.log(savedPerson)
  console.log(savedPerson.title)
  console.log(savedPerson.description)
}

*/








  /*
  const workbook = XLSX.utils.book_new()
  const filename = 'updatedMELI';
  const dataSheet = XLSX.utils.json_to_sheet(file3)
  XLSX.utils.book_append_sheet(workbook, dataSheet, filename.replace('/', ''))

  return XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' })
*/




//    var file1_string=JSON.stringify(file1)
//    var file2_string=JSON.stringify(file2)


  /*
    var id_variant=JSON.stringify(file1.VARIATION_ID);
    var sku1=JSON.stringify(file1.SKU);
    var sku_variant=JSON.stringify(file1.VARIATIONS);
    var premium=JSON.stringify(file1.LISTING_TYPE);

    var sku2=JSON.stringify(file2.SKU);
    var price2=JSON.stringify(file2.PRECIO);
    var stock2=JSON.stringify(file2.CANTIDAD);

    let price3= (sku1==sku2) ? price2:0;
    let stock3= (sku1==sku2) ? stock2:0;
    
    var file3= new Object();
    file3.item_id=file1.item_id;
    file3.item_id=file1.item_id;

    file3.ITEM_ID=id;
    file3.VARIATION_ID=id_variant;
    file3.SKU=sku1;
    file3.VARIATIONS=sku_variant;
    file3.QUANTITY=stock2;
    file3.PRICE=price2;
    
    console.log(file3);
  }
*/

//}





/*

es necesario agregar:
campo DOLAR (tomar predeterminado valor BNA + 1 - editable)
campo COSTO ENVIO (poner predeterminado el costo que tenga al momento -segunda etapa- sobreescribir permanentemente el cambio)
campo %

add function: *dolar *%meli +shipping +extraUnderValue

*/





