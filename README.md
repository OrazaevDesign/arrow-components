# arrow-components

Опубликованные **компонент-скиллы ArrowDS** — самодостаточные инструкции «как сверстать компонент 1‑в‑1 по Figma» на базовых токенах дизайн‑системы (`--ads-space-*`, `--ads-rounded-*`, `--ads-control-*`, …) и цветовых ролях сайта (`--color-*` из `css-variables.css`).

Генерируются и обновляются через `arrow-components-builder` (ACB) из Figma. Никаких компонентных прослоек (`--ads-button-*` / `--ads-rectangle-*`) — значения инлайнятся напрямую через карту `component-token-map.json`.

## Компоненты

| Компонент | Варианты | Figma link |
|---|---|---|
| [ads-component-button](ads-component-button/) | primary | [open](https://www.figma.com/design/rRCDPR2SJ90wJZCr5rsXAd/%F0%9F%92%A0-Comp-%E2%86%AA-%C2%B2-Buttons?node-id=1-757) |

_(список пополняется по мере публикации новых компонентов)_

## Структура компонент-скилла

Каждый компонент — отдельная папка `ads-component-{name}/`:

```
ads-component-{name}/
├── SKILL.md                       — как применять компонент
├── component.meta.json            — контракт: Figma-ссылка, размеры, состояния, зависимости от токенов
├── references/
│   ├── {name}-{variant}.css       — CSS варианта (base + размеры + состояния)
│   ├── {name}-{variant}.md        — разметка и состояния
│   └── preview.html               — storybook (нужен контекст DS-токенов для рендера)
└── snapshot/
    ├── figma.json                 — сырой дамп Figma + резолв в токены
    └── fetched-at.txt             — отметка времени синхронизации
```

Raw‑база: `https://raw.githubusercontent.com/OrazaevDesign/arrow-components/main/`
