//INITIALISATION
var $$ = Dom7;
var page;



var myApp = new Framework7(/*{
    pushState: true,
    swipePanel: 'left'
    // ... other parameters
}*/);

var mainView = myApp.addView('.view-main', {
  dynamicNavbar: true
});





// FONCTION PRINCIPALE
function get_specific_speaker() {

var template = $$('#tpl-specific-speaker').html();
var compiledTemplate = Template7.compile(template);
//PREPARATION DE LA REQUETE

var settings = {

  "url": "http://52.69.148.135/ws/api/speakers/111",
  "type": "Get",
  "headers": {
    "authorization": "Bearer {eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjQsImlzcyI6Imh0dHA6XC9cLzUyLjY5LjE0OC4xMzVcL3dzXC9hdXRoXC9sb2dpbiIsImlhdCI6MTQ2NzgwMDg5MSwiZXhwIjoxNDY3ODg3MjkxLCJuYmYiOjE0Njc4MDA4OTEsImp0aSI6ImNkMzJjN2VlZmVlMjA4OGQ2NzIxN2NiNGMyOGQ1ZTNkIn0.4ymA4a48mJvwQogw22Zi-eGHcRNLNvt8fUAvTW1iRN0}"},
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
page = compiledTemplate(data.speakers);
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
  myApp.popup('.popup-about');
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

});

}



//APPEL DE LA FONCTION

get_specific_speaker();









