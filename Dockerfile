FROM node:20-alpine

WORKDIR /app

# Copy only the compiled API
COPY dist/api ./dist

# Copy package files (for production dependencies)
COPY dist/api/package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

EXPOSE 3000

CMD ["node", "dist/main.js"]
