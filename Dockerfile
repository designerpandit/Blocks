FROM node:22.22.3-slim

WORKDIR /app

COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn/releases .yarn/releases
COPY backend/package.json backend/package.json

# Reduce the monorepo root to the backend workspace so only its dependencies are installed
RUN node -e "const fs=require('fs');const p=JSON.parse(fs.readFileSync('package.json'));p.workspaces={packages:['backend']};fs.writeFileSync('package.json',JSON.stringify(p))" \
 && YARN_ENABLE_IMMUTABLE_INSTALLS=false node .yarn/releases/yarn-4.18.0.cjs workspaces focus @storybook/backend --production

COPY backend/src backend/src

WORKDIR /app/backend
EXPOSE 3001
CMD ["node", "src/index.ts"]
