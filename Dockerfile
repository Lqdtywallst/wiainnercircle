# Railway: solo copia dist precompilado + express (sin tsc en build)
FROM node:20-alpine

WORKDIR /app

COPY whatsapp-bot/package.json whatsapp-bot/package-lock.json ./
RUN npm ci --omit=dev

COPY whatsapp-bot/dist ./dist

ENV NODE_ENV=production
EXPOSE 8080

CMD ["node", "dist/index.js"]
