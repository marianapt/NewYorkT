
var articleData = [];
var currentBatch = -1;

$(document, "#search").on("click", function(event) {
  // console.log(event.target);
  console.log($(event.target));


  if ($(event.target).text() == "Search") {
    event.preventDefault();
    console.log("Clicked search");
    searchNYT($("#search").val())
    $("#search").val('');
  }

});


  function searchNYT(searchterm) {
    // Copied from the API docs, build the request.
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
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
      //save the data

      if (result.response.docs.length > 0) {
        articleData.push(result);
        currentBatch++;
        //display all up to the limit.
        displayAllArticles(currentBatch, 5);
      }

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

function generateBoostrapCard(articleHeadline, imgUrl, articleUrl, articleText) {
  // console.log(articleText);
  var newArticle = $("<div>").attr("class","article-card")
  .append($("<img>").attr("class","article-img-top").attr("src", imgUrl));

  var newBlock = $("<div>").attr("class","article-block");
  newBlock.append($("<h4>").attr("class","article-title").text(articleHeadline));
  newBlock.append($("<p>").attr("class","article-text").text(articleText));
  newBlock.append($("<a>")
        .attr("href",articleUrl)
        .attr("class","btn btn-primary", "target","_blank")
        .text("Read this article"));

newArticle.append(newBlock);
  //change html in here:
  $("#response").append(newArticle);
  //return to the other function
  return newArticle;


}

    function displayArticle(currentBatch, currentArticle) {
      var data = articleData[currentBatch].response.docs[currentArticle];
      //display an article.
      var headline  = data.headline.main;

      if (data.multimedia.length != 0) {
        var imgUrl = "https://static01.nyt.com/" + data.multimedia[data.multimedia.length - 1].url;
      }


      // var imgUrl = "https://www.placehold.it/75x75";
      var articleUrl = data.web_url;
      var articleText = data.snippet;
      // $("#response").append(newArticle); .response.docs["0"].snippet
      // console.log(articleText);
      console.log(imgUrl);
      $("#response").prepend(generateBoostrapCard(headline, imgUrl, articleUrl, articleText));
    }

    function displayAllArticles(currentBatch, articleLimit) {


      articleData[currentBatch].response.docs.forEach(function(item, index){
      if (index < articleLimit) {
          console.log(index);
          displayArticle(currentBatch, index);
        }

      });

    }
