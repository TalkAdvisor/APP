// Variables globales et initialisation de l'application

var $$ = Dom7;
var page;
var data = "akak";

var rafraichir="";
var myApp = new Framework7({fastCLicks: true, pushState: true, template7Pages: true, notificationHold: 2500, modalTitle:'TalkAdvisor'});
var mainView = myApp.addView('.view-main', { dynamicNavbar: true });
var formData;

// Search bar
/*var mySearchbar = myApp.searchbar('.searchbar', {
    searchList: '.list-block-search',
    searchIn: '.item-title'
});*/
//var mySearchbar = $$('.searchbar')[0].f7Searchbar;

// Now you can use it
//mySearchbar.search('Hello world');

// Functions

function getconnexion() {
	page = $$('#tpl-connexion').html();
	document.getElementById("container").innerHTML = page;


}

function get_speakers() {
		var template = $$('#tpl-speakers').html();
		var compiledTemplate = Template7.compile(template);
		$$.getJSON('js/speakers.json', function(json) {
				   page = compiledTemplate(json);
				   document.getElementById("container").innerHTML = page;
				   var jsonText= JSON.stringify(json.speakers[0].video);

				   document.getElementById("essai").innerHTML = jsonText;

				   });







}

function get_specific_speaker() {
		var template = $$('#tpl-specific-speaker').html();
		console.log(template);
		var compiledTemplate = Template7.compile(template);
		//console.log(compiledTemplate);
		$$.getJSON('js/speakers.json', function(json) {
				   page = compiledTemplate(json);
				   document.getElementById("container").innerHTML = page;
				   });

			   myApp.alert('YOLO');


		var myPhotoBrowserPopupDark = myApp.photoBrowser({
                                       photos : [
                                           {
                                               html: '<iframe src="https://www.youtube.com/v/dm9nqukato4" frameborder="0" allowfullscreen></iframe>',
                                               caption: 'Woodkid - Run Boy Run (Official HD Video)'
                                           },
                                           {
                                               url: 'http://lorempixel.com/1024/1024/sports/2/',
                                               caption: 'Second Caption Text'
                                           },
                                           {
                                               url: 'http://lorempixel.com/1024/1024/sports/3/',
                                           },
                                       ],
                                       theme: 'dark',
                                       type: 'standalone'
                                   });
                                   $$('.pb-standalone-video').on('click', function () {
                                       myPhotoBrowserPopupDark.open();
                                   });



}

function get_search_bar(){
//var mySearchbar = $$('.searchbar')[0].f7Searchbar;

// Now you can use it
//mySearchbar.search('Hello world');
page = $$('#tpl-search-bar').html();
	document.getElementById("container").innerHTML = page;
}






// Main()

var ptrContent = $$('.pull-to-refresh-content');

ptrContent.on('refresh', function (e) {
			  setTimeout(function () {
						 switch(rafraichir) {
							 case "affiche-qdj":
								 getqdj();
								 break;
							 case "affiche-classement":
								 getclassement();
								 break;
							 case "affiche-statistiques":
								 getstatistiques();
								 break;
							 case "affiche-proposition":
								 getroot();
								 break;
							 case "affiche-chat":
							 	getchat();
							 	break;
							 default:
								 break;
						 }
						 myApp.pullToRefreshDone();
						 }, 1000);
			  });

get_specific_speaker();

