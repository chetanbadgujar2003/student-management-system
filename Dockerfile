# Stage 1: Build the React frontend
FROM node:18-alpine AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ .
RUN npm run build

# Stage 2: Assemble Node Express backend and static public folder
FROM node:18-alpine
WORKDIR /app
COPY backend/package*.json ./
RUN npm ci --omit=dev
COPY backend/ .

# Copy compiled frontend assets from Stage 1 into backend's public directory
COPY --from=frontend-build /app/frontend/dist ./public

EXPOSE 5000

ENV PORT=5000
ENV NODE_ENV=production

CMD ["npm", "start"]
