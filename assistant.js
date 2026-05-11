function analizarProblema(texto){

    texto = texto.toLowerCase();

    let categoria = "Software";
    let prioridad = "Media";

    // VPN

    if(texto.includes("vpn")){

        categoria = "VPN";
        prioridad = "Alta";
    }

    // WIFI

    if(
        texto.includes("wifi") ||
        texto.includes("internet")
    ){

        categoria = "WIFI";
        prioridad = "Alta";
    }

    // OUTLOOK

    if(
        texto.includes("correo") ||
        texto.includes("outlook")
    ){

        categoria = "Correo Electrónico";
        prioridad = "Alta";
    }

    // TEAMS

    if(
        texto.includes("teams")
    ){

        categoria = "Microsoft Teams";
    }

    return {

        categoria,
        prioridad
    };
}
