function showHiddenStuff(){
  $(".introduction:eq(0)").animate({
    opacity:"1"
  }, 400);

  setTimeout(function(){
    $(".introduction").animate({
      opacity:"1"
    }, 500);
  }, 400)

}


$(document).on("click", "#moreinfo", function(){
  $(window).scrollTo($(window).height()-150, 500);
})

$(document).on("click", "#schedule", function(){
  $.scrollTo(".hm-page-schedule", 500);
})

function typeNewText(){

  $.scrollLock( true );
  var text = "A HACKATHON FOR THE"
  var text2 = " 21ST CENTURY"
  var i = 0;

  $(".hm-capture span").text("");

  var timer = setInterval(function(){

    if(i <= (text.length)){

      $(".hm-capture-text").text(text.substring(0, i))
    } else if((i - (text.length)) <= (text2.length)){
      $(".hm-capture .gold").text(text2.substring(0, (i - text.length)))

    } else {
      showHiddenStuff();
      $.scrollLock( false );
      clearInterval(timer);
    }
    i++;


  }, 65);

}

function introducePage(){

  typeNewText()

}

function getWeather(){

  function toC(x){
    return Math.round(x - 273.15)
  }

  function toF(x){
    return Math.round(x* 9/5 - 459.67)
  }

  $.get("/weather").done(function(o){

    if(o && JSON.parse(o)){

      $(".hm-cloud").removeClass("fa-cloud");
      var time = moment().tz("America/Los_Angeles");

      var weather = JSON.parse(o);





      if(weather.rain && weather.rain["3h"] > 0.5){
        $(".hm-cloud").addClass("fa-cloud");
      } else if(time.unix() < weather.sys.sunset && time.unix() > weather.sys.sunrise){
        $(".hm-cloud").addClass("fa-sun-o");
      } else {
        $(".hm-cloud").addClass("fa-moon-o");
      }
      $("#getWeather").text(" " + toF(weather.main.temp) + " F / " + toC(weather.main.temp) + " C")
    }

  })
}

setInterval(function(){
  getWeather();
}, 60000)


$(document).ready(function(){
  //clear

  getWeather();
 checkScroll(true);


});

var LastScroll = 0;
function scrollingDown(NowScroll){
  var ret = (LastScroll < NowScroll) ? true : false;
  LastScroll = NowScroll;
  return ret;
}

function isVis(item){
   return item.is(":visible");
}

function isHid(item){
   return item.is(":hidden");
}


$(window).resize(function(){
  checkScroll(false, true);
});

var hm_center_o = 1;
var hm_halt = true;

function checkScroll(init, resize){
  var scroll = $(window).scrollTop();
  var height = $(window).height();
  var width = $(window).width();

  if(init || resize){


    //set sizes
    $(".hm-page-intro").height($(window).height() )
  //  $("#moreinfo").css("display", "none");
  }

  if(height > 800 && width > 860){
    $(".hm-page-center").css("position", "fixed")
  } else {
    $(".hm-page-center").css("position", "relative")
  }


  var page_center_height = $(".hm-page-intro").height();
  var page_intro_offset = $(".hm-page-intro").offset().top;
  var page_info_offset = $(".hm-page-info").offset().top;
  var hm_page_sched = $(".hm-page-schedule").offset().top;
  var page_info_hof = page_info_offset + $(".hm-page-info .center").height();

  if(scroll === 0){
    $(".hm-page-center").stop();
    if(init && width > 860){
      $(".introduction").css("opacity", "0");
      introducePage();
    }
    //console.log(scroll);
    if(!isVis($("#moreinfo"))){

      $("#moreinfo").fadeIn();


    }





  }

  if(width > 860){
      $(".hm-page-center").css("opacity", hm_center_o/2);
  } else {
    $(".hm-page-center").css("opacity", "1");
  }

  hm_center_o = 1-((scroll)/(page_info_offset/(height/50)));
  if(hm_center_o < 0){
    hm_center_o = 0;
    if(isVis($("#moreinfo"))){

      $("#moreinfo").fadeOut();

      if(hm_halt){
        hm_halt = false;
        $(".header").animate({
          "top":"0px"
        }, 500, function(){
          hm_halt = true;
        });
      }
    }


  } else if(hm_center_o > 1){


    hm_center_o = 1;
    if(hm_center_o >= 1){
      hm_center_o = 1;

    }
  } else {

    if(hm_halt && $(".header").css("top") !== "-105px"){
      hm_halt = false;
      $(".header").animate({
        "top":"-105px"
      }, 500, function(){
        hm_halt = true;
      });
    }
  }
  if(scroll >= 0 && (scroll+height) < page_info_offset){



    if(init && width > 860){
      $(".introduction").css("opacity", "0");
      introducePage();
    }
  }


    if(scroll > 0 && (scroll+height) > page_info_offset) {

      if(init){
        $(".hm-page-center").css("opacity", "0")
        $("#moreinfo").css("display", "none");
        $("#schedule").css("display", "block");

        $(".header").animate({
          "top":"0px"
        }, 500, function(){
          hm_halt = true;
        });
      }




    }



  if(scroll > 0 && ((scroll+height)) > ($(".hm-page-schedule").offset().top + 100)) {
    $("#schedule").stop();
    $("#schedule").css("display", "none");
  } else if(scroll > 0 && (scroll+height) > page_info_hof) {
    if(!isVis($("#schedule"))){
      $("#schedule").fadeIn();
    };
  } else   {
    if(isVis($("#schedule"))){
      $("#schedule").css("display", "none");
    };
  }
  if(scroll === 0){
    $(".hm-page-center").css("opacity", "1");
  }

}

$(window).scroll(function(){
   checkScroll();
});
