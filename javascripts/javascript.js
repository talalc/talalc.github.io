var Profile = {

  onReady: function(){

    var date = new Date();
    if (date.getHours() <= 12){
      if (date.getMinutes() < 10){
        $("#time").html(date.getHours()+":0"+date.getMinutes()+" AM");
      } else {
        $("#time").html(date.getHours()+":"+date.getMinutes()+" AM");
      }
    } else {
      if (date.getMinutes() < 10){
        $("#time").html(date.getHours()-12 +":0"+date.getMinutes()+ " PM");
      } else {
        $("#time").html(date.getHours()-12 +":"+date.getMinutes()+ " PM");
      }
    }

    panelCount = 9;
    theta = 0;
    currentPage = 0;
    // tz = Math.round( ( $( window ).width() / 2 ) / Math.tan( Math.PI / panelCount ) );
    var container = $("#container");
    // var containerLeft = ($(window).width() - $(container).width())/2;
    var containerLeft = '10%';
    container.css('left', containerLeft);
    // var carousel = $("<div>").attr('id','carousel').attr('width',$( window ).width()).css('transform','translateZ( -'+tz+'px )').appendTo(container);

    tz = Math.round( ( container.width() / 2 ) / Math.tan( Math.PI / panelCount ) )  + 150;

    var carousel = $("<div>").attr('id','carousel').css('transform','translateZ( -'+tz+'px )').appendTo(container);

    for (var i=0; i < panelCount; i++){
      var transformString = 'rotateY('+i*40+'deg ) translateZ(' + tz+'px )';
      $("<figure>").css('transform',transformString).appendTo(carousel);
    }

    $("figure").eq(0).addClass("contact").html("<br><a href=\"mailto:talalchoudry@gmail.com\">email <i class=\"fa fa-envelope\"></i></a><br><br><a href=\"http://github.com/talalc\">GitHub <i class=\"fa fa-github\"></i></a><br><br><a href=\"http://linkedin.com/in/talalc\">LinkedIn <i class=\"fa fa-linkedin-square\"></i></a><br><br><a href=\"http://twitter.com/talalchoudry\">twitter <i class=\"fa fa-twitter-square\"></i></a>");
    $("figure").eq(1).html("<table align=\"center\"><tr><td>Languages<br><br>Ruby<br><br>JavaScript<br><br>C++<br><br>Java<br><br>HTML<br><br>CSS<br><br><br>Frameworks & Libraries<br><br>Ruby on Rails<br><br>Sinatra<br><br>jQuery<br><br>Backbone</td><td>Testing<br><br>RSpec<br><br>Capybara<br><br>Jasmine<br><br><br>Database<br><br>PostgreSQL<br><br><br>Version Control<br><br>Git<br><br>GitHub<br><br>Heroku<br><br><br>Management<br><br>Pivotal Tracker<br><br>TDD</td></tr></table>");
    $("figure").eq(2).html("Experience <i class=\"fa fa-building\" id=\"mail\"></i>");
    $("figure").eq(3).html("Education <i class=\"fa fa-graduation-cap\" id=\"mail\"></i>");
    $("figure").eq(4).html("Hobbies");
    $("figure").eq(5).html("Project 1<br><br>Comic Authority<br><br><img src=\"images/placeit1.png\"><br><br><a href=\"http://cab2.herokuapp.com\">heroku</a><br><br><a href=\"http://github.com/talalc/cab2\">github</a>");
    $("figure").eq(6).html("Project 2<br><br>lawyerD<br><br><img src=\"images/placeit2.png\"><br><br><a href=\"http://lawyerd.herokuapp.com\">heroku</a><br><br><a href=\"http://github.com/talalc/lawyerd\">github</a>");
    $("figure").eq(7).html("Team Project 3<br><br>drinkr<br><br><img src=\"images/placeit3.png\"><br><br><a href=\"http://drink-r.herokuapp.com\">heroku</a><br><br><a href=\"http://github.com/Oneill38/drinkr\">github</a>");
    $("figure").eq(8).html("Project 4<br><br>r3na<br><br><img src=\"images/placeit4.png\"><br><br><a href=\"http://r3na.herokuapp.com\">heroku</a><br><br><a href=\"http://github.com/talalc/rena\">github</a>");

    $("#options button").on('click', Profile.onNavButtonClick );
    $("body").on('keyup', Profile.onArrowPress );

    $( window ).resize( Profile.resizePage );

    var dock = $("#dock");
    // dock.html("<img width=\"" + $(window).width()/1.5 + "\" src=\"images/bluebg.png\">");
    dock.css('width', $(window).width()/1.5);
    dock.css('height', $(window).height()/10);
    var dockLeft = ($(window).width() - dock.width())/2;
    dock.css('left',dockLeft);

    dock.on('click', Profile.onDockClick);

    document.body.addEventListener('mousewheel',Profile.onScroll);

    $("figure").eq(currentPage).css('opacity', '1.0');
    $("figure").eq((currentPage+4)%panelCount).css('backface-visibility', 'hidden');
    $("figure").eq((currentPage+5)%panelCount).css('backface-visibility', 'hidden');

  },

  onNavButtonClick: function(event){
    var increment = parseInt( $(this).attr('data-increment') );
    theta += ( 360 / panelCount ) * increment * -1;
    $('#carousel').css('-webkit-transform','translateZ( -'+tz+'px ) rotateY(' + theta + 'deg)');
    $('#carousel').css('-moz-transform','translateZ( -'+tz+'px ) rotateY(' + theta + 'deg)');
    $('#carousel').css('-o-transform','translateZ( -'+tz+'px ) rotateY(' + theta + 'deg)');
    $('#carousel').css('transform','translateZ( -'+tz+'px ) rotateY(' + theta + 'deg)');
    currentPage = (-(theta/40)+panelCount)%panelCount;
    $("figure").css('backface-visibility', 'visible');
    $("figure").css('opacity', '0.2');
    $("figure").eq(currentPage).css('opacity', '1.0');
    $("figure").eq((currentPage+4)%panelCount).css('backface-visibility', 'hidden');
    $("figure").eq((currentPage+5)%panelCount).css('backface-visibility', 'hidden');
  },

  onArrowPress: function(event){
    if (event.which === 39 || event.keyCode === 39){
      var increment = 1;
    } else if (event.which === 37 || event.keyCode === 37) {
      var increment = -1;
    }
    theta += ( 360 / panelCount ) * increment * -1;
    $('#carousel').css('-webkit-transform','translateZ( -'+tz+'px ) rotateY(' + theta + 'deg)');
    $('#carousel').css('-moz-transform','translateZ( -'+tz+'px ) rotateY(' + theta + 'deg)');
    $('#carousel').css('-o-transform','translateZ( -'+tz+'px ) rotateY(' + theta + 'deg)');
    $('#carousel').css('transform','translateZ( -'+tz+'px ) rotateY(' + theta + 'deg)');
    currentPage = (-(theta/40)+panelCount)%panelCount;
    $("figure").css('backface-visibility', 'visible');
    $("figure").css('opacity', '0.2');
    $("figure").eq(currentPage).css('opacity', '1.0');
    $("figure").eq((currentPage+4)%panelCount).css('backface-visibility', 'hidden');
    $("figure").eq((currentPage+5)%panelCount).css('backface-visibility', 'hidden');
  },

  resizePage: function(event){
    theta = 0;
    tz = Math.round( ( $("#container").width() / 2 ) / Math.tan( Math.PI / panelCount ) )  + 150;
    $("#carousel").css('transform','translateZ( -'+tz+'px )');
    for (var i=0; i < panelCount; i++){
      var transformString = 'rotateY('+i*40+'deg ) translateZ(' + tz+'px )';
      $("figure").eq(i).css('transform',transformString);
    }

    currentPage = (-(theta/40)+panelCount)%panelCount;
    $("figure").css('backface-visibility', 'visible');
    $("figure").css('opacity', '0.2');
    $("figure").eq(currentPage).css('opacity', '1.0');
    $("figure").eq((currentPage+4)%panelCount).css('backface-visibility', 'hidden');
    $("figure").eq((currentPage+5)%panelCount).css('backface-visibility', 'hidden');

    var dock = $("#dock");
    // dock.html("<img width=\"" + $(window).width()/1.5 + "\" src=\"images/bluebg.png\">");
    dock.css('width', $(window).width()/1.5);
    dock.css('height', $(window).height()/10);
    var dockLeft = ($(window).width() - dock.width())/2;
    dock.css('left',dockLeft);

  },

  onDockClick: function(event){
    var choice = event.target.id;
    switch (choice){
      case "profile":
        page = 0;
        break;
      case "education":
        page = 3;
        break;
      case "experience":
        page = 2;
        break;
      case "project":
        page = 5;
        break;
      case "resume":
        page = 0;
        break;
      case "mail":
        page = 0;
        break;
      case "phone":
        page = 0;
        break;
      default:
        page = 0;
    }
    // if ( choice == "education"){
    //   var page = 3;
    // } else if (choice == "mail"){
    //   var page = 0;
    // }
    theta = ( 360 / panelCount ) * page * -1;
    $('#carousel').css('-webkit-transform','translateZ( -'+tz+'px ) rotateY(' + theta + 'deg)');
    $('#carousel').css('-moz-transform','translateZ( -'+tz+'px ) rotateY(' + theta + 'deg)');
    $('#carousel').css('-o-transform','translateZ( -'+tz+'px ) rotateY(' + theta + 'deg)');
    $('#carousel').css('transform','translateZ( -'+tz+'px ) rotateY(' + theta + 'deg)');
    currentPage = (-(theta/40)+panelCount)%panelCount;
    $("figure").css('backface-visibility', 'visible');
    $("figure").css('opacity', '0.2');
    $("figure").eq(currentPage).css('opacity', '1.0');
    $("figure").eq((currentPage+4)%panelCount).css('backface-visibility', 'hidden');
    $("figure").eq((currentPage+5)%panelCount).css('backface-visibility', 'hidden');
  },

  onScroll: function(event){
    if (event.wheelDelta > 0){
      var increment = -1;
    } else if (event.wheelDelta < 0 ) {
      var increment = 1;
    }
    theta += ( 360 / panelCount ) * increment * -1;
    $('#carousel').css('-webkit-transform','translateZ( -'+tz+'px ) rotateY(' + theta + 'deg)');
    $('#carousel').css('-moz-transform','translateZ( -'+tz+'px ) rotateY(' + theta + 'deg)');
    $('#carousel').css('-o-transform','translateZ( -'+tz+'px ) rotateY(' + theta + 'deg)');
    $('#carousel').css('transform','translateZ( -'+tz+'px ) rotateY(' + theta + 'deg)');
    currentPage = (-(theta/40)+panelCount)%panelCount;
    $("figure").css('backface-visibility', 'visible');
    $("figure").css('opacity', '0.2');
    $("figure").eq(currentPage).css('opacity', '1.0');
    $("figure").eq((currentPage+4)%panelCount).css('backface-visibility', 'hidden');
    $("figure").eq((currentPage+5)%panelCount).css('backface-visibility', 'hidden');
  }

}

$(document).ready(Profile.onReady);