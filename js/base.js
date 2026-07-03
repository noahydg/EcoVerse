
  // loadding
  document.onreadystatechange = function () {
    if (document.readyState == 'complete') {
      let opacity = $('.lodding-wrap').css('opacity');
      let timer = null;
      timer = opacity&&setInterval(() => {
        opacity-=0.1
        $('.lodding-wrap').css('opacity', opacity);
        console.log(opacity)
        if (opacity <= 0) {
          $('.lodding-wrap').css('display','none');
          clearInterval(timer)
        }
      }, 100);
     
    }
  }

  // ai小助手
 // 获取 DOM 元素
const summonBtn = document.getElementById('summon-btn');
const assistant = document.getElementById('assistant');
const character = document.getElementById('character');
const video = document.getElementById('character-video');
const hoverVideo = document.getElementById('hover-video');
const dialog = document.getElementById('dialog');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const response = document.getElementById('response');
const closeBtn = document.getElementById('close-btn');

// 自由拖拽变量
let isDragging = false;
let offsetX = 0;
let offsetY = 0;

// 出场动画是否结束的标志
let isEntranceAnimationFinished = false;

// 点击召唤小助手
summonBtn.addEventListener('click', () => {
  assistant.classList.toggle('hidden');
  if (!assistant.classList.contains('hidden')) {
    assistant.classList.add('show'); // 添加出场动画
    video.classList.remove('hidden'); // 显示出场视频
    character.classList.add('hidden'); // 隐藏静态图片
    video.play(); // 播放出场视频
    console.log=("ai已成功加载");

    // 等待出场视频播放完毕，隐藏出场视频并显示静态图片
    video.onended = () => {
      video.classList.add('hidden'); // 隐藏出场视频
      character.classList.remove('hidden'); // 显示静态图片
      isEntranceAnimationFinished = true; // 出场动画结束
    };
  } else {
    assistant.classList.remove('show');
    video.classList.add('hidden'); // 隐藏出场视频
    character.classList.remove('hidden'); // 显示静态图片
    video.pause(); // 停止播放
    video.currentTime = 0; // 重置视频
    isEntranceAnimationFinished = false; // 重新设置为未结束状态
  }
});

// 鼠标移到小助手上时播放显示动画（出场动画结束后才有效）
assistant.addEventListener('mouseover', () => {
  if (!isEntranceAnimationFinished) {
    // 如果出场动画没有播放完毕，禁止播放显示动画
    return;
  }

  // 停止出场视频
  video.pause();
  video.currentTime = 0;

  character.classList.add('hidden'); 
  hoverVideo.classList.remove('hidden'); // 显示悬停动画
  hoverVideo.play(); // 播放悬停动画
});

// 鼠标移开时恢复静态图片
assistant.addEventListener('mouseout', () => {
  hoverVideo.pause(); // 停止显示动画
  hoverVideo.currentTime = 0;
  hoverVideo.classList.add('hidden'); // 隐藏显示动画
  character.classList.remove('hidden'); // 显示静态图片
});

// 点击小助手弹出对话框
assistant.addEventListener('click', () => {
  if (isDragging) {
    return;
  }
  dialog.classList.toggle('hidden');
});

// 关闭对话框
closeBtn.addEventListener('click', () => {
  dialog.classList.add('hidden');
});

// 发送用户输入的内容
sendBtn.addEventListener('click', () => {
  const userText = userInput.value.trim();
  if (!userText) {
    response.innerText = '请输入内容！';
    return;
  }

  if (userText.includes('你好')) {
    response.innerText = '你好！很高兴见到你！';
  } else if (userText.includes('天气')) {
    response.innerText = '今天的天气真不错！';
  } else if (userText.includes('你是'||'介绍一下自己')) {
    response.innerText = '你好呀～我是您的生态小助手，我正在不断学习与进步！！';
  }else if (userText.includes('日期')) {
    response.innerText = '今天是2024年12月8号~';
  }else if (userText.includes('姜老师')) {
    response.innerText = '你是说姜老师大美女吗？！她可是我的开发者的偶像耶！什么时候可以要一个签名......';
  }else {
    response.innerText = '抱歉，我还不明白你说的内容。';
  }

  userInput.value = ''; // 清空输入框
});

// 实现自由拖拽功能
assistant.addEventListener('mousedown', (e) => {
  isDragging = true;
  offsetX = e.clientX - assistant.offsetLeft;
  offsetY = e.clientY - assistant.offsetTop;
  assistant.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', (e) => {
  if (isDragging) {
    assistant.style.left = `${e.clientX - offsetX}px`;
    assistant.style.top = `${e.clientY - offsetY}px`;
  }
});

document.addEventListener('mouseup', () => {
  isDragging = false;
  assistant.style.cursor = 'grab';
});

