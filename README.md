# arrow-components

Опубликованные **компонент-скиллы ArrowDS** — самодостаточные инструкции «как сверстать компонент 1‑в‑1 по Figma». Размеры берутся из семантических shape-токенов css-global (`--awds-rectangle-{N}-*`, …), цвета/состояния инлайнятся ролями как RGB-триплеты (`rgb(var(--primary-*))`, под `.theme-default.theme-light`).

Генерируются и обновляются через `arrow-components-builder` (ACB) из Figma. Компонентной прослойки (`--awds-button-*` / `--awds-form-*` / …) нет — значения мапятся напрямую через карту `component-token-map.json`: размеры на shape-слой `--awds-rectangle-*`, цвета на роли `rgb(var(--…))`.

## Компоненты

| Компонент | Варианты | Figma link |
|---|---|---|
| [awds-component-button](awds-component-button/) | primary · secondary · addition · contrast · tertiary | [primary](https://www.figma.com/design/rRCDPR2SJ90wJZCr5rsXAd/%F0%9F%92%A0-Comp-%E2%86%AA-%C2%B2-Buttons?node-id=1-757) · [secondary](https://www.figma.com/design/rRCDPR2SJ90wJZCr5rsXAd/%F0%9F%92%A0-Comp-%E2%86%AA-%C2%B2-Buttons?node-id=489-59661) · [addition](https://www.figma.com/design/rRCDPR2SJ90wJZCr5rsXAd/%F0%9F%92%A0-Comp-%E2%86%AA-%C2%B2-Buttons?node-id=489-74776) · [contrast](https://www.figma.com/design/rRCDPR2SJ90wJZCr5rsXAd/%F0%9F%92%A0-Comp-%E2%86%AA-%C2%B2-Buttons?node-id=489-83105) · [tertiary](https://www.figma.com/design/rRCDPR2SJ90wJZCr5rsXAd/%F0%9F%92%A0-Comp-%E2%86%AA-%C2%B2-Buttons?node-id=489-89007) · [ghost](https://www.figma.com/design/rRCDPR2SJ90wJZCr5rsXAd/%F0%9F%92%A0-Comp-%E2%86%AA-%C2%B2-Buttons?node-id=489-94401) · [clean](https://www.figma.com/design/rRCDPR2SJ90wJZCr5rsXAd/%F0%9F%92%A0-Comp-%E2%86%AA-%C2%B2-Buttons?node-id=489-119060) · [pills](https://www.figma.com/design/rRCDPR2SJ90wJZCr5rsXAd/%F0%9F%92%A0-Comp-%E2%86%AA-%C2%B2-Buttons?node-id=811-30987) |
| [awds-component-table](awds-component-table/) | cell light / head / default · таблица light / default | [open](https://www.figma.com/design/MzbIinUK3d5C31yhl6TKmB/%F0%9F%92%A0-Comp-%E2%86%AA-%C2%B3-Cell?node-id=2038-1350) |
| [awds-component-button-overhung](awds-component-button-overhung/) | primary · secondary | [primary](https://www.figma.com/design/rRCDPR2SJ90wJZCr5rsXAd/%F0%9F%92%A0-Comp-%E2%86%AA-%C2%B2-Buttons?node-id=145-30637) · [secondary](https://www.figma.com/design/rRCDPR2SJ90wJZCr5rsXAd/%F0%9F%92%A0-Comp-%E2%86%AA-%C2%B2-Buttons?node-id=490-231905) |

_(список пополняется по мере публикации новых компонентов)_

## Структура компонент-скилла

Каждый компонент — отдельная папка `awds-component-{name}/`:

```
awds-component-{name}/
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
