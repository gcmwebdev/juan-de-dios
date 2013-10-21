$(document).ready(function(){
				ajaxInit=function (selector){$(selector).click(function(e){
				$('a.ajax').each(function(){$( this ).removeClass( "active" );});
				$(this).addClass('active');
				
				
				/*loading icon*/
				$('#wrapper').get(0).innerHTML='<div id="content" white="no"><div class="loading"></div> </div>';
				var adresa =this.href;
				var xmlhttp;
				if (window.XMLHttpRequest)
				  {// code for IE7+, Firefox, Chrome, Opera, Safari
				  xmlhttp=new XMLHttpRequest();
				  }
				else
				  {// code for IE6, IE5
				  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
				  }
				xmlhttp.onreadystatechange=function()
				  {
				  if (xmlhttp.readyState==4)
					{
					xmlDoc=(xmlhttp.responseText);
					var title=(/<title>([^<]+)<\/title>/m).exec(xmlDoc)[1];
					document.title=title;
					var wrapper=(/<div *(id=['"]wrapper['"][^<>]*|(?:[^<>=]+=['"][^'"]+['"] *)?id=['"]wrapper['"]) *>/m).exec(xmlDoc)[0];
					var back1=(/<div *(id=['"]back1['"][^<>]*|(?:[^<>=]+=['"][^'"]+['"] *)?id=['"]back1['"]) *>/m).exec(xmlDoc)[0];
					xmlDoc=xmlDoc.substring(xmlDoc.indexOf(wrapper),xmlDoc.indexOf(back1));
					document.getElementById("wrapper").outerHTML=xmlDoc;
					
					if(/<script[^<>]*>/.test(xmlDoc))
						{start=/<script[^<>]*>/.exec(xmlDoc)[0];
						 end=/<\/script[^<>]*>/.exec(xmlDoc)[0];
						 console.log(xmlDoc.substring(xmlDoc.indexOf(start)+start.length,xmlDoc.indexOf(end)));
						 eval(xmlDoc.substring(xmlDoc.indexOf(start)+start.length,xmlDoc.indexOf(end)));
						 $('#wrapper').fadeOut(0);
						 $('#wrapper').fadeIn(500);
						 
						}
					history.pushState({foo:'xxxx'}, 'stranka x', adresa);
					}
				  }
				xmlhttp.open("GET", this.href ,true);
				
				xmlhttp.send();
				e.preventDefault();
				return false;
				});}
				ajaxInit('a.ajax');
				/*history*/
				
				window.onpopstate=function(e){
				$('a.ajax').each(function(){$( this ).removeClass( "active" );
											if(this.href==document.location){$(this).addClass('active')}; 
											});
				$('#wrapper').get(0).innerHTML='<div id="content" white="no"><div class="loading"></div> </div>';
				var adresa =document.location;
				var xmlhttp;
				if (window.XMLHttpRequest)
				  {// code for IE7+, Firefox, Chrome, Opera, Safari
				  xmlhttp=new XMLHttpRequest();
				  }
				else
				  {// code for IE6, IE5
				  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
				  }
				xmlhttp.onreadystatechange=function()
				  {
				  if (xmlhttp.readyState==4)
					{
					xmlDoc=(xmlhttp.responseText);
					var title=(/<title>([^<]+)<\/title>/m).exec(xmlDoc)[1];
					document.title=title;
					var wrapper=(/<div *(id=['"]wrapper['"][^<>]*|(?:[^<>=]+=['"][^'"]+['"] *)?id=['"]wrapper['"]) *>/m).exec(xmlDoc)[0];
					var back1=(/<div *(id=['"]back1['"][^<>]*|(?:[^<>=]+=['"][^'"]+['"] *)?id=['"]back1['"]) *>/m).exec(xmlDoc)[0];
					xmlDoc=xmlDoc.substring(xmlDoc.indexOf(wrapper),xmlDoc.indexOf(back1));
					document.getElementById("wrapper").outerHTML=xmlDoc;
					
					if(/<script[^<>]*>/.test(xmlDoc))
						{start=/<script[^<>]*>/.exec(xmlDoc)[0];
						 end=/<\/script[^<>]*>/.exec(xmlDoc)[0];
						 console.log(xmlDoc.substring(xmlDoc.indexOf(start)+start.length,xmlDoc.indexOf(end)));
						 eval(xmlDoc.substring(xmlDoc.indexOf(start)+start.length,xmlDoc.indexOf(end)));
						 $('#wrapper').fadeOut(0);
						 $('#wrapper').fadeIn(500);
						 
						}
					
					}
				  }
				xmlhttp.open("GET", document.location ,true);
				
				xmlhttp.send();
				}
				

});
