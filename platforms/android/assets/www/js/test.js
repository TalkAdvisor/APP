var $$ = Dom7;
var page;
var page2;
sessionStorage['idSpeaker']="";
sessionStorage['token']="Bearer {eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjQsImlzcyI6Imh0dHA6XC9cLzUyLjY5LjE0OC4xMzVcL3dzXC9hdXRoXC9sb2dpbiIsImlhdCI6MTQ2ODM3Nzc4NSwiZXhwIjoxNDY4NDY0MTg1LCJuYmYiOjE0NjgzNzc3ODUsImp0aSI6IjMzMzkzYTY1MThiZGFlNDA2Mzc0MDg4Nzg1NDhjMmRlIn0.aofPfCQuPSC1tg1tYqfq9ZrJj25M645by0743xxjp1s}";
sessionStorage['login']="true";
sessionStorage['nameSpeaker']="";




var myApp = new Framework7({
    pushState: true,
    swipePanel: 'left',
    animateNavBackIcon : true
    // ... other parameters
});
var mainView = myApp.addView('.view-main');




get_welcome();
function get_welcome(){
    var template = $$('#tpl-welcome').html();
    document.getElementById("container").innerHTML = template;

    // AUTOCOMPLETE
    var autocompleteDropdownAjax = myApp.autocomplete({
        input: '#autocomplete-dropdown-ajax',
        openIn: 'dropdown',
        preloader: true, //enable preloader
        valueProperty: 'id', //object's "value" property name
        textProperty: 'name', //object's "text" property name
        limit: 20, //limit to 20 results
        //dropdownPlaceholderText: 'Try to look for a speaker',
        expandInput: true, // expand input
        source: function (autocomplete, query, render) {
            var results = [];
            if (query.length === 0) {
                render(results);
                return;
            }
            // Show Preloader
            autocomplete.showPreloader();
            // Do Ajax request to Autocomplete data
            $$.ajax({
                url: 'http://52.69.148.135/ws/api/speakers',
                method: 'GET',
                dataType: 'json',
                "headers": {
                            "authorization": sessionStorage['token']

                            },
                              data: {
                                        email: "evan.chen@acer.com",
                                        password: "1qaz@WSX"
                                    },
                //send "query" to server. Useful in case you generate response dynamically
                data: {
                    query: query
                },
                success: function (data) {
                    // Find matched items
                    for (var i = 0; i < data.speakers.length; i++) {
                    if (data.speakers[i].speaker_name.toLowerCase().indexOf(query.toLowerCase()) >= 0){
                            results.push(data.speakers[i].speaker_name);
                            sessionStorage['idSpeaker']=data.speakers[i].id;

                            }

                    }
                    // Hide Preoloader
                    autocomplete.hidePreloader();
                    // Render items by passing array with result items
                    render(results);
                },
                error : function(data){
                    console.log('error');
                    },

            });


        },
        onChange : function(autocomplete, value){
            get_specific_speaker();

        }

    });


    // END OF AUTOCOMPLETE
    $('#speaker-reviews').hide();
    $('#average-reviews').hide();
    }


//myApp.alert(sessionStorage['token']);
//get_search_bar();




