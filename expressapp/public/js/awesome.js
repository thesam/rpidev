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
                var state = 'on';
                if (lamp.state == 0) {
                    state = 'off';
                }
                control = '<div id=' + id + ' class="controll" ctrlType='+lamp.type+'> ' +
                    '<div class="button">' +
                    '<a href="#fakelink" class="btn btn-block btn-lg btn-primary '+state+'">' + lamp.name + '</a>' +
                    '</div>' +
                    '</div>';
            }
            if (lamp.type === 'dimmer') {
                control =
                    '<div id=' + id + ' class="controll" onclick="setCurrentDimmerLevel(this)" currentDimmerLevel="0" ctrlType='+lamp.type+'>' +
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
			var ctrlState;
			var test = getCurrentDimmerLevel(this);

            var test = $( "div.ui-slider-range" ).find(this);
            if (btn.hasClass("off")) {
                btn.addClass("on");
                btn.removeClass("off");
                //btn.text("On");
            } else {
                btn.addClass("off");
                btn.removeClass("on");
                //btn.text("Off");
            }
			ctrlState = getCtrlState(this);

            console.log("Setting new state for lamp: " + idForControll+ " to "+ ctrlState);
            $.ajax({
                url: '/lampa/' + idForControll+'/'+ctrlState,
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

function setCurrentDimmerLevel(selectedDiv) {
	var dimmerLevel = $(selectedDiv).find("div.ui-slider-range.ui-widget-header.ui-corner-all.ui-slider-range-min").attr("style");
	var regex = /width:\s(\d+)%/g;
	var match = regex.exec(dimmerLevel); // get value from css
	var currentDimmerLevel = match[1];
	$(selectedDiv).attr("currentDimmerLevel", currentDimmerLevel); // set the attribute "currentDimmerLevel" to the new value
	// console.log("currentDimmerLevel = "+ currentDimmerLevel);
}

function getCurrentDimmerLevel(object) {
	return $(object).attr('currentDimmerLevel');
}

function isDimmer(object) {
	if($(object).attr('ctrlType') == "dimmer"){
		return true;
	}
	return false;
}

function getCtrlState(object) {
	var ctrlState;
	if(isDimmer(object)){
		ctrlState = getCurrentDimmerLevel(object);
	}else{
		var btn = $(object).find('a');
		if (btn.hasClass("on")) {
			ctrlState = 1; // lamp is on
		} else {
			ctrlState = 0; // lamp is off
		}
	}
	return ctrlState;
}
