// Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
const contenido = document.querySelector('#contenido');
let tweets = [];

// Event listeners
eventListeners();


function eventListeners() {
  // Cuando el usuario agrega un nuevo tweet
  formulario.addEventListener('submit', agregarTweets)

  // Cuando el documento esta listo
  document.addEventListener('DOMContentLoaded', () =>{
    // JSON.parse() convertir de un array a un objeto
    tweets = JSON.parse(localStorage.getItem('tweet')) || [];
    crearHTML();
  });
}


// Funciones
function agregarTweets(evt) {
  evt.preventDefault();
  // Textarea donde el usuario escribe
  const tweet = document.querySelector('#tweet').value;
  // Validacion
  if (tweet.trim() === '') {
    mostrarError('Un mensaje no puede ir vacio');
    return; // Evita que se ejecyte más lineas de código
  }
  
  alertaCompletado('Agregado con exito');
  const tweetObj = {
    id: Date.now(),
    texto: tweet,
  }

  // Añadir al arreglo de tweets, el segundo tweet sera el tweet actual osea el que esta escribiendo
  tweets = [...tweets, tweetObj];
  
  // Una vez agrega vamos a crear el HTML
  crearHTML();

  // Reinicar el fomrulario
  formulario.reset();
  
}

// Mostrar Mensaje de error

function mostrarError(error) {
  const mensajeError = document.createElement('P');
  mensajeError.textContent = error;
  // Añadimos una clase de CSS
  mensajeError.classList.add('error')
  // Insetamos en el HTML para que sea visible
  contenido.appendChild(mensajeError);

  formulario.reset();
  
  // Elimina la aleta despues de 3 segundos
  setTimeout(() => {
    mensajeError.remove();
  }, 2000);
}

// Mostrar Mensaje de agregado
function alertaCompletado(success) {
  const mensajeAgregado = document.createElement('P');
  mensajeAgregado.textContent = success;
  // Añadimos CSS
  mensajeAgregado.classList.add('success');
  contenido.appendChild(mensajeAgregado);

  // Eliminar alerta despues de 2 segundos
  setTimeout(() => {
    mensajeAgregado.remove();
  }, 2000);
  
}

// Muestra un listaod de los tweets
function crearHTML() {
  limpiarHTML();
  if (tweets.length > 0) {
    tweets.forEach(tweet => {
      // Agregar boton de eliminar
      const btnEliminar = document.createElement('A');
      // Crear el HTML
      btnEliminar.classList.add('borrar-tweet');
      const li = document.createElement('LI');

      btnEliminar.innerHTML = 'X';
      
      // Añadir la funcion de eliminar
      btnEliminar.onclick = () => {
        borrarTweet(tweet.id);
      }
      
      // Añador el texto
      li.textContent = tweet.texto;

       // Asignar btn en el HTML
      li.appendChild(btnEliminar);
      // Agregando en el HTML
      listaTweets.appendChild(li);
    });
  }

  sincronizarStorage();
  
}
// Agregar los Tweets actuales a LocalStora
function sincronizarStorage() {
  // Convertir arreglo a string
  localStorage.setItem('tweet', JSON.stringify(tweets));
}

function borrarTweet(id) {
  // Array methond
  tweets = tweets.filter( tweet => tweet.id !== id);
  crearHTML();
}

function limpiarHTML(){
  while (listaTweets.firstChild) {
    listaTweets.removeChild(listaTweets.firstChild);
  }
}