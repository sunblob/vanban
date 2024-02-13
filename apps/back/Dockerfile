FROM node:20 as builder

WORKDIR /app

COPY package.json .
COPY tsconfig.json .
COPY tsup.config.ts .
COPY .env .
COPY src src

RUN npm ci \
  && npm run push \
  && npm run build

FROM node:20 as runner

WORKDIR /app

COPY --from=builder /app/dist /app/dist

CMD ["node", "dist/index.js"]