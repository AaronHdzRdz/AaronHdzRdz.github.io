document.getElementById('comparar').addEventListener('click', function() {
    const seguidosText = document.getElementById('seguidosInput').value;
    const seguidoresText = document.getElementById('seguidoresInput').value;

    // Manejo de entradas vacías
    if (!seguidosText.trim() || !seguidoresText.trim()) {
        alert("Por favor, ingrese tanto los seguidos como los seguidores.");
        return;
    }

    const seguidos = procesarTexto(seguidosText, 'seguidos');
    const seguidores = procesarTexto(seguidoresText, 'seguidores');

    // Mejora en los mensajes de error para especificar cuál campo tiene el formato incorrecto
    if (seguidos === null) {
        alert("El formato del texto ingresado en 'Seguidos' no es correcto.");
        return;
    }
    if (seguidores === null) {
        alert("El formato del texto ingresado en 'Seguidores' no es correcto.");
        return;
    }

    const noSeguidores = new Set([...seguidos].filter(x => !seguidores.has(x)));
    mostrarResultados(noSeguidores);
});

function procesarTexto(texto) {
    const excepciones = new Set([]);
    const usuarios = new Set();

    const lines = texto.split('\n');
    lines.forEach(line => {
        if (line.includes("Foto del perfil de ")) {
            const usuario = line.split("Foto del perfil de ")[1];
            if (!excepciones.has(usuario)) {
                usuarios.add(usuario.trim());
            }
        }
    });

    return usuarios;
}


function mostrarResultados(noSeguidores) {
    const resultadosDiv = document.getElementById('resultados');
    // Asegurarse de que los estilos solo se apliquen a este componente
    resultadosDiv.innerHTML = '<style>#resultados a { text-decoration: none; color: #FF5733; }</style>';
    if (noSeguidores.size > 0) {
        resultadosDiv.innerHTML += '<h2>Estas son las personas que no te siguen, haz clic en el usuario para ir al perfil de la persona.</h2>'; // Agregar título
        noSeguidores.forEach(usuario => {
            const perfilUrl = `https://www.instagram.com/${usuario}/`;
            resultadosDiv.innerHTML += `<p><a href="${perfilUrl}" target="_blank">${usuario}</a></p>`;
        });
    } else {
        resultadosDiv.innerHTML += '<p>Tod@s las personas a las que sigues te siguen.</p>';
    }
}