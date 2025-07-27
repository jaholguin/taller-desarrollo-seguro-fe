
# Frontend Seguro - Taller de Desarrollo Seguro

Este proyecto frontend fue desarrollado como parte del módulo **Taller de Desarrollo Seguro de Software**. La aplicación permite a usuarios autenticarse y gestionar notas personales de manera segura, comunicándose con un backend protegido mediante JWT.

## 🎯 Objetivo

Implementar una SPA (Single Page Application) con React y TypeScript, siguiendo buenas prácticas de desarrollo seguro, incluyendo gestión segura de tokens, validación de formularios y control de sesiones.

---

## 🛠️ Tecnologías utilizadas

- **React 19** + **React DOM**
- **TypeScript**
- **Vite** (configuración moderna para desarrollo y build)
- **ESLint** para análisis estático
- **dotenv** para variables de entorno (en entorno de desarrollo)
- Estilos simples con **CSS**

---

## 🔐 Buenas prácticas aplicadas

- Uso de `localStorage` para guardar el JWT con validaciones adecuadas
- Separación de lógica de autenticación y vistas privadas
- Manejo de errores de red y feedback al usuario
- Validación de formularios en el frontend antes de enviar
- Despliegue con build optimizado usando Vite

---

## 📂 Estructura del proyecto

```
src/
├── App.tsx             # Componente principal
├── main.tsx            # Punto de entrada
├── components/         # Componentes reutilizables
├── pages/              # Vistas principales (Login, Register, Notes)
└── services/           # Lógica para llamadas a la API (auth, notes)
```

---

## 🚀 Instalación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/taller-desarrollo-seguro-fe.git
   cd taller-desarrollo-seguro-fe
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Crear archivo `.env` (si se requiere):
   ```
   VITE_API_URL=http://localhost:3000/api
   ```

4. Ejecutar en modo desarrollo:
   ```bash
   npm run dev
   ```

---

## 📷 Funcionalidades

- ✅ Registro de usuario
- ✅ Login con token JWT
- ✅ Visualización y creación de notas personales
- ✅ Eliminación de notas
- ✅ Acceso controlado a rutas privadas

---

## ✅ Comandos útiles

- Ejecutar en modo desarrollo:
  ```bash
  npm run dev
  ```
- Construir para producción:
  ```bash
  npm run build
  ```
- Previsualizar build:
  ```bash
  npm run preview
  ```
- Verificar reglas de estilo:
  ```bash
  npm run lint
  ```

---

## 🔒 Seguridad en el desarrollo

- La aplicación fue evaluada con herramientas como:
  - `npm audit`
  - `snyk` (reporte incluido en el repositorio)
- Se aplicaron los controles sugeridos en el OWASP Top 10 para frontend:
  - A1: Broken Access Control → rutas privadas con validación de token
  - A5: Security Misconfiguration → restricciones en el manejo de tokens y redireccionamiento

---

## 📄 Licencia

Este proyecto fue desarrollado para fines educativos como parte del curso de Especialización en Seguridad de la Información.
