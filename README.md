# Project Setup Guide

## 🔧 Getting Started

1. **Add `.env` File**

   To begin, create a `.env` file in the root of the project. Use the provided `env.example` as a reference.

   Replace the following values with your own credentials:

2. **Start Database and NestJS with Docker**

Run the following command to build and start the Docker containers for the database and NestJS backend:

```bash
docker compose up -d --build 

# Copy the .env file into the Next.js app directory
cp .env next-app/.env

# Install all dependencies
cd next-app
yarn

# Build the Next.js app
yarn build

# Start the app
yarn start
