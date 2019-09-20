'use strict';

var CLOUD_WIDTH = 420; // высота облака
var CLOUD_HEIGHT = 270; // ширина облака
var CLOUD_X = 100; // координата верхнего края облака по Х
var CLOUD_Y = 10; // координата верхнего края облака по У
var GAP = 30; // паддинг облака
var GAP_SHADOW = 10; // отступ тени облака
var COLOMN_GAP = 50; // расстояние между колонками
var COLOMN_WIDTH = 40; // ширина колонки
var TEXT_HEIGHT = 10; // высота текста
var barWidth = 100; // номинальная высота колонки


// Отрисовывает облако со статистикой и тень под ним
// @param {} ctx контекст канваса
// @param {number} x координата Х начала отрисовки прямоугольгика в пикселях
// @param {number} y координата Y начала отрисовки прямоугольгика в пикселях
// @param {} color
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

// Находит максимальное время в массиве times
// @param {} arr Массив
// @return {number} maxElement Максимальнео время прохождения игры
var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

// Отрисовывает статистику игроков
// @param {} ctx контекст канваса
// @param {string} players Имена игроков
// @param {number} times Время прохождение игры
window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP_SHADOW, CLOUD_Y + GAP_SHADOW, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP, GAP);
  ctx.fillText('Список результатов:', CLOUD_X + GAP, GAP + 20);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = '#000';
    ctx.fillText(Math.floor(times[i]), CLOUD_X + GAP + (COLOMN_WIDTH + COLOMN_GAP) * i, CLOUD_HEIGHT - GAP - (TEXT_HEIGHT * 3) - (barWidth * times[i]) / maxTime);
    ctx.fillText(players[i], CLOUD_X + GAP + (COLOMN_WIDTH + COLOMN_GAP) * i, CLOUD_HEIGHT - GAP);
    ctx.fillStyle = (players[i] === 'Вы') ? 'red' : 'rgba(0, 0, 255, ' + Math.random() + ')';
    ctx.fillRect(CLOUD_X + GAP + (COLOMN_WIDTH + COLOMN_GAP) * i, CLOUD_HEIGHT - GAP - TEXT_HEIGHT, COLOMN_WIDTH, -((barWidth * times[i]) / maxTime));
  }
};
