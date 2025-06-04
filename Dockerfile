# Étape 1 : Build de l'application React
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Étape 2 : Serveur Nginx pour servir le build
FROM nginx:alpine

# Copie de ton fichier nginx.conf personnalisé (si tu l'utilises)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copie des fichiers build
COPY --from=build /app/build /usr/share/nginx/html

# Port exposé
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
