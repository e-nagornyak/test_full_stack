#!/bin/sh

echo "⏳ Waiting for DB..."
sleep 10

echo "🔧 Prisma generate"
npx prisma generate

echo "🧱 Prisma db push"
npx prisma db push

echo "🔨 Building NestJS"
npx nest build

echo "🚀 Starting server"
npx nest start
