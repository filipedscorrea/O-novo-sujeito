# Assets

Coloque aqui os arquivos exportados do Figma, com o nome exato listado abaixo
(minúsculo, hífen, sem acento, igual ao handoff seção 11.2). O código referencia
cada um por caminho absoluto (`/assets/<arquivo>`), então basta soltar o
arquivo aqui, sem tocar em código.

Dos 28 assets do checklist original do handoff, 11 (os 12 SVGs de pilar-* e os
2 nav-toggle-*.svg) não são necessários nesta implementação: a Parte 2 do
handoff substituiu ambos por SVG/CSS inline com transform real (pilar-icon,
seção 5.3; hamburger de 3 linhas, seção 1.4), então não há arquivo para
colocar para eles.

| Arquivo | Dimensões | Seção |
| --- | --- | --- |
| `hero-lockup.png` | 440 × 288 | Hero |
| `sobre-lockup.png` | 440 × 332 | Sobre |
| `nav-brand.png` | 192 × 64 | Nav |
| `brand-logo.png` | 249 × 83 | Footer |
| `lourenco-montage-default.png` | 404 × 440 | Prática |
| `lourenco-montage-quem.png` | 404 × 440 | Prática |
| `lourenco-montage-como.png` | 404 × 440 | Prática |
| `lourenco-montage-sobre-o-que.png` | 404 × 440 | Prática |
| `icon-instagram.svg` | 44 × 44 | Redes |
| `icon-tiktok.svg` | 44 × 44 | Redes |
| `icon-youtube.svg` | 44 × 44 | Redes |
| `post-1.png` | 176 × 220 | Redes |
| `post-2.png` | 176 × 220 | Redes |
| `post-3.png` | 176 × 220 | Redes |
| `favicon-180x180.png` | 180 × 180 | Metadados |
| `favicon-192x192.png` | 192 × 192 | Metadados |
| `og-image.png` | 8000 × 4209 | Metadados |

Até esses arquivos serem adicionados, o layout continua funcional: os
`<img>` correspondentes aparecem como imagem quebrada (broken image) no
lugar certo, sem quebrar o restante da página.
