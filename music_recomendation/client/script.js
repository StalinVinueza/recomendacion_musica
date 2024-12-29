let agregarCancionButton = document.getElementById("agregarCancion");
let cancionAleatoriaButton = document.getElementById("cancionAleatoriaButton");
let cancionAleatoriaDiv = document.getElementById("cancionAleatoriaDiv");

agregarCancionButton.addEventListener('click', async () => {
    let nombre = document.getElementById("nombre_cancion").value;
    let artista = document.getElementById("artista_cancion").value;
    let url = document.getElementById("url_cancion").value;
    let body = JSON.stringify({nombre, artista, url_video:url});

    let response = await fetch('http://localhost:3000/canciones', {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: body
    });
    let cancion = await response.json();
    if(response.ok){
        alert("Canción agregada con éxito: " + cancion.nombre);  // Información más clara sobre la canción agregada
    } else {
        alert("Hubo un problema al agregar la canción");
    }
});


cancionAleatoriaButton.addEventListener('click', async () => {
    try {
        // Asegúrate de que la URL sea la correcta
        let response = await fetch('http://localhost:3000/canciones/cancion_aleatoria');
        let cancion = await response.json();
        
        if (response.ok) {
            // Limpiar el div antes de agregar una nueva canción aleatoria
            cancionAleatoriaDiv.innerHTML = `
                <p><strong>Nombre:</strong> ${cancion.nombre}</p>
                <p><strong>Artista:</strong> ${cancion.artista}</p>
                <p><strong>URL:</strong> <a href="${cancion.url_video}" target="_blank">Ver en YouTube</a></p>
            `;
        } else {
            alert("No se pudo obtener la canción aleatoria");
        }
    } catch (error) {
        console.error("Error al obtener la canción aleatoria:", error);
        alert("Hubo un problema al cargar la canción aleatoria.");
    }
});


// Cargar todas las canciones
async function cargarCanciones() {
    try {
        let response = await fetch('http://localhost:3000/canciones');
        let canciones = await response.json();
        
        if (response.ok) {
            cancionesList.innerHTML = '';
            canciones.forEach(cancion => {
                cancionesList.innerHTML += `
                    <div class="cancionCard">
                        <p><strong>Nombre:</strong> ${cancion.nombre}</p>
                        <p><strong>Artista:</strong> ${cancion.artista}</p>
                        <p><strong>URL:</strong> <a href="${cancion.youtube_url}" target="_blank">Ver en YouTube</a></p>
                    </div>
                `;
            });
        } else {
            alert("No se pudieron cargar las canciones");
        }
    } catch (error) {
        console.error("Error al cargar las canciones:", error);
        alert("Hubo un problema al cargar las canciones.");
    }
}

// Cargar canciones al inicio
cargarCanciones();