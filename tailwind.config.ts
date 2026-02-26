import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      fontWeight: {
        light: '400',    // Montserrat 300 es demasiado delgada en pantalla
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      fontSize: {
        // Escala ligeramente aumentada para legibilidad
        'xs':   ['0.75rem',  { lineHeight: '1.5' }],   // 12.75px — solo etiquetas/metadatos
        'sm':   ['0.9rem',   { lineHeight: '1.65' }],   // 15.3px — texto secundario
        'base': ['1rem',     { lineHeight: '1.7' }],    // 17px — cuerpo principal
        'lg':   ['1.125rem', { lineHeight: '1.65' }],   // 19px
        'xl':   ['1.25rem',  { lineHeight: '1.5' }],    // 21px
        '2xl':  ['1.5rem',   { lineHeight: '1.4' }],    // 25.5px
        '3xl':  ['1.875rem', { lineHeight: '1.3' }],    // 32px
        '4xl':  ['2.25rem',  { lineHeight: '1.2' }],    // 38px
        '5xl':  ['3rem',     { lineHeight: '1.1' }],    // 51px
        '6xl':  ['3.75rem',  { lineHeight: '1.05' }],   // 64px
        '7xl':  ['4.5rem',   { lineHeight: '1' }],      // 76px
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          light: "hsl(var(--primary-light))",
          dark: "hsl(var(--primary-dark))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          blue: "hsl(var(--accent-blue))",
          pink: "hsl(var(--accent-pink))",
          sand: "hsl(var(--accent-sand))",
          green: "hsl(var(--accent-green))",
        },
        whatsapp: "hsl(var(--whatsapp))",
        success: "hsl(var(--success))",
        warning: "hsl(var(--warning))",
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      backgroundImage: {
        'soft-gradient': 'linear-gradient(135deg, hsl(0 0% 100%) 0%, hsl(270 20% 99%) 100%)',
        'hero-glow': 'radial-gradient(circle at 50% 50%, hsl(var(--accent-blue) / 0.15) 0%, transparent 50%)',
        'gradient-primary': 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary-light)) 100%)',
      },
      boxShadow: {
        'soft': '0 10px 40px -10px hsl(var(--primary) / 0.08)',
        'glow': '0 0 20px hsl(var(--accent-blue) / 0.3)',
        'card': '0 20px 60px -15px hsl(var(--primary) / 0.12)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          from: { opacity: "0", transform: "translateX(-30px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in-up": "fade-in-up 0.8s ease-out forwards",
        "slide-in": "slide-in 0.5s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
