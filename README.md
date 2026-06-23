# Portal Alerta Digital ⚠

Portal educativo sobre **Fake News**, desenvolvido como projeto escolar interdisciplinar (Projetos de TIC + Programação e Algoritmos + Inglês).

## 🎯 Objetivo

Conscientizar jovens e adultos sobre desinformação no ambiente digital, ensinando a:
- Reconhecer os principais tipos de fake news
- Verificar a veracidade de notícias antes de compartilhar
- Desenvolver pensamento crítico diante de conteúdo online
- Entender os impactos sociais da desinformação

## 📁 Estrutura de Arquivos

```
portal-alerta-digital/
├── index.html              # Página inicial (Home)
├── tipos.html              # 5 tipos de fake news (com filtro)
├── identificar.html        # 7 dicas de verificação + simulador
├── exemplos.html           # Casos didáticos lado a lado
├── quiz.html               # Quiz interativo com 10 perguntas
├── css/
│   └── style.css           # Folha de estilos completa
├── js/
│   ├── script.js           # Funções gerais (data, menu, filtros, verificador)
│   └── quiz.js             # Lógica do quiz interativo
└── README.md               # Este arquivo
```

## ⚙️ Tecnologias Utilizadas

- **HTML5** — Estrutura semântica das páginas
- **CSS3** — Layout responsivo, variáveis, animações, grid e flexbox
- **JavaScript Vanilla** — Interatividade sem dependências externas

Sem frameworks, sem bibliotecas externas além de Google Fonts.

## ✨ Funcionalidades

### Home
- Banner principal com título animado e estatísticas que contam para cima
- Definição de fake news em português e inglês (interdisciplinaridade)
- Cards de exploração com hover animado
- Seção de impactos sociais

### Tipos de Fake News
- 5 categorias detalhadas com exemplos típicos
- Indicador visual de "nível de perigo" (1-5)
- Filtro por categoria (Texto / Visual / Contexto)

### Como Identificar
- **Simulador de Verificação**: cole um título e veja análise educativa baseada em padrões suspeitos
- 7 dicas práticas detalhadas
- Lista de sites brasileiros de fact-checking

### Exemplos Reais
- Comparação lado a lado de notícias falsas e verdadeiras
- Listas de "red flags" e "green flags" em cada caso
- 3 casos didáticos cobrindo saúde, contexto e clickbait

### Quiz Interativo
- 10 perguntas variadas
- Barra de progresso e contador de acertos em tempo real
- Feedback educativo após cada resposta
- Diagnóstico personalizado ao final (Iniciante → Caçador de Fake News)
- Medidor visual de desempenho

## 🎨 Design

- **Estética**: editorial dark + cyber-investigativo
- **Tipografia**: Fraunces (serif editorial) + JetBrains Mono (monoespaçada para detalhes técnicos) + Inter (sans-serif para corpo)
- **Paleta**: fundo escuro `#0a0908`, vermelho-alerta `#e63946`, papel `#f4f1ea` para contraste, verde-verdade `#2a9d8f`
- **Responsivo**: adapta-se a celulares, tablets e desktops
- **Acessibilidade**: respeita `prefers-reduced-motion`, contraste adequado

## 🌍 Interdisciplinaridade

| Disciplina | Aplicação |
|------------|-----------|
| **Projetos de TIC** | Concepção, planejamento e arquitetura do site |
| **Programação e Algoritmos** | Lógica do quiz, validações, manipulação do DOM |
| **Inglês** | Termo "fake news", citação do Cambridge Dictionary, vocabulário técnico |

## 🚀 Como Executar

Basta abrir o arquivo `index.html` em qualquer navegador moderno.
Não precisa de servidor, instalação ou configuração.

```
Clone/baixe a pasta → abra index.html → pronto
```

## 📝 Comentários no Código

Todo o código está organizado e comentado:
- HTML com comentários introduzindo cada arquivo
- CSS dividido em seções com cabeçalhos `/* === */`
- JavaScript com funções nomeadas e blocos comentados

---

**Projeto escolar — 2026**
*"A verdade dá trabalho, a mentira é gratuita."*
