# ElectroFixProject

Aplicacion web para gestionar un servicio tecnico de electrodomesticos. El proyecto permite registrar clientes, empleados, recepciones de equipos, proveedores, materiales, reparaciones nomencladas, turnos y presupuestos.

> Estado: proyecto en desarrollo. La documentacion se ira actualizando a medida que se completen funcionalidades, validaciones, tests y despliegue.

## Tabla de contenidos

- [Descripcion](#descripcion)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Requisitos previos](#requisitos-previos)
- [Instalacion](#instalacion)
- [Variables de entorno](#variables-de-entorno)
- [Como ejecutar el proyecto](#como-ejecutar-el-proyecto)
- [Base de datos](#base-de-datos)
- [Rutas principales](#rutas-principales)
- [Flujo de trabajo sugerido](#flujo-de-trabajo-sugerido)
- [Pendientes](#pendientes)
- [Autor](#autor)

## Descripcion

ElectroFixProject es una aplicacion full stack pensada para administrar el flujo de trabajo de un taller de reparacion de electrodomesticos.

El sistema contempla dos grandes partes:

- **Frontend:** interfaz web desarrollada con React y Vite.
- **Backend:** API REST desarrollada con Express, TypeScript, Prisma y MySQL.

La aplicacion busca cubrir el circuito principal de trabajo:

1. Un cliente solicita una recepcion o visita tecnica.
2. El equipo administrativo visualiza la recepcion.
3. Se cargan proveedores y materiales disponibles.
4. Se genera un presupuesto asociado a una recepcion.
5. Se registra el estado del presupuesto y su confirmacion.

## Funcionalidades

- Registro y listado de clientes.
- Registro y listado de empleados.
- Gestion de roles de usuario.
- Login administrativo con sesiones.
- Alta, listado, edicion y eliminacion de recepciones.
- Alta, listado, edicion y eliminacion de proveedores.
- Alta, listado, edicion y eliminacion de materiales.
- Alta, listado, edicion y eliminacion de presupuestos.
- Gestion de reparaciones nomencladas.
- Gestion de turnos o solicitudes de diagnostico.
- Panel administrativo con informacion del sistema.

## Tecnologias

### Frontend

- React 18
- Vite
- React Router
- Sass
- JavaScript

### Backend

- Node.js
- Express
- TypeScript
- Prisma ORM
- MySQL
- Passport
- Express Session

## Estructura del proyecto

```text
ElectrofixProject/
+-- backend/
|   +-- prisma/
|   |   +-- migrations/
|   |   +-- schema.prisma
|   +-- src/
|   |   +-- controllers/
|   |   +-- dbseeder/
|   |   +-- interfaces/
|   |   +-- middleware/
|   |   +-- routes/
|   |   +-- index.ts
|   +-- package.json
|   +-- README.md
+-- frontend/
|   +-- public/
|   +-- src/
|   |   +-- assets/
|   |   +-- components/
|   |   +-- pages/
|   |   +-- routes/
|   |   +-- App.jsx
|   |   +-- main.jsx
|   +-- package.json
|   +-- README.md
+-- README.md
```

## Requisitos previos

Antes de ejecutar el proyecto es necesario tener instalado:

- Node.js 16.13 o superior.
- npm.
- MySQL.
- Git.

## Instalacion

Clonar el repositorio:

```bash
git clone <URL_DEL_REPOSITORIO>
cd ElectrofixProject
```

Instalar dependencias del backend:

```bash
cd backend
npm install
```

Instalar dependencias del frontend:

```bash
cd ../frontend
npm install
```

## Variables de entorno

El backend usa variables de entorno para conectarse a la base de datos y configurar sesiones.

Crear un archivo `.env` dentro de `backend/`:

```env
DATABASE_URL="mysql://USUARIO:PASSWORD@localhost:3306/NOMBRE_BASE_DE_DATOS"
APP_SECRET="una_clave_secreta_para_sesiones"
```

Opcionalmente se puede definir:

```env
ENVIRONMENT="development"
port=4200
```

## Como ejecutar el proyecto

### Backend

Desde la carpeta `backend/`:

```bash
npm run dev
```

Ese comando deja TypeScript en modo observador y compila los archivos `.ts`.

En otra terminal, tambien desde `backend/`:

```bash
npm run serve
```

Por defecto la API se levanta en:

```text
http://localhost:4200
```

### Frontend

Desde la carpeta `frontend/`:

```bash
npm run dev
```

Por defecto la app se levanta en:

```text
http://localhost:3000
```

El frontend usa el proxy de Vite para enviar las peticiones que empiezan con `/api` al backend:

```text
/api -> http://localhost:4200
```

## Base de datos

El proyecto usa Prisma con MySQL. El schema principal esta en:

```text
backend/prisma/schema.prisma
```

Modelos principales:

- `Usuario`
- `Rol`
- `Recepcion`
- `Turno`
- `Proveedor`
- `Material`
- `Presupuesto`
- `ReparacionNomenclada`

Comandos utiles desde `backend/`:

```bash
npx prisma generate
npx prisma migrate dev
npm run seed
```

## Rutas principales

### Frontend

| Ruta | Vista |
| --- | --- |
| `/` | Home |
| `/registro` | Registro de cliente |
| `/login-admin` | Login administrativo |
| `/admin` | Panel administrador |
| `/usuario` | Gestion de usuarios |
| `/clientes` | Listado de clientes |
| `/empleados` | Listado de empleados |
| `/recepcion` | Crear recepcion |
| `/recepciones` | Listado de recepciones |
| `/proveedor` | Gestion de proveedores |
| `/material` | Gestion de materiales |
| `/presupuesto` | Gestion de presupuestos |

### Backend

| Metodo | Endpoint | Descripcion |
| --- | --- | --- |
| `POST` | `/login` | Iniciar sesion |
| `POST` | `/logout` | Cerrar sesion |
| `GET` | `/rol` | Listar roles |
| `POST` | `/rol` | Crear rol |
| `GET` | `/usuario` | Listar usuarios |
| `POST` | `/usuario` | Crear usuario |
| `GET` | `/usuario/clientes` | Listar clientes |
| `GET` | `/usuario/empleados` | Listar empleados |
| `GET` | `/recepcion` | Listar recepciones |
| `POST` | `/recepcion` | Crear recepcion |
| `GET` | `/turno` | Listar turnos |
| `POST` | `/turno` | Crear turno |
| `GET` | `/proveedor` | Listar proveedores |
| `POST` | `/proveedor` | Crear proveedor |
| `GET` | `/material` | Listar materiales |
| `POST` | `/material` | Crear material |
| `GET` | `/presupuesto` | Listar presupuestos |
| `POST` | `/presupuesto` | Crear presupuesto |
| `GET` | `/reparacion` | Listar reparaciones nomencladas |
| `POST` | `/reparacion` | Crear reparacion nomenclada |

La documentacion mas detallada de la API se encuentra en:

```text
backend/README.md
```

## Flujo de trabajo sugerido

Para probar el circuito administrativo, se recomienda cargar datos en este orden:

1. Crear proveedores.
2. Crear materiales vinculados a proveedores.
3. Crear o revisar recepciones.
4. Crear presupuestos asociados a recepciones.
5. Actualizar el estado del presupuesto.

## Pendientes

Algunas mejoras posibles para futuras iteraciones:

- Agregar capturas de pantalla al README.
- Crear un archivo `.env.example` para facilitar la configuracion.
- Mejorar validaciones en frontend y backend.
- Agregar tests automatizados.
- Documentar ejemplos completos de request y response de la API.
- Revisar control de acceso para rutas administrativas.
- Normalizar nombres de scripts y comandos de ejecucion.
- Mejorar manejo de estados de presupuesto.
- Evitar presupuestos duplicados para una misma recepcion si esa es la regla de negocio.
- Preparar instrucciones de despliegue actualizadas.

## Autor

Proyecto desarrollado como parte de una practica de frontend/backend para Argentina Programa.
