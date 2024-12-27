let agregarCancionButton = document.getElementById("agregarCancion");

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
        alert(cancion);
    } else{
        alert("Response no ok");
    }
})