# 🔐 Ital – Pantalla de Inicio de Sesión

Pantalla de login moderna, accesible y bonita para la app de control de gastos e ingresos **Ital**, diseñada con React Native, Expo y TypeScript.

## 🎨 Diseño Visual

### Identidad Ital
- **Paleta:** Emerald verde (`#10b981`) + azul complementario (`#0369a1`) + neutros cálidos
- **Tipografía:** Display decisivo (32px, weight 700), body legible (16px, weight 400)
- **Firma:** Emoji 💰 en círculo verde + gradiente sutil de fondo
- **Filosofía:** Confianza financiera, accesible, sin ruido visual

### Componentes Visuales
```
┌────────────────────────────┐
│       💰                   │
│     Ital                   │
│  Control inteligente       │
├────────────────────────────┤
│ Email                      │
│ ┌──────────────────────┐   │
│ │ usuario@ejemplo.com  │   │
│ └──────────────────────┘   │
│                            │
│ Contraseña                 │
│ ┌──────────────────────┐   │
│ │ ••••••••••••••••     │   │
│ └──────────────────────┘   │
│                            │
│ [  Iniciar Sesión  ]       │
│         o                  │
│ ¿No tienes cuenta?         │
│ [Regístrate aquí]          │
├────────────────────────────┤
│  Tus datos están protegidos│
│   Política de Privacidad   │
└────────────────────────────┘
```

## 📁 Estructura del Proyecto

```
ital-app/
├── src/
│   ├── components/
│   │   ├── Button.tsx              # Botón reutilizable (primary/secondary/danger)
│   │   ├── TextInputField.tsx       # Campo de entrada reutilizable
│   │   └── index.ts                # Barril de componentes
│   ├── screens/
│   │   ├── LoginScreen.tsx          # Pantalla principal de login
│   │   └── index.ts                # Barril de screens
│   ├── constants/
│   │   └── theme.ts                # Design tokens (colores, tipografía, spacing)
│   ├── hooks/
│   │   └── useFormValidation.ts     # Hook para validación de formularios
│   ├── types/
│   │   └── index.ts                # Tipos base (AuthCredentials, etc)
│   └── index.ts                    # Barril raíz
├── App.tsx                          # Punto de entrada (integración LoginScreen)
├── app.json                         # Config Expo
├── package.json
└── tsconfig.json
```

## 🚀 Instalación y Uso

### 1. Instalar dependencias
```bash
cd ital-app
npm install
npx expo install expo-linear-gradient
```

### 2. Ejecutar en desarrollo

**iOS:**
```bash
npm run ios
```

**Android:**
```bash
npm run android
```

**Web:**
```bash
npm run web
```

**Dev Client:**
```bash
npm start
```

## 📝 API de Componentes

### LoginScreen
```typescript
import { LoginScreen } from './src/screens/LoginScreen';

<LoginScreen 
  onLoginSuccess={(credentials) => {
    console.log(credentials.email); // "usuario@ejemplo.com"
    console.log(credentials.password); // "contraseña"
  }}
/>
```

**Props:**
- `onLoginSuccess?` — Callback cuando el login es exitoso. Recibe `{ email, password }`

**Validaciones automáticas:**
- Email: obligatorio, formato válido
- Contraseña: obligatoria, mínimo 6 caracteres

### Button
```typescript
import { Button } from './src/components/Button';

<Button
  label="Presionar"
  onPress={() => console.log('Pressed')}
  variant="primary"        // 'primary' | 'secondary' | 'danger'
  size="large"             // 'small' | 'medium' | 'large'
  loading={false}
  disabled={false}
/>
```

### TextInputField
```typescript
import { TextInputField } from './src/components/TextInputField';

<TextInputField
  label="Email"
  placeholder="usuario@ejemplo.com"
  value={email}
  onChangeText={setEmail}
  keyboardType="email-address"
/>
```

## 🎯 Validación de Formularios

Hook `useFormValidation` con validadores predefinidos:

```typescript
import { useFormValidation, validators } from './src/hooks/useFormValidation';

const { errors, validateField } = useFormValidation();

const valid = validateField('email', email, [
  validators.required('Email es obligatorio'),
  validators.email('Email inválido'),
]);
```

**Validadores disponibles:**
- `required(message?)` — Campo obligatorio
- `email(message?)` — Formato email válido
- `minLength(n, message?)` — Mínimo N caracteres
- `maxLength(n, message?)` — Máximo N caracteres
- `password(message?)` — Contraseña fuerte (6+ chars, mayúscula, minúscula)

## 🎨 Customización de Tema

Editar `src/constants/theme.ts`:

```typescript
export const COLORS = {
  primary: '#10b981',      // Color principal (verde esmeralda)
  primaryDark: '#059669',  // Hover/pressed
  primaryLight: '#d1fae5', // Background
  // ... más colores
};

export const TYPOGRAPHY = {
  display: { fontSize: 32, fontWeight: '700', lineHeight: 40 },
  // ... más estilos de texto
};

export const SPACING = {
  xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48,
};
```

Luego usar en componentes:
```typescript
import { COLORS, SPACING, TYPOGRAPHY } from '../constants/theme';

const style = {
  color: COLORS.primary,
  marginBottom: SPACING.lg,
  fontSize: TYPOGRAPHY.body.fontSize,
};
```

## 🔒 Seguridad

**Actualmente:**
- Login simulado (OK para demostración)
- Validación en cliente

**Para producción, agregar:**
1. Backend OAuth/JWT
2. Almacenamiento seguro de tokens (SecureStore de Expo)
3. Validación en servidor
4. HTTPS + certificado pinning

## ✅ Checklist de Mejoras Futuras

- [ ] Integrar con backend real (API REST/GraphQL)
- [ ] Guardar token con `@react-native-async-storage/async-storage`
- [ ] Usar `expo-secure-store` para tokens sensibles
- [ ] Pantalla de registro (SignupScreen)
- [ ] Recuperación de contraseña
- [ ] Autenticación social (Google, Apple)
- [ ] Animations con `react-native-reanimated`
- [ ] Tests con Jest/React Native Testing Library

## 📦 Dependencias

```json
{
  "expo": "~54.0.36",
  "react": "19.1.0",
  "react-native": "0.81.5",
  "expo-linear-gradient": "^14.0.0",
  "expo-status-bar": "~3.0.9"
}
```

## 📄 Licencia

MIT

---

**Hecho con 💚 para Ital App**
