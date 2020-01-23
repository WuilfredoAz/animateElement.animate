// Capturamos en variables a todos los elementos de nuestra animacions

// botones
// Boton de play/pause
const btnPrincipal = document.querySelector(".js-main");
// Boton de stop
const btnStop = document.querySelector(".js-stop");
// Boton de reversa
const btnReverse = document.querySelector(".js-reverse");
// Boton para aumentar velocidad
const btnAumentar = document.querySelector(".js-aumentar");
// Boton para disminuir velocidad
const btnDisminuir = document.querySelector(".js-disminuir");

// Elementos animables
// Aguja
const aguja = document.querySelector(".js-aguja");
const vinyl = document.querySelector(".js-vinyl");

// Indicador de velocidad
const pantalla = document.querySelector(".js-pantalla");

// Creamos la animacion del disco rodar
const rodarDisco = vinyl.animate([
    {
        transform: "rotate(0)"
    },
    {
        transform: "rotate(360deg)"
    }
    ],{
        // duracion
        duration: 2000,
        // aceleracion
        easing: "linear",
        // iteraciones
        iterations: Infinity,
        // Delay requerido por la animacion de la aguja
        delay: 500
})

// Creamos la animacion de la aguja
const moverAguja = aguja.animate([
    {
        transform: "rotate(0)"
    },
    {
        transform: "rotate(20deg)"
    }
    ],{
        // duracion
        duration: 500,
        // aceleracion
        easing: "linear",
        // Propiedad para que la aguja termine en el lugar deseado
        fill: "forwards"
})

// Creamos la animacion de la aguja que simula la lectura del disco
const leeAguja = aguja.animate([
    {
        transform: "rotate(20deg)"
    },
    {
        transform: "rotate(30deg)"
    }
    ],{
        // duracion
        duration: 2500,
        // Aceleracion
        easing: "linear",
        // direccion
        direction: "alternate",
        // iteraciones de la animacion
        iterations: Infinity,
        // Retraso de esta animacion
        delay: 500
})


// Guardo en una variable la velocidad de la animacion
var velocidad = rodarDisco.playbackRate;

// Creo el escuchador de eventos principal que disparará las animaciones
btnPrincipal.addEventListener("click", tocarMusica)

// Creo el escuchador de eventos para la reversa
btnReverse.addEventListener("click", tocarReversa)

// Creo el escuchador de eventos para aumentar la velocidad
btnAumentar.addEventListener("click", tocarMas)

// Creo el escuchador de eventos para disminuir la velocidad
btnDisminuir.addEventListener("click", tocarMenos)

// Creo el escuchador de eventos para el boton de stop
btnStop.addEventListener("click", dentenerMusica)

// Creo la funcion que realizará todo
function tocarMusica()
{
    // Quitamos el simbolo de play
    if(btnPrincipal.classList.contains("icon-play"))
    {
        btnPrincipal.classList.remove("icon-play");
        btnPrincipal.classList.add("icon-pause");

        // Compruebo que sea primera vez para mover la aguja
        if(moverAguja.playState!="finished")
        {
            // La aguja de mueve
            moverAguja.play();
        }
        // El disco rueda
        rodarDisco.play();
        // La aguja lee
        leeAguja.play();
        // Muestro la velocidad de reproduccion
        pantalla.innerText= rodarDisco.playbackRate.toFixed(1);
        // Permito el uso de los otros botones (visual)
        btnStop.classList.remove("noPermitido");
        btnReverse.classList.remove("noPermitido");
        btnAumentar.classList.remove("noPermitido");
        btnDisminuir.classList.remove("noPermitido");

    }
    else
    {
        btnPrincipal.classList.remove("icon-pause");
        btnPrincipal.classList.add("icon-play");
        // Pauso el disco
        rodarDisco.pause();
        // Pauso la lectura de la aguja
        leeAguja.pause();
        // Deshabilito los botones (visual)
        // btnStop.classList.add("noPermitido");
        btnReverse.classList.add("noPermitido");
        btnAumentar.classList.add("noPermitido");
        btnDisminuir.classList.add("noPermitido");
    }
}

// creo la funcion que hara de reversa
function tocarReversa()
{
    // Compruebo si ya estoy en reversa y la animacion esta andando
    if(btnReverse.classList.contains("icon-reverse") && rodarDisco.playState==="running")
    {
        // Actualizo icono de reversa
        btnReverse.classList.remove("icon-reverse");
        btnReverse.classList.add("icon-forwards");
        // Animaciones en reversa
        rodarDisco.reverse();
        leeAguja.reverse();
    }
    // Compruebo si estoy en sentido correcto de la animacion y no estoy detenido
    else if(btnReverse.classList.contains("icon-forwards") && btnReverse.classList.contains("noPermitido")===false)
    {
        // Actualizo el boton para ir hacia adelante
        btnReverse.classList.remove("icon-forwards");
        btnReverse.classList.add("icon-reverse");
        rodarDisco.playbackRate = (rodarDisco.playbackRate)*(-1);
    }
}

// creo la funcion para aumentar la velocidad
function tocarMas()
{
    // Compruebo que no este a velocidad maxima (estetica) y que la animacion este activa
    if(velocidad<9.6 && btnPrincipal.classList.contains("icon-pause"))
    {
        // Aumento la velocidad
        velocidad= velocidad + 0.2;
        // aumento la velocidad del disco
        rodarDisco.playbackRate=velocidad;
        // Aumento la velocidad de la aguja
        leeAguja.playbackRate=velocidad;
        // Muestro en pantalla
        pantalla.innerText= rodarDisco.playbackRate.toFixed(1);
    }

}

// creo la funcion para disminuir la velocidad
function tocarMenos()
{
    // Compruebo que no este a velocidad minima (estetica) y que la animacion este activa
    if((velocidad*-1) < 9.6 && btnPrincipal.classList.contains("icon-pause"))
    {
        // disminuyo la velocidad
        velocidad = velocidad - 0.2;
        // disminuyo la velocidad del disco
        rodarDisco.playbackRate=velocidad;
        // disminuyo la velocidad de la aguja
        leeAguja.playbackRate=velocidad;
        // actualizo en la pantalla
        pantalla.innerText = rodarDisco.playbackRate.toFixed(1);
    }
}

// Creo la funcion necesaria para deterne todo (stop)
function dentenerMusica()
{
    // Detengo la animacion del disco
    rodarDisco.cancel();
    // detengo la animacion de la lectura
    leeAguja.cancel();
    // devuelvo la aguja a su lugar
    moverAguja.cancel();

    // desabilito todos los botones y restablezco velocidad
    btnStop.classList.add("noPermitido");
    btnAumentar.classList.add("noPermitido");
    btnDisminuir.classList.add("noPermitido");
    btnReverse.classList.add("noPermitido");
    velocidad = velocidad *0 + 1;
    rodarDisco.playbackRate = 1;
    leeAguja.playbackRate= 1;
    moverAguja.playbackRate = 1;
    pantalla.innerText= "0.0";
    btnPrincipal.classList.remove("icon-pause");
    btnPrincipal.classList.add("icon-play");
    btnReverse.classList.remove("icon-forwards");
    btnReverse.classList.add("icon-reverse");
}




// Estado inicial de la animacion
rodarDisco.pause();
moverAguja.pause();
leeAguja.pause();

