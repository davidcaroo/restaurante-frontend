-----

# Sistema de Gestión de Reservas de Restaurante "MesaPaYa"

Este proyecto es una aplicación web completa diseñada para la gestión eficiente de reservas de mesas en el restaurante "MesaPaYa". Consiste en un **frontend interactivo** desarrollado con React y un **backend robusto** implementado en PHP (Laravel) con una API RESTful para la gestión de datos.

## 🚀 Características Principales

  * **Gestión de Usuarios:** Registro y autenticación de clientes y administradores.
  * **Reservas de Mesas:**
      * Clientes pueden visualizar la disponibilidad de mesas.
      * Clientes pueden crear, ver y cancelar sus propias reservas.
  * **Panel de Administración:**
      * Administradores pueden ver y gestionar todas las reservas del restaurante.
      * Administradores pueden gestionar mesas y otros recursos.
  * **Diseño Responsivo:** Interfaz adaptable a diferentes dispositivos (escritorio, tabletas, móviles).

## 💻 Tecnologías Utilizadas

### Frontend

  * **React.js:** Biblioteca JavaScript para construir la interfaz de usuario.
  * **React Router DOM:** Para la navegación y el enrutamiento dentro de la aplicación.
  * **CSS Puro:** Estilización de los componentes y diseño responsivo.
  * **Context API:** Gestión del estado global para la autenticación.
  * **Hooks Personalizados:** Para lógicas reutilizables como la validación de formularios.

### Backend

  * **PHP:** Lenguaje de programación del lado del servidor.
  * PHP para el desarrollo de la API RESTful.
  * **MySQL (o cualquier RDBMS):** Base de datos para almacenar usuarios, mesas y reservas.
  * **Autenticación JWT (JSON Web Tokens):** Para la seguridad de la API.


## 📂 Estructura del Proyecto (Frontend)

El frontend sigue una estructura de carpetas modular y organizada:

```
frontend/
├── public/                     # Archivos estáticos (index.html, imágenes)
│   ├── index.html
│   ├── favicon.ico
│   └── images/                 # Imágenes del restaurante (logo, banners, mesas)
│       ├── logo.png
│       ├── banner-1.jpg
│       └── mesa-1.jpg
├── src/
│   ├── components/             # Componentes UI reutilizables
│   │   ├── Header/             # Encabezado de la página
│   │   │   ├── Header.js
│   │   │   └── Header.css
│   │   ├── Footer/             # Pie de página
│   │   │   ├── Footer.js
│   │   │   └── Footer.css
│   │   ├── Modal/              # Componente de modal reutilizable (con React Portal)
│   │   │   ├── Modal.js
│   │   │   └── Modal.css
│   │   ├── Card/               # Componente de tarjeta genérico
│   │   │   ├── Card.js
│   │   │   └── Card.css
│   │   ├── TestimonialCard/    # Tarjeta para testimonios de clientes
│   │   │   ├── TestimonialCard.js
│   │   │   └── TestimonialCard.css
│   │   └── PrivateRoute/       # Componente para rutas protegidas
│   │       └── PrivateRoute.js
│   ├── pages/                  # Vistas principales de la aplicación
│   │   ├── Home/               # Página de inicio
│   │   │   ├── Home.js
│   │   │   └── Home.css
│   │   ├── Login/              # Página de inicio de sesión
│   │   │   ├── Login.js
│   │   │   └── Login.css
│   │   ├── Register/           # Página de registro de usuarios
│   │   │   ├── Register.js
│   │   │   └── Register.css
│   │   ├── Dashboard/          # Panel de control de usuario/admin
│   │   │   ├── Dashboard.js
│   │   │   └── Dashboard.css
│   │   └── NotFound/           # Página 404
│   │       ├── NotFound.js
│   │       └── NotFound.css
│   ├── services/
│   │   └── api.js              # Funciones para interactuar con la API RESTful (axios)
│   ├── contexts/
│   │   └── AuthContext.js      # Contexto de autenticación para gestionar el estado del usuario
│   ├── hooks/
│   │   └── useFormValidation.js# Hook personalizado para validación de formularios
│   ├── utils/
│   │   ├── helpers.js          # Funciones de utilidad (validadores, formateadores)
│   │   └── constants.js        # Constantes de la aplicación (roles, estados, mensajes)
│   ├── App.js                  # Componente principal de la aplicación y enrutador
│   ├── App.css                 # Estilos globales de la aplicación
│   └── index.js                # Punto de entrada de React
├── .env                        # Variables de entorno (ej. REACT_APP_API_URL)
├── package.json                # Dependencias y scripts del proyecto
└── README.md                   # Este archivo
```


