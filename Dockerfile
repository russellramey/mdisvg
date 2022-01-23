# NodeJS version
FROM node:latest
# Set app working directory
WORKDIR /usr/src/app
# Copy node dependencies
COPY package*.json ./
# Run npm install for node dependencies
RUN npm install
# Copy app source code to working directory
COPY . .
# Expose port
EXPOSE 3030
# Run app
CMD ["node", "app.js"]
