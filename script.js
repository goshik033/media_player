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
const songs = ['Aqua - Barbie Girl', 'The Offspring - You gonna go so far, kid', 'Leningrad - WWW',
    'Eurythmics - Sweet Dreams Are Made of This', 'Depeche Mode - Personal Jesus', 'C.C.Catch - Heaven And Hell']
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
const columnsGap = 2;
const columnCount = 256; // Кол-во колонок: 1024, 512, 256, 128, 64

const canvas = document.getElementById('player-fireplace');
const ctx = canvas.getContext('2d');

let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let source = audioCtx.createMediaElementSource(audio);
let analyser = audioCtx.createAnalyser();
source.connect(analyser); // Подключаем анализатор к элементу audio
analyser.connect(audioCtx.destination);
let frequencyData = new Uint8Array(columnCount);

window.addEventListener('resize', resizeCanvas, false);

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();

// Рисует колонку вертикально
function drawColumnRight(y, height, width) {
    const cornerRadius = 5; // Радиус закругления углов
    const gradient = ctx.createLinearGradient( canvas.width - width / 2, y, canvas.width,y);
    gradient.addColorStop(0, "rgba(255,0,0,0)");
    // gradient.addColorStop(1, "rgba(255,255,255,1)");
    gradient.addColorStop(0.9, "#ff0077");

    ctx.fillStyle = gradient;



    // Установка градиента в качестве заливки
    ctx.fillStyle = gradient;

    // Рисование прямоугольника с закругленными углами
    ctx.beginPath();
    ctx.moveTo(canvas.width - width / 2, y + cornerRadius);
    ctx.arcTo(canvas.width - width / 2, y, canvas.width, y, cornerRadius);
    ctx.arcTo(canvas.width, y, canvas.width, y + height, 0);
    ctx.arcTo(canvas.width, y + height, canvas.width - width / 2, y + height, 0);
    ctx.arcTo(canvas.width - width / 2, y + height, canvas.width - width / 2, y, cornerRadius);
    ctx.closePath();
    ctx.fill();
}

function drawColumn(y, height, width) {
    const cornerRadius = 5; // Радиус закругления углов

    const gradient = ctx.createLinearGradient( width / 2, y, 0,y);
    gradient.addColorStop(0, "rgba(255,0,0,0)");
    gradient.addColorStop(0.9, "red");

    ctx.fillStyle = gradient; // Лаймовый цвет

    // Рисование прямоугольника с закругленными углами
    ctx.beginPath();
    ctx.moveTo( width / 2, y + cornerRadius);
    ctx.arcTo(width / 2, y, 0, y, cornerRadius);
    ctx.arcTo(0, y, 0, y + height, 0);
    ctx.arcTo(0, y + height, width / 2, y + height, 0);
    ctx.arcTo( width / 2, y + height,  width / 2, y, cornerRadius);
    ctx.closePath();
    ctx.fill();
}

function render() {
    analyser.getByteFrequencyData(frequencyData); // Записываем в массив данные уровней частот

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const columnWidth = 12;
    const heightScale = canvas.width / 300; // Масштабный коэффициент

    let yPos = 0;
    let xPos = 0;

    for (let i = 0; i < frequencyData.length; i++) {
        let columnHeight = frequencyData[i] * heightScale;

        // Рисуем колонки справа
        drawColumnRight(yPos, columnWidth, columnHeight);
        yPos += columnWidth + columnsGap;

        drawColumn(xPos, columnWidth, columnHeight);
        xPos += columnWidth + columnsGap;
    }

    window.requestAnimationFrame(render);
}

window.requestAnimationFrame(render);