
    
    // Agregar canción
    let agregarCancionButton = document.getElementById("agregarCancion");
    let cancionAleatoriaButton = document.getElementById("cancionAleatoriaButton");
    let cancionAleatoriaDiv = document.getElementById("cancionAleatoriaDiv");

    agregarCancionButton.addEventListener('click', async () => {
        let nombre = document.getElementById("nombre_cancion").value;
        let artista = document.getElementById("artista_cancion").value;
        let url = document.getElementById("url_cancion").value;
        let body = JSON.stringify({ nombre, artista, url_video: url });

        let response = await fetch('http://localhost:3000/canciones', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: body
        });
        let cancion = await response.json();
        if (response.ok) {
            alert("Canción agregada con éxito: " + cancion.nombre);  // Información más clara sobre la canción agregada
            agregarCancion(cancion.nombre, cancion.artista, cancion.url_video);  // Agregar la canción a la interfaz
        } else {
            alert("Hubo un problema al agregar la canción");
        }
    });

    cancionAleatoriaButton.addEventListener('click', async () => {
        try {
            let response = await fetch('http://localhost:3000/canciones/cancion_aleatoria');
            let cancion = await response.json();

            if (response.ok) {
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

    // Función para extraer el ID de la URL de YouTube
    function getYouTubeVideoId(url) {
        if (!url) return null;
        const regex = /(?:https?:\/\/(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/))([\w-]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    }

    // Función para agregar una canción a la lista
    function agregarCancion(nombre, artista, url) {
        const videoId = getYouTubeVideoId(url);
        if (videoId) {
            const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

            const cancionCard = document.createElement('div');
            cancionCard.classList.add('cancionCard');

            cancionCard.innerHTML = `
                <img src="${thumbnailUrl}" alt="Miniatura de la canción">
                <h4>${nombre}</h4>
                <p>${artista}</p>
                <a href="${url}" target="_blank">Ver en YouTube</a>
            `;

            document.getElementById('cancionesList').appendChild(cancionCard);
        } else {
            console.error("URL de YouTube inválida.");
        }
    }

    // Cargar todas las canciones
    async function cargarCanciones() {
        try {
            let response = await fetch('http://localhost:3000/canciones');
            let canciones = await response.json();

            if (response.ok) {
                const cancionesList = document.getElementById('cancionesList');
                cancionesList.innerHTML = '';  // Limpiar la lista antes de cargar las nuevas canciones
                canciones.forEach(cancion => {
                    if (cancion.url_video) {  // Verificar que la URL de la canción esté definida
                        agregarCancion(cancion.nombre, cancion.artista, cancion.url_video);
                    } else {
                        console.error("La canción no tiene URL válida: ", cancion);
                    }
                });
            } else {
                alert("No se pudieron cargar las canciones");
            }
        } catch (error) {
            console.error("Error al cargar las canciones:", error);
            alert("Hubo un problema al cargar las canciones.");
        }
    }




