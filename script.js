document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.getElementById('audioPlayer');
    const fileInput = document.getElementById('fileInput');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const seekSlider = document.getElementById('seekSlider');
    const songsList = document.getElementById('songsList');

    let isPlaying = false;
    let songURLs = {}; // To hold file URLs by name

    // Load the selected audio file
    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileURL = URL.createObjectURL(file);
            songURLs[file.name] = fileURL;
            addSongToList(file.name, fileURL);
        }
    });

    // Play or pause the audio
    playPauseBtn.addEventListener('click', () => {
        if (isPlaying) {
            audioPlayer.pause();
            playPauseBtn.innerHTML = '<img src="assets/icons/play.svg" alt="Play" class="icon">';
            playPauseBtn.classList.add('animate__animated', 'animate__bounceOut');
            setTimeout(() => playPauseBtn.classList.remove('animate__animated', 'animate__bounceOut'), 1000);
        } else {
            audioPlayer.play();
            playPauseBtn.innerHTML = '<img src="assets/icons/pause.svg" alt="Pause" class="icon">';
            playPauseBtn.classList.add('animate__animated', 'animate__bounceIn');
            setTimeout(() => playPauseBtn.classList.remove('animate__animated', 'animate__bounceIn'), 1000);
        }
        isPlaying = !isPlaying;
    });

    // Update the audio's currentTime based on the seek slider value
    seekSlider.addEventListener('input', () => {
        const seekTime = audioPlayer.duration * (seekSlider.value / 100);
        audioPlayer.currentTime = seekTime;
    });

    // Update the seek slider as the audio plays
    audioPlayer.addEventListener('timeupdate', () => {
        const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        seekSlider.value = progress;
    });

    // Reset play/pause button and seek slider when the audio ends
    audioPlayer.addEventListener('ended', () => {
        isPlaying = false;
        playPauseBtn.innerHTML = '<img src="assets/icons/play.svg" alt="Play" class="icon">';
        seekSlider.value = 0;
    });

    // Function to add a song to the list
    function addSongToList(name, url) {
        const li = document.createElement('li');
        li.textContent = name;
        li.dataset.url = url;
        li.classList.add('list-group-item', 'animate__animated', 'animate__fadeIn');
        li.addEventListener('click', () => {
            playAudio(url);
        });
        songsList.appendChild(li);
    }

    // Function to play audio from a given URL
    function playAudio(url) {
        audioPlayer.src = url;
        audioPlayer.play();
        playPauseBtn.innerHTML = '<img src="assets/icons/pause.svg" alt="Pause" class="icon">';
        isPlaying = true;
    }
});
