# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project summary

- Service: `ctoip_vue` frontend
- Stack: Vue2 + Vuex + Vue Router + Element UI
- Role: UI and interaction layer for CTOIP system

## Commands

### Development

```bash
npm install
npm run serve
```

### Build

```bash
npm run build
```

### Test / Lint

No `test` or `lint` scripts are defined in `package.json` currently.

## Architecture (big picture)

- App bootstrap: `src/main.js`
- Router: `src/router/index.js`
- HTTP wrapper: `src/axios.js`
- Dynamic menu/route source: `src/store/menus.js`

The app relies on menu-driven dynamic route mounting and heavily uses Element UI components.

## Backend integration contract

- Axios base URL is `/api`.
- Dev proxy in `vue.config.js`: `/api -> http://localhost:8081/`.
- Auth flow expects captcha before login (`/captcha` then `/login`).
- Token is read from response header `authorization` and stored locally for subsequent requests.

## Container build/deploy notes

- Runtime container uses Nginx and serves built assets from `dist`.
- Dockerfile build stage should run on build platform for faster multi-arch CI builds.
- Production deployment is orchestrated by `ctoip_docker` `web` service.
