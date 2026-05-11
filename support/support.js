const fecha = document.getElementById("fecha");
const ticket = document.getElementById("ticket");
const form = document.getElementById("ticketForm");
const table = document.getElementById("ticketsTable");

let tickets = JSON.parse(localStorage.getItem("tickets")) || [];

function generarNumeroTicket() {

    return tickets.length + 1;

}

function actualizarDatos() {

    const now = new Date();

    fecha.value = now.toLocaleString("es-MX");

    ticket.value =
        "TKT-" +
        String(generarNumeroTicket()).padStart(5, "0");

}

function renderTickets() {

    table.innerHTML = "";

    tickets.reverse().forEach(t => {

        table.innerHTML += `
            <tr>

                <td>${t.ticket}</td>
                <td>${t.usuario}</td>
                <td>${t.fecha}</td>
                <td>${t.division}</td>
                <td>${t.categoria}</td>
                <td>${t.prioridad}</td>

                <td>
                    <span class="estado">
                        Abierto
                    </span>
                </td>

            </tr>
        `;

    });

}

actualizarDatos();
renderTickets();

form.addEventListener("submit", function(e){

    e.preventDefault();

    const nuevoTicket = {

    ticket: ticket.value,
    fecha: fecha.value,
    usuario: document.getElementById("usuario").value,
    division: document.getElementById("division").value,
    categoria: document.getElementById("categoria").value,
    prioridad: document.getElementById("prioridad").value,
    contacto: document.getElementById("contacto").value,
    equipo: document.getElementById("equipo").value,
    descripcion: document.getElementById("descripcion").value,

    estado: "Abierto"

};

    tickets.push(nuevoTicket);

    localStorage.setItem(
        "tickets",
        JSON.stringify(tickets)
    );

    form.reset();

    actualizarDatos();
    renderTickets();

});
