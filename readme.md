# 💰 Ital – Control Inteligente de Finanzas

App móvil moderna para gestión de ingresos y gastos. Diseñada con React Native + Expo + TypeScript. Interfaz clara, validación robusta, tema personalizable.

## 🎯 Qué es Ital

Ital es una herramienta de control financiero personal que te permite:

- 📊 Registrar ingresos y gastos en tiempo real
- 💼 Categorizar transacciones (comida, transporte, sueldo, etc)
- 📈 Visualizar reportes y tendencias
- 🔒 Mantener tus datos privados y seguros
- ⚡ Interfaz rápida y responsiva en Android e iOS

**Estado:** MVP con pantalla de login funcional. Dashboard y reportes en desarrollo.

## 🚀 Inicio Rápido

### Requisitos

- Node.js 18+
- npm o yarn
- Expo CLI: `npm install -g expo-cli`
- iOS: Xcode (macOS) o Android Studio (Windows/Linux)

### Instalación

```bash
# Clonar/entrar al proyecto
cd ital-app

# Instalar dependencias
npm install

# Instalar paquetes nativos de Expo
npx expo install expo-linear-gradient
```

### Ejecutar

```bash
# Dev mode (escanea QR con Expo Go)
npm start

# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

## 📁 Estructura del Proyecto

```
ital-app/
├── src/
│   ├── components/              # Componentes reutilizables
│   │   ├── Button.tsx           # Botón (primary/secondary/danger)
│   │   ├── TextInputField.tsx   # Input de texto
│   │   └── index.ts             # Barril (re-exports)
│   │
│   ├── screens/                 # Pantallas de la app
│   │   ├── LoginScreen.tsx      # Autenticación
│   │   └── index.ts             # Barril
│   │
│   ├── constants/
│   │   └── theme.ts             # Design tokens (colores, tipografía, spacing)
│   │
│   ├── hooks/
│   │   └── useFormValidation.ts # Validación de formularios
│   │
│   ├── types/
│   │   └── index.ts             # Tipos TypeScript
│   │
│   └── index.ts                 # Barril raíz
│
├── App.tsx                      # Punto de entrada
├── index.ts                     # Expo entry point
├── app.json                     # Config Expo
├── tsconfig.json                # Config TypeScript
├── package.json
└── LOGIN_SCREEN.md              # Docs pantalla login
```
