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

    $("#navigation button").on('click', Profile.onNavButtonClick );

    $(window).on('keyup', Profile.onArrowPress );

    window.addEventListener('wheel',Profile.onScroll);

    $("#dock").on('click', Profile.onDockClick);

    $(".dockicon").hover(Profile.onhoverIcon, Profile.offhoverIcon);

    $( window ).on( "swiperight", Profile.onSwipeRight );
    $( window ).on( "swipeleft", Profile.onSwipeLeft );

    $( window ).resize( function(event){
      Profile.resizePage(theta);
    });

    $("#resumelink").click(function(event){
      window.open('http://talalc.github.io/TCResume.pdf', '_blank');
    });

    $(".expentry ul").slideUp();

    $(".expentry").hover(function(event){
      $(event.currentTarget.lastElementChild).slideDown();
    }, function(event){
      $(event.currentTarget.lastElementChild).slideUp();
    });

  },

  resizePage: function(theta){
    console.log("resized");

    tz = Math.round( ( $("#container").width() / 2 ) / Math.tan( Math.PI / panelCount ) )  + 150;
    $("#carousel").css('-webkit-transform','translateZ( -'+tz+'px )');
    $("#carousel").css('-moz-transform','translateZ( -'+tz+'px )');
    $("#carousel").css('-o-transform','translateZ( -'+tz+'px )');
    $("#carousel").css('transform','translateZ( -'+tz+'px )');
    for (var i=0; i < panelCount; i++){
      var transformString = 'rotateY('+i*40+'deg ) translateZ(' + tz+'px )';
      $("figure").eq(i).css('-webkit-transform',transformString);
      $("figure").eq(i).css('-moz-transform',transformString);
      $("figure").eq(i).css('-o-transform',transformString);
      $("figure").eq(i).css('transform',transformString);
    }

    Profile.rotateCarousel(theta);

    circleWidth = $("#circle").width();
    $("#circle").css('height', circleWidth);
    $("#circle").css('top', ($(window).height() - circleWidth)/2);
    $("#circle2").css({height: circleWidth/1.5, width: circleWidth/1.5, margin: circleWidth/(Math.PI*2) });
    $("#citadel").attr('height', circleWidth);
    $("#citadel").attr('width', circleWidth);
    // $("#citadel").attr('left', 'circleWidth');
  },

  onNavButtonClick: function(event){
    var increment = parseInt( $(this).attr('data-increment') );
    theta += ( 360 / panelCount ) * increment * -1;
    Profile.rotateCarousel(theta);
    Profile.rotateCircle(theta);
  },

  onArrowPress: function(event){
    if (event.which === 39 || event.keyCode === 39){
      var increment = 1;
    } else if (event.which === 37 || event.keyCode === 37) {
      var increment = -1;
    }
    theta += ( 360 / panelCount ) * increment * -1;
    Profile.rotateCarousel(theta);
    Profile.rotateCircle(theta);
  },


  onDockClick: function(event){
    var choice = event.target.id;
    switch (choice){
      case "profile":
        page = 0;
        break;
      case "skills":
        page = 1;
        break;
      case "education":
        page = 3;
        break;
      case "experience":
        page = 2;
        break;
      case "hobbies":
        page = 4;
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
    Profile.rotateCircle(theta);
  },

  onScroll: function(event){
    event.preventDefault();
    if (event.deltaY > 0){
      var increment = 1;
    } else if (event.deltaY < 0 ) {
      var increment = -1;
    }
    theta += ( 360 / panelCount ) * increment * -1;
    Profile.rotateCarousel(theta);
    Profile.rotateCircle(theta);
  },

  onSwipeRight: function(event){
    increment = -1;
    theta += ( 360 / panelCount ) * increment * -1;
    Profile.rotateCarousel(theta);
    Profile.rotateCircle(theta);
  },

  onSwipeLeft: function(event){
    increment = 1;
    theta += ( 360 / panelCount ) * increment * -1;
    Profile.rotateCarousel(theta);
    Profile.rotateCircle(theta);
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

  rotateCircle: function(theta){
    // var random = Math.ceil(Math.random() * 360);
    $("#circle").css('-webkit-transform','rotateZ('+theta+'deg)');
    $("#circle").css('-moz-transform','rotateZ('+theta+'deg)');
    $("#circle").css('-o-transform','rotateZ('+theta+'deg)');
    $("#circle").css('transform','rotateZ('+theta+'deg)');
    $("#circle2").css('-webkit-transform','rotateZ('+theta*-2+'deg)');
    $("#circle2").css('-moz-transform','rotateZ('+theta*-2+'deg)');
    $("#circle2").css('-o-transform','rotateZ('+theta*-2+'deg)');
    $("#circle2").css('transform','rotateZ('+theta*-2+'deg)');
    // for (var i=0; i < $(".circleText").length; i++){
    //   var randomT = Math.ceil(Math.random() * 100);
    //   $(".circleText").eq(i).css('transform','translateX('+randomT+'px) translateY('+randomT+'px) rotateZ('+(theta*-1)+'deg)');
    // }
  }

}

$(document).ready(Profile.onReady);