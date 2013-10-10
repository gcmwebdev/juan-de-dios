var hudba=Array("bozi_blazon","granada","odpust_nam","otcenas","otcenas_z_predstavenia","trubadur_aj_ked_slnko","trubadur_juana_cakala","trubadur_no_zivot","trubadur_tulat_sa","zachrana","zachrana_s_textom")
/*insert audio element */

function change(sourceUrl) {
    var audio = $("player");      
    $("#ogg_src").attr("src", sourceUrl);
    /****************/
    audio[0].pause();
    audio[0].load();//suspends and restores all audio element
    audio[0].play();
    /****************/
}
$( document ).ready( function(){if(!!document.createElement('audio').canPlayType) {

  var player = '<audio>\
      <source src="audio/'+hudba[0]+'.ogg" type="audio/ogg"></source>\
      <source src="audio/'+hudba[0]+'.mp3" type="audio/mpeg"></source>\
      <source src="audio/'+hudba[0]+'.wav" type="audio/x-wav"></source>\
    </audio>';

  $(player).insertAfter("#footer");

}});