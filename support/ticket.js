const params =
    new URLSearchParams(window.location.search);

const ticketId = params.get("id");

let tickets =
    JSON.parse(localStorage.getItem("tickets")) || [];

const ticket =
    tickets.find(t => t.ticket === ticketId);

const container =
    document.getElementById("ticketDetail");

// CAMBIAR AUTOMÁTICAMENTE A EN PROCESO

if(ticket.estado === "Abierto"){

    ticket.estado = "En Proceso";

    guardar();
}

if(!ticket.comentarios){

    ticket.comentarios = [];
}

function guardar(){

    localStorage.setItem(
        "tickets",
        JSON.stringify(tickets)
    );
}

function render(){

    container.innerHTML = `

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

            <div class="col-12">

                <label class="fw-bold">
                    Descripción
                </label>

                <div class="ticket-box description-box">
                    ${ticket.descripcion}
                </div>

            </div>

            <div class="col-12">

                <hr>

                <h4>
                    Bitácora Técnica
                </h4>

            </div>

            <div class="col-12">

                <textarea
                    id="comentario"
                    class="form-control"
                    rows="4"
                    placeholder="Documentar actividad realizada..."></textarea>

            </div>

            <div class="col-md-4">

                <button
                    class="btn btn-primary w-100"
                    onclick="agregarComentario()">

                    Guardar Comentario

                </button>

            </div>

            <div class="col-md-4">

                <button
                    class="btn btn-warning w-100"
                    onclick="cambiarEstado('Pendiente')">

                    Pendiente

                </button>

            </div>

            <div class="col-md-4">

                <button
                    class="btn btn-success w-100"
                    onclick="cambiarEstado('Cerrado')">

                    Cerrar Ticket

                </button>

            </div>

            <div class="col-12">

                <button
                    class="btn btn-danger w-100"
                    onclick="cancelarTicket()">

                    Cancelar Ticket

                </button>

            </div>

            <div class="col-12 mt-4">

                <h5>
                    Historial
                </h5>

                ${ticket.comentarios.map(c => `

                    <div class="ticket-box mb-3">

                        <div class="d-flex justify-content-between">

                            <strong>
                                Soporte Técnico
                            </strong>

                            <small>
                                ${c.fecha}
                            </small>

                        </div>

                        <hr>

                        <p class="mb-0">
                            ${c.texto}
                        </p>

                    </div>

                `).join("")}

            </div>

        </div>

    `;
}

function agregarComentario(){

    const texto =
        document.getElementById("comentario").value;

    if(!texto){

        alert("Escribe un comentario");
        return;
    }

    ticket.comentarios.push({

        fecha:
            new Date().toLocaleString("es-MX"),

        texto
    });

    guardar();

    render();
}

function cambiarEstado(estado){

    ticket.estado = estado;

    guardar();

    render();

    alert("Estado actualizado");
}

function cancelarTicket(){

    const motivo =
        prompt("Indica el motivo de cancelación");

    if(!motivo) return;

    ticket.estado = "Cancelado";

    ticket.cancelacion = motivo;

    ticket.comentarios.push({

        fecha:
            new Date().toLocaleString("es-MX"),

        texto:
            "TICKET CANCELADO: " + motivo
    });

    guardar();

    render();
}

render();

window.agregarComentario = agregarComentario;
window.cambiarEstado = cambiarEstado;
window.cancelarTicket = cancelarTicket;
