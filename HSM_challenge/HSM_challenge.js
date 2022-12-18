localStorage.clear();

var input = localStorage;
var sheetName1 = "";
var sheetName_aux = "";
var f = 0;
var mes = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre")

var file = document.getElementById('input');
file.addEventListener('change', importFile);



function importFile(evt) {
    var f = evt.target.files[0];
    
    if (f) {
      var r = new FileReader();
      r.onload = e => {
        localStorage.setItem("input", processExcel(e.target.result));
        sheetName1 = sheetName_aux;
        console.log(input, sheetName1);
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

  
  
function processData() {     
    if (input !== null) {   
        var temp = JSON.parse(localStorage.getItem('input'));   
        var meses = [];
        var dias = [];
        var precipitaciones = [];
        var avgPrecipMensuales = [];
        var avgPrecipAnual = 0;
        var maxPMMes = 0;
        var maxPMCantidad = 0;
        var maxDiasPMCant = 0;
        var maxDiasPMMes = 0;
        var rachaMax = 0;
        var rachaDia = 0;
        var rachaMes = 0;
        var precipTotal = 0;
        var mesesRep = [];
        var precipMensuales = [];    
        
        for (var i = 0; i < temp[sheetName1].length; i++) {            
            var j = parseInt(temp[sheetName1][0][2]);
            if(isNaN(k)) {
                j = i - 1;
                if(j > -1) {
                    meses[j] = parseInt(temp[sheetName1][i][0]);
                    dias[j] = parseInt(temp[sheetName1][i][1]);
                    precipitaciones[j] = parseInt(temp[sheetName1][i][2]);
                }
            }else{
                meses [i] = parseInt(temp[sheetName1][i][0]);
                dias [i] = parseInt(temp[sheetName1][i][1]);
                precipitaciones [i] = parseInt(temp[sheetName1][i][2]);
            }
        }
        
        
        var k = 0;
        var mesesAgrupCount = [];
        var racha = 0;
        var mesTemp = 0;
        mesesRep[k] = meses[0];
        mesesAgrupCount[k] = 0;
        precipMensuales[k] = 0;
        avgPrecipMensuales[k] = 0;
        rachaMes = meses[k];
        rachaDia = dias[k];
                
        for (var i = 0; i < meses.length; i++) {   
            precipTotal = precipTotal + precipitaciones [i];
                        
            if (mesTemp == meses[i]) {
                racha++;
            } else {
                racha = 1;
            }
            mesTemp = meses[i];
            
            if(racha > rachaMax){
                rachaMax = racha; 
                if (rachaMes !== meses[i]){
                    rachaDia = dias[i];
                }
                rachaMes = meses[i];
            }
            

            if (meses[i] !== mesesRep[k]) {
                k++;
                mesesRep[k] = meses[i];
                mesesAgrupCount[k] = 0;
                precipMensuales[k] = 0;
                avgPrecipMensuales[k] = 0;
            } 

            mesesAgrupCount[k]++;
            precipMensuales[k] = precipMensuales[k] + precipitaciones [i];
            avgPrecipMensuales[k] = precipMensuales[k] / mesesAgrupCount[k];
           
        }
        
     
        var strPrecipMensuales = "";

        for (var i = 0; i < mesesRep.length; i++) {    
            var m = mesesRep[i]-1;

            strPrecipMensuales = strPrecipMensuales + "  - " + mes[m] + ": " + avgPrecipMensuales[i] + "mm.";

                if(maxPMCantidad < precipMensuales[i]){
                    maxPMCantidad = precipMensuales[i];
                    maxPMMes = mes[m];
                }

                if(maxDiasPMCant < mesesAgrupCount[i]){
                    maxDiasPMCant = mesesAgrupCount[i];
                    maxDiasPMMes = mes[m];
                }

            }
            
            avgPrecipAnual = precipTotal / meses.length;

            document.getElementById("avgPrecipMensuales_li").innerHTML = strPrecipMensuales;
            document.getElementById("avgPrecipAnual_li").innerHTML = avgPrecipAnual + "mm.";
            document.getElementById("maxPMMes_li").innerHTML = maxPMMes;
            document.getElementById("maxPMCantidad_li").innerHTML = maxPMCantidad + "mm.";
            document.getElementById("maxDiasPMMes_li").innerHTML = maxDiasPMMes;
            document.getElementById("maxDiasPMCant_li").innerHTML = maxDiasPMCant + " dias.";
            
            document.getElementById("rachaMes_li").innerHTML = mes[rachaMes-1];
            document.getElementById("rachaDia_li").innerHTML = rachaDia;
            document.getElementById("racha_li").innerHTML = rachaMax + " dias.";
    }
    
    console.log(mesesAgrupCount);
    console.log(precipMensuales);
    console.log(avgPrecipMensuales);
}
