import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// ============================================================
// STOP: before you do anything else, edit the line below.
// Replace REPLACE_WITH_YOUR_REPO_NAME with your GitHub repo's
// exact name (case-sensitive), for example:
//
//   If your repo is github.com/yourname/module-dashboard
//   -> base: "/module-dashboard/",
//
// If this repo IS your GitHub Pages user/org root site
// (i.e. named exactly yourname.github.io), use base: "/" instead.
// ============================================================
export default defineConfig({
  plugins: [react()],
  base: "/bootcamp-dashboard/",
});
