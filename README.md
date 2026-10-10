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
3. **Inquiry form delivery** – inquiries are sent to the business's Google Form (already connected in `script.js`), so every response appears in Google Forms and its linked Google Sheet. To connect a different form:
   1. Create a Google Form with these questions, all set to **Short answer** (use **Paragraph** for Message), and none marked required: Name, Company, Email, Phone, Business type, Plan, Services, Forwarding frequency, Message.
   2. In the form's ⋮ menu choose **Get pre-filled link**, type a placeholder answer in every question (e.g. `test`), and click **Get link**.
   3. The link looks like `https://docs.google.com/forms/d/e/FORM_ID/viewform?entry.123=test&entry.456=test…`. Put `FORM_ID` and each `entry.…` number into the `GOOGLE_FORM` settings at the top of `script.js`, matching each question.
   4. In the form's **Responses** tab, click **Link to Sheets** for a spreadsheet, and choose ⋮ → **Get email notifications for new responses** to be emailed each inquiry.
4. **Compliance** – the footer states the business is supervised by HMRC for anti-money laundering; keep this only if you're registered.
