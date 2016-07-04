// Variables globales et initialisation de l'application

var $$ = Dom7;
var page;
//var data = "akak";
session="Bearer {eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjQsImlzcyI6Imh0dHA6XC9cLzUyLjY5LjE0OC4xMzVcL3dzXC9hdXRoXC9sb2dpbiIsImlhdCI6MTQ2NzU5NzkyNiwiZXhwIjoxNDY3Njg0MzI2LCJuYmYiOjE0Njc1OTc5MjYsImp0aSI6IjA4MDVmZDQxODIyNTU5OGIyMjk0NGZhOTdhNGEyYzhjIn0.t8Gk2_i7mMW_xn6VgJfIFX7_oUnrtA_M0fs4kHTc540}";


var rafraichir="";
var myApp = new Framework7({fastCLicks: true, pushState: true, template7Pages: true, notificationHold: 2500, modalTitle:'TalkAdvisor'});
var mainView = myApp.addView('.view-main', { dynamicNavbar: true });
var formData;



// initialize with defaults
//$("#input-id").rating();

// Search bar
/*var mySearchbar = myApp.searchbar('.searchbar', {
    searchList: '.list-block-search',
    searchIn: '.item-title'
});*/
//var mySearchbar = $$('.searchbar')[0].f7Searchbar;

// Now you can use it
//mySearchbar.search('Hello world');

// Functions

getconnexion();

function getconnexion() {
	//page = $$('#tpl-connexion').html();
	//document.getElementById("container").innerHTML = page;


var template = $$('#tpl-reviews').html();
		var compiledTemplate = Template7.compile(template);

var settings = {

  "url": "http://52.69.148.135/ws/api/reviews",
  "type": "Get",
  "headers": {
    "authorization": session
     },data: {
                email: "antoinekeller007@gmail.com",
                password: "talkadvisor"
            },
   dataType :"json",
 success: function(data){
  //myApp.alert(data.reviews);
  },
  error: function(){
  myApp.alert('La requete n a pas abouti');
  }
  };


//myApp.alert("Le session storage (login) vaut "+sessionStorage['login']);
//CHARGEMENT DES DONNEES DU SPEAKER




$.ajax(settings).done(function(data){

page = compiledTemplate(data);
//myApp.alert(sessionStorage['idSpeaker']);
    console.log(data.reviews[2].review_rating[4].pivot.score_id);
    document.getElementById("container").innerHTML = page;
    $('#input-1, #input-2, #input-3, #input-4, #input-5').rating({min: 0.5, max: 5, step: 0.5, stars: 5, readonly : true,
      showCaption : false, size : 'xs',
      showClear : false});







});
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



