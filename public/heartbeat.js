// Простой скрипт для проверки работоспособности приложения на Vercel
console.log('Chihuahua Capital: Приложение запущено');

// Проверка доступности root элемента
window.addEventListener('DOMContentLoaded', function() {
  const rootElement = document.getElementById('root');
  
  if (rootElement) {
    console.log('Root element найден, DOM готов');
  } else {
    console.error('Root element не найден!');
  }
  
  // Проверка доступности React
  if (window.React) {
    console.log('React доступен:', window.React.version);
  } else {
    console.log('React еще не загружен');
  }
  
  // Простая диагностика CSS
  const styles = getComputedStyle(document.body);
  console.log('Текущий фон body:', styles.backgroundColor);
  
  // Проверка загрузки изображений
  const imageElements = document.querySelectorAll('img');
  console.log('Найдено изображений:', imageElements.length);
});

// Проверка работы роутинга
window.addEventListener('load', function() {
  console.log('Текущий URL:', window.location.href);
  console.log('Текущий путь:', window.location.pathname);
  console.log('Текущий хэш:', window.location.hash);
}); 