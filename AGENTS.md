# Project Custom Rules & Color System

## Theme Color Palette Mapping
When the user refers to colors by number or name, always use this exact mapping:

- **1 / MAIN COLOR**: `#FFFFFF` (White)
  - Tailwind class: `bg-theme-main` / `text-theme-main` / `border-theme-main`
  - CSS Variable: `--color-main` / `var(--color-main)`

- **2 / SECONDARY COLOR**: `#ECEDEF` (Light Neutral Gray)
  - Tailwind class: `bg-theme-secondary` / `text-theme-secondary` / `border-theme-secondary`
  - CSS Variable: `--color-secondary` / `var(--color-secondary)`

- **3 / THIRD COLOR**: `#121417` (Deep Dark / Charcoal Black)
  - Tailwind class: `bg-theme-third` / `text-theme-third` / `border-theme-third`
  - CSS Variable: `--color-third` / `var(--color-third)`

- **4 / FOURTH COLOR**: `#FE552F` (Vibrant Coral / Orange-Red Accent)
  - Tailwind class: `bg-theme-fourth` / `text-theme-fourth` / `border-theme-fourth`
  - CSS Variable: `--color-fourth` / `var(--color-fourth)`

## Typography System
- **H Tags (`h1`, `h2`, `h3`, etc.)**: Nohemi Bold (`font-['Nohemi'] font-bold` / `font-nohemi`)
- **Subheadings & Labels**: Delight Medium (`font-['Delight'] font-medium` / `font-subheading`)
- **Website Content & Body**: Delight Regular (`font-['Delight'] font-normal` / `font-body`)
