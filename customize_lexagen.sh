#!/bin/bash
# Script para unificar lo que está dentro de src/lexagen en los directorios de src/
# ATENCIÓN: HAZ COPIA DE SEGURIDAD O REVISA ANTES DE EJECUTAR

# 1. Mover pages
if [ -d "src/lexagen/pages" ]; then
  mkdir -p src/pages
  mv src/lexagen/pages/* src/pages/
fi

# 2. Mover components
if [ -d "src/lexagen/components" ]; then
  mkdir -p src/components
  mv src/lexagen/components/* src/components/
fi

# 3. Mover context
if [ -d "src/lexagen/context" ]; then
  mkdir -p src/context
  mv src/lexagen/context/* src/context/
fi

# 4. Mover hooks
if [ -d "src/lexagen/hooks" ]; then
  mkdir -p src/hooks
  mv src/lexagen/hooks/* src/hooks/
fi

# 5. Mover services
if [ -d "src/lexagen/services" ]; then
  mkdir -p src/services
  mv src/lexagen/services/* src/services/
fi

# 6. Borrar la carpeta lexagen (si quedó vacía)
rm -rf src/lexagen

echo "¡Unificación completada! Recuerda revisar y actualizar tus 'import' en el código."
