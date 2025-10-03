import { postWorks, getWorks } from "../../../Apis/work/workApi.js";

export class MarcaWork extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  async render() {
    this.innerHTML = /* html */ `
      <div class="card shadow-sm mx-auto mt-5" style="max-width: 500px; border-radius: 18px;">
        <div class="card-body">
          <h3 class="card-title text-center text-primary mb-4" style="font-weight: bold;">Registrar Marca</h3>
          <form id="marcaForm">
            <div class="mb-4">
              <label for="nombreMarca" class="form-label fw-semibold">Nombre de la Marca</label>
              <input type="text" id="nombreMarca" class="form-control" placeholder="Ej: Nike" required style="border-radius: 10px;"/>
            </div>
            <div class="mb-4">
              <label for="numeroComercial" class="form-label fw-semibold">Número Comercial</label>
              <input type="text" id="numeroComercial" class="form-control" placeholder="Ej: 12345" required style="border-radius: 10px;"/>
            </div>
            <div class="mb-4">
              <label for="emailMarca" class="form-label fw-semibold">Email</label>
              <input type="email" id="emailMarca" class="form-control" placeholder="Ej: marca@email.com" required style="border-radius: 10px;"/>
            </div>
            <div class="mb-4">
              <label for="telefonoMarca" class="form-label fw-semibold">Número Celular</label>
              <input type="text" id="telefonoMarca" class="form-control" placeholder="Ej: 3001234567" required style="border-radius: 10px;"/>
            </div>
            <div class="mb-4">
              <label for="contactoMarca" class="form-label fw-semibold">Nombre de Contacto</label>
              <input type="text" id="contactoMarca" class="form-control" placeholder="Ej: Juan Pérez" required style="border-radius: 10px;"/>
            </div>
            <div class="mb-4">
              <label for="companiaSelect" class="form-label fw-semibold">Compañía</label>
              <select id="companiaSelect" class="form-select" required style="border-radius: 10px;">
                <option value="">-- Selecciona una compañía --</option>
              </select>
            </div>
            <button type="submit" class="btn btn-primary w-100 py-2" style="border-radius: 10px; font-weight: bold;">Guardar</button>
          </form>
          <div id="mensajeMarca" class="mt-3"></div>
        </div>
      </div>
    `;

    await this.cargarCompanias();

    this.querySelector("#marcaForm").addEventListener("submit", async (e) => {
      e.preventDefault();

      const nombreMarca = this.querySelector("#nombreMarca").value.trim();
      const numeroComercial = this.querySelector("#numeroComercial").value.trim();
      const email = this.querySelector("#emailMarca").value.trim();
      const telefono = this.querySelector("#telefonoMarca").value.trim();
      const contacto = this.querySelector("#contactoMarca").value.trim();
      const companiaId = this.querySelector("#companiaSelect").value;

      if (!nombreMarca || !numeroComercial || !email || !telefono || !contacto || !companiaId) {
        this.mostrarMensaje("Debes completar todos los campos", "danger");
        return;
      }

      const datos = {
        name: nombreMarca,
        numberComercial: numeroComercial,
        email: email,
        phone: telefono,
        contact_name: contacto,
        CompanyId: parseInt(companiaId)
      };

      try {
        const response = await postWorks(datos, "branches");
        if (response.ok) {
          this.mostrarMensaje("Marca registrada correctamente", "success");
          this.querySelector("#marcaForm").reset();
        } else {
          const errorMsg = await response.text();
          this.mostrarMensaje(`Error al registrar la marca: ${errorMsg}`, "danger");
        }
      } catch (err) {
        console.error(err);
        this.mostrarMensaje("Error en la conexión con la API", "danger");
      }
    });
  }

  async cargarCompanias() {
    try {
      const response = await getWorks("companies");
      if (!response.ok) throw new Error("No se pudo cargar compañías");
      const companias = await response.json();
      const select = this.querySelector("#companiaSelect");

      companias.forEach(c => {
        const option = document.createElement("option");
        option.value = c.id;
        option.textContent = c.name;
        select.appendChild(option);
      });
    } catch (err) {
      console.error("Error cargando compañías:", err);
      this.mostrarMensaje("No se pudieron cargar las compañías", "danger");
    }
  }

  mostrarMensaje(msg, tipo) {
    const div = this.querySelector("#mensajeMarca");
    div.innerHTML = `<div class="alert alert-${tipo}" role="alert">${msg}</div>`;
  }
}

customElements.define("marca-work", MarcaWork);