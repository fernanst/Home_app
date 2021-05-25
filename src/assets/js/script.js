
$(document).ready(function () {

    $('#dropdownList1 li').find("a").click(function(){
       $('#dropdown-bomba').html($(this).html()).append("      <span class='caret'></span>");
       
       var selText = $(this).text();
       if (selText == 'Manual') {
         	$(container_manual).show('slow');
        	$(container_automatico).hide('slow');
        	$(container_invierno).hide('slow');
        	$(container_prog_horaria).hide('slow');
        	$(container_climatizacion).hide('slow');
        	$(button_add).hide('slow');

       } else if (selText == 'Automatico') {
        	$(container_manual).show('slow');
        	$(container_automatico).hide('slow');
       	  $(container_invierno).hide('slow');
        	$(container_prog_horaria).hide('slow');
        	$(container_climatizacion).hide('slow');
        	$(button_add).show('slow');

	   } else if (selText == 'Invierno') {
       	    $(container_manual).hide('slow');
        	$(container_automatico).hide('slow');
        	$(container_invierno).show('slow');
        	$(container_prog_horaria).hide('slow');
        	$(container_climatizacion).hide('slow');
        	$(button_add).hide('slow');

       } else if (selText == 'Prog. Horaria') {
            $(container_manual).hide('slow');
       	    $(container_automatico).hide('slow');
       	    $(container_invierno).hide('slow');
       	    $(container_prog_horaria).show('slow');
       	    $(button_add).show('slow');
       	    $(container_climatizacion).hide('slow');


       } else if (selText == 'Climatización') {
       	    $(container_manual).hide('slow');
       	    $(container_automatico).hide('slow');
       	    $(container_invierno).hide('slow');
       	    $(container_prog_horaria).hide('slow');
       	    $(container_climatizacion).show('slow');
       	    $(button_add).hide('slow');
       }
       
    });
    $('#dropdownList2 li').find("a").click(function(){
       $('#dropdown-focos').html($(this).html()).append("      <span class='caret'></span>");
    });

	$("#button_remove1").click(function () {
		$(prog1).hide('slow');
	});

	$("#button_remove2").click(function () {
		$(prog2).hide('slow');
	});

	$("#button_remove3").click(function () {
		$(prog3).hide('slow');
	});

	/*$("#nav_control").click(function () {
	    //var navIndex = $(this).index() + 1;

	    //$(this).tab('show');
	    //$('.nav_0 li').not('.active').blur();
	    //$(this).addClass('active')
        //'#nav_sondas').removeClass('active')
        $(this).addClass('active')
        $('#nav_sondas').removeClass('active')
	    $(bomba).show('slow');
	    $(focos).show('slow');
	    $(cascada).show('slow');
	    $(clorador).show('slow');
	    $(llenado).show('slow');
	    $(aux).show('slow');
	    $(row_1).hide('slow');
	    $(row_2).hide('slow');
	    $(row_3).hide('slow');
	});*/

	/*$('#nav_0 li').click(function(){
	  var parentLI = $(this).parent().toggleClass('active off');
	  if( parentLI.hasClass('active') ){
	    //parentLI.siblings('.active').toggleClass('active off');
	    $('.nav_0 li').not('.active').blur();
	  }
	  console.log(parentLI)
	});*/


	/*$("#nav_0 li").click(function () {
	    var i=$(this).index() //get from storrage
	    //$("#nav_0 li").eq(i).addClass('active');
	    //$("#nav_0 li").removeClass("off");
	    //$("#nav_0 li").eq(i).addClass("active");
	    //$("nav_0 li").eq(1).not('.active').blur();

	    /$("#nav_0 li").eq(i).tab('show');/
	    console.log(i)
	});*/

	/*$('a[href="#btn-next"]').on('click', function(event){
  		event.preventDefault();
  		var tab = $(this).data('next'); 
  		$(nav_0).tab('show');
  		console.log(tab)
	})*/

});
