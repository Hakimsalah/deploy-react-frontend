# 🚀 React Docker Deploy

Déploiement automatisé d'une application frontend **React** conteneurisée avec **Docker** et intégration continue via **GitHub Actions**.

---

## 📦 Stack utilisée

- **React.js** — Application frontend
- **Docker** — Conteneurisation de l'application
- **Nginx** — Serveur de production
- **GitHub Actions** — Pipeline CI/CD

---

## ⚙️ Fonctionnement du workflow

1. À chaque `push` sur la branche `main` :
   - Le code est cloné
   - L'image Docker est construite à partir du `Dockerfile`
   - L'image est publiée sur [Docker Hub](https://hub.docker.com/u/hakim2002)

---

## 🐳 Exécuter localement

```bash
docker build -t react-app .
docker run -d -p 80:80 react-app
