# API de Cotizaciones - Agencia de Viajes (NestJS + Docker)

Este proyecto es una API REST robusta construida con **NestJS**, **TypeORM** y **PostgreSQL** para la gestión y control estricto de cotizaciones de viajes. Cuenta con validación automática por capas, autenticación mediante API Key global y un sistema de control de accesos cruzados basado en roles mediante cabeceras HTTP.

---

## 🛠️ Tecnologías Utilizadas

- **Backend:** NestJS (TypeScript)
- **Base de Datos:** PostgreSQL 15 (Orquestado con Docker)
- **Documentación:** OpenAPI / Swagger UI
- **Control de Versiones:** Git & GitHub

---

## 🚀 Requisitos e Instalación

### 1. Clonar el repositorio y configurar variables de entorno
```bash
git clone https://github.com
cd api-agencia-viajes-nestjs
cp .env.example .env
```
*(Asegúrate de revisar el archivo `.env` para confirmar que las credenciales coincidan con tus puertos locales).*

### 2. Levantar la Infraestructura Aislada (Docker)
Para levantar la base de datos PostgreSQL y la interfaz externa de Swagger en paralelo, ejecuta:
```bash
docker compose up -d
```

### 3. Instalar dependencias y arrancar la API
```bash
npm install
npm run start:dev
```
La aplicación se inicializará automáticamente y creará las tablas físicas en la base de datos gracias a la sincronización activa de TypeORM.

---

## 🛡️ Credenciales de Seguridad y Pruebas

Para interactuar con los endpoints, todas las solicitudes HTTP deben adjuntar de forma obligatoria las siguientes cabeceras:

1. **`x-api-key`**: Debe coincidir con alguna de las llaves registradas en el `.env` (ej: `clave-demo-uno`).
2. **`x-user`**: Determina la identidad del empleado. Los usuarios preconfigurados en memoria son:
   - `sofia.admin` (Rol: `admin`)
   - `andres.gerente` (Rol: `gerente`)
   - `valeria.asesor` (Rol: `asesor`)
   - `mateo.asesor` (Rol: `asesor`)

---

## 📖 Documentación de Endpoints (Swagger)

Puedes acceder a la documentación interactiva y probar las peticiones directamente desde los siguientes entornos:

- **Swagger Integrado (NestJS):** [http://localhost:3000/docs](http://localhost:3000/docs)
- **Swagger UI Aislado (Docker):** [http://localhost:8080](http://localhost:8080)
