window.onload = function() {

  build = ``;
  build += `<h3>Adam</h3>`
  build += `<hr>`
  build += `<p>Created the save point feature and the website. <br> Also helped out with the puzzle creation.</p>`
  build += `<hr>`
  build += `<h4>Likes: Popping bubbles</h4>`
  build += `<h4>Dislikes: Doing excesive work</h4>`


  let flipcard1 = new FlipCard(build, "<img src= indexfiles/hehe.jpg style = 'padding-top:20px; max-width: 225px; max-height:255px'> <hr> <h3>Very pro at this stuff.</h3>");
  flipcard1.render("flipcard_output");

  build = ``;
  build += `<h3>Chenxu</h3>`
  build += `<hr>`
  build += `<p>Created the puzzles for this project. <br> The main brains of the project.</p>`
  build += `<hr>`
  build += `<h4>Likes: Lying</h4>`
  build += `<h4>Dislikes: Lying</h4>`

  let flipcard2 = new FlipCard(build, "<img src= indexfiles/gremlin.jpg style = 'padding-top:20px; max-width: 225px; max-height:255px'> <hr> <h3>Better than Adam</h3>");
  flipcard2.render("flipcard_output");

 let leave = document.getElementById("exit");
  leave.addEventListener("click", window.close());

  
}