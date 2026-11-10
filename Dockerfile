FROM node:24-bookworm-slim

ENV DEBIAN_FRONTEND=noninteractive
WORKDIR /workspace

RUN apt-get update \
    && apt-get install -y --no-install-recommends libreoffice-impress poppler-utils fonts-liberation \
    && rm -rf /var/lib/apt/lists/*

RUN printf '%s\n' \
    '<fontconfig>' \
    '  <alias binding="strong"><family>Aptos</family><prefer><family>Liberation Sans</family></prefer></alias>' \
    '  <alias binding="strong"><family>Aptos Display</family><prefer><family>Liberation Sans</family></prefer></alias>' \
    '</fontconfig>' > /etc/fonts/conf.d/99-aptos-liberation.conf \
    && fc-cache -f

COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

COPY . .
USER node
CMD ["sh", "-lc", "npm run build:sample && npm run validate && npm run render && npm run contact-sheet"]