## 🧩 Lógica de Negocio y Componentes Clave (Frontend)

El frontend está diseñado para ser modular y escalable, utilizando componentes reutilizables y una clara separación de responsabilidades.

### **Componentes UI Reutilizables (`src/components/`)**

  * **`Header` y `Footer`:** Proporcionan la navegación global y la información de contacto/copyright. El `Header` se adapta a dispositivos móviles con un menú de hamburguesa.
  * **`Modal`:** Un componente genérico para crear ventanas modales, utilizando **React Portals** para asegurar que el modal se renderice fuera del árbol DOM principal de la aplicación, pero mantenga su estado de React. Esto es crucial para asegurar que los modales se muestren correctamente por encima de todo el contenido.
  * **`Card` y `TestimonialCard`:** Componentes estilizados para mostrar información estructurada o testimonios de clientes, respectivamente.

### **Páginas de la Aplicación (`src/pages/`)**

  * **`Home`:** La página de aterrizaje del restaurante. Incluye secciones informativas sobre el restaurante, una galería de mesas y testimonios de clientes, proporcionando una experiencia atractiva al usuario.
  * **`Login` y `Register`:** Formularios para la autenticación de usuarios. Utilizan el `AuthContext` para interactuar con la API de autenticación.
  * **`Dashboard`:** El corazón de la gestión de usuarios.
      * Para **clientes**, muestra sus reservas activas y les permite cancelarlas.
      * Para **administradores**, ofrece una vista completa de *todas* las reservas, permitiendo una gestión más detallada (aunque las funcionalidades de edición/cancelación para admin requerirían más lógica en el `Dashboard.js`).
  * **`NotFound`:** Una página de error 404 amigable en caso de que el usuario acceda a una ruta inexistente.

### **Lógica Centralizada**

  * **`AuthContext.js` (`src/contexts/`)**: Implementa el patrón **Context API de React** para la gestión global del estado de autenticación. Permite que cualquier componente dentro del árbol acceda al estado `isAuthenticated`, la información `user` y las funciones `login` y `logout` sin necesidad de pasar props manualmente a través de múltiples niveles. También maneja la persistencia de la sesión (ej. con `localStorage`).
  * **`PrivateRoute.js` (`src/components/`)**: Un componente envoltorio (Higher-Order Component concept) que protege rutas específicas. Verifica si el usuario está autenticado y, opcionalmente, si tiene un rol requerido (`admin`, `client`) antes de permitir el acceso a la ruta. Si las condiciones no se cumplen, redirige al usuario a la página de inicio de sesión o a la raíz.
  * **`useFormValidation.js` (`src/hooks/`)**: Un hook personalizado que encapsula la lógica de validación de formularios, facilitando la reutilización de la validación a través de diferentes formularios de la aplicación.
  * **`api.js` (`src/services/`)**: Centraliza todas las llamadas a la API RESTful utilizando `axios`. Abstrae la lógica de las peticiones HTTP de los componentes, haciendo el código más limpio y fácil de mantener. Aquí se manejarán las cabeceras de autorización (JWT).
  * **`helpers.js` y `constants.js` (`src/utils/`)**: Contienen funciones de utilidad genéricas (validaciones de email, formateo de fechas) y constantes de la aplicación (roles, mensajes de validación), respectivamente, para promover la reutilización y evitar la duplicación de código.


## ⚙️ Backend y API RESTful (PHP)

El backend es una API RESTful desarrollada con PHP puro, que expone los siguientes recursos y funcionalidades:

