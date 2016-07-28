var $$ = Dom7;
var page;
var page2;
sessionStorage['idSpeaker']="";
sessionStorage['token']="";
sessionStorage['login']="true";
sessionStorage['nameSpeaker']="";
sessionStorage['number_reviews']=3;
sessionStorage['idUser']="";
//console.log(StatusBar);




var myApp = new Framework7({
    pushState: true,
    swipePanel: 'left',
    animateNavBackIcon : true
    // ... other parameters
});
var mainView = myApp.addView('.view-main');
//myApp.showPreloader();



get_welcome();
function get_welcome(){
myApp.showIndicator();
var settings = {
          "url": "http://52.69.148.135/ws/auth/login",
          "type": "Post",
          data: {
                        email: "test@gmail.com",
                        password: "test123"
                    },
           dataType :"json",
         success: function(data){
          //myApp.alert(data.token);
          },
          error: function(){
          myApp.alert('La requete n a pas abouti');
          }
          };

        // RECUPERATION DU TOKEN

        $.ajax(settings).done(function(data){
            //console.log('ici');
            sessionStorage['token']="Bearer {"+data.token+"}";
            //console.log(sessionStorage['token']);

var page = $$('#tpl-welcome').html();
            document.getElementById("container").innerHTML = page;
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




// REQUETE 3 BEST SPEAKERS

            var template2 = $$('#tpl-3-best-speakers').html();
                var compiledTemplate2 = Template7.compile(template2);




                var settings2 = {

                  "url": "http://52.69.148.135/ws/api/speakers/rating/max/3",
                  "type": "Get",
                  "headers": {
                    "authorization": sessionStorage['token']
                    },
                   dataType :"json",
                 success: function(data){
                  //myApp.alert(data);
                  },
                  error: function(){
                  myApp.alert('La requete n a pas abouti');
                  }
                  };



            $.ajax(settings2).done(function(data){
            //console.log('REPONSE ARIANE '+data.speakers);
            page2 = compiledTemplate2(data);
            $('#container').append(page2);
            
            

            // FIN REQUETE 3 BEST SPEAKERS

            // REQUETE 3 LAST REVIEWS

                        var template3 = $$('#tpl-3-last-reviews').html();
                            var compiledTemplate3 = Template7.compile(template3);




                            var settings3 = {

                              "url": "http://52.69.148.135/ws/api/reviews/last/"+sessionStorage['number_reviews']+"",
                              "type": "Get",
                              "headers": {
                                "authorization": sessionStorage['token']
                                },
                               dataType :"json",
                             success: function(data){
                              //myApp.alert(data);
                              },
                              error: function(){
                              myApp.alert('La requete n a pas abouti');
                              }
                              };



                        $.ajax(settings3).done(function(data){
                          myApp.hideIndicator();
                        //console.log(data.reviews[0].review);
                        //console.log(data.reviews[1].review);
                        //console.log(data.reviews[2].review);
                        page3 = compiledTemplate3(data);

                        $('#container').append(page3);
                        
                        $('#tpl-number-reviews').html(""+sessionStorage['number_reviews']+" last reviews");
                        $(".my-rating-read").starRating({
                                totalStars: 5,
                                starSize: 20,
                                readOnly : true
                              });
                        $("time.timeago").timeago();
                        // READ MORE AND READ LESS DESCRIPTION

                                     // Configure/customize these variables.
                                         var showChar = 100;  // How many characters are shown by default
                                         var ellipsestext = "...";
                                         var moretext = "Read more";
                                         var lesstext = "Read less";


                                         $('.more').each(function() {
                                             var content = $(this).html();

                                             if(content.length > showChar) {

                                                 var c = content.substr(0, showChar);
                                                 var h = content.substr(showChar, content.length - showChar);

                                                 var html = c + '<span class="moreellipses">' + ellipsestext+ '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moretext + '</a></span>';

                                                 $(this).html(html);
                                             }

                                         });

                                         $(".morelink").click(function(){
                                             if($(this).hasClass("less")) {
                                                 $(this).removeClass("less");
                                                 $(this).html(moretext);
                                             } else {
                                                 $(this).addClass("less");
                                                 $(this).html(lesstext);
                                             }
                                             $(this).parent().prev().toggle();
                                             $(this).prev().toggle();
                                             return false;
                                         });
                        });

                        // FIN REQUETE 3 LAST REVIEWS
                          // REQUETE 3 LAST REVIEWS

                        var template4 = $$('#tpl-3-random-quotes').html();
                            var compiledTemplate4 = Template7.compile(template4);




                            var settings4 = {

                              "url": "http://52.69.148.135/ws/api/reviews/quote/3",
                              "type": "Get",
                              "headers": {
                                "authorization": sessionStorage['token']
                                },
                               dataType :"json",
                             success: function(data){
                              //myApp.alert(data);
                              },
                              error: function(){
                              myApp.alert('La requete n a pas abouti');
                              }
                              };



                        $.ajax(settings4).done(function(data){
                          console.log(data);
                          myApp.hideIndicator();
                        //console.log(data.reviews[0].review);
                        //console.log(data.reviews[1].review);
                        //console.log(data.reviews[2].review);
                        page4 = compiledTemplate4(data);

                        $('#container').append(page4);
                        var mySwiper2 = myApp.swiper('.swiper-2', {
    pagination:'.swiper-2 .swiper-pagination',
    spaceBetween: 50
  });




            });
                        

});

});



















    // END OF AUTOCOMPLETE


    //myApp.hidePreloader();

    }


