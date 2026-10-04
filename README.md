# 🚀 Jenkins CI/CD Pipeline with GitHub, Docker, Docker Hub & AWS EC2

A hands-on DevOps CI/CD project that demonstrates how a code push to GitHub can automatically trigger Jenkins, build and test a Docker image, push the image to Docker Hub, and deploy the application as a Docker container on an AWS EC2 instance.

---

## 📌 Project Overview

This project implements an automated CI/CD workflow for a containerized Flask web application.

### Final workflow

```text
Developer
    │
    │ git push
    ▼
GitHub Repository
    │
    │ Webhook
    ▼
Jenkins on AWS EC2
    │
    ├── Checkout
    ├── Build
    ├── Test
    ├── Docker Build
    ├── Push Image
    │       │
    │       ▼
    │   Docker Hub
    │
    └── Deploy
            │
            ▼
      Docker Container
            │
            ▼
       Flask Web App
```

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| AWS EC2 | Jenkins server and application deployment server |
| Jenkins | CI/CD automation |
| GitHub | Source code management |
| GitHub Webhook | Automatically triggers Jenkins after a push |
| Docker | Containerization |
| Docker Hub | Docker image registry |
| Python / Flask | Demo web application |
| Linux / Ubuntu | EC2 operating system |
| Git | Version control |

---

## ✨ Features

- Automated pipeline triggered by GitHub push
- Jenkins Pipeline as Code using a `Jenkinsfile`
- Docker image creation
- Docker image validation
- Secure Docker Hub credentials stored in Jenkins
- Automatic Docker Hub image push
- Versioned Docker image tags using Jenkins build numbers
- `latest` Docker image tag
- Automatic deployment on EC2
- Containerized Flask application
- Animated and responsive web UI
- Health-check endpoint

---

## 📁 Project Structure

```text
jenkins-docker-demo/
│
├── app.py
├── requirements.txt
├── Dockerfile
├── Jenkinsfile
│
├── templates/
│   └── index.html
│
├── static/
│   ├── style.css
│   └── script.js
│
└── screenshots/
    ├── jenkins-dockerhub-credentials.png
    ├── github-webhook.png
    ├── jenkins-pipeline-success.png
    ├── dockerhub-image.png
    └── application-ui.png
```

> Add the remaining screenshots to the `screenshots/` directory using the names above. The README is intentionally structured so the documentation can be completed with screenshots from your own environment.

---

# 🔄 CI/CD Pipeline

## 1. Developer pushes code

A developer makes a change and pushes it to the `main` branch:

```bash
git add .
git commit -m "Update application"
git push origin main
```

---

## 2. GitHub Webhook

GitHub sends a webhook request to Jenkins:

```text
GitHub
   │
   │ POST /github-webhook/
   ▼
Jenkins
```

This removes the need to manually select **Build Now**.

### Screenshot

