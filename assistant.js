function toggleAssistant(){

    const chat =
        document.getElementById("aiChat");

    if(chat.style.display === "block"){

        chat.style.display = "none";

    }else{

        chat.style.display = "block";
    }
}

function analizarProblema(texto){

    texto = texto.toLowerCase();

    let categoria = "Software";
    let prioridad = "Media";
    let solucion = "Revisión general del sistema.";

    // VPN

    if(texto.includes("vpn")){

        categoria = "VPN";
        prioridad = "Alta";

        solucion =
            "Validar conexión remota y credenciales VPN.";
    }

    // WIFI

    if(
        texto.includes("wifi") ||
        texto.includes("internet")
    ){

        categoria = "WIFI";
        prioridad = "Alta";

        solucion =
            "Revisar conectividad y adaptador inalámbrico.";
    }

    // OUTLOOK

    if(
        texto.includes("correo") ||
        texto.includes("outlook")
    ){

        categoria = "Correo Electrónico";

        prioridad = "Alta";

        solucion =
            "Validar OST, credenciales y conectividad Exchange.";
    }

    // WINDOWS

    if(
        texto.includes("windows")
    ){

        categoria = "Windows";

        solucion =
            "Validar servicios y estado del sistema operativo.";
    }

    // TEAMS

    if(
        texto.includes("teams")
    ){

        categoria = "Microsoft Teams";

        solucion =
            "Revisar sesión Teams y dispositivos multimedia.";
    }

    return {

        categoria,
        prioridad,
        solucion
    };
}

function procesarIA(){

    const texto =
        document.getElementById("aiInput").value;

    if(texto.trim() === ""){

        return;
    }

    const resultado =
        analizarProblema(texto);

    document.getElementById("aiResponse").innerHTML = `

        <div class="ai-result">

            <h5>
                Diagnóstico Detectado
            </h5>

            <p>

                <strong>Categoría:</strong>
                ${resultado.categoria}

            </p>

            <p>

                <strong>Prioridad:</strong>
                ${resultado.prioridad}

            </p>

            <p>

                <strong>Sugerencia:</strong>
                ${resultado.solucion}

            </p>

            <button
                class="btn btn-success w-100 mt-2"
                onclick="crearTicketIA(
                    '${resultado.categoria}',
                    '${resultado.prioridad}',
                    '${texto}'
                )">

                <i class="fa-solid fa-ticket"></i>

                Generar Ticket

            </button>

        </div>
    `;
}

function crearTicketIA(categoria, prioridad, descripcion){

    localStorage.setItem(
        "ticketIA",
        JSON.stringify({

            categoria,
            prioridad,
            descripcion
        })
    );

    window.location.href =
        "support/index.html";
}
