FROM node:22-slim

WORKDIR /app

COPY . .

RUN yarn
RUN yarn build

CMD ["node", "dist/apps/event/main"]