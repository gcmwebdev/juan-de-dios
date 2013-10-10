var hudba=Array(['Boží blázon',"bozi_blazon"],['Granada',"granada"],['Odpust',"odpust_nam"],['Otčenáš',"otcenas"],['Otčenáš z predstaveni',"otcenas_z_predstavenia"],['Trubadúr- Aj keď slnko',"trubadur_aj_ked_slnko"],['Trubadúr- Juana čakala',"trubadur_juana_cakala"],['Trubadúr- No život',"trubadur_no_zivot"],['Trubadúr- Túlať sa',"trubadur_tulat_sa"],['Záchrana',"zachrana"],['Záchrana s textom',"zachrana_s_textom"])
/*insert audio element */
var mute=0;
var aktual=0;


function change(sourceUrl) {
    var audio = $("audio");      
    $("#ogg_src").attr("src", sourceUrl+'.ogg');
	$("#wav_src").attr("src", sourceUrl+'.wav');
	$("#mp3_src").attr("src", sourceUrl+'.mp3');
    /****************/
    audio[0].pause();
    audio[0].load();//suspends and restores all audio element
    audio[0].play();
    /****************/
}
function changedesc(){ document.getElementById('description').innerHTML='"'+hudba[aktual][0]+'"';}
				
				
$( document ).ready( function(){
	
	if(!!document.createElement('audio').canPlayType) {

	  var player = '<audio>\
		  <source id="ogg_src" src="audio/'+hudba[0][1]+'.ogg" type="audio/ogg"></source>\
		  <source id="wav_src" src="audio/'+hudba[0][1]+'.mp3" type="audio/mpeg"></source>\
		  <source id="mp3_src" src="audio/'+hudba[0][1]+'.wav" type="audio/x-wav"></source>\
		</audio>';

	  $(player).insertAfter("#footer");

	}
	audio = $('audio').get(0);
	audio.play();
	$('#mute').bind('click', function(){
			if(mute){
					this.style.backgroundImage='url(img/audio/audio.png)';
					mute=0;
					audio.play();
					}
			else   {
					this.style.backgroundImage='url(img/audio/noaudio.png)';
					mute=1;
					audio.pause();
					}
			} 
			)
	$('#go').bind('click', function(){
			if(aktual+1==hudba.length){aktual=-1;}
			aktual++;
			change('audio/'+hudba[aktual][1]);
			changedesc();
			document.getElementById('mute').style.backgroundImage='url(img/audio/audio.png)';
			mute=0;
	        })
	
	$('#audio_back').bind('click', function(){
			if(aktual-1==-1){aktual=hudba.length-1;}
			aktual--;
			change('audio/'+hudba[aktual][1]);
			changedesc();
			document.getElementById('mute').style.backgroundImage='url(img/audio/audio.png)';
			mute=0;
	        })
		
	loadingIndicator = $('#loading');
	positionIndicator = $('.#handle');
	timeleft = $('#timeleft');

	if ((audio.buffered != undefined) && (audio.buffered.length != 0)) {
	  $(audio).bind('progress', function() {
		var loaded = parseInt(((audio.buffered.end(0) / audio.duration) * 100), 10);
		loadingIndicator.css({width: loaded + '%'});
	  });
	}
	else {
	  loadingIndicator.remove();
	}
});