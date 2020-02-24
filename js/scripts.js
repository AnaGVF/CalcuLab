function derivar() {
	console.log("Hola!");
	
	// Consigue la ecuación
	var inicio = document.getElementById("ecuacion").value;
	var ecuacionInicial = inicio.toString();
	console.log("Ecuación inicial: " + ecuacionInicial);

	// Sustituye 'x' por 'x+h'
	var paso1 = nerdamer(inicio).sub('x', '(x+h)');
	var paso1FINAL = "(" + paso1.toString() + ")";
	console.log("Paso 1: " + paso1FINAL);

	// Efectuar f(x+h)-f(x)
	var paso2 = paso1FINAL + "-" + inicio;
	var paso2FINAL = paso2.toString();
	console.log("Paso 2: " + paso2FINAL);

	// Efectuar (f(x+h)-f(x)) / h
	var paso3 = "(" + paso2FINAL + ")" + "/" + "h";
	var paso3FINAL = paso3.toString();
	console.log("Paso 3: " + paso3FINAL);

	// Simplify paso3
	var simplificar = nerdamer('simplify(' + paso3FINAL + ')');
	// console.log(simplificar);

	// Evaluar: lim h -> 0 (f(x+h)-f(x)) / h
	var paso4 = nerdamer(simplificar).evaluate({h: '0'});
	var paso4FINAL = nerdamer('simplify(' + paso4 + ')');
	console.log("Paso 4: " + paso4FINAL);

	// Despliega las respuestas finales
	var mostrarRespuesta = document.getElementById("answer");
	mostrarRespuesta.style.display = "block";
	var mostrarRaiz = document.getElementById("derivada");
	mostrarRaiz.style.display = "block";

	// RESPUESTA FINAL
	document.getElementById("derivada").innerHTML = paso4FINAL + "<br><br>" 
												+ "<b>" + "Ecuación Inicial:" + "</b>" + "&nbsp" + "y = " + ecuacionInicial + "<br>" + "<br>"
												+ "<b>" + "Paso 1 (Sustituir 'x' por 'x+h'): " + "</b>" + "&nbsp" + paso1FINAL + "<br>" + "<br>"
												+ "<b>" + "Paso 2 (Efectuar f(x+h)-f(x)): " + "</b>" + "&nbsp" + paso2FINAL + "<br>" + "<br>"
												+ "<b>" + "Paso 3 (Efectuar (f(x+h)-f(x)) / h): " + "</b>" + "&nbsp" + paso3FINAL + "<br>" + "<br>"
												+ "<b>" + "Paso 4 (Evaluar: lim h -> 0 (f(x+h)-f(x)) / h): " + "</b>" + "&nbsp" + paso4FINAL;
}

