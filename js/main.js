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

// Only show selected payment option
const $creditCard = $("#credit-card").hide();
const $paypal = $creditCard.next().hide();
const $bitcoin = $paypal.next().hide();

$("#payment").change(function(){
    const paymentType = $(this).val();

    switch (paymentType) {
        case "credit card":
            console.log("Credit card");
            $("#credit-card").show();
            break;
        case "paypal":
            $creditCard.hide();
            $bitcoin.hide();
            $paypal.show();
            break;
        case "bitcoin":
            $creditCard.hide();
            $paypal.hide();
            $bitcoin.show();
            break;
        default:
            $creditCard.hide();
            $paypal.hide();
            $bitcoin.hide();
            break;
    }
});



const $labelAll = $("input[name=all]").parent();
const cost = $labelAll.text().match(/\$\d+/);

const $labelJSFrameworks = $("input[name=js-frameworks]").parent();
const cost1 = $labelJSFrameworks.text().match(/\$\d+/);
const time1 = $labelJSFrameworks.text().match(/\w+\s\d+[ap]m-\d+[ap]m/)[0];




