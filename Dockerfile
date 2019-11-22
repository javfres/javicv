FROM node:10

# Create working directory
WORKDIR /cv

# Copy the npm related files
COPY package*.json ./

# Install the node modules
RUN npm ci --only=production

# Copy the CV related files
# Doing this in another phase allows to speedup the process
COPY index.ts src tsconfig.json ./

# Comple the typescript
RUN npm run tsc

