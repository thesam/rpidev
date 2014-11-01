function updateSliders() {
    // jQuery UI Sliders
    var $slider = $("#slider");
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
                    '<div id="slider" class="ui-slider">' +
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
            if (btn.hasClass("off")) {
                btn.addClass("on");
                btn.removeClass("off");
                //btn.text("On");
            } else {
                btn.addClass("off");
                btn.removeClass("on");
                //btn.text("Off");
            }

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
