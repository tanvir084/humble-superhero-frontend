# 🦸 Humble Superhero API - Frontend

This project is the frontend for the **Humble Superhero API**, built using **Vite** and **React**. It supports real-time updates via **Socket.IO**, uses **Docker Compose** for containerized deployment, and can be customized with environment variables prefixed by `VITE_`.

## 🎯 Features

- **Modern UI**: Built with React & Vite.
- **Real-Time Updates**: Automatically refresh the UI when new superheroes are added.
- **Responsive Design**: Full-screen layout and responsive styling.
- **Docker Compose**: Easily build and run the application in a container on port **5000**.
- **Environment Variables**: Configure the API URL and other settings via a `.env` file.
- **Custom Favicon & Title**: Easily updated in `public/index.html`.

## 🏗️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (>= 16.x)
- [Yarn](https://yarnpkg.com/)
- [Docker & Docker Compose](https://www.docker.com/) (optional, for production)

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/humble-superhero-api-frontend.git
   cd humble-superhero-api-frontend
   ```

2. **Install Dependencies**:
   ```bash
   yarn install
   ```

3. **Configure Environment Variables**:

   Create a `.env` file in the project root. Variables must be prefixed with `VITE_` for Vite to expose them to the client:
   ```bash
   VITE_API_URL=http://localhost:3000
   ```

4. **Run the Development Server**:
   ```bash
   yarn dev
   ```
   The app will be available at [http://localhost:5173](http://localhost:5173).

### Building for Production

1. **Build the App**:
   ```bash
   yarn build
   ```

2. **Preview the Production Build**:
   ```bash
   yarn preview
   ```
   The production build will be previewed at [http://localhost:4173](http://localhost:4173) by default.

## 🐳 Dockerization

This project is dockerized using **Docker Compose**. The necessary files (`Dockerfile` and `docker-compose.yml`) are included in the project root.

### Dockerfile

A multi-stage Dockerfile that builds the React app and serves it via **Nginx**.

### docker-compose.yml

Configured to map **container port 80** to **host port 5000**. You can adjust this if needed.

### Running with Docker Compose

1. **Build and Run the Container**:
   ```bash
   docker-compose up --build -d
   ```
2. The app will be accessible at [http://localhost:5000](http://localhost:5000).

### Stopping the Application

```bash
docker-compose down
```

## 📂 Project Structure

```
📦 humble-superhero-api-frontend/
┣ 📂 node_modules/                     # Installed dependencies
┣ 📂 public/
┃  ┣ 📜 favicon.ico                    # Custom favicon
┃  ┗ 📜 index.html                     # HTML template (update title & favicon)
┣ 📂 src/
┃  ┣ 📜 App.jsx                        # Main React component (UI & logic)
┃  ┣ 📜 index.css                      # Global styles (full-screen design)
┃  ┗ 📜 main.jsx                       # Entry point for React
┣ 📜 .env                              # Environment variables (e.g., VITE_API_URL)
┣ 📜 package.json                      # Project config & scripts
┣ 📜 Dockerfile                        # Docker configuration (multi-stage build)
┣ 📜 docker-compose.yml                # Docker Compose configuration
┗ 📜 README.md                         # This file
```

## 🎨 Customization

- **Environment Variables**:  
  Modify `.env` to set your backend API URL:
  ```bash
  VITE_API_URL=http://localhost:8080
  ```

## 🔧 Available Scripts

- **Start Dev Server**: `yarn dev`
- **Build for Production**: `yarn build`
- **Preview Build**: `yarn preview`

## 🤝 Contributing

1. **Fork** the repository  
2. **Create a new branch** (`git checkout -b feature-branch`)  
3. **Commit your changes** (`git commit -m "Add new feature"`)  
4. **Push to GitHub** (`git push origin feature-branch`)  
5. **Open a Pull Request** 🎉

## If I Had More Time

- **Enhanced Testing**: Add unit/integration tests with React Testing Library or Cypress.
- **Advanced UI**: Incorporate design frameworks (e.g., Material UI) or custom theming.
- **CI/CD Pipeline**: Automate tests and deployment with GitHub Actions or similar.

## 📜 License

This project is licensed under the [MIT License](LICENSE).

**Happy Coding!** 🚀
```