### **Modelos Principales**

  * **`User`**: Gestiona la información de los usuarios (clientes y administradores).
      * `id`, `name`, `email`, `password`, `role` (e.g., 'client', 'admin').
  * **`Table` (Mesa)**: Representa las mesas disponibles en el restaurante.
      * `id`, `name` (ej. "Mesa 1", "Barra"), `capacity` (número de personas), `status` (ej. 'available', 'reserved').
  * **`Reservation` (Reserva)**: Contiene los detalles de cada reserva.
      * `id`, `user_id` (quién hizo la reserva), `table_id` (qué mesa se reservó), `date`, `start_time`, `end_time`, `num_participants`, `status` (ej. 'pending', 'confirmed', 'cancelled'), `total_cost`.

### **Endpoints de la API**

La API proporciona los siguientes endpoints RESTful, protegidos por autenticación JWT donde sea necesario:

#### **Autenticación y Usuarios**

  * `POST /api/register`: Registra un nuevo usuario (cliente).
  * `POST /api/login`: Autentica un usuario y devuelve un token JWT.
  * `POST /api/logout`: Cierra la sesión del usuario (invalida el token JWT).
  * `GET /api/user`: Obtiene los datos del usuario autenticado.

#### **Mesas**

  * `GET /api/tables`: Obtiene todas las mesas disponibles.
  * `GET /api/tables/{id}`: Obtiene detalles de una mesa específica.
  * `GET /api/tables/available?date={date}&time={time}&duration={hours}&participants={num}`: (Ejemplo de endpoint avanzado) Busca mesas disponibles según criterios.
  * `POST /api/tables`: (Admin) Crea una nueva mesa.
  * `PUT /api/tables/{id}`: (Admin) Actualiza una mesa existente.
  * `DELETE /api/tables/{id}`: (Admin) Elimina una mesa.

#### **Reservas**

  * `GET /api/reservations`: (Admin) Obtiene todas las reservas del sistema.
  * `GET /api/my-reservations`: (Cliente) Obtiene las reservas del usuario autenticado.
  * `GET /api/reservations/{id}`: Obtiene detalles de una reserva específica.
  * `POST /api/reservations`: (Cliente) Crea una nueva reserva.
  * `PUT /api/reservations/{id}`: (Admin/Cliente) Actualiza el estado o detalles de una reserva.
  * `DELETE /api/reservations/{id}`: (Admin) Elimina una reserva.

-----

## 🛠️ Configuración e Instalación

### Requisitos Previos

  * **Node.js** y **npm** (o Yarn) para el frontend.
  * **PHP \>= 8.1** y **Composer** para el backend.
  * **Servidor web** (Apache/Nginx) y **Base de datos** (MySQL/PostgreSQL).

### Pasos para el Frontend

1.  **Clona el repositorio:**
2.  **Instala las dependencias:**
    ```bash
    npm install
    # o yarn install
    ```
3.  **Configura las variables de entorno:**
    Crea un archivo `.env` en la raíz de la carpeta `frontend/` y añade la URL de tu API backend:
    ```
    REACT_APP_API_URL=http://localhost:8000/api # O la URL de tu API
    ```
4.  **Inicia la aplicación:**
    ```bash
    npm start
    # o yarn start
    ```
    La aplicación debería abrirse en `http://localhost:3000` (o un puerto similar).

### Pasos para el Backend (PHP)

**(Asumiendo que el backend está en una carpeta `backend/` separada al mismo nivel que `frontend/`)**

1.  **Navega a la carpeta del backend:**
    ```bash
    cd ../backend # Si estás en frontend/, ve un nivel arriba y luego a backend/
    ```
2.  **Instala las dependencias de Composer:**
3.  **Configura el archivo `.env`:**
    Copia el archivo `.env.example` a `.env` y configura tus credenciales de base de datos y otras variables necesarias.
    ```bash
    cp .env.example .env
    ```
    Asegúrate de configurar:
    ```
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=nombre_de_tu_db
    DB_USERNAME=tu_usuario
    DB_PASSWORD=tu_contraseña
    ```
4.  **Genera la clave de la aplicación:**
    ```bash
    php artisan key:generate
    ```

    El servidor de la API debería ejecutarse en `http://localhost:8000` (o un puerto similar).



## 🤝 Contribuciones

Las contribuciones son bienvenidas. Si encuentras un error o tienes una mejora, no dudes en abrir un *issue* o enviar un *pull request*.

