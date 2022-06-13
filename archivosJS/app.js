/* ******************************************************************
             DECLARANDO VARIABLES GLOBALES A USAR
   ****************************************************************** */
let entradas, salidas, casos, numEntrenamientos, capasOcultas;
let formulario2 = document.getElementById("formulario2");
let formulario3 = document.getElementById("formulario3");


let x = [];       // ARRAY DE ENTRADAS
let d = [];       // ARRAY DE SALIDAS

let w = [];       // ARRAY DE PESOS
let net = [];     // ARRAY DE PESOS
let y = [];       // ARRAY DE SALIDAS DE LAS CAPAS OCULTAS Y SALIDAS
let D = [];       // ARRAY DE ERROR ABAJO HACIA ARRIBA

let alfa = 0.2;   // VALOR ALFA
let e = Math.E;   // VALOR EPSILON = E
let Min = -0.3;   // VALOR MINIMO DEL ALEATORIO
let Max = 0.3;    // VALOR MAXIMO DEL ALEATORIO


/***********************************************
        DECLARACION DE FUNCIONES
************************************************/
// CREAR DINAMICAMENTE LOS INPUTS

function crearTablaEntrenamiento() {
   entradas = parseInt(document.getElementById("entradas").value);
   salidas = parseInt(document.getElementById("salidas").value);
   casos = parseInt(document.getElementById("casos").value);
   let filas = casos;
   let columnas = entradas + salidas;
   let iniciarfilas = 0;
   let ancho = formulario2.clientWidth - (2 * columnas * 2);
   let anchoinput = ancho / columnas;
   // let typeInput = "number";
   formulario2.remove();

   let form2 = document.createElement("form");
   form2.classList.add("formulario2");
   form2.setAttribute("id", "formulario2");

   let formContenedor2 = document.getElementById("formContenedor2");
   formContenedor2.appendChild(form2);

   formulario2 = document.getElementById("formulario2")

   while (iniciarfilas < filas) {
      let iniciarcolumnas = 0;
      while (iniciarcolumnas < columnas) {
         let input = document.createElement("input");
         formulario2.appendChild(input);
         input.classList.add("nuevo");
         let idInput = "x" + iniciarfilas + iniciarcolumnas;
         input.setAttribute("id", idInput);
         if (iniciarcolumnas >= entradas) {
            input.style.border = "solid 3px lime"
            input.setAttribute("placeholder", "s")
            input.classList.add("salidasEntrenamiento")
         } else {
            input.setAttribute("placeholder", "e")
            input.style.border = "solid 3px lime"
            input.value = "0";
         }
         input.style.width = anchoinput + "px";
         //input.setAttribute("type", typeInput)
         iniciarcolumnas++;
      }

      iniciarfilas++;
   }
}

// CREAR LA TABLA PARA LA PRUEBA DEL ENTRENAMIENTO
function crearTablaPrueba() {
   entradas = parseInt(document.getElementById("entradas").value);
   salidas = parseInt(document.getElementById("salidas").value);
   casos = parseInt(document.getElementById("casos").value);

   let filas = 1;
   let columnas = entradas + salidas;
   let iniciarfilas = 0;
   let ancho = formulario3.clientWidth - (2 * columnas * 2);
   let anchoinput = ancho / columnas;
   // let typeInput = "number";
   formulario3.remove();

   let form3 = document.createElement("form");
   form3.classList.add("formulario3");
   form3.setAttribute("id", "formulario3");
   form3.style.marginBottom = "0px"

   let formContenedor3 = document.getElementById("formContenedor3");
   formContenedor3.appendChild(form3);

   formulario3 = document.getElementById("formulario3");

   while (iniciarfilas < filas) {
      let iniciarcolumnas = 0;
      while (iniciarcolumnas < columnas) {

         let input = document.createElement("input");
         formulario3.appendChild(input);
         input.classList.add("nuevo");
         let idInput = "y" + iniciarfilas + iniciarcolumnas;
         input.setAttribute("id", idInput);
         if (iniciarcolumnas >= entradas) {
            input.style.border = "solid 3px lime"
            input.setAttribute("placeholder", "s")
            input.classList.add("salidasEntrenamiento")
         } else {
            input.setAttribute("placeholder", "e")
            input.style.border = "solid 3px lime"
            input.value = "1";
         }
         input.style.width = anchoinput + "px";
         input.style.marginTop = "50px"
         //input.setAttribute("type", typeInput)
         iniciarcolumnas++;
      }

      iniciarfilas++;
   }
}

