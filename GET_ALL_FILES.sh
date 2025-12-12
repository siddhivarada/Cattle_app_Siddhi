#!/bin/bash
echo "==================================="
echo "CATTLE HEALTH MONITOR - ALL FILES"
echo "==================================="
echo ""

files=(
  "package.json"
  "next.config.js"
  "tailwind.config.js"
  "postcss.config.js"
  "app/page.js"
  "app/layout.js"
  "app/dashboard/page.js"
  "components/CowCard.js"
  "components/AddCowForm.js"
  "components/AlertNotification.js"
  "components/HealthMonitor.js"
  "lib/storage.js"
  "lib/simulator.js"
  "lib/notifications.js"
  "public/manifest.json"
  "public/sw.js"
  "public/icon-192.svg"
  "public/icon-512.svg"
  "README.md"
)

for file in "${files[@]}"; do
  if [ -f "/app/$file" ]; then
    echo ""
    echo "╔═══════════════════════════════════════════"
    echo "║ FILE: $file"
    echo "╚═══════════════════════════════════════════"
    echo ""
    cat "/app/$file"
    echo ""
    echo "─────────────────────────────────────────"
  fi
done
