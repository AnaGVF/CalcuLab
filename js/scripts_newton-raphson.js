
function resolver() {

	// Consigue la ecuación
	var polinomio = document.getElementById("ecuacion").value;
	polinomioString = polinomio.toString();
	
	// Deriva la ecuación
	var derivadaPolinomio = nerdamer.diff(polinomio, "x");
	derivadaPolinomioString = derivadaPolinomio.toString();

	// Consigue el valor del raizGuess
	var raizGuess = document.getElementById("raizGuess").value;
	
	var evaluacion = nerdamer(polinomioString, {x:parseInt(raizGuess)}).evaluate();
	//console.log(evaluacion.text());
	
	// document.getElementById('resultado').innerHTML= polinomio;
	// document.getElementById('resultado').innerHTML= derivadaPolinomio;
	var arrayGUESS = [];
	var arrayPOL = [];
	var arrayDER = [];
	var arrayFINAL = [];
	for (var i=1; i<=20; i++) {

		var valor = parseInt(raizGuess);
		arrayGUESS.push(valor);
		var evaluacionPol = nerdamer(polinomioString, {x:valor}).evaluate();
		arrayPOL.push(evaluacionPol);
		// console.log(evaluacionPol.toString());
		var evaluacionDer = nerdamer(derivadaPolinomioString, {x:valor}).evaluate();
		arrayDER.push(evaluacionDer);
		// console.log(evaluacionDer.toString());
		var final = valor - (parseInt(evaluacionPol)/(parseInt(evaluacionDer)));
		arrayFINAL.push(final);
		
		raizGuess = final;
	}

	var html = "<table border='1|1'>";
	html+="<tr>" + "Valor" + "</tr>";
		for (var i = 0; i < arrayGUESS.length; i++) {
    		html+= "<tr>";
    		html+= "<td>" + arrayGUESS[i] + "</td>";
    		html+= "</tr>";
    	} 
    html+="</table>";

    var html2 = "<table border='1|1'>";
    html2+="<tr>" + "f(x)" + "</tr>";
		for (var i = 0; i < arrayPOL.length; i++) {
    		html2+= "<tr>";
    		html2+= "<td>" + arrayPOL[i] + "</td>";
    		html2+= "</tr>";
    	}
    html2+="</table>";

    var html3 = "<table border='1'>";
    html3+="<tr>" + "f'(x)" + "</tr>";
		for (var i = 0; i < arrayDER.length; i++) {
    		html3+= "<tr>";
    		html3+= "<td>" + arrayDER[i] + "</td>";
    		html3+= "</tr>";
    	}
    html3+="</table>";

    var html4 = "<table border='1'>";
	html4+="<tr>" + "Raíz" + "</tr>";
		for (var i = 0; i < arrayFINAL.length; i++) {
    		html4+= "<tr>";
    		html4+= "<td>" + arrayFINAL[i] + "</td>";
    		html4+= "</tr>";
    	}
	html4+="</table>";
		
	document.getElementById("resultado").innerHTML = html;
	document.getElementById("resultado2").innerHTML = html2;
	document.getElementById("resultado3").innerHTML = html3;
	document.getElementById("resultado4").innerHTML = html4;

	var mostrarRespuesta = document.getElementById("answer");
	mostrarRespuesta.style.display = "block";
	var mostrarRaiz = document.getElementById("raiz");
	mostrarRaiz.style.display = "block";
	document.getElementById("raiz").innerHTML = arrayFINAL[19];
			
}