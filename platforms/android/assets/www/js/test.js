var $$ = Dom7;




var myApp = new Framework7({
    pushState: true,
    swipePanel: 'left'
    // ... other parameters
});


//$$('#ici').hide();


/*var mySearchbar = myApp.searchbar('.searchbar', {
    searchList: '.list-block-search',
    searchIn: '.item-title'
});*/

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
		$$.getJSON('js/speakers.json', function(json) {


page = compiledTemplate(json);
//console.log(page);
                   // populate the array
                    //var jsonstring = JSON.stringify(json)
		           //console.log(jsonstring);
		           //jsonstring="{\"speakers\":"+jsonstring+"}";
		           //console.log(jsonstring);
		           //var json2 = $$.parseJSON(jsonstring);
		           //console.log(JSON.stringify(json2));


				   //console.log(page);
				   document.getElementById("ici").innerHTML = page;
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







