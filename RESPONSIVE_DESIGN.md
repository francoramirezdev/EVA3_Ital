# 🖥️ Mejoras Web Responsivas en Ital

Guía de ajustes aplicados a la interfaz para web, tablets y dispositivos móviles.

## 📏 Breakpoints y Responsive Design

### Puntos de Quiebre (Breakpoints)
```
Mobile:   0px    - 767px   (default)
Tablet:   768px  - 1023px
Desktop:  1024px +
```

### Detección en Código
```typescript
import { useResponsive } from './hooks/useResponsive';

const { isWeb, isTablet, isDesktop, width, height } = useResponsive();
```

## 🎨 Cambios Visuales por Pantalla

### Tipografía Adaptativa
| Elemento | Mobile | Web |
|---|---|---|
| Display | 32px | 28px |
| Heading | 24px | 20px |
| Subheading | 18px | 16px |
| Body | 16px | 14px |
| Caption | 14px | 12px |

### Espaciado Adaptativo
| Componente | Mobile | Web |
|---|---|---|
| lg (Large) | 24px | 16px |
| xl (XL) | 32px | 24px |
| xxl (2XL) | 48px | 32px |

## 📱 LoginScreen - Mejoras Web

### Cambios
1. **En web:** Se centra horizontalmente con ScrollView
2. **Contenedor max-width:** 500px en desktop
3. **Inputs:** Tamaño proporcional (padding reducido)
4. **Botones:** 48px min-height (mobile: 52px)
5. **Logo:** 56px (web: desde 64px)

### Estructura Web
```
┌─────────────────────────────────────────┐
│   (Centered en pantalla)                │
│  ┌───────────────────────────────────┐  │
│  │  💰                               │  │
│  │  Ital                             │  │
│  │  Control inteligente...           │  │
│  │                                   │  │
│  │  Email                            │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │ usuario@ejemplo.com         │  │  │
│  │  └─────────────────────────────┘  │  │
│  │                                   │  │
│  │  Contraseña                       │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │ ••••••••••••••••            │  │  │
│  │  └─────────────────────────────┘  │  │
│  │                                   │  │
│  │  [Iniciar Sesión]                 │  │
│  │          o                         │  │
│  │  ¿No tienes cuenta?               │  │
│  │  [Regístrate aquí]                │  │
│  │                                   │  │
│  │  Tus datos están protegidos       │  │
│  │  Política de Privacidad           │  │
│  └───────────────────────────────────┘  │
│                                          │
└─────────────────────────────────────────┘
```

## 🏠 HomeScreen - Mejoras Web

### Cambios
1. **Contenedor:** max-width 650px, centrado
2. **Stats cards:** Proporcionales al contenedor
3. **Balance card:** Ancho completo, proporcional
4. **Transacciones:** Stack vertical, max-width respetada
5. **Botones:** Tamaño reducido en web (40px vs 52px)

### Estructura Web
```
┌─────────────────────────────────────────┐
│   (Centered en pantalla)                │
│  ┌───────────────────────────────────┐  │
│  │ ¡Bienvenido, Usuario      👤     │  │
│  │                                   │  │
│  │  ┌──────────┐  ┌──────────┐      │  │
│  │  │📈 $2,450 │  │📉 $890   │      │  │
│  │  │Ingresos  │  │Gastos    │      │  │
│  │  └──────────┘  └──────────┘      │  │
│  │                                   │  │
│  │  ┌───────────────────────────┐   │  │
│  │  │ Saldo Disponible          │   │  │
│  │  │ $1,560                    │   │  │
│  │  │ Actualizado hoy           │   │  │
│  │  └───────────────────────────┘   │  │
│  │                                   │  │
│  │  Transacciones Recientes          │  │
│  │  ┌───────────────────────────┐   │  │
│  │  │🍔 Almuerzo    Comida  -25│   │  │
│  │  │💼 Salario     Ingresos+25│   │  │
│  │  │🚕 Uber      Transporte -12│  │  │
│  │  │🎬 Netflix  Entretenim  -15│  │  │
│  │  └───────────────────────────┘   │  │
│  │                                   │  │
│  │  [➕ Nuevo Gasto]                 │  │
│  │  [➕ Nuevo Ingreso]               │  │
│  │  [Cerrar Sesión]                  │  │
│  └───────────────────────────────────┘  │
│                                          │
└─────────────────────────────────────────┘
```