// CALCULANDO LAS SALIDAS DE LA RED NEURONAL
function calculoSalidasRedNeuronal() {
   let b = 0;
   let n = 0;
   while (b < (capasOcultas + salidas)) {

      if (b < capasOcultas) {
         let array_Net = [];
         let sumaNet = 0;
         let m = 0;
         while (m < entradas) {
            array_Net[m] = (x[m] * w[(capasOcultas * m) + b]);
            sumaNet += array_Net[m];
            m++;
         }
         net[b] = sumaNet;
         y[b] = 1 / (1 + Math.pow(e, -net[b]));
      }
      if (b >= capasOcultas) {
         let array_Net = [];
         let sumaNet = 0;
         let m = 0;
         while (m < capasOcultas) {
            array_Net[m] = y[m] * w[(capasOcultas * (entradas + n)) + m];
            sumaNet += array_Net[m];
            m++;
         }
         net[b] = sumaNet;
         y[b] = 1 / (1 + Math.pow(e, -net[b]));
         n++;
      }

      b++;
   }

}

// CALUCULANDO LOS TERMINOS DE ERROR DE LA RED NEURONAL
function CalculoTerminosError() {
   let f = 0;
   let n = 0;

   while (f < (capasOcultas + salidas)) {

      if (f < salidas) {
         D[f] = y[capasOcultas + f] * (1 - y[capasOcultas + f]) * (d[f] - y[capasOcultas + f]);
      }

      if ((f >= salidas) && (f < (capasOcultas + salidas))) {
         let D_Acumulado = [];
         let suma = 0;
         let m = 0;
         while (m < salidas) {
            D_Acumulado[m] = (D[m] * w[(((entradas + m) * capasOcultas) + n)]);
            suma += D_Acumulado[m];
            m++;
         }
         D[f] = y[n] * (1 - y[n]) * (suma);
         n++;
      }
      f++;
   }


}

// CALCULO DE LOS PESOS DE LA RED NEURONAL
function CalculoPesos() {
   let grupo_divicion = (entradas + salidas);
   let inicia = 0;
   while (inicia < grupo_divicion) {

      if (inicia < entradas) {
         let i = 0;
         let k = salidas;
         while (i < (capasOcultas * entradas)) {
            if ((i % capasOcultas === 0) && (i != 0)) {
               k = salidas;
               inicia++;
            }
            w[i] = w[i] + (alfa * D[k] * x[inicia]);
            k++; i++;
         }
      }

      if (inicia >= entradas) {
         let j = capasOcultas * entradas;
         let o = 0;
         let r = 0;
         let p = 0;
         while (o < (capasOcultas * salidas)) {
            if (o % capasOcultas === 0 && (o != 0)) {
               p = 0;
               r++;
            }
            w[j + o] = w[j + o] + (alfa * D[r] * y[p]);
            o++; p++;
         }
      }
      inicia++;
   }
}

// Recibir las entradas para el calculo de la sallida en la tabla de Prueba
function probarDatos() {

   // while para capturar los datos de los inputs de prueba
   // el cual se estan generando de forma dinaminca
   let fila = 0;
   let col = 0;

   let arrayRecibeDatos = []; // Array vacio para recibir los datos que se insertan en los inpurt de prueba
   while (col < (entradas)) {
      let idInput = "y" + fila + col;
      let valorInput = Math.round(parseInt(document.getElementById(idInput).value));
      arrayRecibeDatos.push(valorInput);
      col++;
   }


   let totalInputs = arrayRecibeDatos.length + salidas;
   let r = 1;
   let k = 0;
   while (r <= totalInputs) {

      if ((r % ((entradas + 1)) == 0)) {
         k = 0;

         while (r <= (entradas + salidas)) {
            if (r == entradas + salidas) {
               calculoSalidasRedNeuronal();
               let rr = entradas;
               let numCapas = capasOcultas;
               while (rr < entradas + salidas) {
                  let idInput = "y0" + rr;
                  let salidaPrueba = document.getElementById(idInput);
                  salidaPrueba.value = y[numCapas]
                  salidaPrueba.style.backgroundColor = "red"
                  salidaPrueba.style.borderColor = "white"
                  salidaPrueba.style.color = "white"
                  rr++;
                  numCapas++;
               }
            }
            r++;
         }
      } else {
         x[k] = arrayRecibeDatos[r - 1];
         k++;
         r++;
      }
      // culminar++;
   }
   //Calcular la salida de la red nuronal




}

/* ******************************************************************
            EVENTO "CLICK" PARA CREAR LA TABLA DE FORMA DINAMICA
                     Llamando las funciones adecuadas
   ****************************************************************** */
let crear = document.getElementById("crear");
crear.addEventListener("click", function () {
   crearTablaEntrenamiento(); // llamamos a la funcion para crear la table de etrenamiento
   crearTablaPrueba();        // llamamos a la funcion para crear la tabla de prueba
});

/* ******************************************************************
            EVENTO "CLICK" PARA EL ENTRENAMIENTO DE DATOS
   ****************************************************************** */
let botonEntrenarDatos = document.getElementById("botonEntrenarDatos");

