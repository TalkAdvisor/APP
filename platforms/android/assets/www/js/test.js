var $$ = Dom7;
var page;
sessionStorage['idSpeaker']="";
sessionStorage['token']="Bearer {eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjQsImlzcyI6Imh0dHA6XC9cLzUyLjY5LjE0OC4xMzVcL3dzXC9hdXRoXC9sb2dpbiIsImlhdCI6MTQ2NzU5NzkyNiwiZXhwIjoxNDY3Njg0MzI2LCJuYmYiOjE0Njc1OTc5MjYsImp0aSI6IjA4MDVmZDQxODIyNTU5OGIyMjk0NGZhOTdhNGEyYzhjIn0.t8Gk2_i7mMW_xn6VgJfIFX7_oUnrtA_M0fs4kHTc540}";
sessionStorage['login']="true";




var myApp = new Framework7({
    pushState: true,
    swipePanel: 'left'
    // ... other parameters
});

//myApp.alert(sessionStorage['token']);
get_search_bar();




function get_search_bar(){
//var mySearchbar = $$('.searchbar')[0].f7Searchbar;
//$$('#ici').show();
// Now you can use it
//mySearchbar.search('Hello world');
/*$$(document).on('pageInit', function (e) {
  // Do something here when page loaded and initialized
*/
//})

var template = $$('#tpl-search-bar').html();
		var compiledTemplate = Template7.compile(template);
		//myApp.alert(compiledTemplate);

		var settings = {

          "url": "http://52.69.148.135/ws/api/speakers",
          "type": "Get",
          "headers": {
            "authorization": sessionStorage['token']
            },
              data: {
                        email: "evan.chen@acer.com",
                        password: "1qaz@WSX"
                    },
           dataType :"json",
         success: function(data){
          //myApp.alert(data);
          },
          error: function(){
          myApp.alert('La requete n a pas abouti');
          }
          };

        //CHARGEMENT DES DONNEES DU SPEAKER

        $.ajax(settings).done(function(data){
        page = compiledTemplate(data);
            //console.log(data);
            document.getElementById("container").innerHTML = page;



		//$$.getJSON('js/speakers.json', function(json) {


//page = compiledTemplate(json);
//console.log(page);
                   // populate the array
                    //var jsonstring = JSON.stringify(json)
		           //console.log(jsonstring);
		           //jsonstring="{\"speakers\":"+jsonstring+"}";
		           //console.log(jsonstring);
		           //var json2 = $$.parseJSON(jsonstring);
		           //console.log(JSON.stringify(json2));


				   //console.log(page);
				   //document.getElementById("ici").innerHTML = page;
                    //myApp.alert('YOLO');
                    var mySearchbar = myApp.searchbar('.searchbar', {
                        searchList: '.list-block-search',
                        searchIn: '.item-title'
                    });

				   });






 /*var page = $$('#tpl-search-bar').html();
myApp.alert('YOLO');
	document.getElementById("ici").innerHTML = page;*/
}


// FONCTION PRINCIPALE
function get_specific_speaker() {

var template = $$('#tpl-specific-speaker').html();
var compiledTemplate = Template7.compile(template);
//PREPARATION DE LA REQUETE

var settings = {

  "url": "http://52.69.148.135/ws/api/speakers/"+sessionStorage['idSpeaker']+"",
  "type": "Get",
  "headers": {
    "authorization": sessionStorage['token']
     },data: {
                email: "evan.chen@acer.com",
                password: "1qaz@WSX"
            },
   dataType :"json",
 success: function(data){
  //myApp.alert(data);
  },
  error: function(){
  myApp.alert('La requete n a pas abouti');
  }
  };


//myApp.alert("Le session storage (login) vaut "+sessionStorage['login']);
//CHARGEMENT DES DONNEES DU SPEAKER




$.ajax(settings).done(function(data){
myApp.alert(data.speakers);
page = compiledTemplate(data.speaker);
//myApp.alert(sessionStorage['idSpeaker']);
    //console.log(data.speakers);
    document.getElementById("container").innerHTML = page;














/*$$.getJSON('js/supalla.json', function(json) {

    page = compiledTemplate(json.speakers);
    console.log(json.speakers);
    document.getElementById("container").innerHTML = template;*/






// VIDEOS

$$('.pb-standalone-video').on('click', function () {
    myPhotoBrowserPopupDark.open();
});

/*=== With Video ===*/
var myPhotoBrowserPopupDark = myApp.photoBrowser({
    photos : [
        {
            html: '<iframe src="https://www.youtube.com/embed/nSDa0FRw2cs" frameborder="0" allowfullscreen></iframe>',
            caption: 'HOLLANDE : Ses pires Gaffes et Bourdes - La honte !'
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

$$('.open-about').on('click', function () {
if (!sessionStorage['login']){
    //myApp.alert('Pas de login, pas de review :(');
    myApp.popup('.popup-inscription');
}
else{

  myApp.popup('.popup-review');
  $$('.form-to-json').on('click', function(){
    var formData = myApp.formToJSON('#leave-a-review');
    console.log(JSON.stringify(formData));


    // POST DU REVIEW


    var settings = {

      "crossDomain": true,
      "url": "http://52.69.148.135/ws/api/reviews",
      "method": "POST",
      "headers": {
        "authorization": sessionStorage['token']
        },
        data:{
            user_name : "AntoineK.",
            user_email : "lol@gmail.com",
            comment : "bite",
            speaker_id : "117",
            score : ['1','2','3','4','5']
            },

      "mimeType": "multipart/form-data",
      success: function(data){
                //myApp.alert(data);
                },
                error: function(){
                myApp.alert('La requete n a pas abouti');
                }
    }

    $.ajax(settings).done(function (response) {
      console.log(response);
    });
    // FIN DU POST




  });
  }
});

$$('.popup-services').on('click', function () {
  myApp.popup('.popup-services');
});

$$('.notification-default').on('click', function () {
    myApp.addNotification({
        title: 'TalkAdvisor',
        message: 'Thanks for leaving a review !',
        hold:3000
    });

    // RATINGS

});
$$("#overall-id").click(function(){
var overall = (document.getElementById("overall-id").value)/20;
$$('#affiche-overall').html(overall);
});
$$("#content-id").click(function(){
var content = (document.getElementById("content-id").value)/20;
$$('#affiche-content').html(content);
});
$$("#understand-id").click(function(){
var understand = (document.getElementById("understand-id").value)/20;
$$('#affiche-understand').html(understand);
});
$$("#captivating-id").click(function(){
var captivating = (document.getElementById("captivating-id").value)/20;
$$('#affiche-captivating').html(captivating);
});
$$("#inspiring-id").click(function(){
var inspiring = (document.getElementById("inspiring-id").value)/20;
$$('#affiche-inspiring').html(inspiring);
});

var content = (document.getElementById("content-id").value)/20;
var understand = (document.getElementById("understand-id").value)/20;
var captivating = (document.getElementById("captivating-id").value)/20;
var inspiring = (document.getElementById("inspiring-id").value)/20;

}

);
}











