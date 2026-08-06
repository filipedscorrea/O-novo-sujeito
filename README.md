# O Novo Sujeito — Landing Page

Landing page mobile de "O Novo Sujeito", para Lourenço Serpa (psicólogo clínico,
abordagem histórico-cultural). Vite + React + TypeScript, página única, sem
roteamento. Direção visual: constructivismo soviético, paleta Stepanova.

Implementada a partir de `handoff-consolidado.md` (fonte de verdade de
estrutura/comportamento) e `design-system.md` (referência rápida de tokens),
ambos na raiz do projeto.

Viewport de referência: **mobile-only, W440 × H956** (iPhone Pro Max 17). Sem
breakpoints de tablet/desktop nesta fase.

## Rodando localmente

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`. Para gerar o build de produção:

```bash
npm run build
npm run preview   # serve o build localmente para conferência
```

## Onde colocar os assets

Os arquivos exportados do Figma (fotos, lockups, ícones sociais, posts do
carrossel, favicons, imagem de OG) vão em `public/assets/`, com o nome exato
listado em `public/assets/README.md`. O código já referencia cada um por
caminho absoluto (`/assets/<arquivo>`) — basta soltar o arquivo lá, sem
mexer em código.

Sem esses arquivos, o site continua funcional: os `<img>` correspondentes
aparecem como imagem quebrada no lugar certo, sem quebrar o layout.

Os 12 ícones de pilar (`pilar-*-a/b.svg`) e os 2 ícones de nav-toggle do
checklist original do handoff **não são usados** nesta implementação — a
Parte 2 do handoff os substituiu por SVG/CSS inline com transform real
(ver `src/components/PilarIcon.tsx` e o hambúrguer de 3 linhas em `Nav.tsx`).
As formas dos 6 ícones de pilar em `PilarIcon.tsx` são uma aproximação
geométrica fiel à descrição do handoff (forma, cor, transform), já que os
vetores originais do Figma não fazem parte deste repositório — ajuste os
`path`/`polygon` ali se quiser bater 1:1 com o arquivo de design.

## Fontes

- **Oswald** e **PT Sans**: carregadas via Google Fonts CDN em `index.html`, nada a configurar.
- **Rodchenko** (Bold, Normal): fonte licenciada via Adobe Fonts (Website
  Publishing), não deve ser autohospedada (ver handoff, Parte 1, seção 13.3).
  Para ativar:
  1. Crie um "Web Project" em [fonts.adobe.com](https://fonts.adobe.com) para
     o domínio de produção, adicionando Rodchenko Bold e Rodchenko Normal.
  2. Copie a tag `<link>` gerada pela Adobe e cole em `index.html` no lugar
     do comentário `<!-- <link rel="stylesheet" href="https://use.typekit.net/YOUR_KIT_ID.css" /> -->`.

  Até isso ser configurado, o texto em Rodchenko cai no fallback definido em
  `src/styles/tokens.css` (`--font-rodchenko`), sem quebrar o layout.

## Formulário de contato (seção Contato)

Envio via [Formspree](https://formspree.io/). Para ativar:

1. Crie um formulário no Formspree apontando para `lourencoserpa@gmail.com`.
2. Troque `FORMSPREE_ENDPOINT` em `src/components/Contato.tsx` pelo endpoint
   real (`https://formspree.io/f/SEU_ID`).

Para usar [EmailJS](https://www.emailjs.com/) no lugar, troque o `fetch` em
`handleSubmit` (mesmo arquivo) pela chamada do SDK do EmailJS — o resto do
componente (campos, validação HTML5 nativa via `required`, estado de
sucesso/erro, mensagem inline) não precisa mudar.

Comportamento: nome e e-mail obrigatórios, motivo e telefone opcionais, sem
placeholder nos campos. Envio bem-sucedido substitui o texto introdutório da
seção por uma confirmação inline, sem redirecionar para outra página.

## Estrutura

```
src/
  components/     # um componente por seção + peças compartilhadas (Kicker, SecondaryLink, PrimaryButton, icons)
  hooks/
    useScrollReveal.tsx   # IntersectionObserver único da página (ver handoff, Parte 2, 12.2)
  styles/
    tokens.css    # cores, tipografia, espaçamento (a partir de design-system.md)
    global.css    # reset + keyframes do sistema de fade-in
public/
  assets/         # arquivos exportados do Figma (ver README ali dentro)
```

## Decisões registradas durante a implementação

- **Pilar-icon**: seções 4.3 (Parte 1) e 5.3 (Parte 2) do handoff. Formas
  construídas em SVG inline, aproximação geométrica (ver nota acima).
- **Ângulo do hexágono de autonomia (30°)**: decisão de implementação já
  sinalizada como não confirmada contra o Figma original (handoff, Parte 2,
  seção 13). Ajustável em `PilarIcon.tsx` sem tocar em lógica.
- **Flash residual no `pratica-montage`**: o handoff (Parte 2, seção 7.4)
  recomendava resolver isso com binding declarativo padrão do React
  (`<img src={variant}>`, recalculado a cada render) em vez da solução
  imperativa usada no protótipo original — é exatamente o que
  `src/components/Pratica.tsx` faz.
- **Links sem destino na v1** (hero/sobre/abordagem "saiba mais", footer
  "Termos" e "Política de Privacidade"): `href=""` conforme especificado,
  com `preventDefault` no clique para não recarregar a página nem simular
  uma página que ainda não existe.
