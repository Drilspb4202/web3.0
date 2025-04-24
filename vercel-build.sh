#!/bin/bash

# Логирование информации о среде
echo "Starting build process..."
echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"
echo "Current directory: $(pwd)"
echo "CI environment: $CI"
echo "Vercel environment: $VERCEL"
echo "IS_VERCEL environment: $IS_VERCEL"

# Настройка CI для React
export CI=false
export GENERATE_SOURCEMAP=false

# Устанавливаем зависимости с флагом legacy-peer-deps
echo "Installing dependencies..."
npm install --legacy-peer-deps

# Компилируем контракты
echo "Compiling smart contracts..."
npx hardhat compile

# Сборка React приложения
echo "Building React application..."
npm run build

# Проверяем, что build директория существует и содержит файлы
if [ -d "build" ] && [ "$(ls -A build)" ]; then
  echo "Build directory exists and contains files."
  echo "Contents of build directory:"
  ls -la build
else
  echo "ERROR: Build directory is empty or does not exist!"
  exit 1
fi

echo "Build completed successfully!" 