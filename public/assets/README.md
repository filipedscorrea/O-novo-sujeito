# Assets

Todos os 17 arquivos usados diretamente pelo código já estão aqui, exportados
do Figma com o nome exato do handoff (seção 11.2). O código referencia cada
um por caminho absoluto (`/assets/<arquivo>`).

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

## Arquivos presentes mas não referenciados pelo código

Os 12 SVGs de `pilar-*-a/b.svg` e os 2 `nav-toggle-*.svg` também estão aqui
(parte do checklist original do handoff, seção 11.2), mas o código não os
carrega como `<img>`: a Parte 2 do handoff substituiu ambos por SVG/CSS
inline com transform real (`src/components/PilarIcon.tsx` para os pilares,
seção 5.3; hambúrguer de 3 `<span>` em `Nav.tsx`, seção 1.4).

As formas em `PilarIcon.tsx` foram traçadas diretamente das coordenadas
destes `pilar-*.svg`, então batem com o design original mesmo sendo
reimplementadas como markup inline em vez de `<img>`.
