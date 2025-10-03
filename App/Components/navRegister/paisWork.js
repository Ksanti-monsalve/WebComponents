import { postWorks } from "../../../Apis/work/workApi.js";

export class PaisWork extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

render() {
  this.innerHTML = /* html */ `
    <div class="card shadow-sm mx-auto mt-4" style="max-width: 500px;">
      <div class="card-body">
        <h3 class="card-title text-primary mb-4 text-center">Registrar País</h3>
        <form id="paisForm">
          <div class="mb-3">
            <label for="nombrePais" class="form-label fw-bold">Nombre del País</label>
            <input type="text" id="nombrePais" class="form-control" placeholder="Ej: Colombia" required />
          </div>
          <button type="submit" class="btn btn-primary w-100">Guardar</button>
        </form>
        <div id="mensajePais" class="mt-3"></div>
      </div>
    </div>
  `;
  


    this.querySelector("#paisForm").addEventListener("submit", async (e) => {
      e.preventDefault();

      const nombrePais = this.querySelector("#nombrePais").value.trim();

      if (!nombrePais) {
        this.mostrarMensaje("Ingresa un nombre de país", "danger");
        return;
      }

      const datos = { name: nombrePais };

      try {
        const response = await postWorks(datos, "countries");
        if (response.ok) {
          this.mostrarMensaje("País registrado correctamente", "success");
          this.querySelector("#paisForm").reset();
        } else {
          this.mostrarMensaje("Error al registrar el país", "danger");
        }
      } catch (err) {
        console.error(err);
        this.mostrarMensaje("Error en la conexión con la API", "danger");
      }
    });
  }

  mostrarMensaje(msg, tipo) {
    const div = this.querySelector("#mensajePais");
    div.innerHTML = `<div class="alert alert-${tipo}" role="alert">${msg}</div>`;
  }
}

customElements.define("pais-work", PaisWork);
