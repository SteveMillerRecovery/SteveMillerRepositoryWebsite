## Steve Miller Recovery Services — Website Editing Guide (Non‑Technical)

This website is a simple “static” site. That means:

- **Almost all text you see on the site is in one file**: `index.html`
- **Images are in**: `images/`
- **Styling (colors/fonts/layout) is in**: `styles/main.css` (usually you won’t touch this)
- **Behavior (menu button, animations, contact form helpers) is in**: `scripts/main.js` (usually you won’t touch this)

If this repo is published with **GitHub Pages**, changes usually go live **within 1–2 minutes** after you save/commit.

---

## How to Edit the Site (the easy GitHub way)

1. Open the repo on GitHub.
2. Click the file you want to change (usually `index.html`).
3. Click the **pencil icon** (“Edit”).
4. Make your change.
5. Scroll down and click **Commit changes…**
6. Write a short note like “Update prices” and click **Commit changes**.

Tip: Use **Find** to jump to the right place:

- Mac: `Command + F`
- Windows: `Ctrl + F`

---

## Price Visibility Toggle (Code Only)

Price visibility is controlled in `scripts/main.js` with:

```js
var SHOW_PRICES = true;
```

- Set `SHOW_PRICES` to `true` to show prices normally.
- Set `SHOW_PRICES` to `false` to hide visible prices on service cards.
- When `SHOW_PRICES` is `false`, price details are also removed from:
  - the selected plan summary text
  - the direct email (`mailto`) body
  - hidden form price fields submitted with the contact form

---

## How to Update the Prices

All prices are in `index.html` under the **Services** section.

### What to change (important)

Each program card has **two price places**:

- **The visible price** on the card (what visitors see)
- **A hidden “data-plan-price” value** used to fill in the “Selected options” in the contact form when someone clicks “Select Plan”

When you update a price, update **both**.

### Example: Update the “4-Week Reset” price

In `index.html`, you will find this exact block:

```html
<div class="service-card animate-on-scroll">
  <div class="service-tier">Package 1</div>
  <h3>4-Week Reset</h3>
  <p class="desc">Break destructive cycles quickly and establish momentum with high-accountability support.</p>
  <div class="service-price">$1,200 <span class="unit">8 sessions</span></div>
  <a
    class="service-btn plan-select-btn"
    href="#contact"
    data-plan-id="package-1-4-week-reset"
    data-plan-tier="Package 1"
    data-plan-name="4-Week Reset"
    data-plan-price="$1,200 (8 sessions)"
  >Select Plan</a>
</div>
```

To change the price, update these two spots:

- Change **`$1,200`** in this line:
  - `<div class="service-price">$1,200 <span class="unit">8 sessions</span></div>`
- Change **`data-plan-price="$1,200 (8 sessions)"`** to match the new price:
  - `data-plan-price="$1,200 (8 sessions)"`

### Step-by-step

1. Open `index.html`
2. Use Find (`Command/Ctrl + F`) and search for:
   - `Programs and Pricing`
3. Scroll a little until you see the program cards (they look like this in the code):
   - `<div class="service-price">...`
   - and a little below it: `data-plan-price="..."`
4. For the program you’re updating, change:
   - The number inside `<div class="service-price">`
   - The value inside `data-plan-price="..."`

### Examples of the programs currently listed

You’ll see these names in the code:

- **Free 30-Min Consultation**
- **Single 1:1 Session**
- **4-Week Reset**
- **8-Week Foundation**
- **12-Week Full Rebuild**
- **Ongoing Messaging Support** (this one says “Add-On” instead of a dollar amount)

If you also change a program name, update the matching `data-plan-name="..."` too.

---

## How to Update the Program Descriptions

Program descriptions live in `index.html` inside the Services section.

### To update the short description under a program name

1. Open `index.html`
2. Find `Programs and Pricing`
3. In each program card, look for a line like:
   - `<p class="desc"> ... </p>`
4. Edit the words between `>` and `<` (leave the `<p ...>` and `</p>` parts alone).

### Example: Update the “8-Week Foundation” description

In `index.html`, you will find this exact block:

```html
<div class="service-card animate-on-scroll">
  <div class="service-tier">Package 2</div>
  <h3>8-Week Foundation</h3>
  <p class="desc">Build lasting structure, consistency, and emotional control with deeper support.</p>
  <div class="service-price">$2,400 <span class="unit">16 sessions</span></div>
  <a
    class="service-btn plan-select-btn"
    href="#contact"
    data-plan-id="package-2-8-week-foundation"
    data-plan-tier="Package 2"
    data-plan-name="8-Week Foundation"
    data-plan-price="$2,400 (16 sessions)"
  >Select Plan</a>
</div>
```

