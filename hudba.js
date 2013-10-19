var hudba=Array(['Boží blázon',"bozi_blazon"],['Granada',"granada"],['Odpusť nám',"odpust_nam"],['Otčenáš',"otcenas"],['Otčenáš z predstavenia',"otcenas_z_predstavenia"],['Trubadúr- Aj keď slnko',"trubadur_aj_ked_slnko"],['Trubadúr- Juana čakala',"trubadur_juana_cakala"],['Trubadúr- No život',"trubadur_no_zivot"],['Trubadúr- Túlať sa',"trubadur_tulat_sa"],['Záchrana',"zachrana"],['Záchrana s textom',"zachrana_s_textom"])
/*insert audio element */
var mute=0;
var aktual=0;
loaded = false,
manualSeek = false; 

function activateli(){$('ul#playlist li').each(function(){$( this ).removeClass( "active" );
																var t=$(this).find('a')[0].href;
																var adresa=(/audio\/([^\.]+)/m).exec(t)[1];
																if(hudba[aktual][1]==adresa){$(this).addClass('active');}
																						});
																
						
						
						}

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
			activateli();
	        })
			window.p=document.createElement('p');
			p.innerHTML='<p class="player">\
				  <span id="playtoggle" class="playtoggle"></span>\
				  <span id="gutter" class="gutter">\
					<span id="loading" class="loading"></span>\
					<span id="handle" class="handle" class="ui-slider-handle" ></span>\
				  </span>\
				  <span id="timeleft" class="timeleft"></span>\
				</p>';
			
			loadingIndicator = p.getElementsByClassName('loading')[0];
			positionIndicator = p.getElementsByClassName('handle')[0];
			timeleft = p.getElementsByClassName('timeleft')[0];
			gutter = p.getElementsByClassName('gutter')[0];
			playtoggle = p.getElementsByClassName('playtoggle')[0];
			$('#audio_back').bind('click', function(){
			if(aktual-1==-1){aktual=hudba.length-1;}
			aktual--;
			change('audio/'+hudba[aktual][1]);
			changedesc();
			document.getElementById('mute').style.backgroundImage='url(img/audio/audio.png)';
			mute=0;
			activateli();
	        })
								$(audio).bind('timeupdate', function() {
									
							  var rem = parseInt(audio.duration - audio.currentTime, 10),
							  pos = (audio.currentTime / audio.duration) * 100,
							  mins = Math.floor(rem/60,10),
							  secs = rem - mins*60;
							  if(pos==100){ 
										if(aktual+1==hudba.length){aktual=-1;}
										aktual++;
										change('audio/'+hudba[aktual][1]);
										changedesc();
										document.getElementById('mute').style.backgroundImage='url(img/audio/audio.png)';
										mute=0;
										activateli();
										
																				
										}
										
							  timeleft.textContent='-' + mins + ':' + (secs > 9 ? secs : '0' + secs);
							  if (!manualSeek) { positionIndicator.style.left=pos + '%'; }
							  if (!loaded) {
								loaded = true;
											
								$(gutter).slider({
												  value: 0,
												  step: 0.01,
												  orientation: "horizontal",
												  range: "min",
												  max: 100, 
												  animate: true,					
												  slide: function() {							
													manualSeek = true;
												  },
												  stop:function(e,ui) {
													manualSeek = false;					
													audio.currentTime = (ui.value/100)*audio.duration;
												  }
												});
							  }

							});
$(audio).bind('play',function(){
$(playtoggle).addClass('playing');document.getElementById('mute').style.backgroundImage='url(img/audio/audio.png)';
					mute=0;
});
$(audio).bind('pause ended', function() {
$(playtoggle).removeClass('playing');document.getElementById('mute').style.backgroundImage='url(img/audio/noaudio.png)';mute=1;
});
$(playtoggle).click(function() {
if (audio.paused) { audio.play();}
else { audio.pause(); }
}); 
	

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