Handoff para Desenvolvedor — Versão Consolidada

Table of Contents

# HANDOFF PARA DESENVOLVEDOR — Versão Consolidada

## O Novo Sujeito — Landing Page · Lourenço Serpa · Psicologia Histórico-Cultural

### Sobre este documento consolidado

Este arquivo une dois documentos anteriores em uma única fonte de verdade para o desenvolvimento:

- **PARTE 1** (abaixo): estrutura, dimensões, tipografia, cores e arquitetura de informação, originada do Figma (handoff v2).

- **PARTE 2** (mais adiante): comportamento interativo e animações, implementadas e validadas em código durante a sessão de refinamento.

**Regra de precedência: onde as duas partes divergem, a PARTE 2 é a fonte de verdade**, porque reflete o comportamento final testado e aprovado, não apenas a intenção original do protótipo Figma. A PARTE 1 permanece confiável para tudo que é estrutura estática (layout, dimensões, tipografia, cores), que não foi alterado na sessão de animação.

### Correções aplicadas nesta consolidação

- **Nomenclatura de fonte**: todas as ocorrências de "Rodchenko Regular" na Parte 1 foram atualizadas para "Rodchenko Normal", correção confirmada durante a sessão de animação (o arquivo licenciado disponível para compra não existia sob o nome "Regular").

- **Padding de**** ****abordagem-pilares**** ****(seção 4.3 da Parte 1)**: a v2 original tinha os rótulos de padding invertidos ("Topo/Baixo 92 · Laterais 24"). O valor correto, confirmado contra o auto layout real do Figma e validado na implementação, é **Laterais 92 · Topo/Baixo 32** (o valor vertical foi ajustado de 24 para 32 durante a sessão, para dar mais respiro entre o grupo de pilares e os elementos vizinhos).

- **Interação do menu nav (seção 9.5 da Parte 1)**: a v2 documenta a especificação nativa do protótipo Figma (Smart Animate, troca de variante, 300ms). A Parte 2 (seção 1) documenta a implementação final real, que diverge significativamente: efeito de "porta enrolável" via máscara overflow:hidden + translateY, ícone hamburguer→X reconstruído como 3 linhas animadas independentemente, scroll lock no body, duração final de 600ms. **A Parte 2 é a especificação correta para implementação**, a Parte 1 fica como registro da intenção original de design.

- **Transição dos ícones**** ****pilar-icon**** ****(seção 4.3 da Parte 1)**: a v2 já antecipava corretamente que a implementação em produção usaria transform/rotação real em vez de troca de assets SVG A/B — não há conflito aqui, apenas confirmação. A Parte 2 (seção 5.3) detalha o transform exato usado em cada um dos 6 ícones.

- **Gap de**** ****abordagem-faq**: v2 documenta 8px (valor original do Figma). Valor final implementado, após ajustes na sessão, é 32px. Ver Parte 2, seção 6.4.

Qualquer outro valor não listado acima (dimensões, cores, tipografia dos elementos estáticos) segue a Parte 1 sem alteração.

# PARTE 1 — Estrutura, Layout e Especificação Visual (origem: Figma)

**HANDOFF PARA DESENVOLVEDOR** O Novo Sujeito — Landing Page *Lourenço Serpa · Psicologia Histórico-Cultural*

## Sobre este documento

Este documento consolida a arquitetura da informação, nomenclatura de elementos e especificações visuais (dimensões, cores, tipografia, espaçamento e comportamento de auto layout) definidas em Figma para as seções da landing page. Cada seção documentada abaixo está pronta para implementação em código.

**Paleta de referência: Stepanova, variante Light.**

## Paleta de cores usada neste documento

**Stepanova Light (usada na maior parte da landing page):**

| Token | Hex / Uso |
| --- | --- |
| Preto | #000000 — texto base |
| Bordô Estrutura | #6D0C15 — linhas, links, sombras |
| Vermelho Impulso | #B7020B — ênfase, botão primário |
| Creme Papel | #F5EBD3 — texto sobre fundo escuro/vermelho |

**Stepanova Dark (usada em footer e header/menu):**

| Token | Hex / Uso |
| --- | --- |
| Vinho Noite | #5E1321 — fundo |
| Dourado Vanguarda | #E0B84D — linhas, labels secundários, links legais |
| Creme Luz | #F2E6CF — texto principal sobre fundo escuro |

# 1. Hero Section

## 1.1 Estrutura e nomenclatura

hero-section (autolayout vertical, W 440 fill container, H hug contents,
          alinhamento top-center, sem padding, sem gap)
│
├── hero-lockup (imagem estática PNG, 3x)
│
├── hero-kicker (autolayout horizontal)
│   ├── text-kicker
│   └── line-kicker
│
├── hero-content (autolayout vertical)
│   ├── hero-headline (autolayout)
│   │   └── headline-text
│   ├── hero-body (autolayout)
│   │   └── body-text
│   └── hero-link-secondary-area (autolayout)
│       └── hero-link-secondary (autolayout)
│           ├── link-label
│           └── link-icon
│
└── hero-cta-primary-area (autolayout)
    └── button-label (autolayout)
        └── button-text

*Nota: O padrão **'**-area**'** identifica um autolayout wrapper dedicado a posicionamento/alinhamento do elemento interno, separado do componente de conteúdo em si. Esse padrão se repete nas demais seções da landing page.*

## 1.2 hero-section (container raiz)

| Propriedade | Valor |
| --- | --- |
| Layout | Autolayout vertical |
| Alinhamento | Top-center |
| Padding | 0 (todos os lados) |
| Gap | 0 |
| Largura | 440, fill container |
| Altura | Hug contents |

## 1.3 hero-lockup

Elemento composto por retrato do Lourenço, wordmarks ("Lourenço", "Serpa"), tags ("Psicologia", "Histórico-Cultural") e formas geométricas, todos fundidos e exportados como imagem única estática.

| Propriedade | Valor |
| --- | --- |
| Tipo de asset | Imagem estática (PNG, exportado em 3x) |
| Largura | 440 |
| Altura | 288 |
| Proporção | 55:36 (aprox. 1.53:1) |

*Nota: Elemento tratado como asset único e fechado no handoff, sem decomposição de camadas internas. Necessário fornecer alt text descritivo para acessibilidade, já que a imagem contém informação textual (nome, especialidade).*

## 1.4 hero-kicker

| Propriedade | Valor |
| --- | --- |
| Layout | Autolayout horizontal |
| Largura | 440, fixed width |
| Altura | Hug contents |
| Alinhamento | Center-left |
| Padding | Topo 16 · Direita 0 · Baixo 16 · Esquerda 24 |
| Gap | 16 |

### text-kicker

| Propriedade | Valor |
| --- | --- |
| Conteúdo | "Psicologia Histórico-Cultural" |
| Fonte | Oswald Regular |
| Tamanho | 14 |
| Line height | Auto |
| Letter spacing | 20% |
| Alinhamento | Top-left |
| Cor | ■ #000000 |

### line-kicker

| Propriedade | Valor |
| --- | --- |
| Cor | ■ #6D0C15 |
| Peso (stroke) | 2 |
| Posição | Center |
| Largura | Fill container (~177 no layout atual, variável) |

## 1.5 hero-content

| Propriedade | Valor |
| --- | --- |
| Layout | Autolayout vertical |
| Alinhamento | Top-center |
| Padding | 0 (todos os lados) |
| Gap | 0 |
| Largura | 440, fill container |
| Altura | Hug contents (304 no layout atual) |

### hero-headline

| Propriedade | Valor |
| --- | --- |
| Layout | Autolayout |
| Alinhamento | Center-center |
| Padding | Lateral 24 · Topo/Baixo 16 |
| Gap | 8 (irrelevante, um único elemento) |
| Largura | 440, fill container |
| Altura | Hug contents (126) |

**headline-text**

| Propriedade | Valor |
| --- | --- |
| Conteúdo | "Sua história não começou com você." |
| Cor base | ■ #000000 |
| Cor de ênfase | ■ #B7020B em "história" e "você" |
| Fonte | Rodchenko Bold |
| Tamanho | 36 |
| Line height | 130% |
| Letter spacing | 10% |
| Alinhamento | Top-left |
| Comportamento | Nó único de texto, rich text, quebra de linha automática |

### hero-body

| Propriedade | Valor |
| --- | --- |
| Layout | Autolayout |
| Alinhamento | Center-center |
| Padding | Lateral 24 · Topo/Baixo 16 |
| Gap | 8 (irrelevante, um único elemento) |
| Largura | 440, fill container |
| Altura | Hug contents (122) |

**body-text**

| Propriedade | Valor |
| --- | --- |
| Conteúdo | "Suas condições de vida, trabalho e história moldaram quem você é hoje. Aqui, a terapia parte disso, não do discurso de que basta força de vontade." |
| Cor | ■ #000000 |
| Fonte | PT Sans |
| Tamanho | 16 |
| Line height | 190% |
| Letter spacing | 0% |
| Alinhamento | Top-left |

### hero-link-secondary-area

| Propriedade | Valor |
| --- | --- |
| Layout | Autolayout |
| Alinhamento | Top-right |
| Padding | Lateral 24 · Topo/Baixo 16 |
| Gap | 8 |
| Largura | 440, fill container |
| Altura | Hug contents (56) |

**hero-link-secondary**

| Propriedade | Valor |
| --- | --- |
| Layout | Autolayout |
| Alinhamento | Center-left |
| Padding | 0 (todos os lados) |
| Gap | 8 |
| Largura | Hug contents (274) |
| Altura | Hug contents (24) |

**link-label**

| Propriedade | Valor |
| --- | --- |
| Conteúdo | "Como funciona a terapia" |
| Fonte | Rodchenko Normal |
| Tamanho | 20 |
| Line height | Auto |
| Letter spacing | 10% |
| Alinhamento | Top-left |
| Cor | ■ #6D0C15 |
| Text decoration | Sublinhado (underline) |
| Destino do link | Sem destino nesta v1 (href vazio, clique não faz nada). Página de destino futura: "Psicologia Histórico-Cultural" (nome provisório), com texto educativo sobre a abordagem histórico-cultural e captura de e-mail para envio do e-book "E-book PHC Lourenço Serpa". Página e e-book ainda não existem, fase posterior ao lançamento da v1 (ver seção 12). |

**link-icon**

| Propriedade | Valor |
| --- | --- |
| Conteúdo | Vetor, seta para a direita |
| Dimensões | W 24 · H 24 |
| Cor | ■ #6D0C15 |

## 1.6 hero-cta-primary-area

| Propriedade | Valor |
| --- | --- |
| Layout | Autolayout |
| Alinhamento | Center-center |
| Padding | Lateral 24 · Topo/Baixo 16 |
| Gap | 8 |
| Largura | 440, fill container |
| Altura | Hug contents (86) |

**button-label**

| Propriedade | Valor |
| --- | --- |
| Layout | Autolayout |
| Alinhamento | Center-center |
| Padding | Lateral 16 · Topo/Baixo 8 |
| Gap | 8 |
| Largura | 392, fill container |
| Altura | Hug contents (54) |
| Fill | ■ #B7020B |
| Efeito | Drop shadow — X=4, Y=4, Blur=0, Cor #6D0C15 |
| Corner radius | 0 |

**button-text**

| Propriedade | Valor |
| --- | --- |
| Conteúdo | "Vamos conversar" |
| Cor | ■ #F5EBD3 |
| Fonte | Rodchenko Bold |
| Tamanho | 20 |
| Line height | 190% |
| Letter spacing | 10% |
| Alinhamento | Top-left |
| Dimensões | Hug contents (W e H) |

## 1.7 Decisões e observações registradas

- hero-lockup: imagem estática PNG, exportada em 3x, sem camadas internas documentadas no handoff.

- headline-text: nó único de texto, quebra de linha automática, duas cores aplicadas via rich text no mesmo layer.

- button-label: a sombra offset é um efeito (drop shadow) aplicado diretamente no frame, não é um elemento separado.

- Padrão '-area': autolayout wrapper dedicado a posicionamento/alinhamento, desacoplado do componente de conteúdo. Esse padrão se repete nas próximas seções da landing page.

- Paleta corrigida de #540B07 para #6D0C15 (Bordô Estrutura) e de #F2E6CF para #F5EBD3 (Creme Luz), alinhando com a paleta Stepanova-Light oficial do Brand Book v5.

# 2. Topics Ticker

## 2.1 Estrutura e nomenclatura

topics-ticker (autolayout, W 440 fill container, H hug contents,
           alinhamento center-center, padding lateral 24, topo/baixo 32, gap 8)
│
└── ticker-track (componente, propriedade "State": A / B)
    └── [instância ativa: A ou B]
        ├── ticker-item-1 ("Sofrimento no trabalho")
        ├── ticker-separator ("·")
        ├── ticker-item-2 ("Falta de sentido")
        ├── ticker-separator ("·")
        ├── ticker-item-3 ("Ansiedade")
        ├── ticker-separator ("·")
        ├── ticker-item-4 ("Falta de horizonte de vida")
        ├── ticker-separator ("·")
        ├── ticker-item-5 ("Transidentidade")
        ├── ticker-separator ("·")
        ├── ticker-item-6 ("Autismo")
        ├── ticker-separator ("·")
        └── [sequência de 6 itens repetida, para permitir loop contínuo]

*Nota: No Figma, o efeito de deslocamento foi prototipado com um componente de duas variantes (State A e State B) e uma interação de Smart Animate. Isso é um recurso de prototipagem do Figma, não um padrão de implementação. Ver seção 2.5 para a tradução correta em código.*

## 2.2 topics-ticker (container)

| Propriedade | Valor |
| --- | --- |
| Layout | Autolayout |
| Alinhamento | Center-center |
| Padding | Lateral 24 · Topo/Baixo 32 |
| Gap | 8 |
| Largura | 440, fill container |
| Altura | Hug contents (100 no layout atual) |

