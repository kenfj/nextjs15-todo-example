FROM node:22-bookworm

# run Playwright inside Docker
# https://playwright.dev/docs/docker#build-your-own-image

RUN npx -y playwright@1.51.1 install --with-deps

WORKDIR /app

COPY package.json package-lock.json /app/

RUN npm ci

COPY \
    eslint.config.mjs \
    next.config.ts \
    playwright.config.ts \
    postcss.config.mjs \
    tailwind.config.ts \
    tsconfig.json \
    vitest.config.mts \
    /app/

COPY prisma/ /app/prisma/
COPY public/ /app/public/

RUN npx auth secret && npx prisma generate

COPY e2e/ /app/e2e/
COPY src/ /app/src/

CMD [ "npx", "playwright", "test", "--reporter=list" ]