![GitHub Webhook](https://github.com/Workwithaditya01/Jenkins-CI-CD/blob/fb1049abd1d630cd1be44a46a52c2782e14e4294/Images/webhook.png)

---

## 3. Jenkins starts the pipeline

Jenkins receives the webhook and starts the pipeline defined in the repository's `Jenkinsfile`.

Pipeline stages:

```text
Checkout
   ↓
Build
   ↓
Test
   ↓
Push to Docker Hub
   ↓
Deploy
```

### Screenshot

![Jenkins Pipeline Success](https://github.com/Workwithaditya01/Jenkins-CI-CD/blob/fb1049abd1d630cd1be44a46a52c2782e14e4294/Images/pipeline%20overview.png)

---

# 🐳 Docker

The application is packaged into a Docker image.

Example:

```bash
docker build -t YOUR_USERNAME/demo-app:latest .
```

The Dockerfile:

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY app.py .
COPY templates/ templates/
COPY static/ static/

EXPOSE 5000

CMD ["python", "app.py"]
```

The application is exposed on port `5000`.

---

# 🔐 Jenkins + Docker Hub Credentials

Docker Hub credentials are stored in Jenkins rather than hard-coded into the `Jenkinsfile`.

Credential type:

```text
Username with password
```

Username:

```text
Docker Hub username
```

Password:

```text
Docker Hub access token
```

Credential ID:

```text
dockerhub-credentials
```

### Screenshot

The project includes the Jenkins credentials configuration screenshot supplied during setup:

![Jenkins Docker Hub Credentials](https://github.com/Workwithaditya01/Jenkins-CI-CD/blob/fb1049abd1d630cd1be44a46a52c2782e14e4294/Images/dockerhub-creadentials%20in%20jenkins.png)

> Never commit a Docker Hub password or access token to GitHub.

---

# 📦 Docker Hub

After a successful Jenkins build, the Docker image is pushed to:

```text
adityasondekar/demo-app
```

Jenkins creates two tags:

```text
adityasondekar/demo-app:6
adityasondekar/demo-app:latest
```

The build-number tag provides traceability between a Jenkins build and the Docker image.

### Screenshot

![Docker Hub Repository](https://github.com/Workwithaditya01/Jenkins-CI-CD/blob/fb1049abd1d630cd1be44a46a52c2782e14e4294/Images/github%20Repository.png)

---

# 🚀 Deployment on AWS EC2

After the image is pushed to Docker Hub, Jenkins deploys the image as a Docker container on the EC2 instance.

Example:

```bash
docker stop demo-app || true
docker rm demo-app || true

docker run -d \
  --name demo-app \
  -p 5000:5000 \
  YOUR_USERNAME/demo-app:BUILD_NUMBER
```

Verify the container:

```bash
docker ps
```

Expected:

```text
demo-app
```

Check application logs:

```bash
docker logs demo-app
```

Test locally from EC2:

```bash
curl http://<EC2_Instance_IP>:5000
```

---

# 🌐 Accessing the Application

If EC2 security-group rules allow TCP port `5000`, the application can be accessed using:

```text
http://<EC2_Instance_IP>:5000
```

### Screenshot

![Application UI](https://github.com/Workwithaditya01/Jenkins-CI-CD/blob/fb1049abd1d630cd1be44a46a52c2782e14e4294/Images/Main%20page.png)

---

# ❤️ Health Check

The application exposes:

```text
GET /health
```

Example:

```bash
curl http://<EC2_Instance_IP>:5000/health
```

Expected response:

```json
{
  "status": "healthy",
  "application": "DevOps CI/CD Demo",
  "version": "2.0"
}
```

---

# 🧩 Jenkinsfile

The pipeline is defined as code in the repository.

A simplified version of the pipeline flow is:

```groovy
pipeline {

    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                sh 'docker build ... .'
            }
        }

        stage('Test') {
            steps {
                sh 'docker image inspect ...'
            }
        }

        stage('Push to Docker Hub') {
            steps {
                // Authenticate using Jenkins credentials
                // Push versioned and latest images
            }
        }

        stage('Deploy') {
            steps {
                // Stop previous container
                // Start new container
            }
        }
    }
}
```

---

# 🔒 Security Considerations

- Docker Hub credentials are stored in Jenkins Credentials.
- Docker Hub access tokens should be used instead of a normal password.
- Secrets must never be committed to GitHub.
- EC2 Security Groups should expose only required ports.
- Jenkins should not be unnecessarily exposed to the public internet.
- Production deployments should use HTTPS and a production WSGI server such as Gunicorn rather than Flask's development server.
- Docker images should ideally be scanned for vulnerabilities before production deployment.

---

# 🧪 How to Test the CI/CD Pipeline

Make a small application change.

For example:

```text
Change a heading or text on index.html
```

Then:

```bash
git add .
git commit -m "Update application UI"
git push origin main
```

Expected automation:

```text
Git Push
   ↓
GitHub Webhook
   ↓
Jenkins Build
   ↓
Checkout
   ↓
Docker Build
   ↓
Test
   ↓
Docker Hub Push
   ↓
