var Profile = {

  onReady: function(){
    $.mobile.loading().hide();
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
    Profile.resizePage(theta);

    setInterval(function(){
      Profile.rotateCircle();
    }, 1000);

    $("#options button").on('click', Profile.onNavButtonClick );

    $(window).on('keyup', Profile.onArrowPress );

    window.addEventListener('mousewheel',Profile.onScroll);

    $("#dock").on('click', Profile.onDockClick);

    $(".dockicon").hover(Profile.onhoverIcon, Profile.offhoverIcon);

    $( window ).on( "swiperight", Profile.onSwipeRight );
    $( window ).on( "swipeleft", Profile.onSwipeLeft );

    $( window ).resize( Profile.resizePage(theta) );

  },

  resizePage: function(theta){
    tz = Math.round( ( $("#container").width() / 2 ) / Math.tan( Math.PI / panelCount ) )  + 150;
    $("#carousel").css('transform','translateZ( -'+tz+'px )');
    for (var i=0; i < panelCount; i++){
      var transformString = 'rotateY('+i*40+'deg ) translateZ(' + tz+'px )';
      $("figure").eq(i).css('transform',transformString);
    }

    Profile.rotateCarousel(theta);

  },

  onNavButtonClick: function(event){
    var increment = parseInt( $(this).attr('data-increment') );
    theta += ( 360 / panelCount ) * increment * -1;
    Profile.rotateCarousel(theta);
  },

  onArrowPress: function(event){
    if (event.which === 39 || event.keyCode === 39){
      var increment = 1;
    } else if (event.which === 37 || event.keyCode === 37) {
      var increment = -1;
    }
    theta += ( 360 / panelCount ) * increment * -1;
    Profile.rotateCarousel(theta);
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
    Profile.rotateCarousel(theta);
  },

  onScroll: function(event){
    if (event.wheelDelta > 0){
      var increment = -1;
    } else if (event.wheelDelta < 0 ) {
      var increment = 1;
    }
    theta += ( 360 / panelCount ) * increment * -1;
    Profile.rotateCarousel(theta);
  },

  onSwipeRight: function(event){
    increment = -1;
    theta += ( 360 / panelCount ) * increment * -1;
    Profile.rotateCarousel(theta);
  },

  onSwipeLeft: function(event){
    increment = 1;
    theta += ( 360 / panelCount ) * increment * -1;
    Profile.rotateCarousel(theta);
  },

  rotateCarousel: function(theta){
    $('#carousel').css('-webkit-transform','translateZ( -'+tz+'px ) rotateY(' + theta + 'deg)');
    $('#carousel').css('-moz-transform','translateZ( -'+tz+'px ) rotateY(' + theta + 'deg)');
    $('#carousel').css('-o-transform','translateZ( -'+tz+'px ) rotateY(' + theta + 'deg)');
    $('#carousel').css('transform','translateZ( -'+tz+'px ) rotateY(' + theta + 'deg)');
    currentPage = (-(theta/40)+panelCount)%panelCount;
    $("figure").css('opacity', '0.2');
    $("figure").css({height: '75%', width: '75%', top: '15%'});
    $("figure").eq(currentPage).css('opacity', '1.0');
    $("figure").eq(currentPage).css({height: '100%', width: '100%', top: '0%'});
    $("figure").eq((currentPage+4)%panelCount).css('opacity', '0.0');
    $("figure").eq((currentPage+5)%panelCount).css('opacity', '0.0');
  },

  onhoverIcon: function(event){
    $(event.currentTarget.children[0]).css('display','inherit');
  },

  offhoverIcon: function(event){
    $(event.currentTarget.children[0]).css('display','none');
  },

  rotateCircle: function(){
    var random = Math.ceil(Math.random() * 360);
    var randomB = Math.ceil(Math.random() * 10);
    $("#circle").css('transform','rotateZ('+random+'deg)');
    $("#circle").css('padding',randomB);
    $("#circle").css('border', randomB+ 'px solid #53b1c3');
    // $("#circle").css({height: random +'px', width: random+'px'});
    for (var i=0; i < $(".circleText").length; i++){
      var randomT = Math.ceil(Math.random() * 100);
      $(".circleText").eq(i).css('transform','translateX('+randomT+'px) translateY('+randomT+'px) rotateZ('+(random*-1)+'deg)');
    }
  }

}

$(document).ready(Profile.onReady);