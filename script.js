const music = document.querySelector('audio');
const play = document.getElementById('play');
const img = document.querySelector('img');

const title = document.getElementById('title');
const artist = document.getElementById('artist');
const next= document.getElementById('next');
const prev = document.getElementById('prev');

const progress = document.getElementById('progress');
const progressbar = document.getElementById('progress_bar');

let songs = [{
    name:"music1",
    title:"UKULELE",
    artist:" Benjamin Tissot "
},
{
    name:"music2",
    title:"CREATIVE",
    artist:" Benjamin Tissot "
},
{
    name:"music3",
    title:"NEW START",
    artist:" Benjamin Tissot "
}]

let isplaying = false;

/*play music*/
const playmusic= ()=>{
    isplaying = true;
    music.play();
    play.classList.replace("fa-play", "fa-pause");
    img.classList.add('anime');
}

/*pause music*/
const pausemusic= ()=>{
    isplaying = false
    music.pause();
    play.classList.replace("fa-pause", "fa-play");
    img.classList.remove('anime');
}
play.addEventListener('click', ()=>{
    isplaying ? pausemusic(): playmusic() ;
})

const loadsong = (songs) =>{
    title.textContent = songs.title;
    artist.textContent = songs.artist;
    music.src = "Music/"+songs.name+".mp3";
    img.src="Images/"+songs.name+".jpg";
}

songIndex=0;

const nextsong=()=>{
    songIndex = (songIndex+1) % songs.length;
    loadsong(songs[songIndex]);
    playmusic();
}

const prevsong=()=>{
    songIndex = (songIndex-1+songs.length) % songs.length;
    loadsong(songs[songIndex]);
    playmusic();
}

const pupdate = (e)=>{
    //object destructure
    const {duration, currentTime} = e.srcElement;
    const progresspercent = (currentTime / duration) * 100;
    progress.style.width = `${progresspercent}%`; 
}

const set = (e)=>{
    const width = e.srcElement.clientWidth;
    const clickX = e.offsetX;
    const duration = music.duration;
    music.currentTime = (clickX / width) * duration;
}

next.addEventListener('click', nextsong);
prev.addEventListener('click', prevsong);

music.addEventListener('timeupdate', pupdate);
progressbar.addEventListener('click', set);
music.addEventListener('ended', nextsong);
