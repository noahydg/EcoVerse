document.addEventListener('readystatechange', function () {
  if (document.readyState === 'complete') {
      let opacity = $('.lodding-wrap').css('opacity');
      let timer = null;
      timer = opacity && setInterval(() => {
          opacity -= 0.1;
          $('.lodding-wrap').css('opacity', opacity);
          console.log(opacity);
          if (opacity <= 0) {
              $('.lodding-wrap').css('display', 'none');
              clearInterval(timer);
          }
      }, 100);
      
      // 获取所有符合条件的伪元素（蝴蝶翅膀部分）
      const wingElements = document.querySelectorAll('.loadding-div::after,.loadding-div::before');
      if (wingElements.length === 2) {
          function getRandomColor() {
              const r = Math.floor(Math.random() * 256);
              const g = Math.floor(Math.random() * 256);
              const b = Math.floor(Math.random() * 256);
              return `rgb(${r},${g},${b})`;
          }
          const randomColor = getRandomColor();
          // 遍历获取到的伪元素数组，统一设置随机背景色和边框色，并提高样式优先级
          wingElements.forEach(element => {
              element.style.backgroundColor = randomColor + '!important';
              element.style.borderColor = randomColor + '!important';
          });
      }
  }
});