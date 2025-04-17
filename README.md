# Chihuahua Capital

Платформа для токенизации малого бизнеса на базе блокчейна Avalanche (Fuji Testnet).

## Возможности

- Создание пользовательских ERC20 токенов с настраиваемым именем, символом и общим предложением
- Просмотр всех созданных токенов на платформе
- Детальная информация о каждом токене
- Взаимодействие с экосистемой Avalanche

## Технологии

- **Frontend**: React, TypeScript, Material UI, ethers.js
- **Smart Contracts**: Solidity, Hardhat, OpenZeppelin
- **Blockchain**: Avalanche Fuji Testnet

## Установка и запуск

1. Клонируйте репозиторий:
```bash
git clone <url-репозитория>
cd chihuahua-capital
```

2. Установите зависимости:
```bash
npm install --legacy-peer-deps
```

3. Заполните `.env` файл:
```
PRIVATE_KEY=ваш_приватный_ключ_для_деплоя
```

4. Скомпилируйте смарт-контракты:
```bash
npm run compile
```

5. Деплой контрактов на тестовую сеть Avalanche Fuji:
```bash
npm run deploy
```

6. После деплоя контракта обновите адрес в файле `src/services/tokenFactory.ts`:
```typescript
const TOKEN_FACTORY_ADDRESS = 'адрес_задеплоенного_контракта';
```

7. Запустите локальный сервер для разработки:
```bash
npm start
```

8. Откройте приложение в браузере:
```
http://localhost:3000
```

## Быстрый локальный запуск (без ключа и деплоя)

Для быстрого тестирования без необходимости деплоя на тестовую сеть:

1. Клонируйте репозиторий:
```bash
git clone <url-репозитория>
cd chihuahua-capital
```

2. Установите зависимости:
```bash
npm install --legacy-peer-deps
```

3. Запустите локальную ноду Hardhat в отдельном терминале:
```bash
npx hardhat node
```

4. Запустите React приложение:
```bash
npm start
```

5. Откройте приложение в браузере:
```
http://localhost:3000
```

6. В приложении нажмите кнопку "Использовать локальную ноду"

Приложение автоматически:
- Подключится к локальной Hardhat ноде
- Задеплоит контракт TokenFactory
- Позволит создавать и просматривать токены в памяти локальной ноды

> **Примечание**: При этом способе запуска все данные существуют только в памяти локальной ноды и будут сброшены при ее перезапуске.

## Использование

1. Установите и настройте Metamask (https://metamask.io/)
2. Добавьте сеть Avalanche Fuji Testnet:
   - Название сети: Avalanche Fuji Testnet
   - RPC URL: https://api.avax-test.network/ext/bc/C/rpc
   - Chain ID: 43113
   - Символ: AVAX
   - Обозреватель блоков: https://testnet.snowtrace.io/

3. Получите тестовые AVAX на фаусете: https://faucet.avax.network/

4. Подключите кошелек к приложению и начните создавать токены!

## Тестирование

Для запуска тестов смарт-контрактов:
```bash
npm run test:contract
```

## Локальная разработка

Для запуска локальной ноды Hardhat:
```bash
npm run node
```

Деплой контракта на локальную ноду:
```bash
npm run deploy:local
```

## Деплой на Vercel

Для деплоя проекта на Vercel, выполните следующие шаги:

1. Установите Vercel CLI:
```bash
npm install -g vercel
```

2. Авторизуйтесь:
```bash
vercel login
```

3. Деплой для разработки:
```bash
npm run vercel-deploy
```

4. Деплой в продакшн:
```bash
npm run vercel-deploy:prod
```

Или используйте автоматический деплой через GitHub:
1. Подключите репозиторий к Vercel через панель управления Vercel
2. Настройте Environment Variables в панели Vercel:
   - Добавьте переменные из .env файла (кроме PRIVATE_KEY)
   - Для frontend части добавьте REACT_APP_* переменные

## Лицензия

MIT

## Контакты

По всем вопросам обращайтесь: example@example.com
