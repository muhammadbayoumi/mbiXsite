# mbiXsite — backlog

Deferred work, with enough context to pick up cold.

---

## 1 · Redesign the home page around two products

`index.html` is a redirect stub that sends visitors straight to `install.html`,
the Xadd-in install page. That made sense when the site carried one product. It
now carries two, so the front door privileges one of them.

`install.html` currently ends with a products band naming both, which covers the
gap but is not the same as a home page. The redesign should give Xadd-in and
ScrapeX equal footing and let `install.html` go back to being only an install
page.

Touch points when this happens:

- `index.html` — becomes a real page instead of a `<meta refresh>` stub
- `vite.config.js` — `main` input already points at `index.html`; `isIndex` in
  the Handlebars context drives `activeHome`
- `install.html` — remove the products band appended at its end
- `src/partials/navbar.html` — the brand links to `installUrl`; it would point
  at the new home instead
- i18n keys `home_products_*`, `home_addin_*`, `home_scrapex_*` already exist in
  both languages and can be reused

## 2 · Re-enable Arabic

Arabic is written and complete — every key is at parity with English — but its
rendered layout has never been reviewed, and RTL is the kind of thing that looks
correct in the data and wrong on the page.

It is currently held back by one line in `src/js/i18n.js`:

```js
export const ENABLED_LANGS = ['en'];
```

Adding `'ar'` restores it. Nothing else needs changing: the strings, `_rtl.scss`
and the dropdown entry are all in place, and the language picker reappears by
itself once a second language is enabled.

Before re-enabling, look at these on a real Arabic render:

- The ScrapeX install page end to end, especially the download card rows and the
  SmartScreen reproduction. That dialog is deliberately pinned to `direction:
  ltr` and kept in English, because it mirrors what English Windows shows; the
  Arabic prose says the dialog follows the system language. If Arabic Windows
  wording is wanted, take it from a real Arabic install rather than translating
  it — a warning a user cannot match to their screen is worse than none.
- The rendered markdown on the privacy and support pages. Those documents are
  English upstream, so an Arabic page will show Arabic chrome around English
  prose. Decide whether that is acceptable or whether the documents need Arabic
  versions upstream.
- Release-history dates re-format only on load, not when the language is
  switched while the panel is open, since they are plain text that `applyLang`
  does not revisit.
