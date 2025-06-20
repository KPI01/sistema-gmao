# Sistema GMAO

## Descripción

Este proyecto es un sistema GMAO (Gestión de Mantenimiento Asistido por Ordenador) desarrollado para facilitar la gestión, planificación y control del mantenimiento en empresas o fábricas de cualquier sector. El objetivo principal es ofrecer una solución flexible y escalable que pueda ser implementada en cualquier organización que requiera optimizar sus procesos de mantenimiento.

## Objetivo Principal

Desarrollar un sistema GMAO flexible para gestionar órdenes de trabajo, activos y mantenimientos, adaptable a cualquier empresa.

## Tecnologías Utilizadas

- **Backend:** Laravel (PHP)
- **Frontend:** React + TypeScript (con Inertia.js)
- **Autenticación:** Laravel Sanctum
- **Estilos:** Tailwind CSS
- **Gestión de rutas JS:** Ziggy
- **Testing:** PHPUnit
- **Otros:** Vite, PostCSS

## Instalación

1. Clona el repositorio:

    ```sh
    git clone https://github.com/tu-usuario/sistema-gmao.git
    cd sistema-gmao
    ```

2. Instala las dependencias de PHP y JavaScript:

    ```sh
    composer install
    npm install
    ```

3. Copia el archivo de entorno y configura tus variables:

    ```sh
    cp .env.example .env
    ```

4. Genera la clave de la aplicación:

    ```sh
    php artisan key:generate
    ```

5. Ejecuta las migraciones:

    ```sh
    php artisan migrate
    ```

6. Inicia el servidor de desarrollo:

    ```sh
    php artisan serve
    npm run dev
    ```
