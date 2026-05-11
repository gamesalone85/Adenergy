const sesion =
    JSON.parse(localStorage.getItem("sesionActiva"));

// VALIDAR SESIÓN

if(!sesion){

    window.location.href = "login.html";
}

// SOLO ADMIN

if(sesion.rol !== "Administrador"){

    alert("Acceso denegado");

    window.location.href = "admin.html";
}

const form =
    document.getElementById("userForm");

const table =
    document.getElementById("usersTable");

let usuarios =
    JSON.parse(localStorage.getItem("usuarios")) || [];

// RENDER TABLA

function renderUsers(){

    table.innerHTML = "";

    usuarios.forEach((user, index) => {

        table.innerHTML += `

            <tr>

                <td>

                    <strong>
                        ${user.usuario}
                    </strong>

                </td>

                <td>

                    <span class="badge bg-primary">

                        ${user.rol}

                    </span>

                </td>

                <td>

                    ${user.password}

                </td>

                <td>

                    <div class="d-flex gap-2">

                        <button
                            class="btn btn-warning btn-sm"
                            onclick="editarUsuario(${index})">

                            <i class="bi bi-pencil-fill"></i>

                        </button>

                        <button
                            class="btn btn-danger btn-sm"
                            onclick="eliminarUsuario(${index})">

                            <i class="bi bi-trash-fill"></i>

                        </button>

                    </div>

                </td>

            </tr>

        `;
    });
}

// CREAR USUARIO

form.addEventListener("submit", function(e){

    e.preventDefault();

    const usuario =
        document.getElementById("usuario").value;

    const password =
        document.getElementById("password").value;

    const rol =
        document.getElementById("rol").value;

    // VALIDAR DUPLICADOS

    const existe =
        usuarios.find(u => u.usuario === usuario);

    if(existe){

        alert("El usuario ya existe");
        return;
    }

    usuarios.push({

        usuario,
        password,
        rol
    });

    guardar();

    form.reset();

    renderUsers();

    alert("Usuario creado correctamente");
});

// GUARDAR

function guardar(){

    localStorage.setItem(
        "usuarios",
        JSON.stringify(usuarios)
    );
}

// ELIMINAR

function eliminarUsuario(index){

    const confirmar =
        confirm("¿Eliminar usuario?");

    if(!confirmar) return;

    usuarios.splice(index, 1);

    guardar();

    renderUsers();
}

// EDITAR

function editarUsuario(index){

    const nuevoUsuario =
        prompt(
            "Nuevo usuario",
            usuarios[index].usuario
        );

    if(!nuevoUsuario) return;

    const nuevaPassword =
        prompt(
            "Nueva contraseña",
            usuarios[index].password
        );

    if(!nuevaPassword) return;

    usuarios[index].usuario = nuevoUsuario;

    usuarios[index].password = nuevaPassword;

    guardar();

    renderUsers();

    alert("Usuario actualizado");
}

renderUsers();

window.eliminarUsuario = eliminarUsuario;
window.editarUsuario = editarUsuario;
