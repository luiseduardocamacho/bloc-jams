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

// Elements we'll be adding listeners to
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

// Store state of playing songs
var currentlyPlayingSong = null;

// Used for rotate array function
var albumArray = [albumPicasso, albumMarconi, albumCabrera];

// FUNCTIONS START HERE
var rotateArrayClickListener = function(){
  document.getElementsByClassName('album-cover-art')[0]
          .addEventListener("click", function(){
            rotateArray(albumArray);
  });
};

var createSongRow = function(songNumber, songName, songLength){
    var template =
        '<tr class ="album-view-song-item">'
    +   '   <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber +'</td>'
    +   '   <td class="song-item-title">' + songName + '</td>'
    +   '   <td class="song-item-duration">' + songLength + '</td>'
    + '</tr>'
    ;

    var $row = $(template);

    var clickHandler = function(){
      var songNumber = $(this).attr('data-song-number');
      if (currentlyPlayingSong !== null) {
		      // Revert to song number for currently playing song because user started playing new song.
		      var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSong + '"]');
		        currentlyPlayingCell.html(currentlyPlayingSong);
	     }
	     if (currentlyPlayingSong !== songNumber) {
		      // Switch from Play -> Pause button to indicate new song is playing.
		      $(this).html(pauseButtonTemplate);
		      currentlyPlayingSong = songNumber;
	       }
      else if (currentlyPlayingSong === songNumber) {
		      // Switch from Pause -> Play button to pause currently playing song.
		      $(this).html(playButtonTemplate);
		      currentlyPlayingSong = null;
	       }
    };

    var onHover = function(event) {
      var songNumberCell = $(this).find('.song-item-number');
      var songNumber = songNumberCell.attr('data-song-number');
        if (songNumber !== currentlyPlayingSong) {
              songNumberCell.html(playButtonTemplate);
            }
        };

    var offHover = function(event) {
      var songNumberCell = $(this).find('.song-item-number');
      var songNumber = songNumberCell.attr('data-song-number');
        if (songNumber !== currentlyPlayingSong) {
                songNumberCell.html(songNumber);
            }
        };

    $row.find('.song-item-number').click(clickHandler);
    $row.hover(onHover,offHover);
    return $row;
};

var setCurrentAlbum = function(album){
   var $albumTitle = $('.album-view-title');
   var $albumArtist = $('.album-view-artist');
   var $albumReleaseInfo = $('.album-view-release-info');
   var $albumImage = $('.album-cover-art');
   var $albumSongList = $('.album-view-song-list');

    $albumTitle.text(album.title);
    $albumArtist.text(album.artist);
    $albumReleaseInfo.text(album.year + ' ' + album.label);
    $albumImage.attr('src', album.albumArtUrl);
    $albumSongList.empty();

    for (var i = 0; i < album.songs.length; i++){
        var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
        $albumSongList.append($newRow);
    }
};



var rotateArray = function(arr){
    arr.push(arr.shift())
        setCurrentAlbum(arr[0]);
        //setButtonMouseListener();
        currentlyPlayingSong = null;
        return arr;

};

var clickHandler = function(targetElement){
  console.log('Click handler triggered')
  var songItem = getSongItem(targetElement);

  if (currentlyPlayingSong === null){
    songItem.innerHTML = pauseButtonTemplate;
    currentlyPlayingSong = songItem.getAttribute('data-song-number');
    console.log('Click Handler playing song is:', currentlyPlayingSong);
  }
  else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')){
    songItem.innerHTML = playButtonTemplate;
    currentlyPlayingSong = null;
    console.log('Click Handler playing song is:', currentlyPlayingSong);
  }
  else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')){
    var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
    currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
    songItem.innerHTML = pauseButtonTemplate;
    currentlyPlayingSong = songItem.getAttribute('data-song-number');
    console.log('Click Handler playing song is:', currentlyPlayingSong);
  }
};


$(document).ready(function() {
  setCurrentAlbum(albumCabrera);
  //setButtonMouseListener();
  rotateArrayClickListener();
});
