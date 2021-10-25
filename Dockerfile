
FROM node:14

# I took this from buildkite/puppeteer
# but I removed things I do not use
RUN  apt-get update \
    # Install latest chrome dev package, which installs the necessary libs to
    # make the bundled version of Chromium that Puppeteer installs work.
    && apt-get install -y wget ghostscript --no-install-recommends \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-unstable --no-install-recommends


# Create working directory
WORKDIR /cv

# Copy the npm related files
COPY package*.json /cv/

# Install the node modules
RUN npm ci

# Copy the CV related files
# Doing this in another phase allows to speedup the process
COPY . /cv/

# The resulting image is ready to render the pdf with 'npm run cv'
ENTRYPOINT ["npm", "run", "cv", "--"]