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

    $("figure").eq(0).html("med student turned developer<br><br><br>email<br><br>GitHub<br><br>LinkedIn<br><br>Twitter");
    $("figure").eq(1).html("<table align=\"center\"><tr><td>Languages<br><br>Ruby<br><br>JavaScript<br><br>C++<br><br>Java<br><br>HTML<br><br>CSS<br><br><br>Frameworks & Libraries<br><br>Ruby on Rails<br><br>Sinatra<br><br>jQuery<br><br>Backbone</td><td>Testing<br><br>RSpec<br><br>Capybara<br><br>Jasmine<br><br><br>Database<br><br>PostgreSQL<br><br><br>Version Control<br><br>Git<br><br>GitHub<br><br>Heroku<br><br><br>Management<br><br>Pivotal Tracker<br><br>TDD</td></tr></table>");
    $("figure").eq(2).html("Experience");
    $("figure").eq(3).html("Education");
    $("figure").eq(4).html("Hobbies");
    $("figure").eq(5).html("Project1<br><br><img src=\"images/placeit1.png\">");
    $("figure").eq(6).html("Project2<br><br><img src=\"images/placeit2.png\">");
    $("figure").eq(7).html("Project3<br><br><img src=\"images/placeit3.png\">");
    $("figure").eq(8).html("Project4");

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
      case "education":
        page = 3;
        break;
      case "mail":
        page = 0;
        break;
      case "twitter":
        page = 0;
        break;
      case "experience":
        page = 2;
        break;
      case "linkedin":
        page = 0;
        break;
      case "github":
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