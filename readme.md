# 💰 Ital – Control Inteligente de Finanzas

[![Expo](https://img.shields.io/badge/Expo-v57-black?style=flat&logo=expo)](https://expo.dev/)
[![React Native](https://img.shields.io/badge/React%20Native-0.86-blue?style=flat&logo=react)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)

Aplicación móvil y web moderna para la gestión de finanzas personales. Desarrollada con React Native, Expo y TypeScript, con soporte para modo claro/oscuro, persistencia local y diseño totalmente responsivo.

---

## ✨ Características Principales

- **📊 Dashboard Financiero**: Visualización de saldo total, ingresos y gastos en tiempo real formateados en CLP.
- **💸 Gestión de Transacciones**: Registro interactivo de ingresos y gastos con categorización y agrupación por meses.
- **🌓 Tema Dinámico**: Soporte integrado para modo Claro y Oscuro con paleta de diseño personalizada.
- **📱 Multiplataforma & Responsiva**: Experiencia fluida en dispositivos móviles (iOS, Android) y navegadores web.
- **🔒 Autenticación & Persistencia**: Validación de credenciales en tiempo real y almacenamiento de sesión y transacciones con `AsyncStorage`.
- **🎨 Tipografía Editorial**: Integración con la familia tipográfica IBM Plex (Sans, Mono y Serif).

---

## 🚀 Inicio Rápido

### Requisitos Previos

- **Node.js**: v18 o superior
- **Gestor de paquetes**: npm o yarn
- **Expo Go** (opcional, para pruebas en dispositivo físico)

### Instalación

```bash
# Entrar al directorio del proyecto
cd ital-app

# Instalar dependencias
npm install
```

### Ejecución

```bash
# Iniciar servidor de desarrollo (escanea el código QR con Expo Go)
npm start

# O ejecutar directamente por plataforma:
npm run ios        # Simulador iOS (requiere macOS y Xcode)
npm run android    # Emulador Android (requiere Android Studio)
npm run web        # Versión Web en el navegador
```

---

## 🧪 Credenciales de Prueba

Para acceder al dashboard, utiliza el usuario demo preconfigurado:

| Campo          | Valor           |
| :------------- | :-------------- |
| **Email**      | `test@test.com` |
| **Contraseña** | `123456`        |

---

## 📁 Estructura del Proyecto

```text
ital-app/
├── src/
│   ├── components/      # Componentes UI reutilizables (Botones, Inputs, Modales)
│   ├── constants/       # Sistema de diseño, tokens y temas (theme.ts)
│   ├── hooks/           # Custom hooks (useAuth, useTransactions, useTheme, useResponsive)
│   ├── screens/         # Pantallas principales (LoginScreen, HomeScreen)
│   ├── types/           # Definiciones de tipos TypeScript
│   └── utils/           # Utilidades de formato (moneda CLP, fechas)
├── App.tsx              # Orquestador y proveedor de temas
├── app.json             # Configuración de Expo
└── package.json         # Dependencias y scripts
```

---

## 🛠 Stack Tecnológico

| Herramienta        | Versión / Detalle                              |
| :----------------- | :--------------------------------------------- |
| **Framework**      | Expo SDK 57 / React Native 0.86                |
| **UI Library**     | React 19.2                                     |
| **Lenguaje**       | TypeScript 5.9                                 |
| **Almacenamiento** | `@react-native-async-storage/async-storage`    |
| **Fuentes**        | IBM Plex Sans, Mono, Serif (`expo-font`)       |
| **Estilos**        | React Native StyleSheet + Tokens centralizados |

---

## Documentación Adicional

Para detalles técnicos y guías de arquitectura avanzadas, consulta:

- 📖 [Guía de Autenticación](./AUTH_GUIDE.md) – Flujo de sesión y recomendaciones de backend.
- 📱 [Documentación de Login](./LOGIN_SCREEN.md) – Componentes y validaciones del login.
- 💻 [Diseño Responsivo](./RESPONSIVE_DESIGN.md) – Breakpoints y adaptación para Web y Tablet.

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.