## 🔘 Button Component - Mejoras Web

### Tamaños Adaptados
```typescript
// smallSize
paddingVertical: 8px
paddingHorizontal: 16px

// mediumSize
paddingVertical: 10px    (antes: 16px)
paddingHorizontal: 24px
minHeight: 40px          (antes: no definido)

// largeSize
paddingVertical: 10px    (antes: 24px)
paddingHorizontal: 32px
minHeight: 44px          (antes: 52px)
```

## 📊 TextInputField - Sin cambios

Usa valores de theme.ts que ya son adaptativos.

## 🎯 Hook useResponsive

```typescript
export const useResponsive = () => {
  const [dimensions, setDimensions] = useState({
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions({
        width: window.width,
        height: window.height,
      });
    });
    return () => subscription?.remove();
  }, []);

  return {
    isWeb: dimensions.width > 800,
    isTablet: dimensions.width >= 768 && dimensions.width < 1024,
    isDesktop: dimensions.width >= 1024,
    width: dimensions.width,
    height: dimensions.height,
  };
};
```

## 🧪 Probar Responsividad

### Desktop
```bash
npm run web
# Abre navegador a http://localhost:19006
# F12 → Toggle Device Toolbar (Ctrl+Shift+M)
# Probar widths: 1440px, 1024px, 800px
```

### Mobile/Tablet
```bash
npm run android    # o npm run ios
# Rotar pantalla para probar portrait/landscape
```

### Breakpoints Reales a Probar
- 375px  (iPhone 12 Mini)
- 414px  (iPhone 12 Pro Max)
- 768px  (iPad, Tablet)
- 1024px (iPad Pro, Desktop)
- 1440px (Desktop Full HD)

## 📝 Constants Adaptadas

Archivo: `src/constants/theme.ts`

```typescript
export const BREAKPOINTS = {
  mobile: 0,
  tablet: 768,
  desktop: 1024,
  wide: 1440,
};

export const isWeb = screenWidth > 800;
export const isTablet = screenWidth >= 768 && screenWidth < 1024;
export const isDesktop = screenWidth >= 1024;

// Typography adaptativa
export const TYPOGRAPHY = {
  display: {
    fontSize: isWeb ? 28 : 32,
    fontWeight: '700' as const,
    lineHeight: isWeb ? 36 : 40,
  },
  // ... más tipos
};

// Spacing adaptativo
export const SPACING = {
  lg: isWeb ? 16 : 24,
  xl: isWeb ? 24 : 32,
  xxl: isWeb ? 32 : 48,
};

// Max-width containers
export const getContainerMaxWidth = () => {
  if (isDesktop) return 600;
  if (isTablet) return 500;
  return 'auto';
};
```

## 🔧 Cómo Agregar Responsive a Nuevo Componente

1. Importar `useResponsive`:
```typescript
import { useResponsive } from '../hooks/useResponsive';
```

2. Usar en componente:
```typescript
const MyComponent = () => {
  const { isWeb, width } = useResponsive();

  return (
    <View style={isWeb && styles.webLayout}>
      {/* Contenido */}
    </View>
  );
};
```

3. Agregar estilos web:
```typescript
const styles = StyleSheet.create({
  webLayout: {
    maxWidth: 600,
    alignSelf: 'center',
    width: '100%',
  },
});
```

## 🎬 Performance

- No hay re-renders innecesarios (Dimensions listener cleanup)
- Constants estáticas en theme.ts (no se recalculan)
- Mobile-first (menos overhead en dispositivos móviles)

## ✅ Testing

```bash
# TypeScript
npx tsc --noEmit

# Dev
npm start
npm run web    # Browser
npm run ios    # Simulator
npm run android # Emulator
```

---

**La app ahora es totalmente responsive: 📱 móvil, 📱 tablet, 🖥️ desktop.**
