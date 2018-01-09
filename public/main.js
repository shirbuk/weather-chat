var cities = [];
comments = [];
var idNum = 0;

var addToArray = function (data) {
    cities.push(data);
};

var fetch = function (cityName) {
    $('.cityInput').val('');
    $.ajax({
        method: "GET",
        dataType: "json",
        url: "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=metric&appid=d703871f861842b79c60988ccf3b17ec",
        success: function (data) {
            console.log(data);
            var cityInfo = {
                name: data.name,
                celsous: data.main.temp, 
            }
            addToArray(cityInfo);
            addToHTML();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
        }
    });
}

var addToHTML = function () {
    $('.result').empty();
    var source = $('#weatherchat-template').html();
    var template = Handlebars.compile(source);
    for (var i = 0; i < cities.length; i++) {
        console.log(cities[i]);
        var newHTML = template(cities[i]);
        $('.result').append(newHTML);
    }
};

$(".getTemp").on('click', function () {
    var cityName = $('.cityInput').val()
    fetch(cityName);
});


$('.result').on('click', '.remove', function () {
    var index = $(this).closest('.card').index();
    // console.log(index);
    cities.splice(index, 1);
    addToHTML();
});

$('.result').on('click', '.commentbtn', function () {
    // console.log("hi");
var comText = $('.comment-text').val();
$(this).closest('.result').find('.show-comments').append(comText + '<br>');
for (var i = 0; i < cities.length; i++){
comments.push({text: comText, id: idNum++});
}
$('.comment-text').val(""); 
});