// Función para obtener las raíces de un polinomio de CUARTO GRADO
function resolverCuartoGrado() {

	// Consigue la ecuación
	var polinomio = document.getElementById("ecuacion").value;
	polinomioString = polinomio.toString();
	
	// Deriva la ecuación
	var derivadaPolinomio = nerdamer.diff(polinomio, "x");
	derivadaPolinomioString = derivadaPolinomio.toString();

	// Consigue el valor del raizGuess
	var raizGuess = 10;	

	// Evaluación de los tres valores de f(x), f'(x), x-(f(x)/f'(x))

	// var evaluacion = nerdamer(polinomioString, {x:parseInt(raizGuess)}).evaluate();
	
	var arrayGUESS = [];
	var arrayPOL = [];
	var arrayDER = [];
	var arrayFINAL = [];
	for (var i=1; i<=20; i++) {
		var valor = parseInt(raizGuess);
		arrayGUESS.push(valor);
		// Evalúa el polinomio con el raizGuess
		var evaluacionPol = nerdamer(polinomioString, {x:valor}).evaluate();
		arrayPOL.push(evaluacionPol);
		// Evalúa la derivada con el raizGuess
		var evaluacionDer = nerdamer(derivadaPolinomioString, {x:valor}).evaluate();
		arrayDER.push(evaluacionDer);
		// Efectúa la operación final
		var final = valor - (parseInt(evaluacionPol)/(parseInt(evaluacionDer)));
		arrayFINAL.push(final);
		
		raizGuess = final;
	}

	var raizENCONTRADA = arrayFINAL[19].toString();

	raizENCONTRADA = Math.round(raizENCONTRADA * 100) / 100;
	console.log(raizENCONTRADA);

	// Calcular los coeficientes del polinomio ingresado
	var coeficientes = document.getElementById("ecuacion").value;
	var obtenerCoeficientes = nerdamer.coeffs(coeficientes, 'x');
	var obtenerCoeficientesString = obtenerCoeficientes.toString();

	// Convierte coeficientes fraccionarios a decimal
	var stringSEPARAR = obtenerCoeficientesString;
	var stringSEPARADO = stringSEPARAR.split(',');
	// stringSEPARADO[0] = eval(stringSEPARADO[1].toString());
	stringSEPARADO[1] = eval(stringSEPARADO[1].toString());
	stringSEPARADO[2] = eval(stringSEPARADO[2].toString());
	stringSEPARADO[3] = eval(stringSEPARADO[3].toString());
	// stringSEPARADO[3] = eval(stringSEPARADO[1].toString());
	console.log(stringSEPARADO[2].toString());
	var stringUNIDO = stringSEPARADO.join(',');	

	var arregloCoeficientes = JSON.parse(stringUNIDO);
	var arregloCoeficientesREVES = arregloCoeficientes.reverse();
	console.log("COEF AL REVES" + arregloCoeficientesREVES);	

	var arregloCoeficientes = JSON.parse(obtenerCoeficientesString);
	var arregloCoeficientesREVES = arregloCoeficientes.reverse();
	console.log(arregloCoeficientesREVES);

	// División Sintética

	var primerNUM = arregloCoeficientes[0];
	var segundoNUM;
	var tercerNUM;
	var cuartoNUM;	
	var quintoNUM;	

		// Coeficientes del polinomio

	var segundoCOFF = arregloCoeficientesREVES[1];
	var tercerCOFF = arregloCoeficientesREVES[2];
	var cuartoCOFF = arregloCoeficientesREVES[3];
	var quintoCOFF = arregloCoeficientesREVES[4];


		// Sumandos de la División Sintética

	var segundoSUMANDO = (primerNUM*arrayFINAL[19]);
	segundoNUM = segundoCOFF + segundoSUMANDO;
	segundoNUM = Math.round(segundoNUM * 100) / 100;
		if(segundoNUM >= 0) {
			segundoNUM = "+" + segundoNUM;
		}

	console.log("SEGUNDO" + segundoNUM.toString());

	var tercerSUMANDO = (segundoNUM*arrayFINAL[19]);
	tercerNUM = tercerCOFF + tercerSUMANDO;
	tercerNUM = Math.round(tercerNUM * 100) / 100;
		if(tercerNUM >= 0) {
			tercerNUM = "+" + tercerNUM;
		}

	console.log("TERCERO" + tercerNUM.toString());

	var cuartoSUMANDO = (tercerNUM*arrayFINAL[19]);
	cuartoNUM = cuartoCOFF + cuartoSUMANDO;
	cuartoNUM = Math.round(cuartoNUM * 100) / 100;
		if(cuartoNUM >= 0) {
			cuartoNUM = "+" + cuartoNUM;
		}

	console.log("CUARTO" + cuartoNUM.toString());

	var quintoSUMANDO = (cuartoNUM*arrayFINAL[19]);
	quintoNUM = quintoCOFF + quintoSUMANDO;
	quintoNUM = Math.round(quintoNUM * 100) / 100;
		if(quintoNUM >= 0) {
			quintoNUM = "+" + quintoNUM;
		}	

	console.log("QUINTO" + quintoNUM.toString());

		// Polinomio reducido en un grado

	var ecuacionReducida = primerNUM + "x^3" + segundoNUM + "x^2" + tercerNUM + "x" + cuartoNUM;
	var ecuacionReducidaString = ecuacionReducida.toString();

	console.log(ecuacionReducidaString);

	var solucionECUACIONREDUCIDA = nerdamer.solveEquations(ecuacionReducidaString +'=0','x');
	var solucionECUACIONREDUCIDA_STRING = solucionECUACIONREDUCIDA.toString();
	solucionECUACIONREDUCIDA_STRING = solucionECUACIONREDUCIDA_STRING + "," + raizENCONTRADA;
	console.log(solucionECUACIONREDUCIDA_STRING);

	// Se separa el string de respuestas encontradas para una mejor visualización
	var stringSEPARAR = solucionECUACIONREDUCIDA_STRING;
	var respuestasSEPARADAS = stringSEPARAR.split(',');	
	
	// Despliega las respuestas finales
	var mostrarRespuesta = document.getElementById("answer");
	mostrarRespuesta.style.display = "block";
	var mostrarRaiz = document.getElementById("raiz");
	mostrarRaiz.style.display = "block";

	// RESPUESTA FINAL (RAÍCES ENCONTRADAS)

	document.getElementById("raiz").innerHTML = respuestasSEPARADAS[0].toString() + "<br><br><br>" +
												respuestasSEPARADAS[1].toString() + "<br><br><br>" +	
												respuestasSEPARADAS[2].toString() + "<br><br><br>" +
												respuestasSEPARADAS[3].toString(); 
}

