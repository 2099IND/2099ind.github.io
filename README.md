# 2099ind.com

Official website of 2099 Industries. Static site served by GitHub Pages.

## Structure

| File          | Purpose                                              |
|---------------|------------------------------------------------------|
| `index.html`  | Page markup, SEO meta, structured data               |
| `styles.css`  | Design tokens (top of file) and all styles           |
| `script.js`   | Progressive enhancement: reveals, hero drift, copy   |
| `favicon.svg` | Temporary typographic icon                           |
| `robots.txt`, `sitemap.xml` | Search engine files                    |

No build step, no dependencies. Open `index.html` locally or serve the folder.

## Common edits

- **Palette / spacing / type:** edit the variables in `:root` in `styles.css`.
- **New email address:** copy one `<li class="contact">` block in `index.html`.
- **New area of focus:** copy one `<li class="area">` block (column counts live in §7 of `styles.css`).
- **Decorative geometry:** the hero hexagons are the inline `<svg class="hero__geometry">` in `index.html`; each area's mark is a small `<svg class="area__mark">`. Both are `aria-hidden` and safe to remove.
- **Official logo:** replace the contents of the `.wordmark` elements (header and footer).

## Custom domain (when DNS is ready)

1. Repository Settings → Pages → Custom domain: `2099ind.com` (this creates a `CNAME` file).
2. At the DNS provider, point the apex `2099ind.com` to GitHub Pages' A/AAAA records
   and `www` as a CNAME to `2099industries.github.io`.
3. Enable **Enforce HTTPS** once the certificate is issued.

The `canonical`, Open Graph URL and sitemap already point to `https://2099ind.com/`.
