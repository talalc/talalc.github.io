var Profile = {

  onReady: function(){
    panelCount = 9;
    tz = Math.round( ( $( window ).width() / 2 ) / Math.tan( Math.PI / panelCount ) );
    console.log(panelCount);
    console.log(tz);
    var container = $("<section>").addClass("container").appendTo("body");
    var containerLeft = ($(window).width() - $(container).width())/2;
    container.css('left', containerLeft);
    var carousel = $("<div>").attr('id','carousel').attr('width',$( window ).width()).css('transform','translateZ( -'+tz+'px )').appendTo(container);
    for (var i=0; i <= panelCount; i++){
      var transformString = 'rotateY('+i*40+'deg ) translateZ(' + tz+'px )';
      $("<figure>").text(i).css('transform',transformString).appendTo(carousel);
    }
    theta = 0;
    $("#options button").on('click', Profile.onNavButtonClick );
    $("body").on('keyup', Profile.onArrowPress );
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