function get_search_bar(){

var template = $$('#tpl-search-bar').html();
		var compiledTemplate = Template7.compile(template);
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
            document.getElementById("container").innerHTML = page;
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

// AFFICHAGE DU SPEAKER
$('#speaker-reviews').show();
    $('#average-reviews').show();
var template = $$('#tpl-specific-speaker').html();
var compiledTemplate = Template7.compile(template);
// basic use comes with defaults values
  $(".my-rating").starRating({
    initialRating: 0,
    starSize: 25,
    totalStars : 5,
    disableAfterRate : false
  });
  $(".my-rating-read").starRating({
    totalStars: 5,
    starSize: 40,
    emptyColor: 'lightgray',
    hoverColor: 'salmon',
    activeColor: 'crimson',
    useGradient: false
  });


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



//CHARGEMENT DES DONNEES DU SPEAKER




$.ajax(settings).done(function(data){
page = compiledTemplate(data.speaker);
sessionStorage['nameSpeaker']=data.speaker.speaker_name;

document.getElementById("container").innerHTML = page;
// 1 Slide Per View, 50px Between
  var mySwiper1 = myApp.swiper('.swiper-1', {
    pagination:'.swiper-1 .swiper-pagination',
    spaceBetween: 50
  });

















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
  $('#leave-a-comment').hide();
  $('#second-click').hide();
  $$('#speaker-name').html(sessionStorage['nameSpeaker']);
  $$('.first-click').on('click', function(){
    $('#leave-a-comment').show();
    $('#first-click').hide();
    $('#second-click').show();
    console.log('ici');
    $$('.form-to-json').on('click', function(){
        //console.log(document.getElementById("comment").value);
            var formData = {
                    'overall': $('.rating-overall').starRating('getRating'),
                    'content': $('.rating-content').starRating('getRating'),
                    'understand': $('.rating-understand').starRating('getRating'),
                    'captivating': $('.rating-captivating').starRating('getRating'),
                    'inspiring': $('.rating-inspiring').starRating('getRating'),
                    'comment' :  document.getElementById("comment").value,
                    'quote': document.getElementById("quote").value
                    };
                console.log(formData);
                console.log($('.rating-inspiring').starRating('getRating'));



                //});


                // POST DU REVIEW


                var settings = {

                  "crossDomain": true,
                  "url": "http://52.69.148.135/ws/api/reviews",
                  "method": "POST",
                  "headers": {
                    "authorization": sessionStorage['token']
                    },
                    data:{
                        user_id:"1",
                        comment : JSON.stringify(formData.comment),
                        speaker_id : sessionStorage['idSpeaker'],
                        score : [formData.overall,formData.content,formData.understand,formData.captivating,formData.inspiring],
                        quote : formData.quote
                        },

                  "mimeType": "multipart/form-data",
                  success: function(data){
                            //myApp.alert(data);
                            },
                            error: function(){
                            myApp.alert('La requete n a pas abouti');
                            }
                }
            //console.log(settings.data.score);
                $.ajax(settings).done(function (response) {
                  //console.log(response);
                });
                // FIN DU POST
        });





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
/*
$$("#overall-id").click(function(){
var overall = (document.getElementById("overall-id").value);
$$('#affiche-overall').html(overall);
});
$$("#content-id").click(function(){
var content = (document.getElementById("content-id").value);
$$('#affiche-content').html(content);
});
$$("#understand-id").click(function(){
var understand = (document.getElementById("understand-id").value);
$$('#affiche-understand').html(understand);
});
$$("#captivating-id").click(function(){
var captivating = (document.getElementById("captivating-id").value);
$$('#affiche-captivating').html(captivating);
});
$$("#inspiring-id").click(function(){
var inspiring = (document.getElementById("inspiring-id").value);
$$('#affiche-inspiring').html(inspiring);
});

var content = (document.getElementById("content-id").value)/20;
var understand = (document.getElementById("understand-id").value)/20;
var captivating = (document.getElementById("captivating-id").value)/20;
var inspiring = (document.getElementById("inspiring-id").value)/20;
*/
}

);


// AFFICHAGE DES REVIEWS SUR LE SPEAKER

var template2 = $$('#tpl-speaker-reviews').html();
//console.log(template2);
var compiledTemplate2 = Template7.compile(template2);

//PREPARATION DE LA REQUETE

var settings2 = {

  "url": "http://52.69.148.135/ws/api/speakers/"+sessionStorage['idSpeaker']+"/review",
  "type": "Get",
  "headers": {
    "authorization": sessionStorage['token']
     },data: {
                email: "evan.chen@acer.com",
                password: "1qaz@WSX"
            },
   dataType :"json",
 success: function(data2){
  //console.log(data2.reviews[0].review_rating);
  //console.log(data2.reviews[0].review_rating);
  },
  error: function(){
  myApp.alert('La requete n a pas abouti');
  }
  };



//CHARGEMENT DES DONNEES DU SPEAKER




$.ajax(settings2).done(function(data){

//console.log('ici');
//console.log(compiledTemplate2);
console.log(data.reviews[0].review_rating[0].pivot);
page2 = compiledTemplate2(data);
//console.log('ici2');

    document.getElementById("speaker-reviews").innerHTML = page2;
    $(".my-rating-read").starRating({
        totalStars: 5,
        starSize: 15,
        readOnly : true
      });
        $("time.timeago").timeago();

});

// AVERAGE REVIEWS
var template3 = $$('#tpl-average-reviews').html();
document.getElementById("average-reviews").innerHTML = template3;

}











