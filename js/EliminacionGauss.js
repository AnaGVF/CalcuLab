//////////////////////////////////////////////////////////////////////////////////

var abs = Math.abs;

function array_fill(i, n, v) {
    var a = [];
    for (var i = 0; i < n; i++) {
        a.push(v);
    }
    return a;
}

/**
 * Gaussian elimination
 * @param  array A matrix
 * @param  array x vector
 * @return array x solution vector
 */
function gauss(A, x) {

    var i, k, j;

    // Just make a single matrix
    for (i=0; i < A.length; i++) { 
        A[i].push(x[i]);
    }
    var n = A.length;

    for (i=0; i < n; i++) { 
        // Search for maximum in this column
        var maxEl = abs(A[i][i]),
            maxRow = i;
        for (k=i+1; k < n; k++) { 
            if (abs(A[k][i]) > maxEl) {
                maxEl = abs(A[k][i]);
                maxRow = k;
            }
        }


        // Swap maximum row with current row (column by column)
        for (k=i; k < n+1; k++) { 
            var tmp = A[maxRow][k];
            A[maxRow][k] = A[i][k];
            A[i][k] = tmp;
        }

        // Make all rows below this one 0 in current column
        for (k=i+1; k < n; k++) { 
            var c = -A[k][i]/A[i][i];
            for (j=i; j < n+1; j++) { 
                if (i===j) {
                    A[k][j] = 0;
                } else {
                    A[k][j] += c * A[i][j];
                }
            }
        }
    }

    // Solve equation Ax=b for an upper triangular matrix A
    x = array_fill(0, n, 0);
    for (i=n-1; i > -1; i--) { 
        x[i] = A[i][n]/A[i][i];
        for (k=i-1; k > -1; k--) { 
            A[k][n] -= A[k][i] * x[i];
        }
    }

    return x;
}

//////////////////////////////////////////////////////////////////////////////////

/**
 * Solves this system:
 * x + y = 10
 * 2x + y = 16
 */
// function Calcular2 () {
//     var number00 = document.getElementById("number00").value;
//     number00 = +number00;
//     var number01 = document.getElementById("number01").value;
//     number01 = +number01;
//     var number02 = document.getElementById("number02").value;
//     number02 = +number02;

//     var number10 = document.getElementById("number10").value;
//     number10 = +number10;
//     var number11 = document.getElementById("number11").value;
//     number11 = +number11;
//     var number12 = document.getElementById("number12").value;
//     number12 = +number12;

//     A = [[number00, number01], [number10, number11]];
//     x = [number02, number12];
//     result = gauss(A, x);
//     console.log(result);

//     document.getElementById("answer2").style.display = "block";
//     document.getElementById("respuesta21").innerHTML = result[0].toFixed(3);
//     document.getElementById("respuesta22").innerHTML = result[1].toFixed(3);

//     document.getElementById("answer3").style.display = "none";
//     document.getElementById("answer4").style.display = "none";
// }

/**
 * Solves this system:
 * x + y + z = 6
 * 2x + y + 2z = 10
 * x + 2y + 3z = 14
 */
function Calcular3 () {    
    var number00 = document.getElementById("number00").value;
    number00 = +number00;
    var number01 = document.getElementById("number01").value;
    number01 = +number01;
    var number02 = document.getElementById("number02").value;
    number02 = +number02;
    var number03 = document.getElementById("number03").value;
    number03 = +number03;

    var number10 = document.getElementById("number10").value;
    number10 = +number10;
    var number11 = document.getElementById("number11").value;
    number11 = +number11;
    var number12 = document.getElementById("number12").value;
    number12 = +number12;
    var number13 = document.getElementById("number13").value;
    number13 = +number13;

    var number20 = document.getElementById("number20").value;
    number20 = +number20;
    var number21 = document.getElementById("number21").value;
    number21 = +number21;
    var number22 = document.getElementById("number22").value;
    number22 = +number22;
    var number23 = document.getElementById("number23").value;
    number23 = +number23;

    var A = [[number00, number01, number02], [number10, number11, number12], [number20, number21, number22]];
    var x = [number03, number13, number23];
    var result = gauss(A, x);
    console.log(result);

    document.getElementById("answer3").style.display = "block";
    document.getElementById("respuesta31").innerHTML = result[0].toFixed(3);
    document.getElementById("respuesta32").innerHTML = result[1].toFixed(3);
    document.getElementById("respuesta33").innerHTML = result[2].toFixed(3);

    // document.getElementById("answer2").style.display = "none";
    document.getElementById("answer4").style.display = "none";
}

