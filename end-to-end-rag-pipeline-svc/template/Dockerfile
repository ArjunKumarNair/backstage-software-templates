#-------- BACKEND --------
FROM node:18 AS backend

WORKDIR /app

# Copy backend files
COPY src/package*.json ./
RUN npm install

# Copy backend source
COPY src/ ./

# Expose backend port
EXPOSE 4000

# Start backend server
CMD ["node", "index.js"]