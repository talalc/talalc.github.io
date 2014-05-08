var Profile = {

  onReady: function(){
    panelCount = 9;
    console.log(panelCount);
    theta = 0;
    tz = Math.round( ( $( window ).width() / 2 ) / Math.tan( Math.PI / panelCount ) );
    console.log(tz);
    var container = $("<section>").addClass("container").appendTo("body");
    var containerLeft = ($(window).width() - $(container).width())/2;
    console.log(containerLeft);
    container.css('left', containerLeft);
    var carousel = $("<div>").attr('id','carousel').attr('width',$( window ).width()).css('transform','translateZ( -'+tz+'px )').appendTo(container);
    for (var i=0; i <= panelCount; i++){
      var transformString = 'rotateY('+i*40+'deg ) translateZ(' + tz+'px )';
      $("<figure>").css('transform',transformString).appendTo(carousel);
    }
    $("#options button").on('click', Profile.onNavButtonClick );
    $("body").on('keyup', Profile.onArrowPress );
    $("figure").eq(0).html("Talal Choudhury<br><br>med student turned developer<br><br><br>email<br><br>GitHub<br><br>LinkedIn<br><br>Twitter");
    $("figure").eq(1).html("Talal Choudhury<br><br><table align=\"center\"><tr><td>Languages<br><br>Ruby<br><br>JavaScript<br><br>C++<br><br>Java<br><br>HTML<br><br>CSS<br><br><br>Frameworks & Libraries<br><br>Ruby on Rails<br><br>Sinatra<br><br>jQuery<br><br>Backbone</td><td>Testing<br><br>RSpec<br><br>Capybara<br><br>Jasmine<br><br><br>Database<br><br>PostgreSQL<br><br><br>Version Control<br><br>Git<br><br>GitHub<br><br>Heroku<br><br><br>Management<br><br>Pivotal Tracker<br><br>TDD</td></tr></table>");
    $("figure").eq(2).html("Talal Choudhury<br><br>Experience");
    $("figure").eq(3).html("Talal Choudhury<br><br>Education");
    $("figure").eq(4).html("Talal Choudhury<br><br>Hobbies");
    $("figure").eq(5).html("Talal Choudhury<br><br>Project1<br><br><img src=\"images/placeit1.png\">");
    $("figure").eq(6).html("Talal Choudhury<br><br>Project2<br><br><img src=\"images/placeit2.png\">");
    $("figure").eq(7).html("Talal Choudhury<br><br>Project3<br><br><img src=\"images/placeit3.png\">");
    $("figure").eq(8).html("Talal Choudhury<br><br>Project4");

  },

  onNavButtonClick: function(event){
    var increment = parseInt( $(this).attr('data-increment') );
    theta += ( 360 / panelCount ) * increment * -1;
    $('#carousel').css('-webkit-transform','translateZ( -'+tz+'px ) rotateY(' + theta + 'deg)');
    $('#carousel').css('-moz-transform','translateZ( -'+tz+'px ) rotateY(' + theta + 'deg)');
    $('#carousel').css('-o-transform','translateZ( -'+tz+'px ) rotateY(' + theta + 'deg)');
    $('#carousel').css('transform','translateZ( -'+tz+'px ) rotateY(' + theta + 'deg)');
  },

  onArrowPress: function(event){
    if (event.which === 39 || event.keyCode === 39){
      var increment = -1;
    } else if (event.which === 37 || event.keyCode === 37) {
      var increment = 1;
    }
    theta += ( 360 / panelCount ) * increment * -1;
    $('#carousel').css('-webkit-transform','translateZ( -'+tz+'px ) rotateY(' + theta + 'deg)');
    $('#carousel').css('-moz-transform','translateZ( -'+tz+'px ) rotateY(' + theta + 'deg)');
    $('#carousel').css('-o-transform','translateZ( -'+tz+'px ) rotateY(' + theta + 'deg)');
    $('#carousel').css('transform','translateZ( -'+tz+'px ) rotateY(' + theta + 'deg)');
  }

}

$(document).ready(Profile.onReady);