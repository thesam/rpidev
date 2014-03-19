 
 $("div.controll").find("a").click(function(){
    if ($(this).hasClass("off")) {
      $(this).addClass("on");
      $(this).removeClass("off");
      //$(this).text("On");
    } else {
      $(this).addClass("off");
      $(this).removeClass("on");
      //$(this).text("Off");
    }
    $.post('/lampa');
  });