## 2.3 ticker-track (componente)

Componente com propriedade "State", duas variantes (A e B), usado no protótipo Figma para simular o deslocamento contínuo do texto. As duas variantes têm o mesmo conteúdo e o mesmo estilo visual — a única diferença é o alinhamento interno do autolayout, que desloca visualmente os itens da esquerda para a direita entre uma variante e outra.

| Propriedade | Valor |
| --- | --- |
| Layout | Autolayout horizontal |
| Largura | 392 |
| Altura | 36 |
| Padding | 8 (todos os lados) |
| Gap | 8 |
| Clip content | Ativado |
| Fill do frame | ■ #6D0C15 |
| Corner radius | 0 |

### Variante A

| Propriedade | Valor |
| --- | --- |
| Alinhamento interno | Center-left |

### Variante B

| Propriedade | Valor |
| --- | --- |
| Alinhamento interno | Center-right |
| Diferença em relação à variante A | Único atributo alterado é o alinhamento (center-right em vez de center-left) |

## 2.4 Conteúdo e estilo dos itens

| Propriedade | Valor |
| --- | --- |
| Itens (nesta ordem, repetidos em loop) | Sofrimento no trabalho · Falta de sentido · Ansiedade · Falta de horizonte de vida · Transidentidade · Autismo |
| Separador entre itens | "·" (ponto médio / middle dot, U+00B7) |
| Fonte | Oswald Regular |
| Tamanho | 14 |
| Line height | Auto |
| Letter spacing | 20% |
| Alinhamento do texto | Top-left |
| Cor do texto | ■ #F5EBD3 |

*Nota: A sequência completa de itens é duplicada dentro da faixa (a lista de 6 itens aparece duas vezes em sequência) para que o loop de deslocamento não deixe espaço vazio visível entre o fim de um ciclo e o começo do próximo.*

## 2.5 Comportamento esperado — nota de implementação

No protótipo Figma, o movimento é simulado por uma interação "After delay 1ms → Change to State B → Smart Animate → Ease out → 10000ms", sem uma interação de retorno de B para A configurada. Isso é suficiente para demonstrar a intenção visual ao cliente, mas não é o comportamento final esperado em produção.

**Comportamento esperado em produção: as palavras devem se deslocar continuamente da direita para a esquerda, em loop infinito, sem pausas ou reinícios perceptíveis.**

**Recomendações para o desenvolvedor:**

- Implementar como uma animação de marquee em CSS/JS (translateX contínuo), não como uma transição entre dois estados discretos.

- Usar easing linear, não ease-out. Ease-out causaria uma desaceleração perceptível a cada reinício do loop, quebrando a ilusão de movimento contínuo.

- Duplicar a sequência de itens (já refletido na estrutura da seção 2.1) é a técnica correta para permitir um loop sem salto visual, faz sentido manter essa abordagem no código.

- A duração de 10000ms (10s) do protótipo é uma referência de velocidade, não um valor travado. Vale validar com o Lourenço ou por teste visual se essa velocidade está confortável para leitura.

# 3. Sobre Section

## 3.1 Estrutura e nomenclatura

sobre-section (autolayout vertical, W 440 fill container, H hug contents,
           alinhamento top-center, sem padding, sem gap)
│
├── sobre-lockup (imagem estática PNG)
│
└── sobre-content (autolayout vertical)
    ├── sobre-headline (autolayout)
    │   └── headline-text
    ├── sobre-body (autolayout)
    │   └── body-text
    └── sobre-link-secondary-area (autolayout)
        └── sobre-link-secondary (autolayout)
            ├── link-label
            └── link-icon

*Nota: Estrutura, autolayouts, paddings, gaps, tipografia e cores desta seção são análogos aos da Hero Section (ver seção 1). Apenas o conteúdo textual e as dimensões do lockup mudam. Diferença de nomenclatura intencional: apenas sobre-link-secondary-area usa o wrapper **'**-area**'**, assim como na hero, por ser o único elemento com alinhamento interno distinto dos demais.*

## 3.2 sobre-section (container raiz)

| Propriedade | Valor |
| --- | --- |
| Layout | Autolayout vertical |
| Alinhamento | Top-center |
| Padding | 0 (todos os lados) |
| Gap | 0 |
| Largura | 440, fill container |
| Altura | Hug contents |

## 3.3 sobre-lockup

Elemento composto por retrato do Lourenço, ilustrações (molécula, chaminé/fábrica) e formas geométricas, fundidos e exportados como imagem única estática, análogo ao hero-lockup.

| Propriedade | Valor |
| --- | --- |
| Tipo de asset | Imagem estática (PNG) |
| Largura | 440, fill width |
| Altura | 332 (proporcional) |
| Proporção | 110:83 (aprox. 1.33:1) |

*Nota: Assim como o hero-lockup, tratado como asset único e fechado no handoff, sem decomposição de camadas internas. Necessário fornecer alt text descritivo para acessibilidade.*

## 3.4 sobre-content

| Propriedade | Valor |
| --- | --- |
| Layout | Autolayout vertical |
| Alinhamento | Top-center |
| Padding | 0 (todos os lados) |
| Gap | 0 |
| Largura | 440, fill container |
| Altura | Hug contents |

### sobre-headline

| Propriedade | Valor |
| --- | --- |
| Layout | Autolayout |
| Alinhamento | Center-center |
| Padding | Lateral 24 · Topo/Baixo 16 |
| Gap | 8 (irrelevante, um único elemento) |
| Largura | 440, fill container |
| Altura | Hug contents |

**headline-text**

| Propriedade | Valor |
| --- | --- |
| Conteúdo | "Minha trajetória também tem uma história por trás." |
| Cor base | ■ #000000 |
| Cor de ênfase | ■ #B7020B em "trajetória" |
| Fonte | Rodchenko Bold |
| Tamanho | 36 |
| Line height | 130% |
| Letter spacing | 10% |
| Alinhamento | Top-left |
| Comportamento | Nó único de texto, rich text, quebra de linha automática |

### sobre-body

| Propriedade | Valor |
| --- | --- |
| Layout | Autolayout |
| Alinhamento | Center-center |
| Padding | Lateral 24 · Topo/Baixo 16 |
| Gap | 8 (irrelevante, um único elemento) |
| Largura | 440, fill container |
| Altura | Hug contents |

**body-text**

| Propriedade | Valor |
| --- | --- |
| Conteúdo | "Antes de ouvir a história dos outros, precisei entender a minha. Um pouco de como cheguei até aqui, o que me formou e por que escolhi esse caminho." |
| Cor | ■ #000000 |
| Fonte | PT Sans |
| Tamanho | 16 |
| Line height | 190% |
| Letter spacing | 0% |
| Alinhamento | Top-left |

### sobre-link-secondary-area

| Propriedade | Valor |
| --- | --- |
| Layout | Autolayout |
| Alinhamento | Top-right |
| Padding | Lateral 24 · Topo/Baixo 16 |
| Gap | 8 |
| Largura | 440, fill container |
| Altura | Hug contents |

**sobre-link-secondary**

| Propriedade | Valor |
| --- | --- |
| Layout | Autolayout |
| Alinhamento | Center-left |
| Padding | 0 (todos os lados) |
| Gap | 8 |
| Largura | Hug contents |
| Altura | Hug contents |

**link-label**

| Propriedade | Valor |
| --- | --- |
| Conteúdo | "Um pouco mais sobre mim" |
| Fonte | Rodchenko Normal |
| Tamanho | 20 |
| Line height | Auto |
| Letter spacing | 10% |
| Alinhamento | Top-left |
| Cor | ■ #6D0C15 |
| Text decoration | Sublinhado (underline) |
| Destino do link | Sem destino nesta v1 (href vazio, clique não faz nada). Página de destino futura: biografia do Lourenço, com texto de apresentação escrito por ele, possível vídeo falando sobre sua trajetória e modo de ver a psicologia, além dos links de redes sociais e do carrossel de posts do Instagram (hoje na seção 7, Redes). Página, texto e vídeo ainda não existem, fase posterior ao lançamento da v1 (ver seção 12). |

**link-icon**

| Propriedade | Valor |
| --- | --- |
| Conteúdo | Vetor, seta para a direita |
| Dimensões | W 24 · H 24 |
| Cor | ■ #6D0C15 |

## 3.5 Decisões e observações registradas

- sobre-lockup: imagem estática PNG, análoga ao hero-lockup, com proporção própria (440 x 332).

- Todo o restante da seção (sobre-content e seus filhos) segue exatamente os mesmos autolayouts, paddings, gaps, tipografia e cores da Hero Section, mudando apenas o conteúdo textual.

# 4. Abordagem Section

## 4.1 Estrutura e nomenclatura

abordagem-section (autolayout vertical, análogo à hero-section e sobre-section:
               W 440 fill container, H hug contents, top-center, sem padding, sem gap)
│
├── abordagem-kicker (autolayout horizontal, análogo aos demais kickers)
│   ├── text-kicker ("Abordagem Histórico-Cultural")
│   └── line-kicker
│
└── abordagem-content (autolayout vertical, padding 0, gap 0, W fill / H hug)
    ├── abordagem-pilares (autolayout grid 2×3)
    │   ├── pilar-historia (componente "pilares", category=história)
    │   ├── pilar-cultura (category=cultura)
    │   ├── pilar-coletivo (category=coletivo)
    │   ├── pilar-mediacao (category=mediação)
    │   ├── pilar-autonomia (category=autonomia)
    │   └── pilar-consciencia (category=consciência)
    │       [cada pilar-* contém: pilar-icon + pilar-label]
    │
    ├── abordagem-faq (autolayout vertical)
    │   ├── faq-item-1 ("A terapia fala, ou só escuta?")
    │   ├── faq-item-2 ("Vou receber um diagnóstico?")
    │   ├── faq-item-3 ("Quanto tempo dura o processo?")
    │   └── faq-item-4 ("Qual é o objetivo da terapia?")
    │       [cada faq-item-* tem estados Default / Expanded, contendo:
    │        line-title (title + icon-toggle), expanded-content (só no Expanded),
    │        line-separator]
    │
    └── abordagem-link-secondary-area (autolayout, análogo aos demais link-secondary)
        └── abordagem-link-secondary
            ├── link-label ("Entenda um pouco mais")
            └── link-icon

*Nota: Nomenclatura de instâncias (pilar-*, faq-item-*) é apenas rótulo de camada — não altera nem desvincula as variantes reais dos componentes **"**pilares**"** e **"**accordion-item**"** no Figma. As propriedades de variante (category, state, item) permanecem intactas.*

## 4.2 abordagem-kicker

Estrutura, autolayout, padding, gap e tipografia idênticos aos demais kickers (ver seção 1.4). Único elemento alterado é o conteúdo do text-kicker.

| Propriedade | Valor |
| --- | --- |
| Conteúdo do text-kicker | "Abordagem Histórico-Cultural" |

## 4.3 abordagem-pilares

| Propriedade | Valor |
| --- | --- |
| Layout | Autolayout, grid 2×3 |
| Largura | 440, fill |
| Altura | 440, hug contents |
| Gap | 16 (horizontal e vertical) |
| Padding | Laterais 92 · Topo/Baixo 32 (corrigido nesta sessão de merge: rótulos estavam trocados na v2 original, e o valor vertical foi ajustado de 24 para 32 durante a sessão de refinamento) |
| Clip content | Ativado |

### Componente "pilares" — estrutura comum

Cada instância pilar-[nome] é composta por pilar-icon (70x70) e pilar-label. Os 6 pilares compartilham as mesmas variantes de estado (A / B) e a mesma lógica de interação.

| Propriedade | Valor |
| --- | --- |
| pilar-icon — dimensões | 70 x 70 |
| pilar-label — fonte | Oswald Medium |
| pilar-label — tamanho | 14 |
| pilar-label — line height | Auto |
| pilar-label — letter spacing | 20% |
| pilar-label — alinhamento | Top-left |
| pilar-label — cor | ■ #000000 |
| Interação (todas as categorias) | On tap → Change to state oposto (A↔B) → Smart animate → Ease out → 1000ms |

### Assets e estilo por pilar

| Pilar | Forma | Estado A | Estado B | Assets |
| --- | --- | --- | --- | --- |
| História | Semicírculo | Vermelho, virado p/ baixo | Vermelho, virado p/ cima | pilar-historia-a.svg / -b.svg |
| Cultura | Triângulo | Bordô, apontando p/ cima | Vermelho, apontando p/ baixo | pilar-cultura-a.svg / -b.svg |
| Coletivo | Círculos sobrepostos | Preenchido à esquerda, contorno à direita | Contorno à esquerda, preenchido à direita | pilar-coletivo-a.svg / -b.svg |
| Mediação | Linha cortada | Diagonal ↗, cortada | Diagonal ↖, cortada | pilar-mediacao-a.svg / -b.svg |
| Autonomia | Hexágono | Bordô | Vermelho | pilar-autonomia-a.svg / -b.svg |
| Consciência | Quadrado / círculo | Quadrado vermelho pequeno | Círculo vermelho grande | pilar-consciencia-a.svg / -b.svg |

| Propriedade | Valor |
| --- | --- |
| Cor vermelha usada nos ícones | ■ #B7020B |
| Cor bordô usada nos ícones | ■ #6D0C15 |

*Nota: Assets exportados como SVG individuais (par A/B por categoria, 12 arquivos no total). SVG escolhido em vez de PNG para manter nitidez em qualquer tamanho de tela e permitir estilização via CSS se necessário. No protótipo Figma, a transição entre estados foi feita com Smart Animate; em produção, implementar como transição CSS/JS real (transform + transition: 1000ms ease-out), disparada por clique/tap, alternando entre os dois SVGs ou entre duas posições/rotações do mesmo elemento.*

