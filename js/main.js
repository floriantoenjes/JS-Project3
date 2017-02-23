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

$colorSelect.val("default");
$colorSelect.hide();

$("#design").change(function(evt) {
    const theme = $(this).val();
    switch (theme) {
        case "js puns":
            hideThemeOptions("(JS Puns shirt only)");
            break;

        case "heart js":
            hideThemeOptions("(I ♥ JS shirt only)");
            break;

        default:
            $colorSelect.hide();
            break;
    }
});

function hideThemeOptions(theme) {
    $colorSelect.children().toArray().reverse().forEach(option => {
        const $option = $(option);

        $option.text($option.attr("theme"));

        if (!$option.text().includes(theme)) {
            $option.hide();
        } else {
            $option.show();

            $option.attr("theme", $option.text());
            $option.text($option.text().replace(theme, ""));
            $colorSelect.val($option.val());
        }
    });
    $colorSelect.show();
}
