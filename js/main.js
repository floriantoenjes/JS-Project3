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


// Only show T-Shirt themes that go together
const $colorSelect = $("#color");
$colorSelect.children().hide();
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
            $colorSelect.children().hide();
            break;
    }
});

function hideThemeOptions(theme) {
    $colorSelect.children().toArray().forEach(option => {
        const $option = $(option);
        console.log($option);
        if (!$option.text().includes(theme)) {
            $option.hide();
        } else {
            $option.show();
        }
    });
    $colorSelect.val("");
}
