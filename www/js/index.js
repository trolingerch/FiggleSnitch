// This is the main JavaScript source for FiggleSnitch
var photos = [];

reloadPhotos();
displayPhotos();

$('button.camera-control').click(function () {
	// navigator is PhoneGap access to hardware
	if (navigator.camera) {
		
		var options = {
			quality: 60,
			destinationType: Camera.DestinationType.DATA_URL,
			sourceType: 1,
			encodingType: 0
		};
		
		navigator.camera.getPicture(getPhoto, null, options);
	}
});

$('button.save').click(function () {
    photos.append(makePhoto());
    savePhotos();
});

function getPhoto (data) {
	$('#camera-photo').attr('src', "data:image/jpeg;base64," + data);
}

function makePhoto () {
    var currentPhoto = $('#camera-photo').attr('src');
    var currentGisLocation = $('#gis-location').html();
    var currentDescription = $('#description').val();

    var photo = {
        "photo" : currentPhoto//,
        //"gisLocation" : currentGisLocation, 
        //"description" : currentDescription
    };
    return photo;
}

function displayPhotos () {
	$('#photo-list').append('<li>list of photos</li>');
    for (var i=0; i<photos.length; i++) {
        $('#photo-list').append('<li><img src="' + photos[i]["photo"] + '" /></li>');
    }
}

function reloadPhotos () {
    if (Modernizr.localstorage) {
        if (localStorage["photos"] != null) {
            entries = JSON.parse(localStorage["photos"]);
        }
    }
}

function savePhotos () {
    if (Modernizr.localstorage) {
        localStorage.clear();
            localStorage["photos"] = JSON.stringify(photos);
    }
}