## 4.4 abordagem-faq

| Propriedade | Valor |
| --- | --- |
| Layout | Autolayout vertical |
| Alinhamento | Top-center |
| Padding | 0 (laterais) · 16 (topo/baixo) |
| Gap | 8 |
| Largura | 440, fill container |
| Altura | Hug contents (312 no layout atual, variável) |
| Clip content | Ativado |

### Comportamento do accordion

No protótipo Figma, múltiplos itens podem ficar expandidos simultaneamente. O comportamento esperado em produção é diferente e deve ser implementado assim:

**Comportamento esperado em produção: comportamento tipo ****"****radio****"**** — ao expandir um item, qualquer outro item que esteja expandido deve fechar automaticamente. Apenas um item aberto por vez.**

### accordion-item — estrutura comum (Default e Expanded)

| Propriedade | Valor |
| --- | --- |
| Largura | 392, fill container |
| Altura | Hug contents (64 no Default, 90+ no Expanded) |
| Padding | Topo 16 · Direita 24 · Baixo 0 · Esquerda 24 |
| Gap interno | 24 |
| Corner radius | 0 |
| Opacidade | 100% |

**line-title (autolayout: title + icon-toggle)**

| Propriedade | Valor |
| --- | --- |
| Largura | 392, fill container |
| Altura | 24, hug contents |
| Alinhamento | Space between (title à esquerda, icon-toggle à direita) |
| Gap | Auto |
| Padding | 0 (todos os lados) |

**title**

| Propriedade | Valor |
| --- | --- |
| Fonte | Rodchenko Normal |
| Tamanho | 19 |
| Line height | Auto |
| Letter spacing | 20% |
| Alinhamento | Top-left |
| Cor | ■ #000000 |

**icon-toggle**

| Propriedade | Valor |
| --- | --- |
| Dimensões | W 24 · H 24 |
| Cor | ■ #000000 |
| Estado Default | Chevron apontando para baixo |
| Estado Expanded | Chevron apontando para cima |

**expanded-content (presente apenas no estado Expanded)**

| Propriedade | Valor |
| --- | --- |
| Largura | 392, fill container |
| Altura | Hug contents (visível apenas quando expandido; altura 0 / ausente no Default) |
| Fonte | PT Sans Regular |
| Tamanho | 14 |
| Line height | Auto |
| Letter spacing | 20% |
| Alinhamento | Top-left |
| Cor | ■ #000000 |

**line-separator**

| Propriedade | Valor |
| --- | --- |
| Cor | ■ #000000 |
| Peso (stroke) | 1 |
| Posição | Center |
| Estilo de ponta | Quadrada (start e end) |

### Conteúdo dos itens

| Pergunta | Resposta |
| --- | --- |
| A terapia fala, ou só escuta? | Existe uma ideia de que psicólogo só escuta e fica quieto. Aqui não é assim. Eu escuto com atenção o que você traz, mas também pergunto, aponto o que percebo e proponho reflexões. É diálogo ativo, não silêncio. |
| Vou receber um diagnóstico? | Nem todo processo passa por um diagnóstico. Meu olhar é crítico com rótulos rápidos. Seus desafios podem ser entendidos sem precisar de um nome clínico. Isso não significa negar o sofrimento, significa não te reduzir a um sintoma. |
| Quanto tempo dura o processo? | Cada processo é único porque cada história é diferente. Pode durar meses ou anos, depende do que a gente for construindo junto. O que acompanho com frequência é se os objetivos estão sendo alcançados, não um prazo fechado desde o início. |
| Qual é o objetivo da terapia? | Muita gente vive no piloto automático, sem entender bem por que sofre. A terapia ajuda a sair desse lugar, trazendo mais consciência sobre sua história e mais autonomia nas suas escolhas. O foco é sempre você. |

*Nota: respostas 3 e 4 preenchidas nesta conversa, fornecidas por Filipe. FAQ da seção Abordagem 100% completo.*

### Interação de abertura/fechamento

| Propriedade | Valor |
| --- | --- |
| Trigger | On tap |
| Ação (abrir) | Change to Expanded → Smart animate → Ease out → 300ms |
| Ação (fechar) | Mesma configuração, sentido inverso (Expanded → Default) |

*Nota: Smart Animate é recurso de prototipagem do Figma. Em produção, implementar como transição de altura/opacidade real (ex: CSS transition ou biblioteca de animação), 300ms, ease-out, disparada por clique/tap no item inteiro ou no icon-toggle. Lembrar de aplicar o comportamento tipo radio (seção 4.4) na lógica de abertura.*

## 4.5 abordagem-link-secondary-area

Estrutura, autolayout, padding, tipografia e cores idênticos aos demais link secundários (ver seção 1.5, hero-link-secondary-area). Único elemento alterado é o conteúdo do link-label.

| Propriedade | Valor |
| --- | --- |
| Conteúdo do link-label | "Entenda um pouco mais" |
| Destino do link | Sem destino nesta v1 (href vazio, clique não faz nada). Mesmo destino futuro do hero-link-secondary ("Como funciona a terapia"): página "Psicologia Histórico-Cultural" (nome provisório) com texto educativo e captura de e-mail para o e-book. Página e e-book ainda não existem, fase posterior ao lançamento da v1 (ver seção 12). |

## 4.6 Decisões e observações registradas

- abordagem-pilares: 6 categorias com 2 estados cada (12 variantes no total), animação de troca de ilustração via Smart Animate no protótipo, a ser traduzida em transição CSS/JS real em produção.

- abordagem-faq: no protótipo múltiplos itens podem ficar abertos ao mesmo tempo; em produção o comportamento deve ser tipo "radio" (um item aberto por vez, os demais fecham automaticamente ao abrir um novo).

- Respostas das perguntas 3 e 4 do FAQ preenchidas nesta conversa. Conteúdo completo, sem itens pendentes.

- Correção retroativa: todos os link-label da landing page (hero, sobre, abordagem, e demais seções futuras que seguirem o mesmo padrão) devem ter text-decoration sublinhado (underline). Aplicado nas seções 1 e 3; abordagem-link-secondary-area segue por analogia.

# 5. Prática Section

## 5.1 Estrutura e nomenclatura

pratica-section (autolayout vertical, análogo às demais seções:
             W 440 fill container, H hug contents, top-center, sem padding, sem gap)
│
├── pratica-kicker (autolayout horizontal, análogo aos demais kickers)
│   ├── text-kicker ("A prática")
│   └── line-kicker
│
└── pratica-content (autolayout vertical, padding 0, gap 0, W fill / H hug)
    ├── pratica-headline (autolayout, análogo aos demais headlines)
    │   └── headline-text ("Sou o psicólogo certo para você?")
    │
    └── pratica-montage (componente, 4 variantes: default / quem / como / sobre-o-que)
        ├── montage-quem (label)
        ├── montage-como (label)
        ├── montage-sobre-o-que (label)
        ├── body-box + body-text (presente apenas nas variantes quem/como/sobre-o-que)
        └── lourenco-montage-[variante].png (imagem de fundo, troca por variante)

## 5.2 pratica-kicker

Estrutura, autolayout, padding, gap e tipografia idênticos aos demais kickers (ver seção 1.4). Único elemento alterado é o conteúdo do text-kicker.

| Propriedade | Valor |
| --- | --- |
| Conteúdo do text-kicker | "A prática" |

## 5.3 pratica-headline

Estrutura, autolayout e tipografia idênticos aos demais headlines (ver seção 1.5, hero-headline). Muda apenas o conteúdo e as palavras em destaque.

| Propriedade | Valor |
| --- | --- |
| Conteúdo | "Sou o psicólogo certo para você?" |
| Cor base | ■ #000000 |
| Cor de ênfase | ■ #B7020B em "psicólogo" e "certo" |

## 5.4 pratica-montage (componente interativo)

Componente com 4 variantes (default, quem, como, sobre-o-que). Um rosto fragmentado em 3 compartimentos, cada label ("Quem", "Como", "Sobre o quê") ativa a variante correspondente ao ser clicado, trocando a imagem de fundo (compartimento pintado em vermelho) e exibindo um texto de apoio (body-box) específico. Conceito reforça a fragmentação/composição histórico-cultural do sujeito.

### Frame do componente

| Propriedade | Valor |
| --- | --- |
| Dimensões | W 440 x H 519 |
| Posicionamento interno | Elementos com posição livre (fixed/absolute) dentro do frame; cada elemento mantém autolayout próprio |

### Posição dos labels (fixa nas 4 variantes)

| Label | Posição (X, Y) |
| --- | --- |
| montage-quem | X=46, Y=119 |
| montage-como | X=257, Y=242 |
| montage-sobre-o-que | X=44, Y=328 |

### Estilo comum dos labels

| Propriedade | Valor |
| --- | --- |
| Layout | Autolayout horizontal |
| Largura | Hug contents (138 para quem/como, 244 para sobre-o-que) |
| Altura | Hug contents (50) |
| Alinhamento | Center-center |
| Gap | 8 |
| Padding | Lateral 32 · Topo/Baixo 8 |
| Fill | ■ #F5EBD3 |
| Corner radius | 0 |

**title (texto do label)**

| Propriedade | Valor |
| --- | --- |
| Fonte | Rodchenko Bold |
| Tamanho | 26 |
| Line height | 130% |
| Letter spacing | 10% |
| Alinhamento | Top-left |
| Cor | ■ #B7020B |

### Estilo comum do body-box (variantes quem/como/sobre-o-que)

| Propriedade | Valor |
| --- | --- |
| Layout | Autolayout horizontal |
| Largura | Fixed, específica por variante (ver tabela abaixo) |
| Altura | Hug contents |
| Padding | Lateral 16 · Topo/Baixo 8 |
| Gap | 8 |
| Fill | #FFFFFF, opacidade 95% |
| Stroke | ■ #B7020B, peso 2, posição inside |

**body-text (texto do body-box)**

| Propriedade | Valor |
| --- | --- |
| Fonte | PT Sans Regular |
| Tamanho | 12 |
| Line height | 130% |
| Letter spacing | 10% |
| Cor base | ■ #000000 |
| Cor de destaque | ■ #B7020B (trechos específicos por variante) |

### Dimensões, posição e conteúdo do body-box por variante

| Variante | Posição (X, Y) | W x H | Texto (trecho em vermelho entre **) |
| --- | --- | --- | --- |
| quem | X=196, Y=73 | 198 x 96 (hug) | "Atendo **adolescentes e adultos**. Não faço atendimento infantil. Tenho vagas reservadas para atendimentos sociais." |
| como | X=24, Y=229 | 216 x 80 (hug) | "Sessões **presenciais ou online**. O formato se combina com você, conforme o que funciona na sua rotina." |
| sobre-o-que | X=24, Y=383 | 391 x 96 (hug) | "Tenho mais prática em alguns temas do que em outros. Não me chamo de especialista em nenhum deles, mas tenho experiência real com: **Trabalho e falta de sentido, problemas familiares, ansiedade, transidentidade, sexualidade, transtornos do espectro autista**" |

*Nota: A linha conectora entre label e body-box já está embutida nos assets de imagem (lourenco-montage-*.png), não é um elemento vetorial separado no Figma.*

### Imagens (lourenco-montage-*)

| Propriedade | Valor |
| --- | --- |
| Formato | PNG, fundo transparente |
| Dimensões | W 404 x H 440 (idênticas nas 4 variantes) |
| Proporção | 101:110 (aprox. 0.92:1) |
| Posição no frame | X=4, Y=22 (mesma posição em todas as variantes) |
| Assets | lourenco-montage-default.png / -quem.png / -como.png / -sobre-o-que.png |
| Comportamento | Cada variante troca a imagem inteira (asset diferente por variante, não é composição de camadas coloridas em tempo real) |

### Interações

| Propriedade | Valor |
| --- | --- |
| Trigger | On tap (em qualquer um dos 3 labels) |
| Ação | Change to [variante correspondente] → Instant (sem Smart Animate) |
| Transições válidas | default→quem, default→como, default→sobre-o-que, e trocas diretas entre quem↔como↔sobre-o-que |
| Retorno ao default | Não existe. Uma vez que o usuário sai do estado default, o componente permanece sempre em um dos três estados ativos (quem/como/sobre-o-que) |

*Nota: Transição é **'**Instant**'** no protótipo (troca sem animação), diferente do ticker e do accordion que usam Smart Animate. Em produção, isso pode ser implementado como troca direta de estado (sem necessidade de transition/easing), simplificando a implementação em relação aos outros componentes interativos da página.*

## 5.5 Decisões e observações registradas

- pratica-montage é um componente de 4 variantes controladas por clique, trocando simultaneamente a imagem de fundo (PNG) e o texto de apoio (body-box), sem retorno automático ao estado default.

- Todos os assets de imagem (lourenco-montage-*.png) e a linha conectora entre label e body-box já vêm embutidos nas imagens exportadas, não precisam ser recriados em CSS/SVG.

- Transições são instantâneas (sem easing), diferente do comportamento do topics-ticker e do abordagem-faq, que usam Smart Animate/transições suaves.

# 6. Contato Section

## 6.1 Estrutura e nomenclatura

contato-section (autolayout vertical, W 440 fill container, H hug contents,
             top-center, sem padding, sem gap, clip content ativado)
│
├── contato-kicker (autolayout horizontal, análogo aos demais kickers)
│   ├── text-kicker ("Me manda um oi")
│   └── line-kicker
│
└── contato-content (autolayout vertical, padding 0, gap 0, W fill / H hug)
    ├── contato-body (autolayout, análogo aos demais bodies)
    │   └── body-text
    │
    ├── contato-form (autolayout vertical)
    │   ├── field-nome
    │   │   ├── field-nome-label
    │   │   └── field-nome-input (instância de componente de input)
    │   ├── field-motivo
    │   │   ├── field-motivo-label
    │   │   └── field-motivo-input
    │   ├── field-email
    │   │   ├── field-email-label
    │   │   └── field-email-input
    │   └── field-telefone
    │       ├── field-telefone-label
    │       └── field-telefone-input
    │
    └── contato-cta-primary-area (autolayout, análogo ao hero-cta-primary-area)
        └── button-label
            └── button-text ("Enviar mensagem")

