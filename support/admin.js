const table = document.getElementById("ticketsTable");

const totalTickets = document.getElementById("totalTickets");
const abiertos = document.getElementById("abiertos");
const proceso = document.getElementById("proceso");
const cerrados = document.getElementById("cerrados");

const searchInput = document.getElementById("searchInput");

let tickets =
    JSON.parse(localStorage.getItem("tickets")) || [];

function actualizarKPIs() {

    totalTickets.textContent = tickets.length;

    abiertos.textContent =
        tickets.filter(t => t.estado === "Abierto").length;

    proceso.textContent =
        tickets.filter(t => t.estado === "En Proceso").length;

    cerrados.textContent =
        tickets.filter(t => t.estado === "Cerrado").length;
}

function badgeEstado(estado) {

    switch (estado) {

        case "Abierto":
            return "bg-warning text-dark";

        case "En Proceso":
            return "bg-primary";

        case "Pendiente":
            return "bg-secondary";

        case "Cerrado":
            return "bg-success";

        default:
            return "bg-warning text-dark";
    }
}

function renderTickets(data = tickets) {

    table.innerHTML = "";

    data.slice().reverse().forEach((ticket, index) => {

        table.innerHTML += `

            <tr>

                <td>

                    <button
                        class="btn btn-link text-decoration-none fw-bold"
                        onclick="window.irTicket('${ticket.ticket}')"

                        ${ticket.ticket}

                    </button>

                </td>

                <td>${ticket.usuario}</td>

                <td>${ticket.fecha}</td>

                <td>${ticket.division}</td>

                <td>${ticket.categoria}</td>

                <td>

                    <span class="badge bg-danger">

                        ${ticket.prioridad}

                    </span>

                </td>

                <td>

                    <span class="badge ${badgeEstado(ticket.estado)} px-3 py-2">

                        ${ticket.estado}

                    </span>

                </td>

                <td>

                    <select
                        class="form-select"
                        onchange="window.cambiarEstado(${tickets.length - 1 - index}, this.value)">

                        <option
                            value="Abierto"
                            ${ticket.estado === "Abierto" ? "selected" : ""}>

                            Abierto

                        </option>

                        <option
                            value="En Proceso"
                            ${ticket.estado === "En Proceso" ? "selected" : ""}>

                            En Proceso

                        </option>

                        <option
                            value="Pendiente"
                            ${ticket.estado === "Pendiente" ? "selected" : ""}>

                            Pendiente

                        </option>

                        <option
                            value="Cerrado"
                            ${ticket.estado === "Cerrado" ? "selected" : ""}>

                            Cerrado

                        </option>

                    </select>

                </td>

            </tr>

        `;
    });

    actualizarKPIs();
}

function cambiarEstado(index, nuevoEstado) {

    tickets[index].estado = nuevoEstado;

    localStorage.setItem(
        "tickets",
        JSON.stringify(tickets)
    );

    renderTickets();
}

function abrirTicket(index) {

    const ticket = tickets[index];

    // CAMBIAR AUTOMÁTICAMENTE A EN PROCESO

    if (ticket.estado === "Abierto") {

        ticket.estado = "En Proceso";

        localStorage.setItem(
            "tickets",
            JSON.stringify(tickets)
        );

        renderTickets();
    }

    document.getElementById("modalTicket").innerHTML = `

        <div class="row g-4">

            <div class="col-md-6">

                <label class="fw-bold">
                    Ticket
                </label>

                <div class="ticket-box">
                    ${ticket.ticket}
                </div>

            </div>

            <div class="col-md-6">

                <label class="fw-bold">
                    Estado
                </label>

                <div class="ticket-box">
                    ${ticket.estado}
                </div>

            </div>

            <div class="col-md-6">

                <label class="fw-bold">
                    Usuario
                </label>

                <div class="ticket-box">
                    ${ticket.usuario}
                </div>

            </div>

            <div class="col-md-6">

                <label class="fw-bold">
                    División
                </label>

                <div class="ticket-box">
                    ${ticket.division}
                </div>

            </div>

            <div class="col-md-6">

                <label class="fw-bold">
                    Categoría
                </label>

                <div class="ticket-box">
                    ${ticket.categoria}
                </div>

            </div>

            <div class="col-md-6">

                <label class="fw-bold">
                    Prioridad
                </label>

                <div class="ticket-box">
                    ${ticket.prioridad}
                </div>

            </div>

            <div class="col-md-6">

                <label class="fw-bold">
                    Equipo
                </label>

                <div class="ticket-box">
                    ${ticket.equipo || "No especificado"}
                </div>

            </div>

            <div class="col-md-6">

                <label class="fw-bold">
                    Contacto
                </label>

                <div class="ticket-box">
                    ${ticket.contacto || "No especificado"}
                </div>

            </div>

            <div class="col-12">

                <label class="fw-bold">
                    Descripción
                </label>

                <div class="ticket-box description-box">
                    ${ticket.descripcion}
                </div>

            </div>

        </div>

    `;

    const modal = new bootstrap.Modal(
        document.getElementById("ticketModal")
    );

    modal.show();
}

searchInput.addEventListener("keyup", function() {

    const value = this.value.toLowerCase();

    const filtrados = tickets.filter(ticket =>

        ticket.ticket.toLowerCase().includes(value) ||
        ticket.usuario.toLowerCase().includes(value) ||
        ticket.categoria.toLowerCase().includes(value)

    );

    renderTickets(filtrados);
});

renderTickets();

window.abrirTicket = abrirTicket;
window.cambiarEstado = cambiarEstado;
function irTicket(numeroTicket){

    window.location.href =
        `ticket.html?id=${numeroTicket}`;
}

window.irTicket = irTicket;