//myApp.alert(sessionStorage['token']);
//get_search_bar();

function see_more_reviews(){
    var calcul=sessionStorage['number_reviews'];
    //console.log(calcul);
    calcul=+calcul +3;
    sessionStorage['number_reviews']=calcul;
    //console.log(calcul);
    get_welcome();
    }


function get_search_bar(){

myApp.showIndicator();
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
        //console.log(data.speakers[0].speaker_photo);
            document.getElementById("container").innerHTML = page;
            myApp.hideIndicator();
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
myApp.showIndicator();
// AFFICHAGE DU SPEAKER


var template = $$('#tpl-specific-speaker').html();
var compiledTemplate = Template7.compile(template);
// basic use comes with defaults values
  $(".my-rating").starRating({
    initialRating: 0,
    starSize: 50,
    totalStars : 5,
    disableAfterRate : false
  });
  $(".my-rating-read").starRating({
    totalStars: 5,
    starSize: 100,
    emptyColor: 'lightgray',
    hoverColor: 'salmon',
    activeColor: 'crimson',
    useGradient: false
  });




//PREPARATION DE LA REQUETE

var settings = {

  "url": "http://52.69.148.135/ws/api/speakers/"+sessionStorage['idSpeaker']+"/quote/3",
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
  //console.log(data);
page = compiledTemplate(data);
console.log(data.quotes);
sessionStorage['nameSpeaker']=data.speaker.speaker_name;
// READ MORE AND READ LESS DESCRIPTION

     // Configure/customize these variables.
         var showChar = 100;  // How many characters are shown by default
         var ellipsestext = "...";
         var moretext = "Read more";
         var lesstext = "Read less";


         $('.more').each(function() {
           //console.log('hehetoi');
             var content = $(this).html();

             if(content.length > showChar) {

                 var c = content.substr(0, showChar);
                 var h = content.substr(showChar, content.length - showChar);

                 var html = c + '<span class="moreellipses">' + ellipsestext+ '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moretext + '</a></span>';

                 $(this).html(html);
             }

         });

         $(".morelink").click(function(){
            //console.log('hihikoeur');
             if($(this).hasClass("less")) {
                 $(this).removeClass("less");
                 $(this).html(moretext);
             } else {
                 $(this).addClass("less");
                 $(this).html(lesstext);
             }
             $(this).parent().prev().toggle();
             $(this).prev().toggle();
             return false;
         });


         //END OF READ MORE / READ LESS DESCRIPTION

document.getElementById("container").innerHTML = page;
myApp.hideIndicator();
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
            html: '<iframe width="560" height="315" src="https://www.youtube.com/embed/dm9nqukato4" frameborder="0" allowfullscreen></iframe>',
            caption: 'Zach Supalla (Spark Labs) Interview - OSCON 2014'
        }
        /*,
        {
            url: 'http://lorempixel.com/1024/1024/sports/2/',
            caption: 'Second Caption Text'
        },
        {
            url: 'http://lorempixel.com/1024/1024/sports/3/',
        },*/
    ],
    theme: 'dark',
    type: 'standalone'
});

