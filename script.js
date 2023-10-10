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

    

//Название песен
const songs=['The Offspring — You gonna go so far, kid','C.C.Catch — Heaven And Hell' ]
// Песня по умолчанию 
let songIndex = 0

function loadSong(song){
    title.innerHTML = song
    audio.src = `audio/${song}.mp3`
    cover.src =`img/${songIndex + 1}.jpg`
}
loadSong(songs[songIndex])

// Play
function playSong(){
    player.classList.add('play')
    
    imgsrc.setAttribute('d', 'M10.5195 0.269531H15.5V17.7305H10.5195V0.269531ZM0.5 17.7305V0.269531H5.48047V17.7305H0.5Z');
    controlsPlay.setAttribute('viewBox', "0 0 16 18")
    audio.play()
}
function pauseSong(){
    player.classList.remove('play')
    imgsrc.setAttribute('d', 'M0.0195312 0.269531L13.7305 9L0.0195312 17.7305V0.269531Z');
    controlsPlay.setAttribute('viewBox', "0 0 10 18")
    audio.pause()

}
playBtn.addEventListener('click', () => {
    const isPlaying =player.classList.contains('play')
    if(isPlaying){
        pauseSong()
    }else{
        playSong()
    }
    
})

