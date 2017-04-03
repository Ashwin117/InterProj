var $j = jQuery.noConflict();
var axios = axios;

(function($) {
    getDataFromServer()
    .then((res) => {
        var data = res.data || {};
        var dateMap = new Map();
        var eventDates = constructEventDates(data.events);
        $j(".datepicker").datepicker({
            beforeShowDay: function(date) {
                $j(".contents").empty();
                for (var i = 0; i < eventDates.length; i++) {
                    if (new Date(eventDates[i]).toString() == date.toString()) {
                        return [true,'eventDates'];
                    }
                }
                return [true];
            },
            onSelect: function (date) {
                if (dateMap.has(date)) {
                    $j(".contents").append(constructContents(date, dateMap.get(date)));
                }
            }
        });

        function constructEventDates (events) {
            return events.map((value) => {
                var month = (parseInt(value['month']) < 10) ? '0'+value['month'] : value['month'];
                var day = (parseInt(value['day']) < 10) ? '0'+value['day'] : value['day'];
                var date = month+"/"+day+"/"+value['year'];
                dateMap.set(date, value);
                return date;
            });
        }
    });
})();

function constructContents(date, object) {
    var divString = "";
    var keys = Object.keys(object);

    for (var k in keys) {
        switch(keys[k]) {
            case('invited_count'): {
                divString += "<div> Invited Count: " + object[keys[k]] + "</div>";
                break;
            }
            case('cancelled'): {
                divString += "<div class='cancelled'> CANCELLED </div>";
                break;
            }
            default: {
                divString += "<div>" + keys[k][0].toUpperCase()+keys[k].substring(1, keys[k].length) + 
                ": " + object[keys[k]] + "</div>";
            }
        }
    }
    return divString;
}

function getDataFromServer () {
    return axios({
        url: 'http://localhost:8000',
        method: 'get',
        headers: {'Content-type': 'application/json', 'Accept': 'application/json'}
    });
}