## 6.2 contato-kicker

Estrutura, autolayout, padding, gap e tipografia idênticos aos demais kickers (ver seção 1.4). Único elemento alterado é o conteúdo do text-kicker.

| Propriedade | Valor |
| --- | --- |
| Conteúdo do text-kicker | "Me manda um oi" |

## 6.3 contato-body

Estrutura, autolayout e tipografia idênticos aos demais bodies (ver seção 1.5, hero-body). Muda apenas o conteúdo.

| Propriedade | Valor |
| --- | --- |
| Conteúdo | "Chegou até aqui e ainda tem dúvida se essa terapia é pra você? Normal. Manda um oi, a gente conversa antes de qualquer compromisso." |
| Cor | ■ #000000 |

## 6.4 contato-form

| Propriedade | Valor |
| --- | --- |
| Layout | Autolayout vertical |
| Largura | 440, fill |
| Altura | Hug contents (416 no layout atual) |
| Alinhamento | Center-center |
| Gap | 24 |
| Padding | Lateral 24 · Topo/Baixo 16 |
| Clip content | Ativado |

### Estrutura comum de cada field-[nome]

| Propriedade | Valor |
| --- | --- |
| Layout | Autolayout vertical |
| Largura | 392, fill |
| Altura | Hug contents (78) |
| Alinhamento | Top-left |
| Gap | 8 |
| Padding | 0 (todos os lados) |

**field-[nome]-label**

| Propriedade | Valor |
| --- | --- |
| Fonte | Rodchenko Normal |
| Tamanho | 16 |
| Line height | 190% |
| Letter spacing | 0% |
| Alinhamento | Top-left |
| Cor | ■ #000000 |

**field-[nome]-input (componente de input)**

| Propriedade | Valor |
| --- | --- |
| Largura | 392, fill |
| Altura | 40, fixed |
| Fill | #FFFFFF |
| Stroke | ■ #B7020B, peso 1, posição inside |
| Corner radius | 0 |
| Clip content | Ativado |
| Placeholder | Nenhum (campo vazio por padrão) |
| Texto digitado pelo usuário — fonte | PT Sans Regular |
| Texto digitado pelo usuário — tamanho | 16 |
| Texto digitado pelo usuário — cor | ■ #000000 |

### Campos e obrigatoriedade

| Campo | Label | Obrigatório |
| --- | --- | --- |
| field-nome | "Oi, meu nome é (obrigatório)" | Sim |
| field-motivo | "Estou procurando terapia para lidar com" | Não |
| field-email | "Meu e-mail é (obrigatório)" | Sim |
| field-telefone | "E meu telefone é" | Não |

### Comportamento do envio

| Propriedade | Valor |
| --- | --- |
| Mecanismo de envio | Serviço tipo Formspree ou EmailJS (formulário envia via API, sem necessidade de backend próprio) |
| E-mail de destino | [lourencoserpa@gmail.com](mailto:lourencoserpa@gmail.com) (mesmo e-mail documentado no footer, seção 8.4) |
| Remetente | Gerenciado pelo serviço escolhido, não é o e-mail pessoal do visitante (diferente de um mailto) |
| Fluxo de resposta | O Lourenço recebe o e-mail com os dados preenchidos e responde pessoalmente ao visitante, fora do site |
| Comportamento pós-envio | Mensagem de sucesso exibida na mesma página, sem redirecionamento para outra URL. O form é substituído por uma confirmação (tratamento visual exato a definir na fase de implementação) |

*Nota: a escolha entre Formspree e EmailJS, e o tratamento de erro de envio (ex: falha de rede, campo obrigatório vazio), ficam a critério do desenvolvedor na fase de implementação. Este handoff documenta apenas o comportamento esperado do ponto de vista do usuário.*

## 6.5 contato-cta-primary-area

Estrutura, autolayout, padding, tipografia, cores e sombra idênticos ao hero-cta-primary-area (ver seção 1.6). Único elemento alterado é o conteúdo do button-text.

| Propriedade | Valor |
| --- | --- |
| Conteúdo do button-text | "Enviar mensagem" |

## 6.6 Decisões e observações registradas

- contato-form: 4 campos (nome, motivo, e-mail, telefone), sendo nome e e-mail obrigatórios. Componente de input reutilizado nos 4 campos, sem texto de placeholder.

- contato-cta-primary-area foi desenhado deliberadamente como elemento separado do formulário (fora do contato-form), para manter consistência visual com o CTA da hero section, ao invés de ficar embutido como um botão de submit dentro do form.

- Nomenclatura corrigida de inglês para português (contact- → contato-) para manter consistência com o restante do projeto.

- Comportamento de envio definido nesta conversa: serviço tipo Formspree/EmailJS, e-mail de destino [lourencoserpa@gmail.com](mailto:lourencoserpa@gmail.com), sem redirecionamento pós-envio (mensagem de sucesso inline na mesma página).

# 7. Redes Section

## 7.1 Estrutura e nomenclatura

redes-section (autolayout vertical, W 440 fill container, H hug contents,
           top-center, gap 8, sem padding)
│
├── redes-title-area (autolayout horizontal)
│   └── title-text ("ME SIGA")
│
├── redes-icon-area (autolayout horizontal)
│   ├── icon-instagram
│   ├── icon-tiktok
│   └── icon-youtube
│
└── redes-carrossel (autolayout horizontal, scroll livre)
    ├── post-1
    ├── post-2
    └── post-3

*Nota: Convenção de nomenclatura do projeto: nomes de seções e wrappers em português (redes-section, redes-title-area), nomes de elementos de UI genéricos em inglês (title-text, icon-instagram), consistente com o padrão já usado em todas as seções anteriores (button-text, link-icon, body-text).*

## 7.2 redes-section (container raiz)

| Propriedade | Valor |
| --- | --- |
| Layout | Autolayout vertical |
| Alinhamento | Top-center |
| Padding | 0 (todos os lados) |
| Gap | 8 |
| Largura | 440, fill container |
| Altura | Hug contents (442 no layout atual) |

## 7.3 redes-title-area

| Propriedade | Valor |
| --- | --- |
| Layout | Autolayout horizontal |
| Largura | 440, fill |
| Altura | Hug contents (54) |
| Alinhamento | Center-center |
| Gap | 8 |
| Padding | Lateral 24 · Topo/Baixo 16 |
| Stroke | Top somente, cor #6D0C15 |

**title-text**

| Propriedade | Valor |
| --- | --- |
| Conteúdo | "ME SIGA" |
| Fonte | Oswald Regular |
| Tamanho | 14 |
| Line height | Auto |
| Letter spacing | 20% |
| Alinhamento | Top-left |
| Cor | ■ #000000 |

## 7.4 redes-icon-area

| Propriedade | Valor |
| --- | --- |
| Layout | Autolayout horizontal |
| Largura | 440, fill |
| Altura | Hug contents (76) |
| Alinhamento | Center-center |
| Gap | 24 |
| Padding | Lateral 24 · Topo/Baixo 16 |

| Propriedade | Valor |
| --- | --- |
| Dimensões de cada ícone | 44 x 44 (proporção 1:1) |
| Cores | Fundo ■ #6D0C15 · Glifo branco #FFFFFF |
| Formato de exportação recomendado | SVG (mantém nitidez em qualquer tamanho, permite reestilização via CSS) |

