# Coventry Mail Hub website

A static, single-page website for a Coventry virtual business address and mail forwarding service, with an inquiry form.

## Files

- `index.html` – page content (hero, services, how it works, pricing, FAQ, inquiry form)
- `styles.css` – styling, responsive down to phone width
- `script.js` – mobile menu, scroll effects, and inquiry form validation/submission

No build step: open `index.html` in a browser, or host the folder on any static host (GitHub Pages, Netlify, Cloudflare Pages).

## Logo

- `logo-mark.svg` – the square icon (three spires above an envelope), also used as the browser tab icon
- `logo.svg` – icon with the "Coventry Mail Hub" wordmark

## Before going live

1. **Business details** – the address (Union House, 111 New Union Street, Coventry CV1 2NT) and phone number (+44 7396 728756) are in `index.html`.
2. **Pricing** – the plan names and prices are examples; edit them in the `#pricing` section.
3. **Inquiry form delivery** – the form posts to [Formspree](https://formspree.io) (free tier available):
   1. Create a form on Formspree using the email address that should receive inquiries.
   2. Replace `YOUR_FORM_ID` in the form's `action` attribute with your form ID.

   Until that's done, submitting the form asks the visitor to phone instead.
4. **Compliance** – the footer states the business is supervised by HMRC for anti-money laundering; keep this only if you're registered.
