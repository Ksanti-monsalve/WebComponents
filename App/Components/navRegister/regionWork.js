import { postWorks, getWorks } from "../../../Apis/work/workApi.js";

export class RegionWork extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  async render() {
    this.innerHTML = `
      <div class="card shadow-sm mx-auto mt-5" style="max-width: 500px; border-radius: 18px;">
        <div class="card-body">
          <h3 class="card-title text-center text-primary mb-4" style="font-weight: bold;">Registrar Región</h3>
          <form id="regionForm">
            <div class="mb-4">
              <label for="nombreRegion" class="form-label fw-semibold">Nombre de la Región</label>
              <input type="text" id="nombreRegion" class="form-control" placeholder="Ej: Antioquia" required style="border-radius: 10px;"/>
            </div>
            <div class="mb-4">
              <label for="paisSelect" class="form-label fw-semibold">País</label>
              <select id="paisSelect" class="form-select" required style="border-radius: 10px;">
                <option value="">-- Selecciona un país --</option>
              </select>
            </div>
            <button type="submit" class="btn btn-primary w-100 py-2" style="border-radius: 10px; font-weight: bold;">Guardar</button>
          </form>
          <div id="mensajeRegion" class="mt-3"></div>
        </div>
      </div>
    `;

    await this.cargarPaises();

    this.querySelector("#regionForm").addEventListener("submit", async (e) => {
      e.preventDefault();

      const nombreRegion = this.querySelector("#nombreRegion").value.trim();
      const paisId = this.querySelector("#paisSelect").value;

      if (!nombreRegion || !paisId) {
        this.mostrarMensaje("Debes completar todos los campos", "danger");
        return;
      }

      const datos = { name: nombreRegion, CountryId: parseInt(paisId) };

      try {
        const response = await postWorks(datos, "regions");
        if (response.ok) {
          this.mostrarMensaje("Región registrada correctamente", "success");
          this.querySelector("#regionForm").reset();
        } else {
          this.mostrarMensaje("Error al registrar la región", "danger");
        }
      } catch (err) {
        console.error(err);
        this.mostrarMensaje("Error en la conexión con la API", "danger");
      }
    });
  }

  async cargarPaises() {
    try {
      const response = await getWorks("countries");
      const paises = await response.json();
      const select = this.querySelector("#paisSelect");

      paises.forEach(p => {
        const option = document.createElement("option");
        option.value = p.id;
        option.textContent = p.name;
        select.appendChild(option);
      });
    } catch (err) {
      console.error("Error cargando países:", err);
    }
  }

  mostrarMensaje(msg, tipo) {
    const div = this.querySelector("#mensajeRegion");
    div.innerHTML = `<div class="alert alert-${tipo}" role="alert">${msg}</div>`;
  }
}

customElements.define("region-work", RegionWork);