// надписи и цвета на секторах



   // добавляем нажатие enter через клаиатуру 
   document.onkeypress = function(event) {
    console.log(event);
    if (event.which == 13) {
        document.getElementById("btn-1").click();
         
 }
};
// цвет круга и надписи внутри 
const prizes = [
    {
      text: "М",
      color: "hsl(   60, 54%, 45%)",
    },
    { 
      text: "1000 РУБ ",
      color: "hsl(              0, 0%, 0%             )",
      
    },
    { 
      text: "ЕЩЕ РАЗ",
      color: "hsl(         60, 54%, 45%       )",
    },  
    {
      text: "ПИЦЦА",
      color: "hsl(        0, 0%, 0%               )",
      
    },
    {
      text: "О",
      color: "hsl(            60, 54%, 45%      )",
    },
    {
      text: "100 на баланс",
      color: "hsl(                 0, 0%, 0%        )         ",
      
    },
    {
      text: "Крути ещё",
      color: "hsl(           60, 54%, 45%     )",
    },
    {
      text: "Попал в мое сердце",
      color: "hsl(            0, 0%, 0%           )",
    }
  ];
  



  



  // создаём переменные для быстрого доступа ко всем объектам на странице — блоку в целом, колесу, кнопке и язычку
  const wheel = document.querySelector(".deal-wheel");
  const spinner = wheel.querySelector(".spinner");
  const trigger = wheel.querySelector(".btn-spin");
  const ticker = wheel.querySelector(".ticker");
  const btn1 = document.getElementById('btn-1');
  
  // на сколько секторов нарезаем круг
  const prizeSlice = 360 / prizes.length;
  // на какое расстояние смещаем сектора друг относительно друга
  const prizeOffset = Math.floor(180 / prizes.length);
  // прописываем CSS-классы, которые будем добавлять и убирать из стилей
  const spinClass = "is-spinning";
  const selectedClass = "selected";
  // получаем все значения параметров стилей у секторов
  const spinnerStyles = window.getComputedStyle(spinner);
  
  // переменная для анимации
  let tickerAnim;
  // угол вращения
  let rotation = 0;
  // текущий сектор
  let currentSlice = 0;
  // переменная для текстовых подписей
  let prizeNodes;
  
  // расставляем текст по секторам
  const createPrizeNodes = () => {
    // обрабатываем каждую подпись
    prizes.forEach(({ text, color, reaction }, i) => {
      // каждой из них назначаем свой угол поворота
      const rotation = ((prizeSlice * i) * -1) - prizeOffset;
      // добавляем код с размещением текста на страницу в конец блока spinner
      spinner.insertAdjacentHTML(
        "beforeend", 
        // текст при этом уже оформлен нужными стилями
        `<li class="prize" data-reaction=${reaction} style="--rotate: ${rotation}deg"><div class="circle"></div>
          <span class="text">${text}</span> 
        </li> `
      );
    });
  };
  
  // рисуем разноцветные секторы
  const createConicGradient = () => {
    // устанавливаем нужное значение стиля у элемента spinner
    spinner.setAttribute(
      "style",
      `background: conic-gradient(
        from -90deg,
        ${prizes
          // получаем цвет текущего сектора
          .map(({ color }, i) => `${color} 0 ${(100 / prizes.length) * (prizes.length - i)}%`)
          .reverse()
        }
      );`
    );
 
  };
  
  // создаём функцию, которая нарисует колесо в сборе
  const setupWheel = () => {
    // сначала секторы
    createConicGradient();
    // потом текст
    createPrizeNodes();
    // а потом мы получим список всех призов на странице, чтобы работать с ними как с объектами
    prizeNodes = wheel.querySelectorAll(".prize");
  };
  
  // определяем количество оборотов, которое сделает наше колесо
  const spinertia = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 77)) + min;
  };
  
  // функция запуска вращения с плавной остановкой
  const runTickerAnimation = () => {
    // взяли код анимации отсюда: https://css-tricks.com/get-value-of-css-rotation-through-javascript/
    const values = spinnerStyles.transform.split("(")[1].split(")")[0].split(",");
    const a = values[0];
    const b = values[1];  
    let rad = Math.atan2(b, a);
    
    if (rad < 0) rad += (2 * Math.PI);
    
    const angle = Math.round(rad * (180 / Math.PI));
    const slice = Math.floor(angle / prizeSlice);
  
    // анимация язычка, когда его задевает колесо при вращении
    // если появился новый сектор
    if (currentSlice !== slice) {
      // убираем анимацию язычка
      ticker.style.animation = "none";
      // и через 10 миллисекунд отменяем это, чтобы он вернулся в первоначальное положение
      setTimeout(() => ticker.style.animation = null, 1);
      // после того, как язычок прошёл сектор - делаем его текущим 
      currentSlice = slice;
    }
    // запускаем анимацию
    tickerAnim = requestAnimationFrame(runTickerAnimation);
  };
  
  // функция выбора призового сектора                                                                        ебучая залупень 
  const selectPrize = () => {
    const selected = Math.floor(rotation / prizeSlice);
    if(prizes[selected].text=="МИМО"){
                          return;
    }
    prizeNodes[selected].classList.add(selectedClass);
    let div = document.createElement('div');
    let cc = document.createElement('canvas');
    
    div.className= "newBlock";
    var elem = document.querySelector('.newBlock');
    cc.className= "fire";

    div.innerHTML=prizes[selected].text;
    document.body.append(div);
    div.append(cc);
/////////////
const rndColor = () => {
  const base  = Math.random() * 360 | 0;
  const color = (275 * (base / 200 | 0)) + base % 200;
  return fac => `hsl(${color}, ${(fac || 1) * 100}%, ${(fac || 1) * 60}%)`;
};

class Battery
{
  constructor(fireworks) {
      this.fireworks = fireworks;
      this.salve = [];
      this.x     = Math.random();
      this.t     = 0;
      this.tmod  = 20 + Math.random() * 20 | 0;
      this.tmax  = 50000 + Math.random() * 10000;

      this._shot = salve => {
          // console.log(this.x * this.fireworks.width, salve.y);
          if (salve.y < salve.ym) {
              salve.cb = this._prepareExplosion;
          }

          salve.x += salve.mx;
          salve.y -= 0.01;

          const r = Math.atan2(-0.01, salve.mx);

          this.fireworks.engine.strokeStyle = salve.c(.7);
          this.fireworks.engine.beginPath();

          this.fireworks.engine.moveTo(
              (this.x + salve.x) * this.fireworks.width + Math.cos(r) * 4,
              salve.y * this.fireworks.height + Math.sin(r) * 4
          );

          this.fireworks.engine.lineTo(
              (this.x + salve.x) * this.fireworks.width + Math.cos(r + Math.PI) * 4,
              salve.y * this.fireworks.height + Math.sin(r + Math.PI) * 4
          );

          this.fireworks.engine.lineWidth = 3;
          this.fireworks.engine.stroke();

          // this.fireworks.engine.fillRect((this.x + salve.x) * this.fireworks.width, salve.y * this.fireworks.height, 10, 10);
      };

      this._prepareExplosion = salve => {
          salve.explosion = [];

          for (let i = 0, max = 32; i < max; i++) {
              salve.explosion.push({
                  r : 2   * i / Math.PI,
                  s : 0.5 + Math.random() * 5.5,
                  d : 0,
                  y : 0
              });
          }

          salve.cb = this._explode;
      };

      this._explode = salve => {

          this.fireworks.engine.fillStyle = salve.c();

          salve.explosion.forEach(explo => {

              explo.d += explo.s;
              explo.s *= 0.99;
              explo.y += 0.5;

              const alpha = explo.s * 2.5;
              this.fireworks.engine.globalAlpha = alpha;

              if (alpha < 0.05) {
                  salve.cb = null;
              }

              this.fireworks.engine.fillRect(
                  Math.cos(explo.r) * explo.d + (this.x + salve.x) * this.fireworks.width,
                  Math.sin(explo.r) * explo.d + explo.y + salve.y * this.fireworks.height,
                  3,
                  3
              );
          });

          this.fireworks.engine.globalAlpha = 1;
      }
  }

  pushSalve() {
      this.salve.push({
          x: 0,
          mx: -0.02 * Math.random() * .04,
          y: 1,
          ym: 0.05 + Math.random() * 0.5,
          c: rndColor(),
          cb: this._shot
      });
  };

  render() {

      this.t++;

      if (this.t < this.tmax && (this.t % this.tmod) === 0) {
          this.pushSalve();
      }

      let rendered = false;

      this.salve.forEach(salve => {

          if (salve.cb) {
              rendered = true;
              salve.cb(salve);
          }

      });

      if (this.t > this.tmax) {
          return rendered;
      }

      return true;
  }
}

class Fireworks
{
  constructor() {
      this.canvas = window.document.querySelector('canvas');
      this.engine = this.canvas.getContext('2d');
      this.stacks = new Map();

      this.resize();
  }

  resize() {
      this.width  = window.innerWidth;
      this.height = window.innerHeight;

      this.canvas.setAttribute('width', this.width);
      this.canvas.setAttribute('height', this.height);
  }

  clear() {
      this.engine.clearRect(0, 0, this.width, this.height);
      this.engine.fillStyle = 'rgba(0, 0, 0, 0.0)';
      this.engine.fillRect(0, 0, this.width, this.height);
  }

  addBattery() {
    const bat = new Battery(this);
    this.stacks.set(Date.now(), bat);  
  }

  render() {

      if (Math.random() < 0.05) {
        this.addBattery();
      }
    
      this.clear();

      this.stacks.forEach((scene, key) => {

          const rendered = scene.render();

          if (!rendered) {
              this.stacks.delete(key);
          }
      });

      requestAnimationFrame(this.render.bind(this));
  }

  run() {
      for(let i = 0; i < 5; i++) {
        this.addBattery();
      }
      window.addEventListener('resize', this.resize.bind(this));
      this.render();
  }
}

a = new Fireworks();
a.run();
/////////////
    setTimeout(() => div.remove(), 10000);
    setTimeout(() => cc.remove(), 10000);

  };

  
  // отслеживаем нажатие на кнопку
  trigger.addEventListener("click", () => {
    // делаем её недоступной для нажатия
    trigger.disabled = true;
    // задаём начальное вращение колеса
    rotation = Math.floor(Math.random() * 360 + spinertia(2000, 9000));
    // убираем прошлый приз
    prizeNodes.forEach((prize) => prize.classList.remove(selectedClass));
    // добавляем колесу класс is-spinning, с помощью которого реализуем нужную отрисовку
    wheel.classList.add(spinClass);
    // через CSS говорим секторам, как им повернуться
    spinner.style.setProperty("--rotate", rotation);
    // возвращаем язычок в горизонтальную позицию
    ticker.style.animation = "none";
    // запускаем анимацию вращение
    runTickerAnimation();
  });
  
  // отслеживаем, когда закончилась анимация вращения колеса
  spinner.addEventListener("transitionend", () => {
    // останавливаем отрисовку вращения
    cancelAnimationFrame(tickerAnim);
    // получаем текущее значение поворота колеса
    rotation %= 360;
    // выбираем приз
   
    selectPrize();
    
    // убираем класс, который отвечает за вращение
    wheel.classList.remove(spinClass);
    // отправляем в CSS новое положение поворота колеса
    spinner.style.setProperty("--rotate", rotation);
    // делаем кнопку снова активной
    trigger.disabled = false;
  });
  
  // подготавливаем всё к первому запуску
  setupWheel();





  //Дата  и время 
  function clock() {
    var d = new Date();
    var month_num = d.getMonth()
    var day = d.getDate();
    var hours = d.getHours();
    var minutes = d.getMinutes();
    var seconds = d.getSeconds();
    
    month=new Array("января", "февраля", "марта", "апреля", "мая", "июня",
    "июля", "августа", "сентября", "октября", "ноября", "декабря");
    
    if (day <= 9) day = "0" + day;
    if (hours <= 9) hours = "0" + hours;
    if (minutes <= 9) minutes = "0" + minutes;
    if (seconds <= 9) seconds = "0" + seconds;
    
    date_time = "Сегодня - " + day + " " + month[month_num] + " " + d.getFullYear() +
    " г.&nbsp;&nbsp;&nbsp;Текущее время - "+ hours + ":" + minutes + ":" + seconds;
    if (document.layers) {
     document.layers.doc_time.document.write(date_time);
     document.layers.doc_time.document.close();
    }
    else document.getElementById("doc_time").innerHTML = date_time;
     setTimeout("clock()", 1000);
    }























//фейерверк 


/////////////////////////////////////////////////////////////////////////////
 