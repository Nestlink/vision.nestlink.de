<img src="./src/assets/logo/logo-winking.svg" width="64" align="center" />

# vision.nestlink.de

## Develop

1. Customise your environment.

```bash
cp .env.example .env
```

2. Install dependencies with npm.

```bash
npm i
```

3. Apply database migrations.

```bash
npx prisma migrate dev
```

4. Run the development server.

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Deploy

This repository is configured to run behind a [traefik](https://traefik.io/traefik/) reverse proxy. \
Before building, ensure an environment file is present in the root directory.

```bash
docker-compose up -d
```
