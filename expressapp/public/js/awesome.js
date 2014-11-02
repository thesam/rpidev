function updateSliders() {
    // jQuery UI Sliders
    var $slider = $(".slider");
    if ($slider.length) {
        $slider.slider({
            min: 1,
            max: 5,
            value: 2,
            orientation: "horizontal",
            range: "min"
        }).addSliderSegments($slider.slider("option").max);
    }

    var $verticalSlider = $("#vertical-slider");
    if ($verticalSlider.length) {
        $verticalSlider.slider({
            min: 1,
            max: 5,
            value: 3,
            orientation: "vertical",
            range: "min"
        }).addSliderSegments($verticalSlider.slider("option").max, "vertical");
    }
};


$(document).ready(function () {
    $.get('/lampa', function (lamps) {
        $('#loading').remove();

        console.log(lamps);
        lamps.forEach(function (lamp) {
            console.log(lamp.name);
            var id = lamp._id;
            var control;
            if (lamp.type == 'simple') {
                control = '<div id=' + id + ' class="controll"> ' +
                    '<div class="button">' +
                    '<a href="#fakelink" class="btn btn-block btn-lg btn-primary on">' + lamp.name + '</a>' +
                    '</div>' +
                    '</div>';
            }
            if (lamp.type === 'dimmer') {
                control =
                    '<div id=' + id + ' class="controll">' +
                    '<p>' + lamp.name + '</p>' +
                    '<div class="slider" class="ui-slider">' +
                    '<div class="ui-slider-segment"></div>' +
                    '<div class="ui-slider-segment"></div>' +
                    '<div class="ui-slider-segment"></div>' +
                    '</div>' +
                    '</div>';
            }
            $('div.dynamiccontrols').append(control);
        });
        updateSliders();
        $("div.controll").click(function (event) {
            var idForControll = $(this).attr('id');
            var btn = $(this).find('a');

            var test = $( "div.ui-slider-range" ).find(this);
            // vi måste ta ut vilket värde dimmern är satt på skicka det till db
            //var test2 = $(#idForControll).children("div.ui-slider-range").attr("style");
            //console.log(test);

            var light_mode;
            if (btn.hasClass("off")) {
                btn.addClass("on");
                btn.removeClass("off");
                light_mode = "on";
                //btn.text("On");
            } else {
                btn.addClass("off");
                btn.removeClass("on");
                light_mode = "off";
                //btn.text("Off");
            }

            console.log("Setting new state for lamp: " + idForControll+ " to "+ light_mode);
            $.ajax({
                url: '/lampa/' + idForControll,
                type: 'PUT',
                success: function (result) {
                    // Do something with the result
                }
            });
        });
    });
});

function addLamp(ctrl) {
  console.log("*** adding a new lamp to database ***");
  console.log(ctrl.name + ctrl.type + ctrl.brand);

  $.post('/lampa', ctrl, function (res){
    console.log("response = "+res);
  });
};
