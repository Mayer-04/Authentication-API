# API REST de Autenticación

Este proyecto es una API REST desarrollada en TypeScript con Express y MongoDB para la gestión de autenticación de usuarios. Proporciona funcionalidades de registro (register) y inicio de sesión (login), utilizando tecnologías y prácticas modernas para garantizar la seguridad y la eficiencia del sistema.

## Características principales

- Registro de usuarios con validación de datos utilizando Zod.
- Inicio de sesión con generación de tokens JWT para la autenticación.
- Gestión de sesiones mediante cookies para mantener la autenticación del usuario.
- Uso del driver nativo de MongoDB para las diferentes consultas a la base de datos.
- Implementación de patrones de diseño como el adaptador y el MVC para una arquitectura escalable y mantenible.
- Integración de CORS para permitir el acceso controlado a los recursos desde diferentes dominios.
- Uso de paquetes de seguridad como Helmet para proteger la aplicación de diversas vulnerabilidades.
- Utilización de rate-limiter-flexible para proteger la API de ataques de fuerza bruta.

## Requisitos

- [Node.js](https://nodejs.org/en) (v16.0.0 o superior)
- [pnpm](https://pnpm.io/es/) (Puedes instalarlo globalmente con `npm install -g pnpm` o habilitando Corepack con `corepack enable pnpm` desde la v16.13 de Node.js)

## Instalación y Uso

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/Mayer-04/Fastify-API.git
   ```

2. Instalar las dependencias:

    ```bash
   pnpm install
   ```

3. Clonar el archivo **.env.template** a **.env** para configurar las variables de entorno. Credenciales de la base de datos y la clave secreta para JWT.

4. Iniciar la aplicación:

    ```bash
   pnpm run dev
   ```

5. La API estará disponible en:
 `http://localhost:5000/api/auth/[register|login]`.

## Endpoints

- `POST /api/auth/register`: Permite a los usuarios registrarse en la plataforma proporcionando su nombre de usuario, correo electrónico y contraseña.
- `POST /api/auth/login`: Permite a los usuarios iniciar sesión en la plataforma proporcionando su correo electrónico y contraseña.
