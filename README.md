# Portfolio CMS (Static Site)

This is a **static portfolio website** optimized for GitHub Pages, featuring a **local-only admin interface**.

## Getting Started

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Run Locally (Dev Mode)**:
    ```bash
    npm run dev
    ```
    - View site: [http://localhost:3000](http://localhost:3000)
    - **Admin Panel**: [http://localhost:3000/admin](http://localhost:3000/admin)
        - Since the "Login" button is removed from the public site, you must navigate here manually.
        - **Credentials**: Stored in `src/data/secure-auth.json`. This file is git-ignored.
        - Default User: `admin` (check `secure-auth.json` for hash/password reset if needed).

3.  **Edit Content**:
    - Use the Admin Panel to edit your profile, projects, etc.
    - Changes are saved immediately to `src/data/portfolio.json`.

4.  **Deploy**:
    - Commit your changes (including the updated `portfolio.json`).
    - The `secure-auth.json` file will **NOT** be committed (protected by `.gitignore`).
    - Push to GitHub.

## Build Process

To build the static site:

```bash
npm run build
```

**Note**: The build script (`scripts/build.js`) automatically:
1.  Hides the `src/app/admin` and `src/app/api` directories.
2.  Runs `next build` (static export).
3.  Restores the directories.

This ensures the **Admin Panel is NOT included** in the public production build.

## Project Structure

- `src/app`: Next.js App Router.
- `src/data/portfolio.json`: **Public** data source for the website.
- `src/data/secure-auth.json`: **Private** admin credentials (Local only).
- `src/lib/json-db.ts`: Data access layer (Server-side only).