// --------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------

// Función para obtener las raíces de un polinomio de TERCER GRADO
function resolverTercerGrado() {

	// Consigue la ecuación
	var polinomio = document.getElementById("ecuacion").value;
	polinomioString = polinomio.toString();
	console.log(polinomioString);	

	// Deriva la ecuación
	var derivadaPolinomio = nerdamer.diff(polinomio, "x");
	derivadaPolinomioString = derivadaPolinomio.toString();

	// Consigue el valor del raizGuess
	var raizGuess = 10;	

	// Evaluación de los tres valores de f(x), f'(x), x-(f(x)/f'(x))

	// var evaluacion = nerdamer(polinomioString, {x:parseInt(raizGuess)}).evaluate();
	
	var arrayGUESS = [];
	var arrayPOL = [];
	var arrayDER = [];
	var arrayFINAL = [];
	for (var i=1; i<=20; i++) {
		var valor = parseInt(raizGuess);
		arrayGUESS.push(valor);
		// Evalúa el polinomio con el raizGuess
		var evaluacionPol = nerdamer(polinomioString, {x:valor}).evaluate();
		arrayPOL.push(evaluacionPol);
		// Evalúa la derivada con el raizGuess
		var evaluacionDer = nerdamer(derivadaPolinomioString, {x:valor}).evaluate();
		arrayDER.push(evaluacionDer);
		// Efectúa la operación final
		var final = valor - (parseInt(evaluacionPol)/(parseInt(evaluacionDer)));
		arrayFINAL.push(final);
		
		raizGuess = final;
	}

	var raizENCONTRADA = arrayFINAL[19].toString();
	raizENCONTRADA = Math.round(raizENCONTRADA * 100) / 100;
	console.log(raizENCONTRADA);
	
	// Calcular los coeficientes del polinomio ingresado

	var coeficientes = document.getElementById("ecuacion").value;
	var obtenerCoeficientes = nerdamer.coeffs(coeficientes, 'x');
	var obtenerCoeficientesString = obtenerCoeficientes.toString();

	// Convierte coeficientes fraccionarios a decimal
	var stringSEPARAR = obtenerCoeficientesString;
	var stringSEPARADO = stringSEPARAR.split(',');
	// stringSEPARADO[0] = eval(stringSEPARADO[1].toString());
	stringSEPARADO[1] = eval(stringSEPARADO[1].toString());
	stringSEPARADO[2] = eval(stringSEPARADO[2].toString());
	// stringSEPARADO[3] = eval(stringSEPARADO[1].toString());
	console.log(stringSEPARADO[2].toString());
	var stringUNIDO = stringSEPARADO.join(',');	

	var arregloCoeficientes = JSON.parse(stringUNIDO);
	var arregloCoeficientesREVES = arregloCoeficientes.reverse();
	console.log("COEF AL REVES" + arregloCoeficientesREVES);	

	// División Sintética

	var primerNUM = arregloCoeficientes[0];
	var segundoNUM;
	var tercerNUM;
	var cuartoNUM;	

		// Coeficientes del polinomio

	var segundoCOFF = arregloCoeficientesREVES[1];
	var tercerCOFF = arregloCoeficientesREVES[2];
	var cuartoCOFF = arregloCoeficientesREVES[3];
		
		// Sumandos de la División Sintética

	var segundoSUMANDO = (primerNUM*arrayFINAL[19]);
	segundoNUM = segundoCOFF + segundoSUMANDO;
	segundoNUM = Math.round(segundoNUM * 100) / 100;
		if(segundoNUM >= 0) {
			segundoNUM = "+" + segundoNUM;
		}

	console.log("SEGUNDO" + segundoNUM.toString());

	var tercerSUMANDO = (segundoNUM*arrayFINAL[19]);
	tercerNUM = tercerCOFF + tercerSUMANDO;
	tercerNUM = Math.round(tercerNUM * 100) / 100;
		if(tercerNUM >= 0) {
			tercerNUM = "+" + tercerNUM;
		}

	console.log("TERCERO" + tercerNUM.toString());

	var cuartoSUMANDO = (tercerNUM*arrayFINAL[19]);
	cuartoNUM = cuartoCOFF + cuartoSUMANDO;
	cuartoNUM = Math.round(cuartoNUM * 100) / 100;
		if(cuartoNUM >= 0) {
			cuartoNUM = "+" + cuartoNUM;
		}

	console.log("CUARTO" + cuartoNUM.toString());

		// Polinomio reducido en un grado

	var ecuacionReducida = primerNUM + "x^2" + segundoNUM + "x" + tercerNUM;
	var ecuacionReducidaString = ecuacionReducida.toString();
	console.log("EC REDUCIDA  " + ecuacionReducidaString);

	console.log("primer numero " + primerNUM.toString());
	console.log("segundo numero " + segundoNUM.toString());
	console.log("tercer numero " + tercerNUM.toString());

	var solucionECUACIONREDUCIDA = nerdamer.solveEquations(ecuacionReducidaString + "=0",'x');
	var solucionECUACIONREDUCIDA_STRING = solucionECUACIONREDUCIDA.toString();
	solucionECUACIONREDUCIDA_STRING = solucionECUACIONREDUCIDA_STRING + "," + raizENCONTRADA;
	console.log(solucionECUACIONREDUCIDA_STRING);

	// Se separa el string de respuestas encontradas para una mejor visualización
	var stringSEPARAR = solucionECUACIONREDUCIDA_STRING;
	var respuestasSEPARADAS = stringSEPARAR.split(',');	
	console.log(respuestasSEPARADAS.toString());
	
	// Despliega las respuestas finales
	var mostrarRespuesta = document.getElementById("answer");
	mostrarRespuesta.style.display = "block";
	var mostrarRaiz = document.getElementById("raiz");
	mostrarRaiz.style.display = "block";

	// RESPUESTA FINAL (RAÍCES ENCONTRADAS)

	document.getElementById("raiz").innerHTML = respuestasSEPARADAS[0].toString() + "<br><br><br>" +
												respuestasSEPARADAS[1].toString() + "<br><br><br>" +	
												respuestasSEPARADAS[2].toString(); 
}

