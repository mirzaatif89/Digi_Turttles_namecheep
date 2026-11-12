# Ocean Hatchling Journey

https://sdgshghdfgdfgdfkhgdkghdfkghkdfhgdfk.vercel.app/ recreate this website in 3d glass effect, and i want immersive & interactive website, when scroll down background animation start, show the 3d turtle break the egg and coming out from the egg and start walking then dive into the see, this animation should be made correctly, also make the them see type dark ocean theme use the colors according to the logo,

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/9a0e0bfd-147c-4008-9ef3-902284eefe3c).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Deploy to Namecheap cPanel

This app uses server-side rendering and MySQL-backed admin features, so it needs a
cPanel plan with the Node.js application feature; uploading only static files to
`public_html` will not run the app.

Use Node.js `^20.19.0` or `>=22.12.0` and choose one deployment layout:

### Git checkout is the Node.js app root

This is the current `digiturtles.com` layout. After pulling the repository on
the server, run `npm ci` and `npm run build` in the app root. In cPanel's Node.js
app setup, use `.output/server/index.mjs` as the startup file, attach the domain,
and restart the app.

### Prebuilt output is uploaded to the Node.js app root

Run `npm ci` and `npm run build` before uploading. Upload the **contents** of
`.output` to the app root, keeping the `server` and `public` folders together.
Use `server/index.mjs` as the startup file, then restart the app.

For either layout, add these environment variables in cPanel (never commit their values):
   `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `ADMIN_NAME`,
   `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `NODE_ENV=production`.

The database must be reachable from the hosting account. If the cPanel plan
doesn't offer Node.js applications, this SSR app needs a Node.js host or VPS;
static FTP hosting alone is not sufficient.

# Digi_Turttles_namecheep