| Ícone | Link de destino |
| --- | --- |
| icon-instagram | [https://www.instagram.com/psi.lourencoserpa?igsh=NGFlbXNtbmZpemo3](https://www.instagram.com/psi.lourencoserpa?igsh=NGFlbXNtbmZpemo3) |
| icon-tiktok | [https://www.tiktok.com/@psi.lourencoserpa?lang=en-GB&is_from_webapp=1&sender_device=mobile&sender_web_id=7670237734015157781](https://www.tiktok.com/@psi.lourencoserpa?lang=en-GB&is_from_webapp=1&sender_device=mobile&sender_web_id=7670237734015157781) |
| icon-youtube | [https://youtube.com/@psilourencoserpa?si=zS7m_tY12jTO_tG3](https://youtube.com/@psilourencoserpa?si=zS7m_tY12jTO_tG3) |

## 7.5 redes-carrossel

| Propriedade | Valor |
| --- | --- |
| Layout | Autolayout horizontal |
| Largura | 440, fill |
| Altura | Hug contents (284 no layout atual — ajustar para 268 se H dos posts mudar para 220, ver nota) |
| Alinhamento | Center-center |
| Gap | 24 |
| Padding | Topo 24 · Baixo 24 · Laterais 0 |
| Comportamento | Carrossel real com scroll horizontal livre (arrasto), sem snap |

### post-1 / post-2 / post-3

| Propriedade | Valor |
| --- | --- |
| Tipo de asset | Imagem estática única (igual aos lockups: fundo + texto já fundidos) |
| Largura | 176 |
| Altura | 220 |
| Proporção | 4:5 (padrão retrato do Instagram) |
| Corner radius | 0 |
| Stroke | ■ #B7020B, peso 1, posição inside |
| Drop shadow | X=2, Y=4, Blur=0, Spread=0, cor #6D0C15 100% |
| Link de destino | Perfil geral do Instagram (mesmo link do icon-instagram). Não associados a posts específicos por enquanto |

## 7.6 Decisões e observações registradas

- redes-icon-area: 3 ícones sociais (Instagram, TikTok, YouTube), cada um linkando para o perfil correspondente do Lourenço. Exportar como SVG.

- redes-carrossel: carrossel real de scroll horizontal livre (sem snap), 3 imagens estáticas (formato asset único, como os lockups), todas linkando por enquanto para o perfil geral do Instagram, sem associação a posts específicos.

- redes-title-area: stroke top confirmado em #6D0C15.

- post-1/2/3: dimensões confirmadas e já atualizadas no Figma (W 176 x H 220, proporção 4:5 do Instagram).

# 8. Footer

*Nota: Esta é a primeira seção da landing page a usar a paleta Stepanova Dark (fundo #5E1321, textos em #F2E6CF e #E0B84D), diferente de todas as seções anteriores, que usam Stepanova Light sobre fundo claro. O header/menu (ainda não documentado) também usará essa paleta dark.*

## 8.1 Estrutura e nomenclatura

footer (autolayout vertical, W 440 fill container, H hug contents,
   top-center, gap 0, sem padding, fundo #5E1321)
│
├── footer-brand (autolayout)
│   ├── brand-logo (imagem estática PNG: marca + wordmark fundidos)
│   └── brand-tagline ("Psicologia Histórico-Cultural")
│
├── footer-info (autolayout vertical, stroke top)
│   ├── footer-contato (autolayout vertical)
│   │   ├── contato-label ("Contato")
│   │   └── footer-contato-links
│   │       ├── link-email
│   │       └── link-instagram
│   │
│   └── footer-legal (autolayout vertical)
│       ├── link-termos
│       └── link-politica
│
└── footer-bottom (autolayout vertical, stroke top)
    └── bottom-text

## 8.2 footer (container raiz)

| Propriedade | Valor |
| --- | --- |
| Layout | Autolayout vertical |
| Alinhamento | Top-center |
| Padding | 0 (todos os lados) |
| Gap | 0 |
| Largura | 440, fill container |
| Altura | Hug contents (350 no layout atual) |
| Fill de fundo | ■ #5E1321 (Vinho Noite) |

## 8.3 footer-brand

| Propriedade | Valor |
| --- | --- |
| Layout | Autolayout |
| Largura | 440, fill |
| Altura | Hug contents (133) |
| Alinhamento | Center-center |
| Gap | 4 |
| Padding | Lateral 24 · Topo 12 · Baixo 16 |

**brand-logo**

| Propriedade | Valor |
| --- | --- |
| Tipo de asset | Imagem estática (PNG, mesmo tratamento dos lockups) |
| Largura | 249 |
| Altura | 83 |
| Proporção | 249:83 (3:1 exato) |
| Conteúdo | Marca + wordmark "Lourenço Serpa" já fundidos na imagem |

*Nota: dimensão corrigida nesta conversa de 246x83 para 249x83, para fechar em proporção 3:1 exata. Este é essencialmente o mesmo asset usado no nav-brand (seção 9.2), redimensionado para o uso no footer. Ambos compartilham a mesma proporção 3:1.*

**brand-tagline**

| Propriedade | Valor |
| --- | --- |
| Largura | 392, fill |
| Altura | Hug contents (18) |
| Fonte | Oswald Regular |
| Tamanho | 12 |
| Line height | Auto |
| Letter spacing | 20% |
| Alinhamento | Top-center |
| Conteúdo | "PSICOLOGIA HISTÓRICO-CULTURAL" (maiúsculo) |
| Cor | ■ #F2E6CF |

## 8.4 footer-info

| Propriedade | Valor |
| --- | --- |
| Layout | Autolayout vertical |
| Largura | 440, fill |
| Altura | Hug contents (171) |
| Alinhamento | Top-left |
| Gap | 16 |
| Padding | Lateral 24 · Topo/Baixo 16 |
| Stroke | Top, cor #E0B84D, peso 1, posição inside |

### footer-contato

| Propriedade | Valor |
| --- | --- |
| Layout | Autolayout vertical |
| Largura | 392, fill |
| Altura | Hug contents (78) |
| Alinhamento | Left-center |
| Gap | 16 |
| Padding | 0 (todos os lados) |

**contato-label**

| Propriedade | Valor |
| --- | --- |
| Largura | 55, hug |
| Altura | 18, hug |
| Fonte | Oswald Regular |
| Tamanho | 12 |
| Line height | Auto |
| Letter spacing | 20% |
| Alinhamento | Top-left |
| Conteúdo | "CONTATO" (maiúsculo) |
| Cor | ■ #E0B84D |

**link-email**

| Propriedade | Valor |
| --- | --- |
| Largura | 169, hug |
| Altura | 18, hug |
| Fonte | Oswald Regular |
| Tamanho | 12 |
| Line height | Auto |
| Letter spacing | 20% |
| Alinhamento | Top-left |
| Conteúdo | "[lourencoserpa@gmail.com](mailto:lourencoserpa@gmail.com)" (minúsculo) |
| Cor | ■ #F2E6CF |
| Destino do link | mailto:[lourencoserpa@gmail.com](mailto:lourencoserpa@gmail.com) |

**link-instagram**

| Propriedade | Valor |
| --- | --- |
| Largura | 128, hug |
| Altura | 18, hug |
| Fonte | Oswald Regular |
| Tamanho | 12 |
| Line height | Auto |
| Letter spacing | 20% |
| Alinhamento | Top-left |
| Conteúdo | "@psi.lourencoserpa" (minúsculo) |
| Cor | ■ #F2E6CF |
| Destino do link | [https://www.instagram.com/psi.lourencoserpa](https://www.instagram.com/psi.lourencoserpa) (mesmo link do icon-instagram, seção 7.4) |

### footer-legal

| Propriedade | Valor |
| --- | --- |
| Layout | Autolayout vertical |
| Largura | 392, fill |
| Altura | Hug contents (44) |
| Alinhamento | Left-center |
| Gap | 8 |
| Padding | 0 (todos os lados) |

**link-termos**

| Propriedade | Valor |
| --- | --- |
| Largura | 139, hug |
| Altura | 18, hug |
| Fonte | Oswald Regular |
| Tamanho | 12 |
| Line height | Auto |
| Letter spacing | 20% |
| Alinhamento | Top-left |
| Conteúdo | "TERMOS E CONDIÇÕES" (maiúsculo, sublinhado) |
| Cor | ■ #E0B84D |
| Destino do link | Sem destino nesta v1 (href vazio, clique não faz nada). Página de Termos e Condições ainda não existe, fase posterior ao lançamento da v1 (ver seção 12). |

**link-politica**

| Propriedade | Valor |
| --- | --- |
| Largura | 169, hug |
| Altura | 18, hug |
| Fonte | Oswald Regular |
| Tamanho | 12 |
| Line height | Auto |
| Letter spacing | 20% |
| Alinhamento | Top-left |
| Conteúdo | "POLÍTICAS DE PRIVACIDADE" (maiúsculo, sublinhado) |
| Cor | ■ #E0B84D |
| Destino do link | Sem destino nesta v1 (href vazio, clique não faz nada). Página de Política de Privacidade ainda não existe, fase posterior ao lançamento da v1 (ver seção 12). |

## 8.5 footer-bottom

| Propriedade | Valor |
| --- | --- |
| Layout | Autolayout vertical |
| Largura | 440, fill |
| Altura | Hug contents (46) |
| Alinhamento | Center-center |
| Gap | 8 |
| Padding | Lateral 24 · Topo/Baixo 16 |
| Stroke | Top, cor #E0B84D, peso 1, posição inside |

**bottom-text**

| Propriedade | Valor |
| --- | --- |
| Largura | 362, hug |
| Altura | 13, hug |
| Fonte | Oswald Regular |
| Tamanho | 9 |
| Line height | Auto |
| Letter spacing | 20% |
| Alinhamento | Top-left |
| Conteúdo | "CRP 07/43508 · © 2026 Lourenço Serpa · Todos os direitos reservados" (minúsculo) |
| Cor | ■ #E0B84D |

## 8.6 Decisões e observações registradas

- footer é a primeira seção a usar a paleta Stepanova Dark (fundo #5E1321). O header/menu também usará essa paleta quando for documentado.

- link-email e link-instagram têm destino de clique real (mailto e perfil do Instagram). link-termos e link-politica ficam sem destino nesta v1 (href vazio), confirmado nesta conversa, pendente de criação futura das páginas.

- brand-logo segue o mesmo padrão de asset estático PNG usado nos demais lockups da página, com o wordmark já fundido na imagem. Dimensão corrigida nesta conversa para 249x83 (3:1 exato); é o mesmo asset em essência usado no nav-brand (seção 9.2), apenas redimensionado.

# 9. Nav (Header / Menu)

Componente de navegação fixo, com propriedades state (closed / open) e theme (light / dark). O tema light foi criado no Figma como reserva, mas não está em uso — apenas o tema dark é documentado abaixo, seguindo a mesma paleta Stepanova Dark do footer (ver seção 8).

*Nota: Posicionamento fixed (não sticky): o nav-bar fica travado numa posição fixa da viewport durante todo o scroll, independente da posição do conteúdo. No protótipo Figma, a posição documentada é X=0, Y=62, ou seja, imediatamente após a status bar (ver seção 10.2). Em mobile web (diferente de um app nativo), não existe uma status bar controlável pelo site; o respiro de 62px visto no protótipo simula a status bar do iPhone e não precisa ser replicado como espaço vazio adicional em produção web, o nav-bar deve ficar colado no topo real do viewport do navegador.*

## 9.1 Estrutura e nomenclatura

nav (componente, propriedades: state [closed/open] × theme [light/dark])
│
├── nav-bar (frame presente em AMBOS os estados — barra fixa)
│   ├── nav-brand (imagem estática PNG)
│   └── nav-toggle (ícone: hambúrguer no closed, X no open — mesma instância)
│
└── nav-links (frame presente APENAS no estado open — painel de navegação)
    └── nav-links-content
        ├── nav-links-list
        │   ├── nav-link-historia ("A história")
        │   ├── nav-link-abordagem ("A abordagem")
        │   └── nav-link-contato ("Contato")
        └── button-label
            └── button-text ("Vamos conversar")

## 9.2 nav-bar

| Propriedade | Valor |
| --- | --- |
| Dimensões | W 440 x H 96 |
| Posição na viewport | X=0, Y=62 (fixed, imediatamente após a status bar) |
| Alinhamento | Center |
| Padding | Lateral 24 · Topo/Baixo 16 |
| Fill | ■ #5E1321 (Vinho Noite, mesma cor do footer) |
| Drop shadow (estado closed) | X=0, Y=4, Blur=4, Spread=0, cor #000000 20% |

**nav-brand**

| Propriedade | Valor |
| --- | --- |
| Tipo de asset | Imagem estática PNG (elemento direto, sem frame wrapper) |
| Dimensões | W 192 x H 64 |
| Proporção | 3:1 |

*Nota: mesmo asset (em essência) usado no brand-logo do footer (seção 8.3), redimensionado para 192x64 nesta instância. Ambos confirmados na mesma proporção 3:1.*

**nav-toggle**

| Propriedade | Valor |
| --- | --- |
| Dimensões | W 48 x H 48 |
| Cor | ■ #F2E6CF (Creme Luz) |
| Comportamento | Mesma instância alterna entre ícone de hambúrguer (estado closed) e X (estado open) |

## 9.3 nav-links (painel do estado open)

| Propriedade | Valor |
| --- | --- |
| Layout | Autolayout vertical |
| Largura | 440, fill |
| Altura | 894, fixed (corrigido de um valor anterior de 798, confirmado nesta conversa) |
| Posição na viewport | X=0, Y=62 (mesma posição X/Y do nav-bar fechado, ocupa o restante da tela abaixo da status bar) |
| Alinhamento | Center-center |
| Gap | 8 |
| Padding | Lateral 80 · Topo/Baixo 160 |
| Fill | ■ #5E1321 (mesma cor do nav-bar e do footer) |

*Nota: A altura de 894 corresponde à viewport de referência (W440 x H956, iPhone Pro Max) menos os 62px da status bar. No estado open, o painel nav-links ocupa toda a área abaixo da status bar, sobrepondo o nav-bar e todo o conteúdo da página.*

### nav-links-content

| Propriedade | Valor |
| --- | --- |
| Layout | Autolayout vertical |
| Largura | 280, fill |
| Altura | Hug contents (474) |
| Alinhamento | Center-top |
| Gap | 120 |
| Padding | 0 (todos os lados) |

### nav-links-list

| Propriedade | Valor |
| --- | --- |
| Layout | Autolayout vertical |
| Largura | 280, fill |
| Altura | Hug contents (274) |
| Alinhamento | Center-top |
| Gap | 36 |
| Padding | 0 (todos os lados) |

**nav-link-historia / nav-link-abordagem / nav-link-contato**

| Propriedade | Valor |
| --- | --- |
| Fonte | Rodchenko Normal |
| Tamanho | 36 |
| Line height | 190% |
| Letter spacing | 10% |
| Alinhamento | Center-top |
| Cor | ■ #F2E6CF |

| Link | Destino (scroll-to-anchor) |
| --- | --- |
| nav-link-historia | Sobre Section (seção 3) |
| nav-link-abordagem | Abordagem Section (seção 4) |
| nav-link-contato | Contato Section (seção 6) |

## 9.4 button-label (CTA dentro do nav-links)

| Propriedade | Valor |
| --- | --- |
| Layout | Autolayout |
| Largura | 280, fill |
| Altura | Hug contents (78) |
| Alinhamento | Center-center |
| Gap | 8 |
| Padding | Lateral 24 · Topo/Baixo 16 |
| Fill | ■ #E0B84D (Dourado Vanguarda) |
| Drop shadow | X=4, Y=4, Blur=0, Spread=0, cor #F2E6CF 100% |

**button-text**

| Propriedade | Valor |
| --- | --- |
| Conteúdo | "VAMOS CONVERSAR" (maiúsculo) |
| Fonte | Rodchenko Bold |
| Tamanho | 24 |
| Line height | 190% |
| Letter spacing | 10% |
| Cor | ■ #5E1321 (Vinho Noite) |

*Nota: Este botão usa uma combinação de cores invertida em relação aos demais CTAs do site: fundo dourado (#E0B84D) com texto escuro (#5E1321) e sombra clara (#F2E6CF), ao contrário do padrão vermelho/creme usado nos outros botões primários (hero, sobre, contato). Isso é intencional — confirmado nesta conversa — por se tratar do tema dark do componente nav.*

## 9.5 Interação (abertura e fechamento do menu)

| Propriedade | Valor |
| --- | --- |
| Gatilho | On tap, no nav-toggle |
| Ação | Change to (troca de variante do componente nav) |
| Estado de destino (ao abrir) | Open |
| Tema de destino | Dark |
| Animação | Smart animate |
| Easing | Ease out |
| Duração | 300ms |

*Nota: A interação de fechamento (tap no nav-toggle em X, estado open) usa exatamente os mesmos parâmetros de animação (Smart animate, ease out, 300ms), trocando apenas o sentido: de Open para Closed.*

## 9.6 Decisões e observações registradas

- Componente nav tem 4 variantes no Figma (2 temas × 2 estados), mas apenas o tema dark está em uso nesta v1. O tema light foi mantido como reserva, não documentado.

- nav-toggle é uma única instância que alterna entre ícone de hambúrguer (closed) e X (open), não dois elementos separados.

- Mapeamento de destino dos links de navegação confirmado: história→Sobre, abordagem→Abordagem, contato→Contato (scroll-to-anchor).

- Posicionamento corrigido nesta conversa: fixed (não sticky), em X=0 Y=62. O respiro do protótipo que simula uma status bar de app não deve ser replicado em produção web.

- Drop shadow do nav-bar (estado closed) documentado nesta conversa: X=0, Y=4, Blur=4, Spread=0, cor #000000 20%.

- Altura do nav-links (estado open) corrigida de 798 para 894, valor que corresponde à viewport de referência (H956) menos a status bar (62px).

- nav-brand corrigido para W192 x H64 (proporção 3:1 real do arquivo PNG), após inconsistência identificada em relação a um valor anterior (W256 x H64, que resultaria em distorção da imagem).

# 10. Montagem da Página e Especificações Globais

## 10.1 Viewport de referência

| Propriedade | Valor |
| --- | --- |
| Device alvo da v1 | iPhone Pro Max 17 |
| Dimensões da viewport | W 440 x H 956 |
| Escopo | Mobile-only. Não documentar nem implementar breakpoints para tablet ou desktop nesta fase |

## 10.2 Elementos fixos (fora do fluxo de scroll)

Dois elementos ficam fixos na viewport, sobrepostos ao conteúdo, e não fazem parte do agrupamento de scroll descrito em 10.3.

### status-bar

| Propriedade | Valor |
| --- | --- |
| Dimensões | W 440 x H 62 |
| Fill | Branco |
| Posição | X=0, Y=0 |
| Comportamento no protótipo | Fixed (stay in place), sem scroll, sem overflow |

*Nota: Este elemento simula a status bar nativa do iPhone dentro do protótipo Figma. Em produção web não existe uma status bar controlável pelo site, então este elemento não deve ser replicado como componente da página, mas o respiro de 62px que ele ocupa no topo da viewport de referência é relevante para o cálculo das demais posições (nav-bar, landing page content).*

### nav-bar

Ver especificação completa na seção 9. Posição na viewport: X=0, Y=62 (imediatamente após a status bar), comportamento fixed.

## 10.3 landing-page-content (wrapper de scroll)

Agrupamento que contém todas as seções roláveis da página (Hero, Topics Ticker, Sobre, Abordagem, Prática, Contato, Redes, Footer).

| Propriedade | Valor |
| --- | --- |
| Layout | Autolayout vertical |
| Alinhamento | Top-center |
| Largura | 440, fixed |
| Altura | 4626, hug contents |
| Gap | 16 (entre cada par de seções internas) |
| Padding | 0 (todos os lados) |
| Posição na viewport | X=0, Y=158 (imediatamente após o nav-bar, sem gap adicional entre nav-bar e o início do Hero) |
| Comportamento no protótipo | Scroll with parent, overflow scrolling |

*Nota: Como o padding deste autolayout é 0, o gap de 16px se aplica apenas entre as seções internas (por exemplo, entre o fim do Hero e o início do Topics Ticker). Não há respiro de 16px antes do Hero nem depois do Footer, confirmado nesta conversa. O padding interno de cada seção individual (já documentado nas seções 1 a 8) continua valendo normalmente.*

## 10.4 Ordem final das seções

Confirmada nesta conversa: a ordem de empilhamento vertical dentro do landing-page-content é a mesma da numeração deste documento.

| Ordem | Seção |
| --- | --- |
| 1 | Hero |
| 2 | Topics Ticker |
| 3 | Sobre |
| 4 | Abordagem |
| 5 | Prática |
| 6 | Contato |
| 7 | Redes |
| 8 | Footer |

*Nota: Nav (seção 9) não entra nessa sequência. É um componente fixed sobreposto ao topo da viewport, fora do wrapper de scroll landing-page-content.*

## 10.5 Transição visual entre paleta Light e paleta Dark

| Propriedade | Valor |
| --- | --- |
| Tipo de transição | Corte seco, sem elemento de transição visual (faixa, gradiente ou forma geométrica) |
| Comportamento | O footer simplesmente inicia com fundo #5E1321 (Vinho Noite) logo após o fim da seção Redes (paleta Light), separado apenas pelo gap padrão de 16px |

## 10.6 Decisões e observações registradas

- Viewport de referência da v1: iPhone Pro Max 17, W440 x H956, mobile-only.

- Status bar (W440 x H62, branca, fixed) documentada como elemento de referência do protótipo, não como componente a ser replicado em produção web.

- Nav-bar reposicionado corretamente como fixed (não sticky), em X=0 Y=62.

- Landing-page-content documentado como wrapper único de scroll, W440 fixed, H4626 hug, gap 16 entre seções, padding 0, posicionado em X=0 Y=158.

- Gap de 16px entre seções corrigido nesta conversa: aplica-se apenas entre seções internas, não antes do Hero nem depois do Footer, conforme o comportamento real do autolayout com padding 0.

- Ordem das seções confirmada como final, coincide com a ordem de numeração do handoff.

- Transição Light para Dark é um corte seco intencional, sem elemento de transição.

# 11. Assets Físicos e Checklist de Exportação

## 11.1 Estrutura de pastas

Pasta única, sem subpastas, com nomenclatura consistente. Os nomes de arquivo seguem exatamente a nomenclatura de camada/componente já usada neste handoff (seções 1 a 9), evitando qualquer tradução ou apelido diferente entre Figma, pasta de assets e código.

## 11.2 Checklist de exportação

Conferido nesta conversa a partir da pasta real de exports de Filipe. Todos os 26 assets da especificação foram localizados. Dimensões em pixels não são verificáveis a partir de uma listagem de pasta (que só mostra tamanho em Ko), então a coluna Dimensões permanece como especificação de referência, a confirmar visualmente por Filipe.

### Lockups e logos (imagem estática composta)

| Arquivo | Seção de origem | Formato/resolução especificado | Dimensões | Status |
| --- | --- | --- | --- | --- |
| hero-lockup.png | 1. Hero | PNG, exportado em 3x | 440 x 288 | Exportado |
| sobre-lockup.png | 3. Sobre | PNG | 440 x 332 | Exportado |
| nav-brand.png | 9. Nav | PNG | 192 x 64 | Exportado |
| brand-logo.png | 8. Footer | PNG | 249 x 83 | Exportado |

*Nota: confirmado nesta conversa que nav-brand.png e brand-logo.png são, em essência, o mesmo asset, redimensionado para dois usos diferentes: 192x64 no nav e 249x83 no footer, ambos em proporção 3:1 exata. Não é duplicação acidental, é reuso intencional do mesmo lockup em duas dimensões.*

### Ícones dos pilares (Abordagem)

| Arquivo | Seção de origem | Formato | Dimensões | Status |
| --- | --- | --- | --- | --- |
| pilar-historia-a.svg / pilar-historia-b.svg | 4. Abordagem | SVG | 70 x 70 | Exportado |
| pilar-cultura-a.svg / pilar-cultura-b.svg | 4. Abordagem | SVG | 70 x 70 | Exportado |
| pilar-coletivo-a.svg / pilar-coletivo-b.svg | 4. Abordagem | SVG | 70 x 70 | Exportado |
| pilar-mediacao-a.svg / pilar-mediacao-b.svg | 4. Abordagem | SVG | 70 x 70 | Exportado |
| pilar-autonomia-a.svg / pilar-autonomia-b.svg | 4. Abordagem | SVG | 70 x 70 | Exportado |
| pilar-consciencia-a.svg / pilar-consciencia-b.svg | 4. Abordagem | SVG | 70 x 70 | Exportado |

*Nota: 6 pilares x 2 estados (a/b) = 12 arquivos SVG no total. Problema de nomenclatura identificado numa conferência anterior (acento nos arquivos de mediação e consciência) foi corrigido por Filipe; todos os 6 pilares agora seguem o mesmo padrão sem acento.*

### Montagens (Prática)

| Arquivo | Seção de origem | Formato | Dimensões | Status |
| --- | --- | --- | --- | --- |
| lourenco-montage-default.png | 5. Prática | PNG, fundo transparente | 404 x 440 | Exportado |
| lourenco-montage-quem.png | 5. Prática | PNG, fundo transparente | 404 x 440 | Exportado |
| lourenco-montage-como.png | 5. Prática | PNG, fundo transparente | 404 x 440 | Exportado |
| lourenco-montage-sobre-o-que.png | 5. Prática | PNG, fundo transparente | 404 x 440 | Exportado |

### Ícones sociais (Redes)

| Arquivo | Seção de origem | Formato | Dimensões | Status |
| --- | --- | --- | --- | --- |
| icon-instagram.svg | 7. Redes | SVG | 44 x 44 | Exportado |
| icon-tiktok.svg | 7. Redes | SVG | 44 x 44 | Exportado |
| icon-youtube.svg | 7. Redes | SVG | 44 x 44 | Exportado |

### Posts do carrossel (Redes)

| Arquivo | Seção de origem | Formato | Dimensões | Status |
| --- | --- | --- | --- | --- |
| post-1.png | 7. Redes | Imagem estática única | 176 x 220 | Exportado |
| post-2.png | 7. Redes | Imagem estática única | 176 x 220 | Exportado |
| post-3.png | 7. Redes | Imagem estática única | 176 x 220 | Exportado |

### Ícone de navegação (Nav)

| Arquivo | Seção de origem | Formato | Dimensões | Status |
| --- | --- | --- | --- | --- |
| nav-toggle-menu.svg | 9. Nav | SVG | 48 x 48 | Exportado |
| nav-toggle-close.svg | 9. Nav | SVG | 48 x 48 | Exportado |

*Nota: confirmado nesta conversa que o nav-toggle foi exportado como dois arquivos separados (menu e close), não como um único SVG com estado. Implementação em produção deve trocar entre os dois assets via classe/estado, conforme o comportamento documentado na seção 9.2 (mesma instância alterna entre hambúrguer e X).*

## 11.3 Total de arquivos

| Categoria | Quantidade |
| --- | --- |
| Lockups e logos | 4 |
| Ícones dos pilares | 12 |
| Montagens (Prática) | 4 |
| Ícones sociais | 3 |
| Posts do carrossel | 3 |
| Ícone de navegação | 2 (nav-toggle-menu.svg e nav-toggle-close.svg, confirmado nesta conversa) |
| **Total** | **28 arquivos** |

## 11.4 Decisões e observações registradas

- Estrutura de pastas definida: pasta única, sem subpastas, nomenclatura consistente com os nomes de camada já usados no handoff.

- Checklist conferido nesta conversa contra a pasta real de exports de Filipe: todos os 26 assets da especificação original foram localizados, mais 2 arquivos de nav-toggle (total 28).

- Problema de nomenclatura corrigido por Filipe: pilar-mediacao-a/b.svg e pilar-consciencia-a/b.svg renomeados sem acento, seguindo o mesmo padrão dos demais quatro pilares. Checklist de pilares 100% consistente.

- nav-brand.png e brand-logo.png confirmados como o mesmo asset em essência, redimensionado para dois usos: 192x64 no nav, 249x83 no footer (ambos proporção 3:1 exata, corrigido nesta conversa a partir do valor anterior de 246x83). Não era duplicação acidental.

- nav-toggle confirmado como 2 arquivos exportados separadamente (nav-toggle-menu.svg, nav-toggle-close.svg), não um único SVG com estado, conforme perguntado na primeira versão deste checklist.

# 12. Páginas e Conteúdos Fora do Escopo da v1

Todos os links secundários abaixo estão documentados nas seções correspondentes com destino vazio (sem href, clique não faz nada) nesta v1. Esta seção consolida o que se sabe hoje sobre os destinos futuros, para referência quando essas fases começarem.

## 12.1 Página "Psicologia Histórico-Cultural" (nome provisório)

| Propriedade | Valor |
| --- | --- |
| Origem do link | hero-link-secondary ("Como funciona a terapia") e abordagem-link-secondary ("Entenda um pouco mais") apontam para a mesma página futura |
| Conteúdo previsto | Texto educativo sobre a abordagem histórico-cultural |
| Recurso associado | E-book "E-book PHC Lourenço Serpa" (nome provisório), escrito pelo Lourenço |
| Mecanismo de entrega do e-book | Ainda a definir. Duas opções em consideração: botão de download direto, ou campo de e-mail para envio do e-book por e-mail (opção mais provável no momento, segundo Filipe) |
| Status | Página e e-book não existem ainda. Fase posterior ao lançamento da v1 |

## 12.2 Página de biografia do Lourenço

| Propriedade | Valor |
| --- | --- |
| Origem do link | sobre-link-secondary ("Um pouco mais sobre mim") |
| Conteúdo previsto | Texto de apresentação escrito pelo próprio Lourenço, contando sua trajetória. Possível vídeo dele falando sobre si e seu modo de ver a psicologia. Também deve reunir os links de redes sociais e o carrossel de posts do Instagram (hoje documentados na seção 7, Redes, dentro da landing page principal) |
| Status | Página, texto e vídeo não existem ainda. Fase posterior ao lançamento da v1 |

## 12.3 Páginas legais

| Propriedade | Valor |
| --- | --- |
| Origem do link | link-termos ("Termos e Condições") e link-politica ("Políticas de Privacidade"), no footer |
| Status | Páginas não existem ainda. Fase posterior ao lançamento da v1 |

## 12.4 Decisões e observações registradas

- Todos os links acima ficam com href vazio na v1 (clique não leva a lugar nenhum), decisão confirmada nesta conversa.

- Esta seção existe apenas como referência de escopo futuro. Nenhum destes itens faz parte do escopo de implementação da v1 mobile documentada neste handoff.

# 13. Arquivos de Fonte

## 13.1 Fontes usadas na landing page

Levantamento feito a partir de todas as seções documentadas (1 a 9) deste handoff.

| Fonte | Peso(s) usado(s) na landing page |
| --- | --- |
| Rodchenko | Bold, Normal |
| Oswald | Regular, Medium |
| PT Sans | Regular |

*Nota: Bebas Neue, listada no brand book como tipografia-chave do projeto, não aparece em nenhuma seção da landing page documentada neste handoff. Confirmado nesta conversa que ela é usada em outras peças do projeto (fora do escopo deste documento), não na landing page.*

## 13.2 Oswald e PT Sans

| Propriedade | Valor |
| --- | --- |
| Origem | Google Fonts (fontes abertas, uso pessoal e comercial livre) |
| Método de inclusão | Link/CDN direto do Google Fonts, sem necessidade de hospedar arquivos no projeto (decisão confirmada nesta conversa) |

## 13.3 Rodchenko — fonte comercial, licenciamento via Adobe Fonts

| Propriedade | Valor |
| --- | --- |
| Fundição | Paratype |
| Designer | Tagir Safayev |
| Disponível em | Adobe Fonts (fonts.adobe.com/fonts/rodchenko) |
| Cobertura da licença Adobe Fonts | Uso pessoal e comercial, incluindo publicação web ("Website Publishing: Create a Web Project to add any font from our service to your website") |
| Método de inclusão correto | Ativar a fonte em um "Web Project" no site da Adobe Fonts para o domínio da landing page, e usar o link/CSS gerado por eles. A fonte é servida pelos servidores da Adobe, não hospedada no projeto |
| Requisito | Assinatura Creative Cloud ativa. Se a assinatura for cancelada, a fonte para de carregar no site |
| Hospedagem própria (self-hosting) | Não coberta pela licença padrão da Adobe Fonts. Precisa ser comprada separadamente direto com a Paratype, se um dia for necessário tirar a dependência da Adobe |
| Licença de uso web | Comprada por Filipe (licença web/webfont, separada da licença desktop), cobre Rodchenko Normal e Bold para uso no site em produção. Resolvido |
| Uso no Figma (arquivo de design) | O arquivo usado atualmente no Figma é uma cópia sem licença verificada (origem não autorizada). Filipe optou conscientemente por manter esse arquivo no Figma por enquanto, mesmo após ser informado do risco e de uma alternativa gratuita disponível (ativar a Rodchenko pelo Creative Cloud desktop app, já que a conta gratuita permitiu adicioná-la à biblioteca sem cobrança). Risco conhecido e aceito por decisão do designer, não uma pendência de documentação |

*Nota importante: um arquivo **"**.otf**"**/**"**.ttf**"** chamado **"**Rodchenko**"** havia sido baixado de um site de fonte gratuita de origem não verificada, prática comum de redistribuição não autorizada de fontes comerciais. Esse arquivo NÃO deve ser usado como asset de produção no site. A fonte real, encontrada e confirmada nesta conversa, é a Rodchenko da Paratype disponível via Adobe Fonts, com uso web coberto pela licença Adobe Fonts (Website Publishing), desde que ativada via Web Project e carregada pelo serviço da Adobe, não pelo arquivo baixado anteriormente.*

## 13.4 Resolução da licença web (comprada)

| Propriedade | Valor |
| --- | --- |
| Status | Resolvido nesta conversa |
| Licenças compradas | Rodchenko Normal e Rodchenko Bold, licença web/webfont |
| Cobertura | Uso da fonte no site em produção (a mesma finalidade documentada na seção 13.3) |
| Uso no Figma | Não coberto por essa compra (licença web não cobre uso em app de design). Ver observação na seção 13.3 sobre o arquivo atualmente em uso no Figma |

## 13.5 Decisões e observações registradas

- Conjunto final de fontes da landing page: Rodchenko (Bold, Regular), Oswald (Regular, Medium), PT Sans (Regular).

- Bebas Neue confirmada como fora do escopo da landing page, usada em outras peças do projeto.

- Oswald e PT Sans via Google Fonts CDN, sem necessidade de arquivos locais.

- Risco de licenciamento identificado nesta conversa: o arquivo de Rodchenko usado originalmente no Figma era de origem não verificada (provável cópia não autorizada). Para o site em produção, o risco foi resolvido: Filipe comprou a licença web/webfont oficial de Rodchenko Normal e Bold.

- Risco residual, aceito conscientemente por Filipe: o arquivo sem licença continua em uso no Figma para o trabalho de design (incluindo os assets já exportados, como os lockups documentados na seção 11). Uma alternativa gratuita foi oferecida (ativar a Rodchenko pelo Creative Cloud desktop app, aproveitando o acesso já obtido pela conta gratuita) e recusada por Filipe nesta conversa. Documentado para transparência, não é uma pendência em aberto, é uma decisão tomada.

# 14. Metadados da Página

## 14.1 Título da aba (title tag)

| Propriedade | Valor |
| --- | --- |
| Conteúdo | "Lourenço Serpa │ Psicologia Histórico-Cultural" |

## 14.2 Meta description

| Propriedade | Valor |
| --- | --- |
| Conteúdo | "Psicoterapia com Lourenço Serpa, psicólogo histórico-cultural. Atendimento para adolescentes e adultos, presencial ou online, com vagas sociais." |
| Tamanho | 144 caracteres |

## 14.3 Favicon

| Arquivo | Tamanho | Uso |
| --- | --- | --- |
| favicon-180x180.png | 180 x 180 | Apple touch icon (tela inicial do iPhone) |
| favicon-192x192.png | 192 x 192 | Ícone Android/PWA, também usado como favicon geral (navegador redimensiona conforme necessário) |

| Propriedade | Valor |
| --- | --- |
| Conteúdo visual | Iniciais "LS", Rodchenko Bold, vermelho sobre fundo claro |
| Formato | PNG (sem versão SVG nesta v1) |

*Nota: não há versão de 32x32 nem SVG nesta v1 (removidas por Filipe durante esta conversa). Considerado aceitável dado o desenho simples e geométrico do ícone, que escala bem para tamanhos pequenos sem perda de legibilidade.*

## 14.4 Imagem de Open Graph

| Propriedade | Valor |
| --- | --- |
| Arquivo | og-image.png |
| Dimensões | 8000 x 4209 (proporção 1,9:1, múltiplo de 1200x630 para maior nitidez em telas retina) |
| Tamanho de arquivo | 383 KB |
| Conteúdo visual | Lockup completo (retrato, wordmark "Lourenço Serpa" na diagonal, tags "Psicologia"/"Histórico-Cultural"), paleta Stepanova Dark |

## 14.5 Decisões e observações registradas

- Título, meta description, favicon (2 tamanhos PNG) e imagem de Open Graph definidos e conferidos nesta conversa. Ponto 7 do roadmap fechado.

- Nomenclatura dos arquivos de favicon corrigida durante esta conversa: erro de digitação ("favcon" → "favicon") e padronização de separador (underscore → hífen), para manter consistência com o padrão de nomenclatura definido na seção 11.

- Dimensões da og-image.png conferidas nesta conversa: 8000x4209, proporção 1,9:1 confirmada, tamanho de arquivo dentro do recomendado (abaixo de 1MB).

# PARTE 2 — Comportamento Interativo e Animações (origem: sessão de refinamento em código)

## O Novo Sujeito — Landing Page · Lourenço Serpa · Psicologia Histórico-Cultural

### Sobre esta parte

Documenta exclusivamente o comportamento interativo e as animações implementadas em código durante a sessão de refinamento, que não existiam ou não estavam especificadas na Parte 1. Escopo: viewport mobile fixo 440×956 (v1). Desktop e demais breakpoints são fase futura, não coberta aqui.

Arquivo de referência da implementação: O Novo Sujeito.dc.html (React, classe única Component extends DCLogic, template com holes {{ }} e diretivas sc-for/sc-if).

**Onde esta parte diverge da Parte 1 (estrutura/Figma), esta parte é a fonte de verdade**, conforme nota de reconciliação no início deste documento.

## 1. Nav-bar / Nav-links

### 1.1 Estrutura e nomenclatura

nav-bar (fixed, W min(440px,100%) centrado, H 96, top:0, z-index:60)
├── nav-brand (img, 192×64)
└── hamburger-icon (button 48×48)
    └── 3 spans (28×2, top/middle/bottom) — ver 1.4
nav-overlay (fixed, top:96px, H calc(100vh-96px), overflow:hidden — máscara da "porta")
└── nav-links (translateY door, background #5E1321)
    ├── nav-links-content (3× <a>, link.label)
    └── nav-cta-area → button-label (Vamos Conversar)

### 1.2 nav-bar — fixed no topo

- position: fixed; top: 0; left: 50%; transform: translateX(-50%); width: min(440px, 100%); z-index: 60.

- Conteúdo (padding-top: 96px) adicionado ao wrapper de página para compensar a saída do nav-bar do fluxo normal.

- **Drop shadow (toggle fechado/aberto):** box-shadow: 0 4px 4px rgba(0,0,0,0.2) fechado → 0 4px 4px rgba(0,0,0,0) aberto. transition: box-shadow 250ms ease. Objetivo: nav-bar e nav-links lerem como uma superfície única e contínua quando abertos.

### 1.3 nav-overlay — animação "porta enrolável" (door effect)

- Container externo fixo (nav-overlay) com height: calc(100vh - 96px) e overflow: hidden funciona como máscara.

- Conteúdo interno (nav-links) anima via transform: translateY(), **nunca height/scaleY** (evita efeito sanfona no conteúdo interno):

- Fechado: translateY(-100%)

- Aberto: translateY(0)

- transition: transform 600ms ease-out (mesmo valor abre/fecha).

- pointer-events alternam via estado (none fechado / auto aberto) para não bloquear cliques no conteúdo por trás quando fechado.

### 1.4 Hamburger → X (morph de 3 linhas)

Ícone reconstruído como 3 <span> de 28×2px, background: #F2E6CF, não como troca de dois SVGs.

- Linha superior: translateY(0) rotate(0deg) fechado → translateY(9px) rotate(45deg) aberto.

- Linha inferior: translateY(0) rotate(0deg) fechado → translateY(-9px) rotate(-45deg) aberto.

- Linha do meio: opacity: 1 fechado → opacity: 0 aberto.

- Cada propriedade com transition: 300ms ease-in-out própria (transform nas linhas 1/3, opacity na linha 2).

### 1.5 Scroll lock (menu aberto)

- Ao abrir: lockScroll() aplica document.body.style.position = 'fixed', top: -${scrollY}px, left/right: 0, width: 100%, overflow: hidden — técnica clássica de "freeze" de scroll sem perder a posição.

- Ao fechar: unlockScroll() reverte todos os estilos e chama window.scrollTo(0, scrollY salvo).

- Objetivo: nav-bar + nav-links formam um bloco único e colado; o conteúdo por trás não pode rolar nem se mover enquanto o menu está aberto.

### 1.6 Entrada dos itens internos (fade-in-up com stagger)

Aplicado individualmente a cada um dos 3 links + botão CTA (não no container pai):

- Keyframe fadeInUp: opacity 0 → 1, translateY(60%) → translateY(0).

- animation: fadeInUp 1125ms ease-out {delay}ms both, onde delay = 350ms + índice×200ms (350/550/750/950ms para link1/link2/link3/CTA).

- animation-fill-mode: both garante que o elemento nasce já no estado inicial (sem depender de timing de mount).

- Ao fechar: sem transição reversa nos itens (comportamento instantâneo), conforme decisão registrada abaixo.

### 1.7 Decisões e observações registradas

- Técnica de animação da porta foi corrigida nesta sessão: implementações iniciais via height/scaleY causavam deformação visual do conteúdo interno; solução final usa overflow:hidden + translateY no container/conteúdo separadamente.

- Duração da porta foi ajustada de 300ms → 600ms (dobrada) a pedido, mantendo o mesmo easing.

- O nav-bar era originalmente position: sticky (ver Parte 1); foi trocado para position: fixed explicitamente nesta sessão, com wrapper dedicado para preservar a largura de 440px centrada (fixed não herda a largura do container como sticky).

- Botão CTA do menu usa a mesma lógica de "button-label com press state" documentada na seção 12.

## 2. Hero Section

### 2.1 Animação de entrada (on load, não scroll-triggered)

5 elementos, cada um com sua própria animation inline, disparada uma única vez no carregamento da página (hero está above the fold):

| Elemento | Direção | Delay |
| --- | --- | --- |
| hero-lockup | fadeInRight (translateX 60%→0, da direita) | 0ms |
| hero-headline | fadeInUp (translateY 60%→0) | 200ms |
| hero-body | fadeInUp | 400ms |
| hero-link-secondary-area | fadeInUp | 600ms |
| hero-cta-primary-area | fadeInUp | 800ms |

Todas com 1125ms ease-out … both. hero-kicker e topics-ticker **não** animam (permanecem sempre visíveis, por decisão explícita).

### 2.2 Correção de texto

headline-text: os segmentos "você" e "." foram unificados em um único segmento de texto ('você.') para eliminar um espaço indesejado entre a palavra e o ponto final que surgia na renderização por segmentos separados.

### 2.3 Decisões e observações registradas

- hero-lockup foi o único elemento do Hero convertido de fade-in-up para fade-in-right (a pedido, para variar a direção de entrada entre elementos de imagem vs. texto).

## 3. Topics Ticker

Sem alterações de comportamento nesta sessão. Scroll horizontal infinito (animation: ons-ticker-scroll 22s linear infinite), não afetado pelo sistema de fade-in (exclusão explícita).

## 4. Sobre

### 4.1 Animação de entrada (scroll-triggered via Intersection Observer)

Grupo "sobre", threshold 0.18 (dispara com ~15–20% do elemento visível), dispara uma única vez por elemento:

| Elemento | Direção | Delay |
| --- | --- | --- |
| sobre-lockup | fadeInLeft (da esquerda) | 0ms |
| sobre-headline | fadeInUp | 200ms |
| sobre-body | fadeInUp | 400ms |
| sobre-link-secondary-area | fadeInUp | 600ms |

### 4.2 Decisões e observações registradas

- sobre-lockup teve a direção trocada de fadeInRight para fadeInLeft a pedido, para contrastar com hero-lockup (direita) e footer-brand (esquerda) — ver seção 12.2 para o racional do sistema de direções.

## 5. Abordagem — Pilares

### 5.1 Layout (grid)

- display: grid; grid-template-columns: 1fr 1fr; row-gap: 32px; column-gap: 16px; padding: 32px 92px (padding vertical ajustado de 24px→32px nesta sessão, horizontal inalterado).

### 5.2 Animação de entrada — pareada por linha

Os 6 ícones foram reagrupados em 3 pares (por linha do grid), cada par compartilhando o mesmo delay, um item entrando da esquerda e o outro da direita:

| Par | Itens | Direção | Delay |
| --- | --- | --- | --- |
| 1 | pilar-historia (esquerda) / pilar-cultura (direita) | fadeInLeft / fadeInRight | 0ms |
| 2 | pilar-coletivo (esquerda) / pilar-mediacao (direita) | fadeInLeft / fadeInRight | 200ms |
| 3 | pilar-autonomia (esquerda) / pilar-consciencia (direita) | fadeInLeft / fadeInRight | 400ms |

Todos 1125ms ease-out, threshold 0.18 (mesmo Intersection Observer do restante da página).

### 5.3 pilar-icon — transformações de forma (smart-animate → CSS transform)

Cada ícone é um SVG/div inline (não mais par de imagens com cross-fade). Toggle por clique, estado local por pilar (historia|cultura|...: 'a'|'b'). **Todas as transições usam**** ****900ms ease-in-out** (dobrado de 450ms nesta sessão), mesma lógica na abertura e no fechamento (reversão do mesmo transform):

| Pilar | Forma | Transform (a→b) |
| --- | --- | --- |
| historia | Semicírculo | rotate(180deg) em torno do centro próprio (cap-down → cap-up) |
| cultura | Triângulo | rotate(180deg) em torno do centro próprio (ponta cima → ponta baixo) |
| coletivo | Círculo preenchido + círculo contornado | Ambos com translate(), cruzando posições: preenchido translate(22px,22px), contornado translate(-22px,-22px) |
| mediacao | Linha horizontal (estática) + linha diagonal vermelha | Só a diagonal roda: rotate(90deg) em torno do próprio centro; linha horizontal nunca se move |
| autonomia | Hexágono | rotate(30deg) em torno do centro próprio (único pilar com ângulo diferente de 180°) |
| consciencia | Quadrado → círculo | scale(0.3824 → 1) + border-radius(0 → 34px) simultâneos |

### 5.4 Decisões e observações registradas

- Implementação original usava cross-fade de opacidade entre dois SVGs (A/B) por pilar; substituída nesta sessão por um único elemento com transform real, replicando a intenção de Smart Animate do Figma (a Parte 1 já antecipava essa abordagem como recomendação, ver seção 4.3 da Parte 1).

- Ângulo de autonomia (30°) foi decisão de implementação, já que o handoff original não especifica o ângulo exato do hexágono nos dois estados — vale confirmar com o Figma antes do desenvolvimento final se o valor visual bate.

## 6. Abordagem — FAQ (accordion)

### 6.1 Estado inicial

Todos os faq-item **fechados por padrão** no carregamento da página (openFaq: null). Comportamento é radio (um aberto por vez); clicar em um item fecha o anteriormente aberto.

### 6.2 Timing (fonte única, não duplicada)

Uma única constante FAQ_DURATION_MS = 750 alimenta as três transições relacionadas, para nunca ficarem fora de sincronia:

- accordionTransition: max-height 750ms ease-out, opacity 750ms ease-out

- chevronTransition: transform 750ms ease-out

- underlineTransition: transform 750ms ease-in-out

### 6.3 Comportamento de abertura/fechamento

- Altura: max-height: 0px → 500px (não height auto, para permitir transição).

- Texto da resposta (body-text): fade in/out sincronizado, opacity: 0 → 1 junto com a expansão (não aparece abruptamente).

- Chevron: rotate(0deg) → rotate(180deg).

- **Sublinhado do título** (line-title): elemento <span> absoluto, background: #B7020B, height: 2px, transform-origin: left, scaleX(0 → 1). Desenha **da esquerda para a direita** ao abrir e reverte no fechamento. Apenas um item tem sublinhado visível por vez (decorre do comportamento radio do accordion).

### 6.4 Espaçamentos

- Gap entre faq-item: 32px (ajustado progressivamente nesta sessão a partir de 8px original, ver Parte 1 seção 4.4).

### 6.5 Decisões e observações registradas

- Direção do sublinhado passou por uma correção: implementação inicial desenhava direita→esquerda; direção final confirmada é esquerda→direita.

- Gap entre itens do accordion e padding vertical do grid de pilares (seção 5.1) foram incrementados em múltiplas rodadas ao longo da sessão; os valores acima são os finais.

## 7. Prática — Montage

### 7.1 Troca de estado (quem / como / sobre-o-que)

- 3 montage-labels (botões: QUEM, COMO, SOBRE O QUÊ) chamam setPratica(variant), que atualiza state.praticaVariant e troca a imagem exibida (assets/lourenco-montage-{variant}.png, com default como estado inicial).

- Troca de imagem implementada de forma **imperativa**: <img id="pratica-montage-img"> com src estático (lourenco-montage-default.png) no template, atualizado via el.src = ... chamado diretamente no callback do setState de setPratica (não em componentDidUpdate — ver observação técnica abaixo).

- body-text de cada estado (quem/como/sobre-o-que) é posicionado via MONTAGE_BODY[variant] (x, y, largura, segmentos de texto com cores).

### 7.2 Preload de imagens

- No componentDidMount, todas as 4 variantes (default, quem, como, sobre-o-que) são pré-carregadas via new Image().src = ... em background, sem bloquear o render inicial da página.

- **Status: implementado, mas o glitch/flash na primeira troca de estado ainda ocorre.** Diagnóstico solicitado ao Claude Design apontou como causa provável loading="lazy" no <img>, mismatch de URL entre preload e src real, ou remount do elemento <img> no state change (perda de cache do navegador). **Pendente de confirmação e correção final — próximo passo para o desenvolvedor que assumir o código.**

### 7.3 Animação de entrada (scroll-triggered)

| Elemento | Direção | Delay |
| --- | --- | --- |
| pratica-headline | fadeInUp | 0ms |
| pratica-montage | fadeInRight (da direita) | 200ms |

### 7.4 Observação técnica importante para o desenvolvedor

O runtime de componente usado nesta ferramenta **não disparou**** ****componentDidUpdate**** ****de forma confiável** nesta sessão. A sincronização de src da imagem foi movida para o callback de setState (this.setState({...}, callback)) especificamente por essa razão. Em uma stack React padrão (Next.js, CRA, Vite etc.), o padrão idiomático correto é simplesmente **binding declarativo** (<img src={montageImgSrc} />, recalculado a cada render a partir de state.praticaVariant) — não é necessário nem recomendado replicar a solução imperativa; ela foi uma escolha pontual para contornar uma particularidade deste ambiente específico de prototipagem. **Ao portar para a stack de produção, o binding declarativo padrão deve resolver o glitch residual mencionado em 7.2 automaticamente**, já que ele evita as causas mais prováveis do problema (lazy loading e remount).

### 7.5 Decisões e observações registradas

- body-text dos estados "quem" e "como" tiveram a largura da caixa aumentada em 8px (apenas para a direita, x/y mantidos) para evitar quebra da última palavra ("sociais", "rotina") em linha isolada.

- Posição Y do body-text do estado "como" foi deslocada 16px para cima a pedido.

## 8. Contato

### 8.1 Animação de entrada (scroll-triggered)

| Elemento | Direção | Delay |
| --- | --- | --- |
| contato-body | fadeInUp | 0ms |
| field-nome | fadeInUp | 200ms |
| field-motivo | fadeInUp | 400ms |
| field-email | fadeInUp | 600ms |
| field-telefone | fadeInUp | 800ms |
| contato-cta-primary-area | fadeInUp | 1000ms |

### 8.2 Comportamento pós-envio

- Ao submeter com sucesso, o bloco de texto anterior ("Chegou até aqui...") é **substituído** (não empilhado) pela mensagem de confirmação — renderização condicional (sc-if formNotSubmitted / sc-if formSubmitted), nunca os dois simultâneos.

- Mensagem de confirmação: texto centralizado; a frase "O Lourenço vai te responder pessoalmente em breve." recebe sublinhado #B7020B; "Mensagem enviada!" mantém estilo padrão, sem sublinhado.

### 8.3 Decisões e observações registradas

- Nenhuma mudança nesta sessão em validação de formulário ou lógica de envio, apenas no estado visual pós-envio.

## 9. Redes

### 9.1 Animação de entrada

| Elemento | Direção | Delay | Observação |
| --- | --- | --- | --- |
| redes-icon-area | — | — | **Removido do sistema de fade-in** a pedido — sempre visível, sem tracking pelo Intersection Observer |
| redes-carrossel | fadeInRight (da direita) | 200ms | Único elemento do grupo ainda animado |

### 9.2 Decisões e observações registradas

- redes-icon-area foi explicitamente excluído do Intersection Observer (não apenas com a animação desabilitada via CSS) para reduzir o número de elementos monitorados, a pedido, como parte de uma correção de performance de scroll (ver seção 12.4).

## 10. Footer

### 10.1 Animação de entrada

| Elemento | Direção | Delay | Observação |
| --- | --- | --- | --- |
| footer-brand | fadeInLeft (da esquerda) | 0ms |  |
| footer-info | — | — | **Removido do sistema de fade-in** a pedido — sempre visível, sem tracking pelo Intersection Observer |

### 10.2 Ajustes visuais

- brand-tagline ("PSICOLOGIA HISTÓRICO-CULTURAL"): letter-spacing aumentado de 20% para 23%.

- footer-contato-links: mudou de layout horizontal (link-email e link-instagram lado a lado) para stack vertical (link-instagram abaixo de link-email).

### 10.3 Decisões e observações registradas

- Mesma lógica de exclusão do Observer aplicada em redes-icon-area (seção 9.2) foi aplicada aqui a footer-info.

## 11. Botão WhatsApp (elemento flutuante, fora do fluxo de seções)

### 11.1 Especificação

- Link: https://wa.me/5551995612121?text=Ol%C3%A1%2C%20Louren%C3%A7o.%20Vim%20do%20seu%20site%20e%20queria%20conversar → texto pré-preenchido decodificado: **"****Olá, Lourenço. Vim do seu site e queria conversar****"**.

- Posição: position: fixed; bottom: 36px; left: 50%; transform: translateX(-50%); width: min(440px,100%); height: 0 (wrapper), ícone posicionado dentro via right: 36px; bottom: 0, 64×64px, filter: drop-shadow(2px 4px 4px rgba(0,0,0,0.25)).

- target="_blank" rel="noopener noreferrer".

- Ícone: versão do logo do WhatsApp na cor Vermelho Impulso (#B7020B), não o verde oficial (decisão de marca).

### 11.2 Comportamento de visibilidade

- Escondido (opacity: 0; pointer-events: none) até window.scrollY > 200; a partir daí, permanece visível (opacity: 1; pointer-events: auto) mesmo se o usuário rolar de volta ao topo — é um "reveal" único, não um toggle contínuo.

- transition: opacity 400ms ease-out.

- Listener de scroll com { passive: true } (não bloqueia o scroll principal).

## 12. Padrões transversais

### 12.1 Sistema de entrada "fade-in" (todas as seções)

Três keyframes compartilhados:

@keyframes fadeInUp    { from { opacity:0; transform: translateY(60%);  } to { opacity:1; transform: translateY(0); } }
@keyframes fadeInRight { from { opacity:0; transform: translateX(60%);  } to { opacity:1; transform: translateX(0); } }
@keyframes fadeInLeft  { from { opacity:0; transform: translateX(-60%); } to { opacity:1; transform: translateX(0); } }

- Duração/easing únicos em toda a página: 1125ms ease-out.

- **Hero**: dispara no carregamento da página (não scroll-triggered), stagger 200ms entre os 5 elementos.

- **Demais seções**: disparo via IntersectionObserver único (threshold: 0.18), cada elemento unobserve-ado após disparar (anima uma única vez, não reanima ao rolar de volta).

- Convenção de direção adotada: elementos de imagem/lockup alternam esquerda/direita para variedade visual (hero-lockup→direita, sobre-lockup→esquerda, pratica-montage/redes-carrossel→direita, footer-brand→esquerda); elementos de texto/formulário usam sempre fadeInUp; os 6 pilar-icon alternam esquerda/direita por posição na grade (ver 5.2).

### 12.2 Fix de performance do Intersection Observer

- **Uma única instância** de IntersectionObserver para toda a página (não uma por elemento).

- O callback do observer **agrupa todos os elementos que entraram na viewport no mesmo frame em um único**** ****setState** (em vez de um setState por elemento) — evita múltiplos re-renders síncronos da página inteira no mesmo tick de scroll, que causava stutter perceptível. **Este é o fix confirmado como causa raiz do travamento de scroll relatado durante a sessão.**

- will-change: transform, opacity aplicado **apenas enquanto o elemento está oculto** (pré-reveal); removido (troca para a string de animation) assim que o elemento é revelado, evitando camadas de composição órfãs.

### 12.3 button-label — estado de pressão (press state)

Aplicado uniformemente a todas as instâncias de button-label (hero-cta, nav-cta, contato-cta):

- Drop shadow base (fill): 4px 4px 0px {cor} (cor = #6D0C15 para hero/contato; #F2E6CF para o CTA do menu, que usa fundo diferente).

- Ao pressionar (mousedown/touchstart, mantido): transform: translate(4px, 4px) **simultaneamente** com box-shadow: 0px 0px 0px {cor} — o botão "afunda" exatamente na direção/distância da própria sombra, que encolhe a zero ao mesmo tempo (não apenas se move junto).

- Ao soltar (mouseup/touchend/mouseleave/touchcancel): reverte ambos simultaneamente.

- transition: transform 120ms ease-out, box-shadow 120ms ease-out (rápido e direto, deliberadamente mais curto que as animações de entrada de 1125ms).

- Nota de implementação: em elementos que também carregam uma animation de entrada (fade-in) no mesmo nó, o wrapper de entrada e o elemento com o press-state foram separados em nós DOM distintos — uma animation com fill-mode: both no mesmo elemento que recebe transform inline via press-state causaria conflito de propriedade (a animação "trava" o valor de transform, bloqueando o press-state após a entrada).

### 12.4 Nomenclatura corrigida nesta sessão

- Toda referência a "Rodchenko Regular"/"Rodchenko-Regular" foi renomeada para **"****Rodchenko Normal****"****/Rodchenko-Normal** (tokens de estilo, variáveis de tipografia, design-system.md, e retroativamente na Parte 1 deste documento consolidado).

- Fontes licenciadas Rodchenko Bold e Rodchenko Normal substituíram os fallbacks provisórios (@font-face com os arquivos .woff/.woff2 enviados).

## 13. Pendências / pontos a validar com o time de design

- **Glitch residual em**** ****pratica-montage** (seção 7.2): preload implementado, mas o flash na primeira troca de estado persiste. Diagnóstico e correção final ficam pendentes para quem assumir o código — ver observação técnica em 7.4 sobre como a stack de produção provavelmente resolve isso de forma diferente do ambiente de prototipagem.

- Ângulo de rotação do pilar-autonomia (30°) é uma decisão de implementação, não confirmada contra o arquivo Figma original (ver 5.4).

- Duração final da animação da "porta" do menu (600ms) e das transições de fade-in (1125ms) são mais lentas que o padrão comum de UI (~300ms); foram ajustadas repetidamente a pedido nesta sessão — vale validar se esse ritmo final está alinhado com a intenção de marca antes de finalizar.

- redes-icon-area e footer-info foram removidos do sistema de entrada/observer por decisão de performance; se o time de design queria fade-in nesses elementos por consistência visual, é necessário decidir explicitamente entre performance e uniformidade.