// Función que calcula los máximos y mínimos de una ecuación
function maxMin() {
	var ecuacion = document.getElementById("ecuacion").value;	

	var primeraDerivada = nerdamer('diff(' + ecuacion + ', x)');
	console.log(primeraDerivada.toString());

	var solucionarEcuacion = nerdamer('solve(' + primeraDerivada + ', x)');
	console.log("Raices: " + solucionarEcuacion.toString());
	var solucionarEcuacionSTRING = parseInt("solucionarEcuacion");

	var segundaDerivada = nerdamer('diff(' + primeraDerivada + ', x)');
	console.log(segundaDerivada.toString());

	var arregloRaices = JSON.parse(solucionarEcuacion);
	
	// var arregloMinMax = [];

	// for (var i = 0; i <= arregloRaices.length - 1; i++) {
	// 	var substituir = nerdamer(segundaDerivada).sub('x', arregloRaices[i]).evaluate();
	// 	var substituirINT = JSON.parse(substituir);
	// 	arregloMinMax += [substituirINT + ', '];
	// }	

	// console.log(arregloMinMax[0]);

	var substituir = nerdamer(segundaDerivada).sub('x', arregloRaices[0]).evaluate();
	var substituir2 = nerdamer(segundaDerivada).sub('x', arregloRaices[1]).evaluate();

	var	arregloMinMax = [substituir, substituir2];

	var substituirInicial = nerdamer(ecuacion).sub('x', (arregloRaices[0])).evaluate();
	var substituirInicial2 = nerdamer(ecuacion).sub('x', (arregloRaices[1])).evaluate();

	var arregloFINAL = [substituirInicial, substituirInicial2];

	if(arregloMinMax[0] < 0) {
		var significado = "MÁXIMO en " + arregloFINAL[0];			
	} else {
		var significado = "MÍNIMO en " + arregloFINAL[0];
	}

	if(arregloMinMax[1] > 0) {
		var significado2 = "MÍNIMO en " + arregloFINAL[1];			
	} else {
		var significado2 = "MÁXIMO en " + arregloFINAL[1];
	}

	document.getElementById("answer").style.display = "block";

	document.getElementById("maxmin").innerHTML = significado.toString() + "<br>" 
												+ significado2.toString(); 
}	

