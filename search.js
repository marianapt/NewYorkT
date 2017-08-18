
var articleData = [];

$("#add-article").on("click", function(event) {

  event.preventDefault();
  searchNYT($("#search-input").val())
  $("#search-input").val('');

});


  function searchNYT(searchterm) {

    // Built by LucyBot. www.lucybot.com
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    // var apikey = "21fc1980c81e408891eb4b4709324562";
    // var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=b9f91d369ff59547cd47b931d8cbc56b:0:74623931&q=fun"
    // url += '?' + "api-key=" + apikey + "&q=" + searchterm;
    url += '?' +
    $.param({
      'api-key': "21fc1980c81e408891eb4b4709324562",
      'q': searchterm,
      // 'begin_date': begindate,
      // 'end_date': enddate,
      // 'page': numPages
    });
    $.ajax({
      url: url,
      method: 'GET',
    }).done(function(result) {
      console.log(result);
      //TODO something with this data we got.
      articleData.push(result);
      displayAllArticles();

    }).fail(function(err) {
      throw err;
    });



//TODO this is the info we need to put on the page.
      // number  //we know this. array[0] == 1.
      // title articleData.response.docs[0].headline.main
      // author  articleData.response.docs[0].byline.original
      // section articleData.response.docs[0].new_desk
      // timestamp articleData.response.docs[0].pub_date
      // link articleData.response.docs[0].web_url
      //BONUS: image = articleData.response.docs[0].multimedia[0].url

      //TODO images:
      //imageurl = "https://static01.nyt.com"
      //

    }

    function displayArticle(num) {
      //TODO display an article.
      // articleData[-1]
      // articleData["0"].response.docs["0"].headline
      var newArticle = $("<div>").attr("id","stuff").text(articleData[0].response.docs[num].headline.main);
      $("body").append(newArticle);
    }

    function displayAllArticles(articleLimit) {

      articleData[0].response.docs.forEach(function(item, index){
        // console.log(item);
        if (index < articleLimit) {

          console.log(index);
          displayArticle(index);
        }

      });

    }
