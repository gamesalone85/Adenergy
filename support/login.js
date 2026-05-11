// CREAR USUARIOS POR DEFECTO

if(!localStorage.getItem("usuarios")){

    const usuarios = [

        {
            usuario: "Admin",
            password: "Admin",
            rol: "Administrador"
        },

        {
            usuario: "usuario1",
            password: "usuario1",
            rol: "Mesa de Ayuda"
        }
    ];

    localStorage.setItem(
        "usuarios",
        JSON.stringify(usuarios)
    );
}

const form =
    document.getElementById("loginForm");

form.addEventListener("submit", function(e){

    e.preventDefault();

    const username =
        document.getElementById("username").value;

    const password =
        document.getElementById("password").value;

    const usuarios =
        JSON.parse(localStorage.getItem("usuarios"));

    const usuarioValido =
        usuarios.find(u =>

            u.usuario === username &&
            u.password === password
        );

    if(!usuarioValido){

        alert("Usuario o contraseña incorrectos");
        return;
    }

    localStorage.setItem(
        "sesionActiva",
        JSON.stringify(usuarioValido)
    );

    window.location.href =
        "admin.html";
});
