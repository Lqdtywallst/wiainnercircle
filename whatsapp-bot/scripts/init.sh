#!/usr/bin/env bash
# Genera secretos e imprime variables para pegar en Railway → Variables
set -euo pipefail

cd "$(dirname "$0")/.."

INTERNAL="${INTERNAL_SECRET:-$(openssl rand -hex 24)}"
VERIFY="${WHATSAPP_VERIFY_TOKEN:-$(openssl rand -hex 16)}"

cat > .env <<EOF
PORT=8080
INTERNAL_SECRET=${INTERNAL}
WHATSAPP_VERIFY_TOKEN=${VERIFY}
WHATSAPP_TOKEN=
WHATSAPP_PHONE_NUMBER_ID=
WHATSAPP_TEMPLATE_NAME=wia_lead_confirmation
WHATSAPP_TEMPLATE_LANG=es
CALENDLY_URL=https://calendly.com/wiainvestments/30min
SITE_URL=https://www.wiainnercircle.com
EOF

echo "✓ Creado whatsapp-bot/.env"
echo ""
echo "── Pega esto en Railway → Variables ──"
echo "INTERNAL_SECRET=${INTERNAL}"
echo "WHATSAPP_VERIFY_TOKEN=${VERIFY}"
echo "WHATSAPP_TEMPLATE_NAME=wia_lead_confirmation"
echo "WHATSAPP_TEMPLATE_LANG=es"
echo "CALENDLY_URL=https://calendly.com/wiainvestments/30min"
echo "SITE_URL=https://www.wiainnercircle.com"
echo ""
echo "── Arrancar local ──"
echo "npm run build && npm run start:local"
echo ""
echo "── Railway Settings ──"
echo "Root Directory: whatsapp-bot"
