let ticketDetectado = null;

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

    let soluciones = [];

    // VPN

    if(texto.includes("vpn")){

        categoria = "VPN";

        prioridad = "Alta";

        soluciones = [

            "Validar conexión a Internet.",
            "Revisar usuario y contraseña VPN.",
            "Cerrar y abrir nuevamente el cliente VPN.",
            "Reiniciar el equipo."
        ];
    }

    // WIFI

    else if(
        texto.includes("wifi") ||
        texto.includes("internet")
    ){

        categoria = "WIFI";

        prioridad = "Alta";

        soluciones = [

            "Apagar y encender WIFI.",
            "Reiniciar modem/router.",
            "Olvidar y reconectar la red.",
            "Validar que modo avión esté desactivado."
        ];
    }

    // OUTLOOK

    else if(
        texto.includes("correo") ||
        texto.includes("outlook")
    ){

        categoria = "Correo Electrónico";

        prioridad = "Alta";

        soluciones = [

            "Cerrar y abrir Outlook.",
            "Validar conexión a Internet.",
            "Revisar contraseña.",
            "Validar espacio en buzón."
        ];
    }

    // WINDOWS

    else if(
        texto.includes("windows")
    ){

        categoria = "Windows";

        soluciones = [

            "Reiniciar el equipo.",
            "Validar actualizaciones.",
            "Ejecutar diagnóstico Windows."
        ];
    }

    // TEAMS

    else if(
        texto.includes("teams")
    ){

        categoria = "Microsoft Teams";

        soluciones = [

            "Cerrar sesión y volver a iniciar.",
            "Validar cámara y micrófono.",
            "Validar conexión a Internet."
        ];
    }

    else{

        soluciones = [

            "Reiniciar el equipo.",
            "Validar conexión.",
            "Contactar mesa de ayuda."
        ];
    }

    return {

        categoria,
        prioridad,
        soluciones
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

    ticketDetectado = {

        categoria: resultado.categoria,
        prioridad: resultado.prioridad,
        descripcion: texto
    };

    let lista = "";

    resultado.soluciones.forEach(sol => {

        lista += `
            <li>${sol}</li>
        `;
    });

    document.getElementById("aiResponse").innerHTML = `

        <div class="ai-result">

            <h5>
                Posibles Soluciones
            </h5>

            <ul>
                ${lista}
            </ul>

            <div class="d-grid gap-2 mt-3">

                <button
                    class="btn btn-success"
                    onclick="problemaResuelto()">

                    ✅ Sí funcionó

                </button>

                <button
                    class="btn btn-danger"
                    onclick="solicitarDatosTicket()">

                    ❌ No funcionó

                </button>

            </div>

        </div>
    `;
}

function problemaResuelto(){

    document.getElementById("aiResponse").innerHTML = `

        <div class="ai-result">

            <h5>
                Excelente 🎉
            </h5>

            <p>
                El problema fue solucionado sin generar ticket.
            </p>

        </div>
    `;
}

function solicitarDatosTicket(){

    document.getElementById("aiResponse").innerHTML = `

        <div class="ai-result">

            <h5>
                Generar Ticket
            </h5>

            <input
                type="text"
                id="nombreUsuario"
                class="form-control mb-3"
                placeholder="Nombre de usuario">

            <select
                id="divisionUsuario"
                class="form-select mb-3">

                <option value="">
                    División
                </option>

                <option>
                    Adenergy
                </option>

                <option>
                    Ducter
                </option>

                <option>
                    Nietofin
                </option>

            </select>

            <input
                type="text"
                id="contactoUsuario"
                class="form-control mb-3"
                placeholder="Correo o contacto">

            <input
                type="text"
                id="equipoUsuario"
                class="form-control mb-3"
                placeholder="Equipo o activo">

            <button
                class="btn btn-primary w-100"
                onclick="crearTicketAutomatico()">

                🎫 Crear Ticket

            </button>

        </div>
    `;
}

function crearTicketAutomatico(){

    const usuario =
        document.getElementById("nombreUsuario").value;

    const division =
        document.getElementById("divisionUsuario").value;

    const contacto =
        document.getElementById("contactoUsuario").value;

    const equipo =
        document.getElementById("equipoUsuario").value;

    if(
        usuario === "" ||
        division === ""
    ){

        alert(
            "Completa los campos requeridos"
        );

        return;
    }

    let tickets =
        JSON.parse(localStorage.getItem("tickets")) || [];

    const numero =
        tickets.length + 1;

    const nuevoTicket = {

        ticket:
            `TKT-${String(numero).padStart(4,"0")}`,

        usuario,
        fecha:
            new Date().toLocaleString(),

        division,

        categoria:
            ticketDetectado.categoria,

        prioridad:
            ticketDetectado.prioridad,

        descripcion:
            ticketDetectado.descripcion,

        contacto,
        equipo,

        estado:"Abierto",

        comentarios:[]
    };

    tickets.push(nuevoTicket);

    localStorage.setItem(
        "tickets",
        JSON.stringify(tickets)
    );

    document.getElementById("aiResponse").innerHTML = `

        <div class="ai-result">

            <h5>
                Ticket Generado ✅
            </h5>

            <p>

                Ticket:
                <strong>
                    ${nuevoTicket.ticket}
                </strong>

            </p>

            <p>
                La mesa de ayuda dará seguimiento.
            </p>

        </div>
    `;
}
