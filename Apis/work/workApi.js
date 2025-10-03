const URL_API = "http://25.0.237.35:3000";
const myHeaders = new Headers({
    "Content-Type": "application/json"
});

// Cambia getWorks para aceptar una ruta
const getWorks = async (ruta) => {
    try {
        const respuesta = await fetch(`${URL_API}/${ruta}`);
        if (respuesta.status === 200) {
            return respuesta; // Devuelve la respuesta para que el componente la use
        } else if (respuesta.status === 401) {
            console.log('La url no es correcta');
        } else if (respuesta.status === 404) {
            console.log('El recurso no existe');
        } else {
            console.log('Se presentó un error en la petición, consulte al Administrador');
        }
    } catch (error) {
        console.log(error);
    }
}

const postWork = async (datos, ruta) => {
    try {
        return await fetch(`${URL_API}/${ruta}`, {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(datos)
        });
    } catch (error) {
        console.error('Error en la solicitud POST:', error.message);
    }
}

const patchWork = async (datos, ruta, id) => {
    try {
        return await fetch(`${URL_API}/${ruta}/${id}`, {
            method: "PATCH",
            headers: myHeaders,
            body: JSON.stringify(datos)
        });
    } catch (error) {
        console.error('Error en la solicitud PATCH:', error.message);
    }
}

const deleteWork = async (id) => {
    try {
        return await fetch(`${URL_API}/works/${id}`, {
            method: "DELETE",
            headers: myHeaders,
        });
    } catch (error) {
        console.error('Error en la solicitud DELETE:', error.message);
    }
}

export {
    getWorks,
    postWork as postWorks,
    patchWork as patchWorks,
    deleteWork as deleteWorks
};