botonEntrenarDatos.addEventListener('click', function () {

   // Obtenemos lo valores que se encuentra en el momento en las cajas de texto
   // Redondeandolas al valor mas sercano y tranformando de string a entero el valor
   capasOcultas = Math.round(parseInt(document.getElementById("ocultas").value));
   entradas = Math.round(parseInt(document.getElementById("entradas").value));
   salidas = Math.round(parseInt(document.getElementById("salidas").value));
   casos = Math.round(parseInt(document.getElementById("casos").value));
   numEntrenamientos = Math.round(parseInt(document.getElementById("entrenamientos").value));

   /*-----------------------------------------
      1) DAR VALORES ALEATORIOS A LOS PESOS
    -----------------------------------------*/
   let numPesos = ((entradas + salidas) * capasOcultas) - 1;
   for (let k = 0; k <= numPesos; k++) {
      let numAleatorio = ((Math.random() * (Max - Min)) + Min);
      w[k] = numAleatorio;
   }
   /*-------------------------------------
         BUCLE PARA ENTRENAMIENTO
             DE LA NEURONA
    --------------------------------------*/
   let culminar = 0;
   for (let i = 0; i <= numEntrenamientos; i++) {

      /*------------------------------------------------------
         2) Presentar el patrón de entrada y de salida
         --------------------------------------------------------*/
      let row = 0;
      let arrayV = [];
      // while que captura los datos de los inputs que se generaron de forma dinamica
      // y guardarlos en un array "valueInput"
      while (row < casos) {
         let col = 0;
         while (col < (entradas + salidas)) {
            let id_Input = "x" + row + col;
            let valueInput = document.getElementById(id_Input).value;
            if(valueInput == ""){
               let inputVacio = parseInt(valueInput)
               inputVacio = 0;
               arrayV.push(inputVacio);
            }else{
               arrayV.push(parseInt(valueInput));
            }

            col++;
         }
         row++;
      }
      console.log(arrayV)
      // arrayV ----->  Es un array que contiene todos los valores de los
      //                inputs generados dinamicamente. Se obtuvieron en el
      //                anterior  " while (row < casos) "

      // Entrenamiento de de neuronas --- para cada caso
      for (let p = 0; p < casos; p++) {


         let totalInputs = arrayV.length;
         let r = 1;              // r:       Inicia el while hasta el numero max de inputs creados
         let k = 0;              // k:       Indice para las entradas x[k
         let a = 0;              // a:       inice para las salidas d[a]
         let variable = 0;       // variable:  Multiplicidad para reiniciar el indice de x[k] y luego pasar a un while
         //            donde se asignaran valores a las salidas d[]
         let variable2 = 1;      // varaible2: Multiplicidad para acomenzar a dar valores a las salidas luego de las entradas
         while (r <= totalInputs) {

            if ((r % ((entradas + 1) + (variable * (entradas + salidas))) == 0)) {
               // Esta if es para cuando "r" sea multiplo de las [ (entradas + 1) + un multiplo de las (entradas + salidas) ]
               // donde entradas + salidas debe avanzar en si empezando de CERO.
               // si entradas + salidas = 5 con la "variable" que le multiplica comenzara desde CERO, 5, 10, 15 etc....
               k = 0;      // Reiniciamos la variable a cero para cada vez que se cumpla la condicion If
               // para entradas = 2
               // para salidas  = 1
               while (r <= (entradas + salidas) * variable2) { // Si( r <= [ (2+1)*1 ] ) --> donde 1 irá sumando ++
                  d[a] = arrayV[r - 1]; // Asignamos d[] ,  donde a comienza en CERO.
                  a++;
                  if (r % (entradas + salidas) === 0) { // y si r es multiplo de ( entradas + salidas ) ejecutara las siguientes funciones
                     a = 0;                             // Reinicio del inidce de las salidas para el proximo bucle


                     //3er paso Calcular la salida de la red neuronal
                     calculoSalidasRedNeuronal();
                     // 4to paso calcular los terminos de error
                     CalculoTerminosError();
                     // 5to paso: calcular los pesos
                     CalculoPesos();
                     // Probar la salida
                     calculoSalidasRedNeuronal();
                  }
                  r++;
               }
               variable2++;
               variable++;
            } else {                   // arrayV contiene todos los valores de los inputs
               x[k] = arrayV[r - 1];   // Seria x[0] = arrayV[1 - 1] =====> x[0] arrayV[0]
               k++;                    // Para luego ser x[1] = arrayV[1]
               r++;
            }
            culminar++;
         }
      } // fin For p -> CASOS
   }   // Fin for i  -> NUMERO DE ENTRENAMIENTOS
   if (culminar = numEntrenamientos) {
      alert("Se ha culminado el entrenamiento de " + culminar + " veces"); // Un aviso de que se ha terminado el nro de entrenamientos
   }
});