$$('.open-login').on('click', function () {

if (sessionStorage['login']){
    //myApp.alert('Pas de login, pas de review :(');
    myApp.popup('.popup-login');
    $$('.open-registration').on('click', function(){
        myApp.closeModal('.popup-login');
        myApp.popup('.popup-registration');
        });

}
else{

$('#leave-a-comment').show();
$('#first-click').show();


  myApp.popup('.popup-review');
  $('#leave-a-comment').hide();
  $('#second-click').hide();
  $$('#speaker-name').html(sessionStorage['nameSpeaker']);
  $$('.first-click').on('click', function(){
    $('#leave-a-comment').show();
    $('#first-click').hide();
    $('#second-click').show();
    //console.log('ici');
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
                //console.log(formData);
                //console.log($('.rating-inspiring').starRating('getRating'));



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

$('#leave-a-comment').show();
                $('#second-click').show();



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
console.log('yolo : '+data.reviews[0].review_rating[0].pivot);
page2 = compiledTemplate2(data);
//console.log('ici2');


    $('#container').append(page2);
    $(".my-rating-read").starRating({
        totalStars: 5,
        starSize: 20,
        readOnly : true
      });
        $("time.timeago").timeago();
        // READ MORE AND READ LESS DESCRIPTION

             // Configure/customize these variables.
                 var showChar = 100;  // How many characters are shown by default
                 var ellipsestext = "...";
                 var moretext = "Read more";
                 var lesstext = "Read less";


                 $('.more').each(function() {
                     var content = $(this).html();

                     if(content.length > showChar) {

                         var c = content.substr(0, showChar);
                         var h = content.substr(showChar, content.length - showChar);

                         var html = c + '<span class="moreellipses">' + ellipsestext+ '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moretext + '</a></span>';

                         $(this).html(html);
                     }

                 });

                 $(".morelink").click(function(){
                     if($(this).hasClass("less")) {
                         $(this).removeClass("less");
                         $(this).html(moretext);
                     } else {
                         $(this).addClass("less");
                         $(this).html(lesstext);
                     }
                     $(this).parent().prev().toggle();
                     $(this).prev().toggle();
                     return false;
                 });



});



}

function get_my_profile(){
  console.log(sessionStorage['idUser']);
  if (sessionStorage['idUser']==""){
    console.log('toto');
    myApp.loginScreen();
    $$('.open-registration').click(function(){
        myApp.closeModal('.login-screen');
        console.log('POPUP');
        myApp.popup('.popup-registration');
      });
  }
  else{
    console.log('rara');
  var template = $('#tpl-my-profile').html();
  var compiledTemplate = Template7.compile(template);

//PREPARATION DE LA REQUETE

var settings = {

  "url": "http://52.69.148.135/ws/api/user/"+sessionStorage['idUser']+"",
  "type": "Get",
  "headers": {
    "authorization": sessionStorage['token']
     },data: {
                email: "evan.chen@acer.com",
                password: "1qaz@WSX"
            },
   dataType :"json",
 success: function(data){
  console.log(data);
  //console.log(data2.reviews[0].review_rating);
  //console.log(data2.reviews[0].review_rating);
  },
  error: function(){
  myApp.alert('La requete n a pas abouti');
  }
  };



//CHARGEMENT DES DONNEES DU SPEAKER




$.ajax(settings).done(function(data){
  page = compiledTemplate(data);
  
  $('#container').html(page);
});
  }
  
}

function login(){
  //console.log('ici');
  var formData = myApp.formToJSON('#form-login');
  console.log(JSON.stringify(formData));
  console.log(formData.email);

                var settings = {

                  "crossDomain": true,
                  "url": "http://52.69.148.135/ws/api/user/login",
                  "method": "POST",
                  "headers": {
                    "authorization": sessionStorage['token']
                    },
                    data:{
                        'email' : formData.email,
                        'password' : formData.password
                        },
                  dataType : "json",

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
                  if (response.message =="success"){
                    console.log('success');
                    sessionStorage['idUser']=response.user.id;
                    myApp.alert("Connexion successfull")
                     myApp.closeModal('.login-screen');
                  get_my_profile();
                  }
                  else{
                    console.log('deny');
                    myApp.alert('Wrong email / password')
                  }
                  
                  
                });
}



$$('.tabbar .tab-link').on('click', function () {
   $$('.tabbar .active').removeClass('active');
   $$(this).addClass('active');
});

document.addEventListener("backbutton", backKeyDown, true);


function backKeyDown() {
    // Call my back key code here.
    get_welcome();
    //$.mobile.changePage("#homepage", "slideup");
}












