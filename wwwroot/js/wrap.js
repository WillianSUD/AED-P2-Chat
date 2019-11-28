$('.msg_head').click(function(){  
    var chatbox = $(this).parents().attr("rel") ;
    $('[rel="'+chatbox+'"] .msg_wrap').slideToggle('slow');
    return false;
   });