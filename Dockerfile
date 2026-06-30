# Railway deploy: builds only whatsapp-bot/ (web stays on Vercel)
FROM node:20-alpine AS build

WORKDIR /app

COPY whatsapp-bot/package.json whatsapp-bot/package-lock.json ./
RUN npm ci

COPY whatsapp-bot/tsconfig.json ./
COPY whatsapp-bot/src ./src
RUN npm run build

FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY whatsapp-bot/package.json whatsapp-bot/package-lock.json ./
RUN npm ci --omit=dev

COPY --from=build /app/dist ./dist

EXPOSE 8080

CMD ["node", "dist/index.js"]
