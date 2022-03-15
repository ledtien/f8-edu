const postAPI = "https://jsonplaceholder.typicode.com/posts";

fetch(postAPI)
  .then(function (response) {
    return response.json();
  })
  .then(function (posts) {
    var htmls = posts.map((post) => {
      return `<li>
          <h2>${post.title}</h2>
          <p>${post.body}</p>
          
          </li>`;
    });
    var html = htmls.join("");
    document.getElementById("block").innerHTML = html;
  });
