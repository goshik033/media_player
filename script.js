const player = document.querySelector('.player'),
    playBtn = document.querySelector('.play'),
    prevBtn = document.querySelector('.prev'),
    nextBtn = document.querySelector('.next'),
    audio = document.querySelector('.audio'),
    progressContainer = document.querySelector('.progress__container'),
    progress = document.querySelector('.progress'),
    title = document.querySelector('.song'),
    cover = document.querySelector('.cover__img'),
    imgsrc = document.querySelector('.controls__play__path'),
    controlsPlay = document.querySelector('.controls__play')
const progressSlider = document.querySelector('.progress-slider');

//Название песен
const songs = ['Aqua - Barbie Girl','Eurythmics - Sweet Dreams Are Made of This',  'Leningrad - WWW',
    'The Offspring - You gonna go so far, kid', 'Depeche Mode - Personal Jesus', 'C.C.Catch - Heaven And Hell']
// Песня по умолчанию 
let songIndex = 0

function loadSong(song) {
    title.innerHTML = song
    audio.src = `audio/${song}.mp3`
    cover.src = `img/${songIndex + 1}.jpg`
}

loadSong(songs[songIndex])

// Play
function playSong() {
    player.classList.add('play')
    imgsrc.setAttribute('d', 'M10.5195 0.269531H15.5V17.7305H10.5195V0.269531ZM0.5 17.7305V0.269531H5.48047V17.7305H0.5Z');
    controlsPlay.setAttribute('viewBox', "0 0 16 18")
    audio.play()
}

function pauseSong() {
    player.classList.remove('play')
    imgsrc.setAttribute('d', 'M0.0195312 0.269531L13.7305 9L0.0195312 17.7305V0.269531Z');
    controlsPlay.setAttribute('viewBox', "0 0 10 18")
    audio.pause()

}

playBtn.addEventListener('click', () => {
    const isPlaying = player.classList.contains('play')
    if (isPlaying) {
        pauseSong()
    } else {
        playSong()
    }

})

// Переключение
function nextSong() {
    progressSlider.value = 0
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex])
    playSong();
}

nextBtn.addEventListener('click', nextSong);

function prevSong() {
    progressSlider.value = 0;
    songIndex = (songs.length + songIndex - 1) % songs.length;
    loadSong(songs[songIndex])
    playSong();
}

prevBtn.addEventListener('click', prevSong);

audio.addEventListener('timeupdate', () => {
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    const progressPercentage = (currentTime / duration) * 3000;
    progressSlider.value = progressPercentage;
    if(isNaN(duration)){
        progressSlider.value=0;
    }
    if(progressSlider.value==50){
        console.log(duration+"JJJJ")
    }

});

progressSlider.addEventListener('input', () => {
    const progressValue = progressSlider.value;
    const duration = audio.duration;
    const currentTime = (progressValue * duration) / 3000;
    audio.currentTime = currentTime;
});

audio.addEventListener('ended', nextSong)



// ---------------------------- ЭКВАЛАЙЗЕР ----------------------------
const columnsGap = 70;
const columnCount = 100; // Кол-во колонок: 1024, 512, 256, 128, 64

const canvas = document.getElementById('player-fireplace');
const ctx = canvas.getContext('2d');

let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let source = audioCtx.createMediaElementSource(audio);
let analyser = audioCtx.createAnalyser();
source.connect(analyser); // Подключаем анализатор к элементу audio
analyser.connect(audioCtx.destination); // Без этой строки нет звука, но анализатор работает.
let frequencyData = new Uint8Array(columnCount);

window.addEventListener('resize', resizeCanvas, false);

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Функция для центрирования canvas
function centerCanvas() {
    const parentElement = canvas.parentElement;
    const parentWidth = parentElement.offsetWidth;
    const parentHeight = parentElement.offsetHeight;

    const canvasLeft = (parentWidth - canvas.width) / 2;
    const canvasTop = (parentHeight - canvas.height) / 2;

    canvas.style.left = `${canvasLeft}px`;
    canvas.style.top = `${canvasTop}px`;
}

// Изменение размеров canvas при загрузке страницы и изменении размера окна
window.addEventListener('load', () => {
    resizeCanvas();
    centerCanvas();
});

window.addEventListener('resize', () => {
    resizeCanvas();
    centerCanvas();
});

// Рисует колонку
function drawColumn(x, width, height) {
    const cornerRadius = Math.abs(20 * (width / 100)); // Радиус закругления углов

    // Рисование основной части колонки с тенью
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 10;  // Уменьшаем размытие тени
    ctx.shadowOffsetX = 5;
    ctx.fillStyle = "#ff00b3"; // Лаймовый цвет
    // ctx.setTransform(1, 0, 0.2, 1, 0, 0);
    ctx.beginPath();
    ctx.moveTo(x + cornerRadius, canvas.height / 2 - height / 2);
    ctx.arcTo(x + width, canvas.height / 2 - height / 2, x + width, canvas.height / 2, 0);
    ctx.arcTo(x + width, canvas.height / 2, x, canvas.height / 2, 0);
    ctx.arcTo(x, canvas.height / 2, x, canvas.height / 2 - height / 2, 0);
    ctx.arcTo(x, canvas.height / 2 - height / 2, x + width, canvas.height / 2 - height / 2, 0);
    ctx.closePath();
    ctx.fill();


    ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
    ctx.shadowBlur = 5;  // Уменьшаем размытие тени
    ctx.shadowOffsetX = 2;

    // Очистка параметров тени
    // ctx.shadowColor = 'rgba(0, 0, 0, 0)';
    // ctx.shadowBlur = 0;
    // ctx.shadowOffsetX = 0;

    // Рисование верхней части колонки без тени
    ctx.fillStyle = "#ff93dd"; // Лаймовый цвет
    ctx.beginPath();
    ctx.moveTo(x + cornerRadius, canvas.height / 2 + height / 2);
    ctx.arcTo(x + width, canvas.height / 2 + height / 2, x + width, canvas.height / 2, 0);
    ctx.arcTo(x + width, canvas.height / 2, x, canvas.height / 2, 0);
    ctx.arcTo(x, canvas.height / 2, x, canvas.height / 2 + height / 2, 0);
    ctx.arcTo(x, canvas.height / 2 + height / 2, x + width, canvas.height / 2 + height / 2, 0);
    ctx.closePath();
    ctx.fill();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
}


function render() {
    analyser.getByteFrequencyData(frequencyData);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const maxColumnHeight = canvas.height ; // Максимальная высота колонки
    const columnWidth = (canvas.width - (columnsGap * (columnCount -1))) / columnCount;

    for (let i = 0; i < frequencyData.length; i++) {

        const columnHeight = frequencyData[i] / 270 * maxColumnHeight;
        const xPos = i * (columnWidth + columnsGap);

        // Плавное изменение высоты колонок
        const currentHeight = parseFloat(canvas.dataset[`columnHeight${i}`]) || 0;
        const targetHeight = columnHeight;
        const ease = 0.2; // Параметр сглаживания для плавности анимации
        const newHeight = currentHeight + (targetHeight - currentHeight) * ease;

        // Сохранение текущей высоты колонки
        canvas.dataset[`columnHeight${i}`] = newHeight;

        // Рисование колонки
        drawColumn(xPos, columnWidth, newHeight);
    }

    window.requestAnimationFrame(render);
}

window.requestAnimationFrame(render)