function Calcular4 () {
    var number00 = document.getElementById("number00").value;
    number00 = +number00;
    var number01 = document.getElementById("number01").value;
    number01 = +number01;
    var number02 = document.getElementById("number02").value;
    number02 = +number02;
    var number03 = document.getElementById("number03").value;
    number03 = +number03;
    var number04 = document.getElementById("number04").value;
    number04 = +number04;

    var number10 = document.getElementById("number10").value;
    number10 = +number10;
    var number11 = document.getElementById("number11").value;
    number11 = +number11;
    var number12 = document.getElementById("number12").value;
    number12 = +number12;
    var number13 = document.getElementById("number13").value;
    number13 = +number13;
    var number14 = document.getElementById("number14").value;
    number14 = +number14;

    var number20 = document.getElementById("number20").value;
    number20 = +number20;
    var number21 = document.getElementById("number21").value;
    number21 = +number21;
    var number22 = document.getElementById("number22").value;
    number22 = +number22;
    var number23 = document.getElementById("number23").value;
    number23 = +number23;
    var number24 = document.getElementById("number24").value;
    number24 = +number24;

    var number30 = document.getElementById("number30").value;
    number30 = +number30;
    var number31 = document.getElementById("number31").value;
    number31 = +number31;
    var number32 = document.getElementById("number32").value;
    number32 = +number32;
    var number33 = document.getElementById("number33").value;
    number33 = +number33;
    var number34 = document.getElementById("number34").value;
    number34 = +number34;

    A = [[number00, number01, number02, number03], [number10, number11, number12, number13], [number20, number21, number22, number23], [number30, number31, number32, number33]];
    x = [number04, number14, number24, number34];
    result = gauss(A, x);
    console.log(result);
    // console.log(number00);
    // console.log(typeof(number00));

    document.getElementById("answer4").style.display = "block";
    document.getElementById("respuesta41").innerHTML = result[0].toFixed(3);
    document.getElementById("respuesta42").innerHTML = result[1].toFixed(3);
    document.getElementById("respuesta43").innerHTML = result[2].toFixed(3);
    document.getElementById("respuesta44").innerHTML = result[3].toFixed(3);

    // document.getElementById("answer2").style.display = "none";
    document.getElementById("answer3").style.display = "none";
}

function showDiv(select){
   // if(select.value==1){
   //      document.getElementById('2').style.display = "block";
   //      document.getElementById('two').style.display = "block";

   //      document.getElementById('three').style.display = "none";
   //      document.getElementById('four').style.display = "none";
   //      document.getElementById('3x3').style.display = "none";
   //      document.getElementById('4x4').style.display = "none";
    if(select.value==2){  
        document.getElementById('3x3').style.display = "block";
        document.getElementById('three').style.display = "block";

        // document.getElementById('two').style.display = "none";
        document.getElementById('four').style.display = "none";
        // document.getElementById('2').style.display = "none";
        document.getElementById('4x4').style.display = "none";
    } else if(select.value==3) {
        document.getElementById('4x4').style.display = "block";
        document.getElementById('four').style.display = "block";

        // document.getElementById('two').style.display = "none";
        document.getElementById('three').style.display = "none";
        // document.getElementById('2').style.display = "none";
        document.getElementById('3x3').style.display = "none";
   }
} 