// Función que realiza el método Simpson
function simpson() {
	// Consigue la ecuación
	var polinomio = document.getElementById("ecuacion").value;
	polinomioString = polinomio.toString();
	console.log(polinomioString);
	
	// Consigue el LS
	var limiteS = document.getElementById("LS").value;
	var LSFLOAT = parseFloat(limiteS);

	// Consigue el LI
	var limiteI = document.getElementById("LI").value;
	var LIFLOAT = parseFloat(limiteI);
	var LIFLOAT2 = parseFloat(limiteI);

	// Consigue el LI
	var n = document.getElementById("n").value;

	// Conseguir el intervalo siempre para n = 100
	var intervalo = (limiteS - limiteI)/n;
	var intervaloFLOAT = parseFloat(intervalo);

	// Variables

		// PRIMER COLUMNA
		var arrayFigura = [];

		// SEGUNDA COLUMNA
		var arrayXI = [];
		arrayXI.push(LIFLOAT);

		// TERCER COLUMNA
		var substitute1 = nerdamer(polinomio).sub('x', LIFLOAT);
		var arrayYI = [];
		arrayYI.push(substitute1);

		// CUARTA COLUMNA
		var arrayXF = [];

		// QUINTA COLUMNA
		var arrayYF = [];

		// SEXTA COLUMNA
		var arrayArea = [];

	for (var i=1; i<=n; i++) {
		// Columna 1
		arrayFigura.push(i);

		// Columna 4
		var LIFLOAT2 = LIFLOAT2 + intervaloFLOAT;
		var LIFLOATFinal2 = LIFLOAT2.toFixed(3);
		arrayXF.push(LIFLOATFinal2);

		// Columna 5
		var substitute2 = nerdamer(polinomio).sub('x', LIFLOATFinal2);
		arrayYF.push(substitute2);

	}

	for (var i=1; i<=n-1; i++) {
		// Columna 2
		LIFLOAT = LIFLOAT + intervaloFLOAT;
		var LIFLOATFinal = LIFLOAT.toFixed(3);
		arrayXI.push(LIFLOATFinal);

		// Columna 3
		var substitute1 = nerdamer(polinomio).sub('x', LIFLOATFinal);
		arrayYI.push(substitute1);		
	}

		// Columna 6
		for (var j = 0; j < n; j++) {
			var areaFinal = ((arrayYF[j] + arrayYI[j])/2)*intervaloFLOAT;
			var areaFINALFLOAT = areaFinal.toFixed(3);
			arrayArea.push(areaFINALFLOAT);
		}

		var suma = 0;
		var sumaFLOAT = parseFloat(suma);

		for (var k = 0; k < arrayArea.length; k++) {
			sumaFLOAT = parseFloat(sumaFLOAT) + parseFloat(arrayArea[k]);
		}		

		var sumaTOTAL = sumaFLOAT.toFixed(3);

	// Se despliega todo el contenido en una tabla
	var html = "<table border='1|1'>";
	html+="<tr>" + "Figura" + "</tr>";
		for (var i = 0; i < arrayFigura.length; i++) {
    		html+= "<tr>";
    		html+= "<td>" + arrayFigura[i] + "</td>";
    		html+= "</tr>";
    	} 
    html+="</table>";

    var html2 = "<table border='1|1'>";
    html2+="<tr>" + "Xi" + "</tr>";
		for (var i = 0; i < arrayXI.length; i++) {
    		html2+= "<tr>";
    		html2+= "<td>" + arrayXI[i] + "</td>";
    		html2+= "</tr>";
    	}
    html2+="</table>";

    var html3 = "<table border='1'>";
    html3+="<tr>" + "Yi" + "</tr>";
		for (var i = 0; i < arrayYI.length; i++) {
    		html3+= "<tr>";
    		html3+= "<td>" + arrayYI[i] + "</td>";
    		html3+= "</tr>";
    	}
    html3+="</table>";

    var html4 = "<table border='1'>";
	html4+="<tr>" + "Xf" + "</tr>";
		for (var i = 0; i < arrayXF.length; i++) {
    		html4+= "<tr>";
    		html4+= "<td>" + arrayXF[i] + "</td>";
    		html4+= "</tr>";
    	}
	html4+="</table>";

	var html5 = "<table border='1'>";
	html5+="<tr>" + "Yf" + "</tr>";
		for (var i = 0; i < arrayYF.length; i++) {
    		html5+= "<tr>";
    		html5+= "<td>" + arrayYF[i] + "</td>";
    		html5+= "</tr>";
    	}
	html5+="</table>";

	var html6 = "<table border='1'>";
	html6+="<tr>" + "Área" + "</tr>";
		for (var i = 0; i < arrayArea.length; i++) {
    		html6+= "<tr>";
    		html6+= "<td>" + arrayArea[i] + "</td>";
    		html6+= "</tr>";
    	}
	html6+="</table>";
		
	document.getElementById("resultado").innerHTML = html;
	document.getElementById("resultado2").innerHTML = html2;
	document.getElementById("resultado3").innerHTML = html3;
	document.getElementById("resultado4").innerHTML = html4;
	document.getElementById("resultado5").innerHTML = html5;
	document.getElementById("resultado6").innerHTML = html6;

	var mostrarRespuesta = document.getElementById("answer");
	mostrarRespuesta.style.display = "block";
	var mostrarIntegral = document.getElementById("integral");
	mostrarIntegral.style.display = "block";
	document.getElementById("integral").innerHTML = sumaTOTAL;

}

