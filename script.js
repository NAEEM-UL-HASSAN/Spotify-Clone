let index = 1;
let songs = ["Faded-Alen Waker", "Guzrya-BGM", "English Instrument 1", "English Instrument 2", "Whoopty", "Depth Song", "Wake Up", "Piano Song", "Beat Up", "Cheap Thrils", "Music# 11", "Music# 12", "Music# 13", "Music# 14", "Music# 15", "Music# 16", "Music# 17", "Music# 18", "Music# 19", "Music# 20"];

let audioElement = new Audio('songs/1.mp3');
let play = document.getElementById('masterPlay');
let gif = document.getElementById('gifi');
let bar = document.getElementById('seekbar');
let song_number = 1;

// Play the music
let music_play = () => {
    audioElement.play();
    play.classList.remove('fa-play-circle');
    play.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
}

// Stop the music
let music_stop = () => {
    audioElement.pause();
    play.classList.remove('fa-pause-circle');
    play.classList.add('fa-play-circle');
    gif.style.opacity = 0;
}

// Toggle play/pause for the master play button
play.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        document.getElementById(song_number).classList.remove('fa-play-circle');
        document.getElementById(song_number).classList.add('fa-pause-circle');
        music_play();
    } else {
        makeallplay();
        music_stop();
    }
});

// Update the progress bar as the audio plays
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    bar.value = progress;
});

// Change the current time when the progress bar changes
bar.addEventListener('change', () => {
    audioElement.currentTime = (bar.value * audioElement.duration) / 100;
});

// Reset all icons to play state
const makeallplay = () => {
    Array.from(document.getElementsByClassName('master')).forEach(element => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

// Handle song selection from the song list
Array.from(document.getElementsByClassName('master')).forEach(element => {
    element.addEventListener('click', (e) => {
        makeallplay();
        song_number = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.currentTime = 0;
        audioElement.src = `songs/${song_number}.mp3`;
        music_play();
        document.getElementById('songname').innerText = songs[song_number - 1];
    });
});

// Handle the "previous" button click (for backward navigation)
document.getElementById('previous').addEventListener('click', () => {
    if (song_number > 1) {
        let currentSongId = song_number;
        song_number--;
        
        // Update the previous song icon to play
        document.getElementById(currentSongId).classList.remove('fa-pause-circle');
        document.getElementById(currentSongId).classList.add('fa-play-circle');
        
        makeallplay();
        audioElement.currentTime = 0;
        audioElement.src = `songs/${song_number}.mp3`;
        music_play();
        document.getElementById('songname').innerText = songs[song_number - 1];
        
        // Change current song's icon to pause
        document.getElementById(song_number).classList.remove('fa-play-circle');
        document.getElementById(song_number).classList.add('fa-pause-circle');
    }
    
    // Toggle play/pause icons for previous song
    if (audioElement.paused) {
        play.classList.remove('fa-pause-circle');
        play.classList.add('fa-play-circle');
    } else {
        play.classList.remove('fa-play-circle');
        play.classList.add('fa-pause-circle');
    }
});

// Handle the "next" button click (for forward navigation)
document.getElementById('next').addEventListener('click', () => {
    if (song_number < 20) {
        let currentSongId = song_number;
        song_number++;
        
        // Update the next song icon to play
        document.getElementById(currentSongId).classList.remove('fa-pause-circle');
        document.getElementById(currentSongId).classList.add('fa-play-circle');
        
        makeallplay();
        audioElement.currentTime = 0;
        audioElement.src = `songs/${song_number}.mp3`;
        music_play();
        document.getElementById('songname').innerText = songs[song_number - 1];
        
        // Change current song's icon to pause
        document.getElementById(song_number).classList.remove('fa-play-circle');
        document.getElementById(song_number).classList.add('fa-pause-circle');
    }

    // Toggle play/pause icons for next song
    if (audioElement.paused) {
        play.classList.remove('fa-pause-circle');
        play.classList.add('fa-play-circle');
    } else {
        play.classList.remove('fa-play-circle');
        play.classList.add('fa-pause-circle');
    }
});
