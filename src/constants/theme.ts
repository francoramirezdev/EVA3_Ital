import { Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

export const isWeb = screenWidth > 800;

// Type roles, mapped to the loaded IBM Plex superfamily. Serif carries
// editorial headings, Sans carries UI chrome, Mono carries every money
// figure and timestamp — the "ledger" identity of the app.
export const FONT_FAMILY = {
  serif: 'IBMPlexSerif_600SemiBold',
  serifBold: 'IBMPlexSerif_700Bold',
  serifItalic: 'IBMPlexSerif_600SemiBold_Italic',
  sans: 'IBMPlexSans_400Regular',
  sansMedium: 'IBMPlexSans_500Medium',
  sansSemiBold: 'IBMPlexSans_600SemiBold',
  mono: 'IBMPlexMono_500Medium',
  monoSemiBold: 'IBMPlexMono_600SemiBold',
  monoBold: 'IBMPlexMono_700Bold',
};

// Names required by useFonts() in App.tsx — keep in sync with FONT_FAMILY.
export const FONTS_TO_LOAD = {
  IBMPlexSerif_600SemiBold: require('@expo-google-fonts/ibm-plex-serif').IBMPlexSerif_600SemiBold,
  IBMPlexSerif_700Bold: require('@expo-google-fonts/ibm-plex-serif').IBMPlexSerif_700Bold,
  IBMPlexSerif_600SemiBold_Italic: require('@expo-google-fonts/ibm-plex-serif').IBMPlexSerif_600SemiBold_Italic,
  IBMPlexSans_400Regular: require('@expo-google-fonts/ibm-plex-sans').IBMPlexSans_400Regular,
  IBMPlexSans_500Medium: require('@expo-google-fonts/ibm-plex-sans').IBMPlexSans_500Medium,
  IBMPlexSans_600SemiBold: require('@expo-google-fonts/ibm-plex-sans').IBMPlexSans_600SemiBold,
  IBMPlexMono_500Medium: require('@expo-google-fonts/ibm-plex-mono').IBMPlexMono_500Medium,
  IBMPlexMono_600SemiBold: require('@expo-google-fonts/ibm-plex-mono').IBMPlexMono_600SemiBold,
  IBMPlexMono_700Bold: require('@expo-google-fonts/ibm-plex-mono').IBMPlexMono_700Bold,
};

// Design tokens — "Field Ledger": a passbook/cash-ledger palette instead of
// the generic indigo fintech look. Six named identity colors; every tint is
// derived from them.
export interface ColorScheme {
  ink: string;
  bg: string;
  surface: string;
  surfaceAlt: string;
  border: string;
  textMuted: string;
  pine: string;
  pineOn: string;
  pineTint: string;
  rust: string;
  rustOn: string;
  rustTint: string;
  brass: string;
  brassOn: string;
  brassTint: string;
  white: string;
  black: string;
  // Fixed dark ink panel — the balance stub and login hero always render as
  // a stamped ledger card, independent of the light/dark toggle.
  stamp: string;
  stampText: string;
}

export const getColors = (mode: 'light' | 'dark' = 'light'): ColorScheme => {
  if (mode === 'dark') {
    return {
      ink: '#EDEFE7', // primary text
      bg: '#12201A', // screen background
      surface: '#1B2A22', // cards, sheets
      surfaceAlt: '#22332A', // inputs, recessed fields
      border: '#2A3B31',
      textMuted: '#92A69A',

      pine: '#4FAE86', // brand / income
      pineOn: '#12201A', // text placed on a filled pine surface
      pineTint: '#1E362B',

      rust: '#E2764F', // expense / danger
      rustOn: '#12201A',
      rustTint: '#3A2419',

      brass: '#E0B563', // accent / highlight
      brassOn: '#12201A',
      brassTint: '#362C18',

      white: '#ffffff',
      black: '#000000',
      stamp: '#16302A',
      stampText: '#FBFAF6',
    };
  }
  return {
    ink: '#16302A', // primary text
    bg: '#E9EEE6', // screen background — sage paper, not cream
    surface: '#FBFAF6', // cards, sheets
    surfaceAlt: '#F1EFE4', // inputs, recessed fields
    border: '#D8DCCB',
    textMuted: '#5B6B60',

    pine: '#2F7D5E', // brand / income
    pineOn: '#FFFFFF',
    pineTint: '#DCEAE1',

    rust: '#B5502E', // expense / danger
    rustOn: '#FFFFFF',
    rustTint: '#F3DFD3',

    brass: '#C9973E', // accent / highlight
    brassOn: '#FFFFFF',
    brassTint: '#F3E6C8',

    white: '#ffffff',
    black: '#000000',
    stamp: '#16302A',
    stampText: '#FBFAF6',
  };
};

export const COLORS = getColors('light');

export const TYPOGRAPHY = {
  display: {
    fontFamily: FONT_FAMILY.serifBold,
    fontSize: isWeb ? 30 : 34,
    lineHeight: isWeb ? 36 : 40,
  },
  heading: {
    fontFamily: FONT_FAMILY.serif,
    fontSize: isWeb ? 20 : 24,
    lineHeight: isWeb ? 26 : 30,
  },
  subheading: {
    fontFamily: FONT_FAMILY.sansSemiBold,
    fontSize: isWeb ? 16 : 18,
    lineHeight: isWeb ? 22 : 24,
  },
  body: {
    fontFamily: FONT_FAMILY.sans,
    fontSize: isWeb ? 14 : 16,
    lineHeight: isWeb ? 20 : 24,
  },
  caption: {
    fontFamily: FONT_FAMILY.sans,
    fontSize: isWeb ? 12 : 14,
    lineHeight: isWeb ? 16 : 20,
  },
  // Tracked small-caps label — section eyebrows, badges, stub metadata.
  eyebrow: {
    fontFamily: FONT_FAMILY.sansSemiBold,
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 1.6,
    textTransform: 'uppercase' as const,
  },
  // Every money figure and timestamp in the app uses this — tabular mono
  // reads like a typed ledger entry instead of prose.
  figure: {
    fontFamily: FONT_FAMILY.monoSemiBold,
    fontSize: isWeb ? 15 : 16,
    lineHeight: isWeb ? 20 : 22,
  },
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: isWeb ? 16 : 24,
  xl: isWeb ? 24 : 32,
  xxl: isWeb ? 32 : 48,
};

export const RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
};
