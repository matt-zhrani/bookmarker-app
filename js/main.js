//listen to form submit event
document.getElementById('myForm').addEventListener('submit', saveBookmark);

//save bookmarks
function saveBookmark(e){

  var siteName = document.getElementById('siteName').value;
  var siteUrl = document.getElementById('siteUrl').value;

  if(!validateForm(siteName, siteUrl)){
    return false;
  }

  var bookmark = {
    name: siteName,
    url: siteUrl
  }

  // test if bookmarks is null
  if(localStorage.getItem('bookmarks') === null){
    //init array
    var bookmarks =[];
    //add new bookmark from user
    bookmarks.push(bookmark);
    //set to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
  else{
    //get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //add new bookmark to bookmarks
    bookmarks.push(bookmark);
    //set back to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  // Clear form
  document.getElementById('myForm').reset();
  //refresh bookmarks
  fetchBookmark();

  //prevent form from submitting
  e.preventDefault();
}

// delete bookmark function
function deleteBookmark(url){
  console.log(url);
  //retreive bookmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  for(var i = 0; i < bookmarks.length; i++){
    if(bookmarks[i].url == url){
      bookmarks.splice(i,1);
    }
  }
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  fetchBookmark();
}

//Fetch bookmarks
function fetchBookmark(){
  // Get bookmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // Get output Id
  var bookmarksResults = document.getElementById('bookmarksResults');

  //Build output
  bookmarksResults.innerHTML = '';
  for(var i=0; i< bookmarks.length; i++){
    var name= bookmarks[i].name;
    var url= bookmarks[i].url;
    bookmarksResults.innerHTML += '<div class="well">' +
                                  '<h3>' + name +
                                  '<a class="btn btn-default" target="_blank" href="'+url+'">Visit</a>'+
                                  '<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a>'+
                                  '</h3></div>';
  }
}

function validateForm(siteName, siteUrl){
  if(!siteName || !siteUrl){
    alert('please fill in the form');
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);
  //https?:\/\/(www\.)?
  if (!siteUrl.match(regex)) {
    alert("Please use a valid URL");
    return false;
  }

  return true;
}
