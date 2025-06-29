# Morayo Wellness Initiative – Simple Website

This repository contains a minimal static website (just `index.html` & `styles.css`). You can freely edit the content later; the deployment workflow will stay the same.

---

## 1 • Preview the site locally

Open the `index.html` file in any web browser (double-click it). No build step is required.

---

## 2 • Put the site online for free (GitHub Pages)

1. **Create a GitHub repository**
   ```bash
   # From inside the project folder
   git init
   git add .
   git commit -m "Initial site"
   gh repo create morayo-wellness-site --public --source=. --remote=origin
   git push -u origin main
   ```
2. **Enable GitHub Pages**
   • Go to *Settings → Pages* in the new repo.<br/>
   • Select **Branch: `main`** and **Folder: `/ (root)`** then **Save**.
3. Wait ~1 minute. Your site will be available at `https://<your-github-username>.github.io/morayo-wellness-site/`.

> **Alternative hosts**: Netlify, Vercel, Cloudflare Pages, Firebase Hosting, etc. Work almost the same; upload the two files or connect the Git repo.

---

## 3 • Connect your custom domain

### Step A – Tell the host which domain you own

• In GitHub, still under *Settings → Pages*, type your domain (e.g. `morayowellness.com`) in the **Custom domain** box and **Save**.

### Step B – Add DNS records at your registrar

1. Log into the company where you bought the domain (GoDaddy, Namecheap, Google Domains, etc.).
2. Find the **DNS** or **Zone Editor** section.
3. Create **one CNAME or A record** (choose only one method):

   **CNAME (simplest, preferred)**
   * **Name/Host**: `www`
   * **Type**: `CNAME`
   * **Value/Target**: `<your-github-username>.github.io.` (note the trailing dot)

   **A records (for root/apex domain)**
   Add **4 A records** pointing to:
   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`

   (These are GitHub Pages IPs.)
4. Optionally, add an **ALIAS** or **ANAME** record so naked domain (`morayowellness.com`) redirects to `www.morayowellness.com` if your registrar supports it.
5. Save changes. DNS can take anywhere from a few minutes to 48 hours, but is usually quick.

### Step C – Wait for HTTPS certificate

GitHub Pages will automatically request an SSL certificate once it detects your DNS is correct. Refresh the Pages settings until you see a green lock and **HTTPS enforced**.

---

## 4 • Update the site later

1. Edit your `index.html` or any other file.
2. Commit and push to `main`.
3. GitHub Pages re-deploys automatically (~30 seconds).

---

### Need help?
Feel free to open an issue in the repo or reach out if you get stuck. 