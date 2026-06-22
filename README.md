# arrow-components

🔭 **Storybook (GitHub Pages):** https://orazaevdesign.github.io/arrow-components/ — все компоненты с переключением в сайдбаре, живой preview каждого.

Опубликованные **компонент-скиллы ArrowDS** — самодостаточные инструкции «как сверстать компонент 1‑в‑1 по Figma». Размеры берутся из семантических shape-токенов css-global (`--awds-rectangle-{N}-*`, …), цвета/состояния инлайнятся ролями как RGB-триплеты (`rgb(var(--primary-*))`, под `.theme-default.theme-light`).

Генерируются и обновляются через `arrow-components-builder` (ACB) из Figma. Компонентной прослойки (`--awds-button-*` / `--awds-form-*` / …) нет — значения мапятся напрямую через карту `component-token-map.json`: размеры на shape-слой `--awds-rectangle-*`, цвета на роли `rgb(var(--…))`.

## Компоненты

| Компонент | Варианты | Figma link |
|---|---|---|
| [awds-component-button](awds-component-button/) | primary · secondary · addition · contrast · tertiary | [primary](https://www.figma.com/design/rRCDPR2SJ90wJZCr5rsXAd/%F0%9F%92%A0-Comp-%E2%86%AA-%C2%B2-Buttons?node-id=1-757) · [secondary](https://www.figma.com/design/rRCDPR2SJ90wJZCr5rsXAd/%F0%9F%92%A0-Comp-%E2%86%AA-%C2%B2-Buttons?node-id=489-59661) · [addition](https://www.figma.com/design/rRCDPR2SJ90wJZCr5rsXAd/%F0%9F%92%A0-Comp-%E2%86%AA-%C2%B2-Buttons?node-id=489-74776) · [contrast](https://www.figma.com/design/rRCDPR2SJ90wJZCr5rsXAd/%F0%9F%92%A0-Comp-%E2%86%AA-%C2%B2-Buttons?node-id=489-83105) · [tertiary](https://www.figma.com/design/rRCDPR2SJ90wJZCr5rsXAd/%F0%9F%92%A0-Comp-%E2%86%AA-%C2%B2-Buttons?node-id=489-89007) · [ghost](https://www.figma.com/design/rRCDPR2SJ90wJZCr5rsXAd/%F0%9F%92%A0-Comp-%E2%86%AA-%C2%B2-Buttons?node-id=489-94401) · [clean](https://www.figma.com/design/rRCDPR2SJ90wJZCr5rsXAd/%F0%9F%92%A0-Comp-%E2%86%AA-%C2%B2-Buttons?node-id=489-119060) · [pills](https://www.figma.com/design/rRCDPR2SJ90wJZCr5rsXAd/%F0%9F%92%A0-Comp-%E2%86%AA-%C2%B2-Buttons?node-id=811-30987) |
| [awds-component-table](awds-component-table/) | cell light / head / default · таблица light / default | [open](https://www.figma.com/design/MzbIinUK3d5C31yhl6TKmB/%F0%9F%92%A0-Comp-%E2%86%AA-%C2%B3-Cell?node-id=2038-1350) |
| [awds-component-button-overhung](awds-component-button-overhung/) | primary · secondary | [primary](https://www.figma.com/design/rRCDPR2SJ90wJZCr5rsXAd/%F0%9F%92%A0-Comp-%E2%86%AA-%C2%B2-Buttons?node-id=145-30637) · [secondary](https://www.figma.com/design/rRCDPR2SJ90wJZCr5rsXAd/%F0%9F%92%A0-Comp-%E2%86%AA-%C2%B2-Buttons?node-id=490-231905) |
| [awds-component-button-favorites](awds-component-button-favorites/) | favorites (icon-only toggle, 2 вью) | [open](https://www.figma.com/design/rRCDPR2SJ90wJZCr5rsXAd/%F0%9F%92%A0-Comp-%E2%86%AA-%C2%B2-Buttons?node-id=856-30471) |
| [awds-component-link](awds-component-link/) | default · muted · contrast · accent · heading | — _(из токенов DS, без Figma-ноды)_ |
| [awds-component-avatar](awds-component-avatar/) | initials · placeholder · picture | [initials](https://www.figma.com/design/UCYhMA1JeNUNuVGsxUEne7/%F0%9F%92%A0-Comp-%E2%86%AA-%C2%B9-Elemets?node-id=2001-82) · [placeholder](https://www.figma.com/design/UCYhMA1JeNUNuVGsxUEne7/%F0%9F%92%A0-Comp-%E2%86%AA-%C2%B9-Elemets?node-id=2001-102) · [picture](https://www.figma.com/design/UCYhMA1JeNUNuVGsxUEne7/%F0%9F%92%A0-Comp-%E2%86%AA-%C2%B9-Elemets?node-id=2001-122) |
| [awds-component-notice](awds-component-notice/) | primary · secondary · ghost | [primary](https://www.figma.com/design/UCYhMA1JeNUNuVGsxUEne7/%F0%9F%92%A0-Comp-%E2%86%AA-%C2%B9-Elemets?node-id=2093-562) · [secondary](https://www.figma.com/design/UCYhMA1JeNUNuVGsxUEne7/%F0%9F%92%A0-Comp-%E2%86%AA-%C2%B9-Elemets?node-id=2093-577) · [ghost](https://www.figma.com/design/UCYhMA1JeNUNuVGsxUEne7/%F0%9F%92%A0-Comp-%E2%86%AA-%C2%B9-Elemets?node-id=2093-592) |
| [awds-component-range](awds-component-range/) | default · light (single / double) | [default](https://www.figma.com/design/UCYhMA1JeNUNuVGsxUEne7/%F0%9F%92%A0-Comp-%E2%86%AA-%C2%B9-Elemets?node-id=2093-3495) · [light](https://www.figma.com/design/UCYhMA1JeNUNuVGsxUEne7/%F0%9F%92%A0-Comp-%E2%86%AA-%C2%B9-Elemets?node-id=2093-3552) |
| [awds-component-slider](awds-component-slider/) | dots · dots-mini · numbs | [dots](https://www.figma.com/design/UCYhMA1JeNUNuVGsxUEne7/%F0%9F%92%A0-Comp-%E2%86%AA-%C2%B9-Elemets?node-id=2093-4387) · [dots-mini](https://www.figma.com/design/UCYhMA1JeNUNuVGsxUEne7/%F0%9F%92%A0-Comp-%E2%86%AA-%C2%B9-Elemets?node-id=2093-4401) · [numbs](https://www.figma.com/design/UCYhMA1JeNUNuVGsxUEne7/%F0%9F%92%A0-Comp-%E2%86%AA-%C2%B9-Elemets?node-id=2093-4414) |
| [awds-component-badge](awds-component-badge/) | market-percent · market-sale · market-new · market-brand | [percent](https://www.figma.com/design/UCYhMA1JeNUNuVGsxUEne7/%F0%9F%92%A0-Comp-%E2%86%AA-%C2%B9-Elemets?node-id=2093-5286) · [sale](https://www.figma.com/design/UCYhMA1JeNUNuVGsxUEne7/%F0%9F%92%A0-Comp-%E2%86%AA-%C2%B9-Elemets?node-id=2093-5417) · [new](https://www.figma.com/design/UCYhMA1JeNUNuVGsxUEne7/%F0%9F%92%A0-Comp-%E2%86%AA-%C2%B9-Elemets?node-id=2093-5374) · [brand](https://www.figma.com/design/UCYhMA1JeNUNuVGsxUEne7/%F0%9F%92%A0-Comp-%E2%86%AA-%C2%B9-Elemets?node-id=2093-5331) |
| [awds-component-tooltip](awds-component-tooltip/) | default · contrast (× type default/compact × side top/bottom/left/right) | [default](https://www.figma.com/design/XfUbnX6GFLFZ6nInMOlyQD/%F0%9F%92%A0-Comp-%E2%86%AA-%E2%81%B6-Popup?node-id=4001-27067) · [contrast](https://www.figma.com/design/XfUbnX6GFLFZ6nInMOlyQD/%F0%9F%92%A0-Comp-%E2%86%AA-%E2%81%B6-Popup?node-id=4001-27091) |
| [awds-component-product-card](awds-component-product-card/) | price-first · brand-first · buy-now | [price-first](https://www.figma.com/design/fgXw7Tlrdfz0gCUi2xbZDt/%F0%9F%94%B6-B2C-%E2%86%AA-%C2%B9-Componets?node-id=7460-1800) · [brand-first](https://www.figma.com/design/fgXw7Tlrdfz0gCUi2xbZDt/%F0%9F%94%B6-B2C-%E2%86%AA-%C2%B9-Componets?node-id=7460-2601) · [buy-now](https://www.figma.com/design/fgXw7Tlrdfz0gCUi2xbZDt/%F0%9F%94%B6-B2C-%E2%86%AA-%C2%B9-Componets?node-id=7460-2602) |

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