To change only the description, edit the sentence inside:

- `<p class="desc"> ... </p>`

### To update the “What the Service Is / Is Not” text

1. Open `index.html`
2. Find:
   - `What the Service Is`
   - `What the Service Is Not`
3. Edit the bullet points inside the `<ul>` lists.

---

## How to Update the Logo

The logo image file is:

- `images/logo.jpeg`

In `index.html`, the logo is referenced like this:

```html
<img class="seal-logo" src="images/logo.jpeg" alt="" />
```

### Easiest method (replace the file, keep the same name)

1. In GitHub, open the `images/` folder
2. Click **Add file** → **Upload files**
3. Upload your new logo **and name it exactly** `logo.jpeg`
4. Commit the change

This works because `index.html` is already pointing at `images/logo.jpeg`.

### If you want to use a different filename

If your new logo is named something else (example: `logo-2026.jpg`), you must update `index.html` too:

1. Open `index.html`
2. Find:
   - `images/logo.jpeg`
3. Replace it with your new filename (example: `images/logo-2026.jpg`)
4. Commit

---

## How to Update the Main Photo (Portrait)

The portrait shown in the “About Me” section is:

- `images/steve.JPG`

In `index.html`, the portrait is referenced like this:

```html
<img class="about-portrait" src="images/steve.JPG" alt="Steve Miller" />
```

To replace it, follow the same steps as the logo:

1. Upload a new image to `images/`
2. Name it exactly `steve.JPG` (same capitalization)
3. Commit

If you change the filename, update `index.html` by searching for:

- `images/steve.JPG`

---

## How to Update the Browser Tab Icon (Favicon)

The favicon file is:

- `images/favicon.png`

In `index.html`, the favicon is referenced like this:

```html
<link rel="icon" type="image/png" href="images/favicon.png" />
```

To update it:

1. Upload your new favicon to `images/`
2. Name it exactly `favicon.png`
3. Commit

If you change the filename, update `index.html` by searching for:

- `images/favicon.png`

---

## How to Update the “About Me” Text

1. Open `index.html`
2. Find:
   - `About Me`
3. Edit the paragraphs underneath it (look for `<div class="about-text">` and then `<p> ... </p>`).

---

## How to Update Contact Info (Email / Location)

### Email

1. Open `index.html`
2. Find:
   - `mailto:`
3. Update the email address in the `href="mailto:..."` part.

Also search for the plain email address text (it appears in the Privacy Policy area too):

- `steve@stevemillerrecoveryservices.com`

#### Example: Update the email link in the Contact section

In `index.html`, you will find this exact block:

```html
<a class="contact-email" id="direct-email-link" href="mailto:steve@stevemillerrecoveryservices.com" data-recipient="steve@stevemillerrecoveryservices.com">
  <span class="material-symbols-outlined" aria-hidden="true">mail</span>
  Email Me Directly
</a>
```

If you change the email, update **both**:

- `href="mailto:..."`
- `data-recipient="..."`

### Location

Search for:

- `Based in Vancouver, Canada`

If you change it, update both places where it appears.

---

## How to Update the Footer / Legal Popups (Privacy, Terms, Disclosures)

These are also inside `index.html`, near the bottom.

To edit:

1. Open `index.html`
2. Find one of these titles:
   - `Privacy Policy`
   - `Terms of Service`
   - `Disclosures`
3. Edit the text below it.

Be careful not to delete any opening/closing tags like `<p> ... </p>` or `<li> ... </li>`.

---

## What Not to Change (Unless You Mean To)

- Don’t delete `<` or `>` characters.
- Don’t delete quotes `"` around things like `href="..."`.
- Don’t change anything in `scripts/main.js` unless you’re intentionally changing site behavior.
- Don’t change `action="https://docs.google.com/forms/..."` in the contact form unless you’re switching to a new Google Form.

---

## If Something Breaks (Quick Fix)

On GitHub you can undo a bad change:

1. Go to the repo’s main page
2. Click **Commits**
3. Click the commit before the mistake
4. Use **Revert** (or ask someone technical to revert it)

---

## Quick Reference (Most Common Edits)

- **Prices & program text**: `index.html` → search `Programs and Pricing`
- **Logo**: replace `images/logo.jpeg`
- **Portrait photo**: replace `images/steve.JPG`
- **Favicon**: replace `images/favicon.png`

