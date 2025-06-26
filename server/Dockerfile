# Stage 1: Build
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Stage 2: Production
EXPOSE 3000
CMD ["npm", "run", "test"]
CMD ["node", "index.js"]

