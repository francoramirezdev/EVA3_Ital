# 🔐 Autenticación en Ital

Guía de integración del flujo de login, autenticación con usuario de prueba, y navegación a pantalla de inicio.

## 🧪 Usuario de Prueba

Para probar la app sin backend real:

```
Email:     test@test.com
Password:  123456
```

Estos datos se validan en el hook `useAuth` en `src/hooks/useAuth.ts`.

## 🔄 Flujo de Autenticación

```
App.tsx (estado auth)
    ↓
useAuth() hook
    ├─ login(email, password) → valida contra TEST_USER
    ├─ logout() → limpia estado
    └─ isAuthenticated, user, loading
    ↓
Renderiza LoginScreen ← (si !isAuthenticated)
    ↓
Usuario ingresa credenciales
    ↓
onLoginSuccess(credentials) → App.tsx
    ↓
App.tsx llama hook.login(email, password)
    ↓
Validación → success/error
    ├─ success → App.tsx renderiza HomeScreen
    └─ error → Muestra error en LoginScreen
```

## 📂 Archivos Relevantes

| Archivo | Rol |
|---|---|
| `App.tsx` | Orquesta login/home + estado auth global |
| `src/hooks/useAuth.ts` | Hook con lógica login/logout + validación TEST_USER |
| `src/screens/LoginScreen.tsx` | Form login, recibe error/loading de App |
| `src/screens/HomeScreen.tsx` | Dashboard post-login con botón logout |
| `src/types/index.ts` | Tipos `AuthCredentials`, `User`, etc |

## 🔧 Cómo Funciona

### 1. App.tsx (Punto de Entrada)

```typescript
export default function App() {
  const { isAuthenticated, user, loading, login, logout } = useAuth();
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleLoginSubmit = async (credentials: AuthCredentials) => {
    setLoginError(null);
    const success = await login(credentials.email, credentials.password);
    if (!success) {
      setLoginError('Email o contraseña incorrectos');
    }
  };

  // Renderiza HomeScreen si autenticado, sino LoginScreen
  if (isAuthenticated && user) {
    return <HomeScreen user={user} onLogout={logout} />;
  }

  return (
    <LoginScreen
      onLoginSuccess={handleLoginSubmit}
      loading={loading}
      error={loginError}
    />
  );
}
```

### 2. useAuth Hook

```typescript
export const useAuth = () => {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: false,
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    setState(prev => ({ ...prev, loading: true }));
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simular delay

    // Validar contra TEST_USER
    if (email === TEST_USER.email && password === TEST_USER.password) {
      const user: User = {
        id: '1',
        email: TEST_USER.email,
        name: 'Usuario Prueba',
      };
      setState({ isAuthenticated: true, user, loading: false });
      return true;
    }

    setState(prev => ({ ...prev, loading: false }));
    return false;
  };

  const logout = () => {
    setState({ isAuthenticated: false, user: null, loading: false });
  };

  return { ...state, login, logout };
};
```

### 3. LoginScreen

```typescript
export const LoginScreen: React.FC<LoginScreenProps> = ({
  onLoginSuccess,
  loading: externalLoading = false,
  error: externalError = null,
}) => {
  // ... form state ...

  const handleLogin = async () => {
    if (!validateForm()) return;
    const credentials: AuthCredentials = {
      email: formState.email,
      password: formState.password,
    };
    onLoginSuccess?.(credentials); // Envía a App.tsx
  };

  const displayError = externalError || formState.error;
  const isLoading = externalLoading || formState.loading;

  // Renderiza form con inputs, muestra error/loading externo
  // ...
};
```

### 4. HomeScreen

```typescript
export const HomeScreen: React.FC<HomeScreenProps> = ({ user, onLogout }) => {
  return (
    <View>
      <Text>¡Bienvenido, {user?.name}!</Text>
      {/* Stats, transacciones, acciones */}
      <Button label="Cerrar Sesión" onPress={onLogout} />
    </View>
  );
};
```

## 🧪 Pruebas Manuales

1. **Login correcto:**
   - Email: `test@test.com`
   - Password: `123456`
   - ✅ Debería mostrar HomeScreen

2. **Email incorrecto:**
   - Email: `wrong@test.com`
   - Password: `123456`
   - ❌ Muestra "Email o contraseña incorrectos"

3. **Contraseña incorrecta:**
   - Email: `test@test.com`
   - Password: `wrong`
   - ❌ Muestra "Email o contraseña incorrectos"

4. **Logout:**
   - Click en "Cerrar Sesión" en HomeScreen
   - ✅ Vuelve a LoginScreen

## 🔒 Para Producción

Cambiar validación en `useAuth.ts`:

```typescript
const login = async (email: string, password: string): Promise<boolean> => {
  setState(prev => ({ ...prev, loading: true }));

  try {
    // Llamar a backend real
    const response = await fetch('https://api.ejemplo.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      setState(prev => ({ ...prev, loading: false }));
      return false;
    }

    const { token, user } = await response.json();

    // Guardar token en SecureStore
    await SecureStore.setItemAsync('authToken', token);

    setState({
      isAuthenticated: true,
      user,
      loading: false,
    });
    return true;
  } catch (error) {
    setState(prev => ({ ...prev, loading: false }));
    return false;
  }
};
```

## 📦 Dependencias Necesarias

Actuales:
- `react-native`
- `expo`
- `react`

Para producción (agregar):
- `expo-secure-store` – Guardar tokens seguros
- `@react-native-async-storage/async-storage` – Persistencia de sesión
- `axios` o `fetch` – Llamadas HTTP

```bash
npx expo install expo-secure-store @react-native-async-storage/async-storage
```

## 🐛 Troubleshooting

**Login se queda en loading:**
- Verificar que `useAuth.login()` resuelve después del delay
- Verificar que App.tsx recibe `success` boolean de `login()`

**Error persiste sin desaparecer:**
- En LoginScreen, el error se limpia cuando cambias input (onChangeText)
- En App.tsx, el error se limpia antes de llamar login

**HomeScreen no aparece:**
- Verificar que `isAuthenticated === true` y `user !== null`
- Revisar console.log en App.tsx

---

**Ready to integrate with your backend API!**
