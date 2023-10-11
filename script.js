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

// function updateProgress(e) {
//     const {duration, currentTime} = e.srcElement;
//     const progressPercent = currentTime / duration * 100
//     progress.style.width = `${progressPercent}%`;
// }
// audio.addEventListener('timeupdate', updateProgress)

// function setProgress(e) {
//     const width = this.clientWidth;
//     const clickX = e.offsetX
//     const duration = audio.duration
//     audio.currentTime = clickX / width * duration;
// }
// progressContainer.addEventListener('click', setProgress)


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