// Función de los cálculos de la Aplicación del Cálculo Integral en las Finanzas
function APPCIF() {
	// Consigue la 1ra ecuación
	var ecuacion1 = document.getElementById("ecuacion1").value;
	var ecuacion1String = ecuacion1.toString();
	console.log(ecuacion1String);
	
	// Consigue la 2da ecuación
	var ecuacion2 = document.getElementById("ecuacion2").value;
	var ecuacion2String = ecuacion2.toString();
	console.log(ecuacion2String);

	// Se prepara la ecuación para resolverla
	var ecuacionFINAL = ecuacion1String + "-" + '(' + ecuacion2String + ')';
	console.log(ecuacionFINAL.toString());

	// Se obtiene el PUNTO DE EQUILIBRIO
	var puntoEquilibrio = nerdamer('solve(' + ecuacionFINAL + ', x)');
	console.log("Raices: " + puntoEquilibrio.toString());

	document.getElementById("answer1").style.display = "block";
	document.getElementById("answer1").innerHTML = "El Punto de Equilibrio será el número positivo de las raíces: " + puntoEquilibrio.toString();
	document.getElementById("simplificar").style.display = "block";
	document.getElementById("raizPositiva").style.display = "block";

}

function simplificacion() {
	// Simplifica la raíz positiva
	var raizPositiva = document.getElementById("raizPositiva").value;
	var raizPositivaSTRING = raizPositiva.toString();
	console.log(raizPositivaSTRING);

	var simplif = nerdamer('ceil(' + raizPositivaSTRING + ')').evaluate();
	document.getElementById("simplificado").innerHTML = "El Punto de Equilibrio es igual a: " + simplif.toString() + " meses.";
	var simplifSTRING = simplif.toString();

	// Consigue la 1ra ecuación
	var ecuacion1 = document.getElementById("ecuacion1").value;
	var ecuacion1String = ecuacion1.toString();
	console.log(ecuacion1String);
	
	// Consigue la 2da ecuación
	var ecuacion2 = document.getElementById("ecuacion2").value;
	var ecuacion2String = ecuacion2.toString();
	console.log(ecuacion2String);

	// Se prepara la ecuación para resolverla
	var ecuacionFINAL = ecuacion1String + "-" + '(' + ecuacion2String + ')';
	var ecuacionFINALSTRING = ecuacionFINAL.toString();
	console.log(ecuacionFINALSTRING);

	var montoInversion = nerdamer('defint(' + ecuacionFINALSTRING + ', 0, ' + simplifSTRING + ')');
	var montoInversionSTRING = montoInversion.toString();
	var simplifMONTO = nerdamer('ceil(' + montoInversionSTRING + ')').evaluate();

	document.getElementById("answer2").style.display = "block";
	document.getElementById("answer2").innerHTML = "El Monto de Inversión es igual a: " + simplifMONTO.toString() + " pesos.";

	// Se prepara la ecuación para resolverla
	var ecuacionFINAL2 = ecuacion2String + "-" + '(' + ecuacion1String + ')';
	var ecuacionFINALSTRING2 = ecuacionFINAL2.toString();
	console.log(ecuacionFINALSTRING2);

	var zeta = nerdamer('defint(' + ecuacionFINALSTRING2 + ',' + simplifSTRING +', z)');
	var ZSTRING = zeta.toString();
	console.log(ZSTRING);

	// Última ecuación
	var ultimaEC = ZSTRING + '-' + montoInversionSTRING;
	var ultimaECSTRING = ultimaEC.toString();
	console.log("Esta es la última ECUACION: " + ultimaECSTRING);

	// Resolviendo...
	var zsolution = nerdamer('roots(' + ultimaECSTRING + ')');
	var zsolutionSTRING = zsolution.toString();
	console.log("Esta es la solucion: " + zsolutionSTRING);

	document.getElementById("answer3").style.display = "block";
	document.getElementById("answer3").innerHTML = "Las raíces de Z: " + zsolutionSTRING;
}

