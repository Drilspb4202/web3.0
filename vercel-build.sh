#!/bin/bash

# Логирование информации о среде
echo "Starting build process..."
echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"
echo "Current directory: $(pwd)"

# Устанавливаем зависимости с флагом legacy-peer-deps
echo "Installing dependencies..."
npm install --legacy-peer-deps

# Компилируем контракты
echo "Compiling smart contracts..."
npx hardhat compile

# Сборка React приложения
echo "Building React application..."
npm run build

echo "Build completed successfully!" 