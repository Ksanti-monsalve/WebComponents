# WebComponents CRUD App

Este proyecto es una aplicación web para la gestión de entidades relacionadas con compañías, marcas, sucursales, países, regiones y ciudades. Utiliza **Web Components** para la interfaz y realiza operaciones CRUD mediante una API REST.

---

## Estructura de Carpetas

```
WebComponents/
│
├── App/
│   └── Components/
│       ├── navMenu/         # Menú de navegación principal
│       ├── navRegister/     # Formularios de registro (País, Región, Ciudad, Compañía, Marca)
│       └── navList/         # Listado de entidades
│
├── Apis/
│   └── work/                # Lógica para consumir la API REST
│
├── Models/
│   └── workModel.js         # Modelos de datos para cada entidad
│
├── app.js                   # Archivo principal de importación de componentes
└── README.md                # Este archivo
```

---

## Componentes Principales

- **navMenu**: Barra de navegación para cambiar entre registrar y listar entidades.
- **navRegister**: Formularios para registrar País, Región, Ciudad, Compañía y Marca.
- **navList**: Listado de entidades (puedes expandirlo para mostrar datos).
- **workApi.js**: Funciones para consumir la API (`GET`, `POST`, `PATCH`, `DELETE`).
- **workModel.js**: Modelos de datos para cada entidad.

---

## Entidades y Campos

### País (`countries`)
- id
- name

### Región (`regions`)
- id
- name
- CountryId

### Ciudad (`cities`)
- id
- name
- RegionId

### Compañía (`companies`)
- id
- name
- niu
- CityId
- adress
- email

### Marca/Sucursal (`branches`)
- id
- number_Comercial
- niu
- Contact_name
- adress
- email
- phone
- cityId
- CompanyId

---

## Instalación y Uso

1. **Clona el repositorio**  
   ```
   git clone <url-del-repo>
   ```

2. **Instala dependencias**  
   Si usas un backend Node.js, instala las dependencias y ejecuta el servidor.

3. **Configura la API**  
   Asegúrate que la API esté corriendo en la IP y puerto configurados (por defecto: `http://25.0.237.35:3000`).

4. **Abre el proyecto en VS Code**  
   Ejecuta con una extensión de servidor local o desde tu backend.

---

## Personalización Visual

Todos los formularios usan **Bootstrap 5** para un diseño moderno y responsivo.  
Puedes modificar los estilos en los componentes para adaptarlos a tus necesidades.

---

## Errores Comunes

- **404 Not Found**: Verifica que el endpoint de la API exista y esté bien escrito.
- **ERR_CONNECTION_REFUSED**: Asegúrate que el backend esté corriendo y la IP/puerto sean correctos.
- **Campos vacíos**: Todos los formularios validan que los campos estén completos antes de enviar.

---

## Créditos

Desarrollado por Kevin Santiago Pinto Monsalve
Basado en Web Components y Bootstrap 5.

---