function simplificacion2() {
	var raizPositiva = document.getElementById("raizPositiva2").value;
	var raizPositivaSTRING = raizPositiva.toString();
	console.log(raizPositivaSTRING);

	var simplif = nerdamer('ceil(' + raizPositivaSTRING + ')').evaluate();
	document.getElementById("simplificado2").innerHTML = "Z: " + simplif.toString() + " meses.";
	var simplifSTRING = simplif.toString();
}


// Función de los cálculos de Sistemas de Ecuaciones
function sustitucion() {
	// Consigue la 1ra ecuación
	var ecuacion1 = document.getElementById("ecuacion1").value;
	var ecuacion1String = ecuacion1.toString();
	console.log(ecuacion1String);
	
	// Consigue la 2da ecuación
	var ecuacion2 = document.getElementById("ecuacion2").value;
	var ecuacion2String = ecuacion2.toString();
	console.log(ecuacion2String);

	// Consigue la 3ra ecuación
	var ecuacion3 = document.getElementById("ecuacion3").value;
	var ecuacion3String = ecuacion3.toString();
	console.log(ecuacion3String);

	// Resolver Sistema de Ecuaciones
	nerdamer.set('SOLUTIONS_AS_OBJECT', true);
	sol = nerdamer.solveEquations([ecuacion1String, ecuacion2String, ecuacion3String]);
	console.log(sol);

	document.getElementById("answer").style.display = "block";
	document.getElementById("respuestaX").innerHTML = "X = " + sol.x;
	document.getElementById("respuestaY").innerHTML = "Y = " + sol.y;
	document.getElementById("respuestaZ").innerHTML = "Z = " + sol.z;
}

	



	



	

	




