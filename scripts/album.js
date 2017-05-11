//Example Album
var albumPicasso = {
    title: 'The Colors',
    artist: 'Pablo Picasso',
    label: 'Cubism',
    year: '1881',
    albumArtURL: 'assets/images/album_covers/01.png',
    songs: [
        {
          title: 'Blue',
          duration: '4:26'
        },
        {
          title: 'Green',
          duration: '3:14'
        },
        {
          title: 'Red',
          duration: '5:01'
        },
        {
          title: 'Pink',
          duration: '3:21'
        },
        {
          title: 'Magenta',
          duration: '2:15'
        }
    ]
};

var albumMarconi = {
    title: 'The Telephone',
    artist: 'Guglielmo Marconi',
    label: 'EM',
    year: '1909',
    albumArtURL: 'assets/images/album_covers/20.png',
    songs: [
        {
          title: 'Hello Operator?',
          duration: '4:26'
        },
        {
          title: 'Ring, ring, ring',
          duration: '3:14'
        },
        {
          title: 'Fits in your pocket',
          duration: '5:01'
        },
        {
          title: 'Can you hear me now?',
          duration: '3:21'
        },
        {
          title: 'Wrong phone number',
          duration: '2:15'
        },
        {
          title: 'Bye Bye',
          duration: '2:15'
        },
        {
          title: 'Bye Bye',
          duration: '2:15'
        }
    ]
};


var albumCabrera = {
    title: 'Tigers',
    artist: 'Homerun man',
    label: 'Detroit',
    year: '2003',
    albumArtURL: 'assets/images/album_covers/15.png',
    songs: [
        {
          title: 'First Base',
          duration: '4:26'
        },
        {
          title: 'Right Field',
          duration: '3:14'
        },
        {
          title: 'Home Run',
          duration: '5:01'
        },
        {
          title: 'Grand Slam',
          duration: '3:21'
        },
        {
          title: 'Double Play',
          duration: '2:15'
        },
        {
          title: 'Triple play',
          duration: '2:15'
        }
        ]
};

var albumArray = [albumPicasso, albumMarconi, albumCabrera];

var createSongRow = function(songNumber, songName, songLength){
    var template =
        '<tr class ="album-view-song-item">'
    +   '   <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber +'</td>'
    +   '   <td class="song-item-title">' + songName + '</td>'
    +   '   <td class="song-item-duration">' + songLength + '</td>'
    + '</tr>'
    ;

    return template;
};

var setCurrentAlbum = function(album){
    var albumTitle = document.getElementsByClassName('album-view-title')[0];
    var albumArtist = document.getElementsByClassName('album-view-artist')[0];
    var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
    var albumImage = document.getElementsByClassName('album-cover-art')[0];
    var albumSongList = document.getElementsByClassName('album-view-song-list')[0];

    albumTitle.firstChild.nodeValue = album.title;

    albumArtist.firstChild.nodeValue = album.artist;

    albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;

    albumImage.setAttribute('src', album.albumArtURL);

    albumSongList.innerHTML = '';

    for (var i = 0; i < album.songs.length; i++){
        albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
    }
};

// Elements we'll be adding listeners to

window.onload = function() {
  var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
  var songRows = document.getElementsByClassName('album-view-song-item');
  var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';

  setCurrentAlbum(albumCabrera);
  document.getElementsByClassName('album-cover-art')[0].addEventListener("click",function(){rotateArray(albumArray);});

  for(var i = 0; i < songRows.length; i++){
    songRows[i].addEventListener('mouseleave', function(event){
      this.children[0].innerHTML = this.children[0].getAttribute('data-song-number');
    });
  }

  songListContainer.addEventListener('mouseover', function(event){
    if (event.target.parentElement.className === 'album-view-song-item'){
      event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;
    }
  });
};


var rotateArray = function(arr){
    arr.push(arr.shift())
        setCurrentAlbum(arr[0]);
        return arr;
};
