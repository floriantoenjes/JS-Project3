"use strict";

// Set focus on the first textfield
$("#name")[0].focus();

// If "other" is selected show textfield
$("#title").change(function(evt) {
   if ($(this).val() === "other") {
       const $textfield = $("<input id='other-title' type='text' placeholder='Your Job Role'/>");
       $(this).parent().append($textfield);
   }
});
