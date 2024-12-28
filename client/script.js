// Asumiendo que ya tienes el código para enviar la canción al backend

document.getElementById("agregarCancion").addEventListener('click', async () => {
    let nombre = document.getElementById("nombre_cancion").value;
    let artista = document.getElementById("artista_cancion").value;
    let url = document.getElementById("url_cancion").value;

    // Verifica que los campos no estén vacíos
    if (!nombre || !artista || !url) {
        alert("Por favor, completa todos los campos");
        return;
    }

    let body = JSON.stringify({
        nombre,
        artista,
        url_video: url
    });

    try {
        let response = await fetch('http://localhost:3000/canciones', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: body
        });

        let cancion = await response.json();
        if (response.ok) {
            alert("Canción agregada con éxito!");
        } else {
            alert("Error al agregar la canción.");
        }
    } catch (error) {
        console.error(error);
        alert("Hubo un error al conectar con el servidor.");
    }
});

// Para la funcionalidad de "Canción Aleatoria" (esto puede llamarse a otro endpoint)
document.getElementById("cancionAleatoria").addEventListener('click', async () => {
    try {
        let response = await fetch('http://localhost:3000/canciones/random'); // Asegúrate de que este endpoint exista en tu backend
        let cancion = await response.json();

        if (response.ok) {
            alert(`Canción Aleatoria: ${cancion.nombre} de ${cancion.artista}`);
        } else {
            alert("No se pudo obtener una canción aleatoria.");
        }
    } catch (error) {
        console.error(error);
        alert("Hubo un error al obtener la canción aleatoria.");
    }
});
