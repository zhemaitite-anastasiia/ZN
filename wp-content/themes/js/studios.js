var myMap;
var apps;
var truelon;
var truelat;
var ylon;
var ylat;
var plon;
var plat;


jQuery(document).ready(function () {

    /*    Блок Карта Slidedown*/

    jQuery(".studios__slide").bind('click', function () {
        if (jQuery("div").is(".up")) {
            jQuery(".chosen-studio").fadeOut(50);
            jQuery(".studios-info_map").delay(70).animate({"height": "105px", "margin-top": "470px"}, 220)
                .animate({"height": "560px", "margin-top": "0px"}, "250", function () {
                    jQuery(".studios-info").delay(50).fadeIn("slow");
                    jQuery(".studios-salon_small").delay(170).fadeIn("slow");
                });
            jQuery(this).removeClass("up").addClass("down");
        } else {
            jQuery(".studios-info").fadeOut(50);
            jQuery(".studios-salon_small").fadeOut(50);
            jQuery(".studios-info_map").delay(70).animate({"height": "105px", "margin-top": "470px"}, 220)
                .animate({"height": "140px", "margin-top": "450px"}, "250", function () {
                    jQuery(".chosen-studio").fadeIn(300);
                });
            jQuery(this).addClass("up").removeClass("down");
        }
    });

    var сhosenCityText,

        cityMass = ["Новосибирск", "Москва", "Санкт-Петербург", "Сочи", "Томск", "Норильск", "Барнаул",
            "Старый Оскол", "Владивосток", "Севастополь", "Казань", "Липецк", "Ялта", "Воронеж"],
        studiosList = document.querySelector(".studios-list");


    jQuery(".city__item").bind("click", function () {
        сhosenCityText = jQuery(this).text();
        var currentCity = jQuery(".current-city__item");

        if (!(currentCity.text())) {
            currentCity.append(сhosenCityText).addClass("city_animation");

        } else if (!(currentCity.html() == сhosenCityText)) {
            currentCity.empty().append(сhosenCityText).removeClass("city_animation");
            setTimeout(function () {
                currentCity.addClass("city_animation");
            }, 1);
        } else {

        }
    });


    navigator.geolocation.getCurrentPosition(  //Самое точное позиционирование
        function (position) {
            console.log('Позиция пользователя: ' +
                position.coords.latitude + ", " + position.coords.longitude);

        //jQuery("#plat").html(position.coords.latitude);
         //   jQuery("#plon").html(position.coords.longitude);
            truelat = position.coords.latitude;
            truelon = position.coords.longitude;
            jQuery("#plat").html(truelat);
            jQuery("#plon").html(truelon);

            jQuery(".studios-list").empty();
            defineCity();
        }
    );

    jQuery(".city__item").bind("click", function () {
        var choosencity = jQuery(this).text();

        jQuery.cookie("city", choosencity , { expires: 7, path: '/'});
        jQuery(".studios-list").empty();
        defineCity();
        console.log("COOKIE:" + jQuery.cookie("city"));
    });

    function defineCity() {
        if (typeof(apps) != "undefined") {
          //  console.log('$$DefineCity');
            var xhr = new XMLHttpRequest();
            var cookiecity2 = jQuery.cookie("city");
            if (typeof(cookiecity2) == "undefined") {
                var currentCityItem = jQuery(".current-city__item").text().trim();
            } else {
                var currentCityItem = cookiecity2
            }

            var li = apps.length;
            var lat1 = jQuery("#plat0").text().trim();
            var lon1 = jQuery("#plon0").text().trim();
            var h = 0;
            long = 1000;
            var ind = -1;
            var xlat = plat;
            var xlon = plon;
            if (ylat) {
                xlat = ylat;
                xlon = ylon;
            }
            if (truelat) {
                xlat = truelat;
                xlon = truelon;
            }

  //          currentCityItem="Москва";
            for (var i = 0; i < li; i++) {
 //                console.log(apps);
 // console.log("i:"+i);
                if (currentCityItem === apps[i].city.name) {
                    h++;
                    var x1 = xlat * Math.PI / 180;
                    var y1 = xlon * Math.PI / 180;
                    var x2 = apps[i].lat * Math.PI / 180;
                    var y2 = apps[i].lon * Math.PI / 180;
                    var r0 = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
                    var r1 = Math.asin(Math.sqrt((Math.sin((x2 - x1) / 2)) * (Math.sin((x2 - x1) / 2)) + Math.cos(x2) * Math.cos(x1) * (Math.sin((y2 - y1) / 2)) * (Math.sin((y2 - y1) / 2))));
                    if (r1 < long) {
                        long = r1;
                        ind = i;
                    }
                    setInterval(insertBlock(i, apps), 5000);
                }
             }


     //       var m = parseFloat(apps[ind].lat);
// console.log('index'+ind);
            if (ind>0)
            myMap.panTo(
                // Координаты нового центра карты
                [parseFloat(apps[ind].lat), parseFloat(apps[ind].lon)], {
                    /* Опции перемещения:
                       разрешить уменьшать и затем увеличивать зум
                       карты при перемещении между точками
                    */
                    flying: true
                }
            );

            updateStudioInfo(ind);


            jQuery(".search-studios__digit").html(h)
                .spincrement({
                    duration: 950
                });
        }
    }

    function updateStudioInfo(number) {

        if (number >= 0) {
            //https://w12204.yclients.com
            var yclient =12204;
            if  (apps[number].yclient >0 ) yclient =  apps[number].yclient;
            jQuery.getScript("//w"+yclient+".yclients.com/widgetJS") .done(function( script, textStatus ) {
                console.log( textStatus );
            })
                .fail(function( jqxhr, settings, exception ) {
                    $( "div.log" ).text( "Triggered ajaxError handler." );
                });
            jQuery(".ms_booking").attr('data-url','https://w'+yclient+'.yclients.com');
            jQuery(".studios-info__title_name").text(apps[number].title);
            jQuery(".chosen-studio__title_name").text(apps[number].title);
            jQuery(".current__city-container").text(apps[number].city.name);
            jQuery("#saddress").text(apps[number].city.name + ", " + apps[number].address);
            jQuery("#sphone").text(apps[number].phone);
            jQuery(".studios-salon_small").html(apps[number].imgpath);
            jQuery(".studios-info__text_chosen").html(apps[number].hint + "<br />" + apps[number].address + ", " + apps[number].title + "<br />" + apps[number].phone);


        }

    }

    function insertBlock(i, apps) {

        if (i < apps.length) {
            var blockWrapper = document.createElement("div");
            studiosList.appendChild(blockWrapper);
            blockWrapper.classList.add("studios-item__wrapper");

            var block = document.createElement("div");
            blockWrapper.appendChild(block);
            block.classList.add("studios-item");

            var block_link = document.createElement("a");
            block.appendChild(block_link);
            block_link.classList.add("studios-item__link");
            block_link.href = apps[i].link;


            var blockInfoblock = block.appendChild(document.createElement("div"));
            blockInfoblock.classList.add("studios-item__info-block");
            blockInfoblock.classList.add("clearfix");

            /* var block_distance = blockInfoblock.appendChild(document.createElement("div"));
             block_distance.classList.add("studios-item__distance");
             block_distance.innerHTML = apps[i].distance;*/

            var block_name = blockInfoblock.appendChild(document.createElement("div"));
            block_name.classList.add("studios-item__name");
            block_name.innerHTML = apps[i].title;

            var block_type = blockInfoblock.appendChild(document.createElement("div"));
            block_type.classList.add("studios-item__type");
            block_type.innerHTML = apps[i].type;

            var block_time = blockInfoblock.appendChild(document.createElement("span"));
            block_time.classList.add("studios-item__time");
            block_time.innerHTML = apps[i].time;

            var block_phone = blockInfoblock.appendChild(document.createElement("span"));
            block_phone.classList.add("studios-item__phone");
            block_phone.innerHTML = apps[i].phone;

            var block_address = blockInfoblock.appendChild(document.createElement("address"));
            block_address.classList.add("studios-item__address");
            block_address.innerHTML = apps[i].address;

            var block_btn = blockInfoblock.appendChild(document.createElement("a"));
            block_btn.classList.add("studios-item__btn");
            block_btn.innerHTML = "Подробнее";
            block_btn.href = apps[i].link;

            // var block_description = block.appendChild(document.createElement("p"));
            // block_description.classList.add("studios-item__description");
            // block_description.innerHTML = apps[i].description;

            var block_details = block.appendChild(document.createElement("div"));
            block_details.classList.add("studios-item__details");


        }

        jQuery(".studios-item__wrapper").each(function (index) {
            jQuery(this).delay(137 * index).show()
                .css({"display": "inline-block", "vertical-align": "top"})
                .animate({'opacity': 1}, 400);
            jQuery(".studios-item__image").animate({width: 350}, 350).animate({height: 253}, 400);
        });

        showDescription();
    }

    function showDescription() {

        jQuery(".studios-item__wrapper").mouseover(function (event) {
            event.preventDefault();
            /*  jQuery(this).find(".studios-item__image").animate({height:273});*/
            jQuery(this).find(".studios-item").find(".studios-item__description").show();
            jQuery(this).find(".studios-item").find(".studios-item__details").show();
            jQuery(this).find(".studios-item").addClass("studios-item__appear");

        });

        jQuery(".studios-item__wrapper").mouseleave(function (event) {
            event.preventDefault();
            /*         jQuery(this).find(".studios-item__image").animate({height:243});*/
            var that = jQuery(this).find(".studios-item");
            that.each(function (index) {
                that.removeClass('studios-item__appear');
                that.find(".studios-item__description").hide();
                that.find(".studios-item__details").hide();

            });

        });
    }


    ymaps.ready(init);

    function init() {
        plat = jQuery("#plat0").text().trim();
        plon = jQuery("#plon0").text().trim();
        // truelon = lon1;
        // truelat = lat1;
        var lat1 = plat;
        var lon1 = plon;
        console.log("lat1:" + plat);
        console.log("lon1:" + plon);
        var geolocation = ymaps.geolocation;
        var cookiecity3 = jQuery.cookie("city");
        if ((geolocation) && (typeof(ymaps.geolocation.city) != "undefined") && (typeof(cookiecity3) == "undefined")) {
            jQuery(".current-city__item").html(ymaps.geolocation.city);
            jQuery("#plat").text(ymaps.geolocation.latitude);
            jQuery("#plon").text(ymaps.geolocation.longitude);

            ylon = ymaps.geolocation.longitude;
            ylat = ymaps.geolocation.latitude;
            // console.log("lat2:" + ylat);
            // console.log("lon2:" + ylon);
            //
            // console.log(ymaps.geolocation.city);
            // console.log(ymaps.geolocation.latitude);
            // console.log(ymaps.geolocation.longitude);
        }

        myMap = new ymaps.Map("map", {

            center: [lat1, lon1],
            zoom: 12
        });

        //    ///МОИ КООРИДНАТЫ
        //    myMap.geoObjects.add(new ymaps.Placemark([plat, plon], {
        //            iconContent: '1',},
        //    {preset: 'my#preset2'}
        //    ));
        //    myMap.geoObjects.add(new ymaps.Placemark([ylat, ylon], {
        //            iconContent: '2',},
        //        {preset: 'my#preset2'}
        //    ));
        // ///МОИ КООРИДНАТЫ


        jQuery.ajax({
            url: '/wp-admin/admin-ajax.php',
            type: 'GET',
            dataType: 'json',
            data: {
                action: 'get_studios',
                city: 'Новосибирск',


            },
            success: function (response) {


                var data = response;
                apps = JSON.parse(response);
                //     console.log(apps);
                for (var i = 0, len = apps.length; i < len; i++) {
                    if (apps[i].hint != "") var phint = apps[i].hint + ', ' + apps[i].title; else var phint = apps[i].title;
                    if ((apps[i].title.indexOf("ТЦ") >= 0 ) || (apps[i].title.indexOf("ТРЦ") >= 0 ) || (apps[i].title.indexOf("ТРЦ") >= 0 ))
                        var pbaloon = apps[i].address + ', ' + apps[i].title + ', ' + apps[i].type + ', ' + apps[i].phone + ', ' + apps[i].time;
                    else
                        var pbaloon = apps[i].address + ', ' + apps[i].type + ', ' + apps[i].phone + ', ' + apps[i].time;
                    myMap.geoObjects.add(new ymaps.Placemark([apps[i].lat, apps[i].lon], {
                            hintContent: phint,
                            balloonContent: pbaloon,
                        }, {preset: 'twirl#redIcon'}
                    ))
                    // console.log(apps[i].imgpath);
                }


                jQuery(".studios-info__title_name").text(apps[1].title);
                defineCity();
            },
            error: function (error) {
                console.log("error");
            }
        });
    }
});
