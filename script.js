let index = 1;
let songs = ["Faded-Alen Waker", "Guzrya-BGM", "English Instrument 1", "English Instrument 2", "Whoopty", "Depth Song", "Wake Up", "Piano Song", "Beat Up", "Cheap Thrils", "Music# 11", "Music# 12", "Music# 13", "Music# 14", "Music# 15", "Music# 16", "Music# 17", "Music# 18", "Music# 19", "Music# 20"];

let audioElement = new Audio('songs/1.mp3')
let play = document.getElementById('masterPlay');
let gif = document.getElementById('gifi');
let bar = document.getElementById('seekbar');
let continues = document.getElementById('1');
let song_number = 1;
let music_play = () => {
    audioElement.play();
    play.classList.remove('fa-play-circle')
    play.classList.add('fa-pause-circle')
    gif.style.opacity = 1;
}
let music_stop = () => {
    audioElement.pause();
    play.classList.remove('fa-pause-circle')
    play.classList.add('fa-play-circle')
    gif.style.opacity = 0;
}
play.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        document.getElementById(song_number).classList.remove('fa-play-circle');
        document.getElementById(song_number).classList.add('fa-pause-circle');
        music_play();
    }
    else {
        makeallplay();
        music_stop();
    }
})

audioElement.addEventListener('timeupdate', () => {
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    bar.value = progress;
})

bar.addEventListener('change', () => {
    audioElement.currentTime = ((bar.value * audioElement.duration) / 100);
})
const makeallplay = () => {
    Array.from(document.getElementsByClassName('master')).forEach(element => {
        element.classList.add('fa-play-circle');
    })
}
Array.from(document.getElementsByClassName('master')).forEach(element => {
    element.addEventListener('click', (e) => {
        makeallplay();
        continues = e.target
        index = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle')
        e.target.classList.add('fa-pause-circle')
        audioElement.currentTime = 0;
        audioElement.src = `songs/${index}.mp3`
        music_play();
        document.getElementById('songname').innerText = songs[index - 1];
        song_number = index;
    })
});

const makeforwardplay = () => {
    document.getElementById(song_number).classList.remove('fa-play-circle')
    document.getElementById(song_number).classList.add('fa-pause-circle')
    document.getElementById(song_number - 1).classList.remove('fa-pause-circle');
    document.getElementById(song_number - 1).classList.add('fa-play-circle');
}
const makebacwardplay = () => {
    document.getElementById(song_number).classList.remove('fa-play-circle')
    document.getElementById(song_number).classList.add('fa-pause-circle')
    document.getElementById(song_number + 1).classList.remove('fa-pause-circle');
    document.getElementById(song_number + 1).classList.add('fa-play-circle');
}

document.getElementById('previous').addEventListener('click', () => {
    if (song_number == 1) {
        makebacwardplay();
        audioElement.src = `songs/${song_number}.mp3`
        music_play();
        document.getElementById('songname').innerText = songs[song_number - 1];
    }
    else if (song_number == 20) {
        audioElement.currentTime = 0;
        audioElement.src = `songs/${song_number - 1}.mp3`
        music_play();
        song_number--;
        document.getElementById('songname').innerText = songs[song_number - 1];
        makebacwardplay();
    }
    else if (song_number > 1 && song_number < 20) {
        song_number--;
        makebacwardplay();
        audioElement.currentTime = 0;
        audioElement.src = `songs/${song_number}.mp3`
        music_play();
        document.getElementById('songname').innerText = songs[song_number - 1];
    }
});

document.getElementById('next').addEventListener('click', () => {
    if (song_number == 20) {
        makeforwardplay();
        audioElement.currentTime = 0;
        audioElement.src = `songs/${song_number}.mp3`
        music_play();
        document.getElementById('songname').innerText = songs[song_number - 1];
    }
    else if (song_number == 1) {
        audioElement.currentTime = 0;
        audioElement.src = `songs/${song_number + 1}.mp3`
        music_play();
        document.getElementById('songname').innerText = songs[song_number];
        song_number++;
        makeforwardplay();
    }
    else if (song_number > 0 && song_number < 20) {
        song_number++;
        makeforwardplay();
        audioElement.currentTime = 0;
        audioElement.src = `songs/${song_number}.mp3`
        music_play();
        document.getElementById('songname').innerText = songs[song_number - 1];
    }
})