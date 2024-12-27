let agregarCancionButton = document.getElementById("agregarCancion");

agregarCancionButton.addEventListener('click', async () => {
    let nombre = document.getElementById("nombre_cancion").value;
    let artista = document.getElementById("artista_cancion").value;
    let url = document.getElementById("url_cancion").value;

    // Verificar que los campos no estén vacíos
    if (!nombre || !artista || !url) {
        alert("Todos los campos son obligatorios.");
        return;
    }

    let body = JSON.stringify({ nombre, artista, url_video: url });

    try {
        let response = await fetch('http://localhost:3000', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: body
        });

        if (response.ok) {
            let cancion = await response.json();
            // Mostrar mensaje con el nombre de la canción agregada
            alert(`Canción agregada: ${cancion.nombre} por ${cancion.artista}`);
        } else {
            let error = await response.json();
            alert(`Error: ${error.message || 'No se pudo agregar la canción'}`);
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        alert("Hubo un error al intentar agregar la canción.");
    }
});
