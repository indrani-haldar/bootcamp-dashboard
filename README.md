# AEM Bootcamp — Module Dashboard

A standalone dashboard covering Day 1's five theory modules, with custom
diagrams and file-tree examples. Plain React, no backend, no Claude-only
APIs — deploys anywhere static.

## ⚠️ Follow this order exactly

The most common way this breaks is doing these steps out of order. Do them
in this exact sequence and it will work the first time.

### Step 1 — Create the GitHub repo FIRST (before touching any code)

1. Go to [github.com/new](https://github.com/new)
2. Name it whatever you like — remember this name exactly, you'll need it
   in Step 2. Example: `module-dashboard`
3. Public, no README, no .gitignore (you already have these locally)
4. Click **Create repository**. Leave the page open.

### Step 2 — Set the base path to match that exact repo name

Open `vite.config.js` in this project and replace the placeholder:

```js
base: "/REPLACE_WITH_YOUR_REPO_NAME/",
```

with your real repo name from Step 1, e.g.:

```js
base: "/module-dashboard/",
```

Double-check it matches **exactly**, including capitalization — this is
the single most common source of a blank page.

### Step 3 — Test it locally (don't skip this)

```bash
npm install
npm run dev
```

Open the printed `localhost` URL and confirm the dashboard actually loads.
If it's broken locally, it will be broken on GitHub too — easier to catch
now.

### Step 4 — Enable GitHub Pages BEFORE your first push

This is the step that caused the original "404 / Failed to create
deployment" error last time — the Pages *deployment target* must exist
before the workflow's first run tries to publish to it.

1. Go to your repo's **Settings → Pages**
2. Under **Build and deployment → Source**, select **GitHub Actions**
3. There's nothing else to configure here — no branch, no folder. Leave it
   at that.

### Step 5 — Connect and push

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

Use a [Personal Access Token](https://github.com/settings/tokens) as your
password if prompted — GitHub no longer accepts account passwords for
`git push`.

### Step 6 — Watch it deploy

1. Go to the **Actions** tab on your repo
2. A workflow run should start automatically. Wait for the green checkmark
   (1-2 minutes).
3. Go back to **Settings → Pages** — you should now see a banner:
   **"Your site is live at https://YOUR_USERNAME.github.io/YOUR_REPO/"**
4. Open that link in an incognito window (avoids any cache confusion on
   first visit).

## If it's still blank after all that

Open DevTools Console (`F12`) on the live page and check the failing
request's full URL. If it's requesting assets from the wrong path (e.g.
missing your repo name, or showing a different name entirely), that means
`vite.config.js`'s `base` doesn't match the repo — go back to Step 2,
fix it, then:

```bash
git add vite.config.js
git commit -m "Fix base path"
git push
```

## Making future updates

```bash
git add .
git commit -m "Describe what changed"
git push
```

The workflow rebuilds and republishes automatically on every push to `main`.

## Extending the dashboard

To add a Module 06+, extend the `MODULES` array in `src/App.jsx`. Sidebar
numbering and Previous/Next navigation key off each topic's `id`, so a new
module just needs its own entry.
