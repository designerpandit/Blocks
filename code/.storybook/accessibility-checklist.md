# Manager UI accessibility checklist

Fixed checklist for Task 2.3 ("Manager UI passes a basic accessibility check
(keyboard navigation, contrast)"). Scoped to the manager shell's sidebar,
toolbar, and addon-panel chrome — the surface touched by the Task 2.1 rebrand
(`manager.tsx`). Each item cites the WCAG 2.1 AA success criterion it comes
from. Re-run this checklist whenever the manager theme or shell changes.

## Keyboard navigation

- [x] **1. Sidebar controls are keyboard-operable.** Every interactive
  control in the sidebar (nav tree items, search, tag filter, add-story
  button) is reachable and operable via Tab/Shift+Tab and Enter/Space alone.
  (WCAG 2.1.1)
  - Verified: tabbed through skip-link → brand link → Get-started checklist →
    search → tag filter → add-story button → tree items (`Argtype`,
    `Backgrounds`, ...). All reachable and activatable without a mouse.
- [x] **2. Toolbar controls are keyboard-operable.** Every interactive
  control in the toolbar (viewport, addon toggles, theme/locale menus) is
  reachable and operable via keyboard alone. (2.1.1)
  - Verified: the "Global theme for components" control opens an
    `ul[role="listbox"]` / `li[role="option"]` menu; Down arrow moves real DOM
    focus onto the "dark" option (confirmed via `document.activeElement`) and
    the selection takes effect — a genuine ARIA listbox pattern, not
    mouse-only.
- [x] **3. No keyboard trap.** Opening an addon panel (Controls/Actions/etc.)
  or a toolbar menu and continuing to Tab does not get stuck — Escape or Tab
  always moves on. (2.1.2)
  - Verified: Escape closed the toolbar menu; Tab from inside the Actions
    panel's "Clear" button continued on to the next control (a `switch`)
    without getting stuck.
- [x] **4. Focus order is logical.** Tab order through
  sidebar → toolbar → addon panels follows the visual/DOM layout, with no
  jumps to unrelated areas. (2.4.3)
  - Verified: order was skip-link, brand link, sidebar chrome (search/filter/
    add), tree items top-to-bottom, toolbar controls left-to-right, panel
    tabs, panel content — sequential throughout.
- [x] **5. Focus is always visible.** Every focused element (nav item,
  toolbar button, menu option, panel control) shows a visible indicator
  distinct from its unfocused state. (2.4.7)
  - Verified via computed styles on focused elements, e.g. toolbar menu
    option: `outline: rgb(255, 56, 92) solid 2px`; panel button ("Clear"):
    `box-shadow: rgb(255, 56, 92) 0px -3px 0px 0px inset`. Both use the
    brand coral accent and are clearly visible against the dark background.

## Contrast

- [x] **6. Body/label text meets 4.5:1.** `textColor` (#F5F5F5) against
  `appBg` (#0A0A0A) ≈ **18.2:1**; against `appContentBg` (#141414) ≈
  **16.9:1**. `textMutedColor` (#A0A0A0, used for sidebar/toolbar muted
  labels) against `appBg` ≈ **7.6:1**; against `appContentBg` ≈ **7.0:1**.
  All exceed the 4.5:1 minimum (and clear the 7:1 AAA threshold too).
  (WCAG 1.4.3)
- [x] **7. Large text meets 3:1.** Same values as above comfortably exceed
  3:1. (1.4.3)
- [x] **8. Coral accent (text/selection use) meets 3:1.** `colorPrimary` /
  `barSelectedColor` / `barHoverColor` (#FF385C) against `appBg` ≈
  **5.63:1**; against `appContentBg` ≈ **5.24:1** — exceeds 3:1, and clears
  4.5:1 for cases where the accent is used as text. (1.4.11)
- [x] **9. Button/input borders meet 3:1.** `appBorderColor` / `buttonBorder`
  / `inputBorder` are `#666666`, measuring **≈3.45:1** against `appBg`
  (#0A0A0A) and **≈3.21:1** against `buttonBg`/`inputBg` (#141414) — above the
  3:1 minimum for non-text UI component boundaries. (1.4.11)
  - History: these three keys originally used upstream Storybook's default
    `hsl(0 0% 100% / 0.1)` (`code/core/src/theming/themes/dark.ts`), which
    measured ≈1.25–1.31:1 and failed. Overridden in `manager.tsx`; verified in
    the live UI that buttons, the select, and the combobox now render
    `rgb(102, 102, 102)` borders and no element still uses the old value.
- [x] **10. Focus indicators themselves meet 3:1.** The coral focus
  outline/box-shadow (#FF385C) measured in item 5 is the same color checked
  in item 8 (≈5.2–5.6:1 against the dark backgrounds it appears on) —
  exceeds 3:1. (1.4.11)

## Result

All 10 items pass.
