const form = document.getElementById("ticketForm");
const table = document.getElementById("ticketsTable");

const fecha = document.getElementById("fecha");
const ticket = document.getElementById("ticket");

/* =========================================
   RECIBIR DATOS DE IA
========================================= */

const ticketIA =
    JSON.parse(localStorage.getItem("ticketIA"));

if(ticketIA){

    // AUTOLLENAR

    document.getElementById("categoria").value =
        ticketIA.categoria;

    document.getElementById("prioridad").value =
        ticketIA.prioridad;

    document.getElementById("descripcion").value =
        ticketIA.descripcion;

    // ELIMINAR CACHE

    localStorage.removeItem("ticketIA");
}

// FECHA AUTOMÁTICA

const hoy = new Date();

fecha.value =
    hoy.toLocaleDateString("es-MX") +
    " " +
    hoy.toLocaleTimeString("es-MX");

// OBTENER TICKETS

let tickets =
    JSON.parse(localStorage.getItem("tickets")) || [];

// GENERAR CONSECUTIVO

function generarTicket() {

    const numero = tickets.length + 1;

    return `TKT-${numero.toString().padStart(5, "0")}`;
}

ticket.value = generarTicket();

// MOSTRAR TICKETS

function renderTickets() {

    table.innerHTML = "";

    tickets.slice().reverse().forEach(ticket => {

        table.innerHTML += `

            <tr>

                <td>
                    ${ticket.ticket}
                </td>

                <td>
                    ${ticket.usuario}
                </td>

                <td>
                    ${ticket.fecha}
                </td>

                <td>
                    ${ticket.division}
                </td>

                <td>
                    ${ticket.categoria}
                </td>

                <td>

                    <span class="badge bg-danger">

                        ${ticket.prioridad}

                    </span>

                </td>

                <td>

                    <span class="badge bg-warning text-dark">

                        ${ticket.estado}

                    </span>

                </td>

            </tr>

        `;
    });
}

// REGISTRAR TICKET

form.addEventListener("submit", function(e){

    e.preventDefault();

    const nuevoTicket = {

        ticket: ticket.value,

        fecha: fecha.value,

        usuario:
            document.getElementById("usuario").value,

        division:
            document.getElementById("division").value,

        categoria:
            document.getElementById("categoria").value,

        prioridad:
            document.getElementById("prioridad").value,

        contacto:
            document.getElementById("contacto").value,

        equipo:
            document.getElementById("equipo").value,

        descripcion:
            document.getElementById("descripcion").value,

        estado: "Abierto"
    };

    tickets.push(nuevoTicket);

    localStorage.setItem(
        "tickets",
        JSON.stringify(tickets)
    );

    renderTickets();

    form.reset();

    // NUEVA FECHA

    const nuevoHoy = new Date();

    fecha.value =
        nuevoHoy.toLocaleDateString("es-MX") +
        " " +
        nuevoHoy.toLocaleTimeString("es-MX");

    // NUEVO CONSECUTIVO

    ticket.value = generarTicket();

    alert("Ticket registrado correctamente");
});

renderTickets();
