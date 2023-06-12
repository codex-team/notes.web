FROM node:18-alpine AS deps

RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

COPY . .

FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

FROM nginx:bullseye AS runner
COPY --from=builder /app/dist /usr/share/nginx/html

# FROM node:18-alpine AS runner
# WORKDIR /usr/app

# COPY --from=builder /app/dist ./dist
# # COPY package.json ./
# # RUN npm install

# USER node
# ENV NODE_ENV="production"
# CMD ["npm", "run", "preview"]
# # CMD ["vite", "preview"]