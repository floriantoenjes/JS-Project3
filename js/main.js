"use strict";

// Set focus on the first textfield
$("#name")[0].focus();

// If "other" option is selected show "other-title" textfield
$("#title").change(function(evt) {
   if ($(this).val() === "other") {
       const $textfield = $("<input id='other-title' type='text' placeholder='Your Job Role'/>");
       $(this).parent().append($textfield);
   } else {
       $("#other-title").hide();
   }
});


// Only show selected t-shirt colors that belong to theme
const $colorSelect = $("#color");
$colorSelect.children().hide();

$colorSelect.append("<option value='default'><-- Please choose a theme</option>");
$colorSelect.val("default");
$colorSelect.attr("disabled", true);

$("#design").change(function(evt) {
    const theme = $(this).val();
    switch (theme) {
        case "js puns":
            hideThemeOptions("JS Puns");
            break;

        case "heart js":
            hideThemeOptions("I ♥ JS");
            break;

        default:
            hideThemeOptions("<--");
            $colorSelect.attr("disabled", true);
            break;
    }
    console.log($colorSelect.val());
});

function hideThemeOptions(theme) {
    $colorSelect.children().toArray().reverse().forEach(option => {
        const $option = $(option);
        if (!$option.text().includes(theme)) {
            $option.hide();
        } else {
            $option.show();
            $colorSelect.val($option.val());
        }
    });
    $colorSelect.attr("disabled", false);
}
