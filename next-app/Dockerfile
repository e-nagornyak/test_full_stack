FROM node:lts AS dependencies
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:lts AS builder
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules

ARG NEXT_PUBLIC_BACKEND_URL
ARG NEXT_PUBLIC_FRONTEND_URL
ARG NEXTAUTH_SECRET
ARG NEXTAUTH_URL

ENV NODE_ENV=production
ENV NEXT_PUBLIC_BACKEND_URL=${NEXT_PUBLIC_BACKEND_URL}
ENV NEXT_PUBLIC_FRONTEND_URL=${NEXT_PUBLIC_FRONTEND_URL}
ENV NEXTAUTH_URL=${NEXTAUTH_URL}
ENV NEXTAUTH_SECRET=${NEXTAUTH_SECRET}

RUN yarn build

FROM node:lts AS runner
WORKDIR /app

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

ENV HOSTNAME 0.0.0.0
EXPOSE 3000
CMD ["yarn", "dev"]