EC2 Deployment
```

No manual **Build Now** action should be required.

---

# 📊 Verification Commands

### Check Jenkins service

```bash
sudo systemctl status jenkins
```

### Check Docker

```bash
docker ps
```

### Check application container

```bash
docker ps --filter name=demo-app
```

### View application logs

```bash
docker logs demo-app
```

### Test application

```bash
curl http://localhost:5000
```

### Test health endpoint

```bash
curl http://localhost:5000/health
```

### Check Docker images

```bash
docker images
```

---

# 🧯 Common Issues Encountered

## 1. Jenkins cannot access Docker

Error:

```text
permission denied while trying to connect to the Docker API
```

Fix:

```bash
sudo usermod -aG docker jenkins
sudo systemctl restart jenkins
```

Verify:

```bash
sudo -u jenkins docker ps
```

---

## 2. Port 5000 already allocated

Error:

```text
Bind for 0.0.0.0:5000 failed: port is already allocated
```

Find the container using the port:

```bash
docker ps
```

or:

```bash
sudo ss -ltnp | grep :5000
```

Stop/remove the old application container if appropriate.

---

## 3. Flask `TemplateNotFound`

Error:

```text
jinja2.exceptions.TemplateNotFound: index.html
```

Cause:

The `templates/` directory was not copied into the Docker image.

The Dockerfile must include:

```dockerfile
COPY templates/ templates/
COPY static/ static/
```

---

# 🎯 Interview Explanation

A strong interview explanation can be:

> "I built an end-to-end CI/CD pipeline for a containerized Flask application. The source code is maintained in GitHub. A GitHub webhook triggers Jenkins whenever code is pushed to the main branch. Jenkins checks out the code, builds the Docker image, performs validation, authenticates securely to Docker Hub using Jenkins-managed credentials, and pushes both a build-number tag and the latest tag. Jenkins then deploys the resulting image as a Docker container on an AWS EC2 instance. The application is exposed through port 5000, and I added a health endpoint for basic validation."

### Key technologies to mention

```text
GitHub
Jenkins
GitHub Webhooks
Jenkinsfile
Docker
Docker Hub
AWS EC2
Python Flask
Linux
Git
```

### Key DevOps concepts demonstrated

```text
CI/CD
Automation
Pipeline as Code
Containerization
Image Registry
Webhook-based triggering
Secrets Management
Immutable Build Artifacts
Deployment Automation
```

---

# 🏆 Project Outcome

The final project demonstrates:

```text
        ┌─────────────┐
        │   GitHub    │
        └──────┬──────┘
               │
          Code Push
               │
               ▼
        ┌─────────────┐
        │   Jenkins   │
        └──────┬──────┘
               │
        ┌──────▼──────┐
        │ Docker Build│
        └──────┬──────┘
               │
               ▼
        ┌─────────────┐
        │ Docker Hub  │
        └──────┬──────┘
               │
               ▼
        ┌─────────────┐
        │   AWS EC2   │
        │   Docker    │
        └──────┬──────┘
               │
               ▼
        ┌─────────────┐
        │ Flask App   │
        └─────────────┘
```

---

## 📸 Recommended Screenshots for the Final GitHub README

Before considering the documentation complete, capture these screenshots from your own environment:

1. **Application UI** — the redesigned animated application.
2. **GitHub repository** — showing `Dockerfile`, `Jenkinsfile`, application files, and README.
3. **GitHub Webhook** — showing the webhook configuration and successful delivery.
4. **Jenkins pipeline** — showing a successful build with all stages.
5. **Jenkins Console Output** — showing Docker build, Docker Hub push, and deployment.
6. **Jenkins Docker Hub credentials** — redact/avoid displaying any secret values.
7. **Docker Hub repository** — showing the pushed image and tags.
8. **EC2 `docker ps`** — showing the deployed `demo-app` container.
9. **Browser** — showing the application running from the EC2 public IP.

> Do not take screenshots that expose passwords, Docker Hub access tokens, AWS secret keys, private SSH keys, or other credentials.

---

## 👨‍💻 Author

**DevOps CI/CD Project**

Built using:

**GitHub + Jenkins + Docker + Docker Hub + AWS EC2 + Flask**
