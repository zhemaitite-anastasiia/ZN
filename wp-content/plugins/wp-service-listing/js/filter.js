jQuery(document).ready(function($) {
    var getUrlParameter = function getUrlParameter(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;
    
        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');
    
            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    };
    
        $( function() {
          var pricefrom = getUrlParameter('pricefrom');
          var priceto = getUrlParameter('priceto');
    
          if (typeof pricefrom === 'undefined' || pricefrom=="" ) pricefrom = 40000;
          if (typeof priceto === 'undefined' || priceto=="" ) priceto = 100000;
    
          $( "#slider-range" ).slider({
            range: true,
            min: 30000,
            max: 120000,
            values: [ pricefrom, priceto ],
            slide: function( event, ui ) {
              $( "#amount" ).text( "" + ui.values[ 0 ] + " - " + ui.values[ 1 ]+ " руб.");
              $( "#pricefrom" ).val(ui.values[ 0 ]);
              $( "#priceto" ).val(ui.values[ 1 ]);
            }
          });
          $( "#amount" ).text( "" + $( "#slider-range" ).slider( "values", 0 ) +
            " - " + $( "#slider-range" ).slider( "values", 1 ) );
    
        } );
    
        $( function() {
    
            var squrefrom = getUrlParameter('squrefrom');
          var squreto = getUrlParameter('squreto');
    
          if (typeof squrefrom === 'undefined' || squrefrom=="" ) squrefrom = 750;
          if (typeof squreto === 'undefined' || squreto=="" ) squreto = 2000;
    
          $( "#slider-range2" ).slider({
            range: true,
            min: 0,
            max: 3000,
            values: [ squrefrom, squreto ],
            slide: function( event, ui ) {
              $( "#amount2" ).text( "" + ui.values[ 0 ]/10 + " - " + ui.values[ 1 ]/10+ " м2");
              $( "#squrefrom" ).val(ui.values[ 0 ]);
              $( "#squreto" ).val(ui.values[ 1 ]);
            }
          });
          $( "#amount2" ).text( "" + $( "#slider-range2" ).slider( "values", 0 )/10 +
            " - " + $( "#slider-range2" ).slider( "values", 1 )/10 );
        } );
    
        $( function() {
            var floorfrom = getUrlParameter('floorfrom');
          var floorto = getUrlParameter('floorto');
    
          if (typeof floorfrom === 'undefined' || floorfrom=="" ) floorfrom = 2;
          if (typeof floorto === 'undefined' || floorto=="" ) floorto = 15;
    
          $( "#slider-range3" ).slider({
            range: true,
            min: 0,
            max: 20,
            values: [ floorfrom, floorto ],
            slide: function( event, ui ) {
              $( "#amount3" ).text( "" + ui.values[ 0 ] + " - " + ui.values[ 1 ]+ "");
              $( "#floorfrom" ).val(ui.values[ 0 ]);
              $( "#floorto" ).val(ui.values[ 1 ]);
            }
          });
          $( "#amount3" ).text( "" + $( "#slider-range3" ).slider( "values", 0 ) +
            " - " + $( "#slider-range3" ).slider( "values", 1 ) );
        } );
      })