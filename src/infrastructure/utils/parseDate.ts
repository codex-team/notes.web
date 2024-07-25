export function parseDate(date: Date): string {
  // Массив с названиями месяцев
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Получаем название месяца
  const month = months[date.getUTCMonth()];

  // Получаем день
  const day = date.getUTCDate();

  // Получаем часы и минуты, добавляем ведущий ноль при необходимости
  const hours = date.getUTCHours().toString()
    .padStart(2, '0');
  const minutes = date.getUTCMinutes().toString()
    .padStart(2, '0');

  // Формируем итоговую строку
  return `${month} ${day}, ${hours}:${minutes}`;
}
