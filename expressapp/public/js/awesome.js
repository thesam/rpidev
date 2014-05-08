$(document).ready(function () {
    $.get('/lampa', function (lamps) {
        $('#loading').remove();
        console.log(lamps);
        lamps.forEach(function (lamp) {
          var id = lamp._id;
            if (lamp.type == 'simple') {
              var control = '<div id='+id+' class="controll"> ' +
                  '<div class="button">' +
                  '<a href="#fakelink" class="btn btn-block btn-lg btn-primary on">' + lamp.name + '</a>' +
                  '</div>' +
                  '</div>';
            }
            if (lamp.type === 'dimmer') {
                control =
                  '<div id='+id+' class="controll">' +
                    '<p>' + lamp.name + '</p>' +
                    '<div id="slider" class="ui-slider">' +
                      '<div class="ui-slider-segment"></div>' +
                      '<div class="ui-slider-segment"></div>' +
                      '<div class="ui-slider-segment"></div>' +
                    '</div>' +
                  '</div>';
            }
            $('div.dynamiccontrols').append(control);
        });
        $("div.controll").click(function (event) {
            var idForControll = $(this).attr('id');
            var btn = $(this).find('a');
            if (btn.hasClass("off")) {
                btn.addClass("on");
                btn.removeClass("off");
                //btn.text("On");
            } else {
                btn.addClass("off");
                btn.removeClass("on");
                //btn.text("Off");
            }

            $.post('/lampa/'+idForControll);
        });
    });
});
