"use strict";

// Set focus on the first textfield
$("#name")[0].focus();

// If "other" option is selected show "other-title" textfield
$("#title").change(function (evt) {
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

$("#design").change(function (evt) {
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

$("#payment").change(function () {
    const paymentType = $(this).val();

    switch (paymentType) {
        case "credit card":
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




//const time1 = $labelJSFrameworks.text().match(/\w+\s\d+[ap]m-\d+[ap]m/)[0];

function getPrice($element) {
    return parseFloat($element.text().match(/\$(\d+)/)[1]);
}

function getDatetime($element) {
    const results = $element.text().match(/\w+\s\d+[ap]m-\d+[ap]m/);
    if (results !== null) {
        return results[0];
    }
}

const $activities = $(".activities");

// Bind a function by change event to activity checkboxes
$(".activities input").change(function (evt) {
    let sum = 0;
    let datetime;
    const $label = $(this).parent();

    // Get the sum of this activity
    if (this.checked) {
        sum += getPrice($label);
        datetime = getDatetime($label);
    }

    // Add up the cost of checked siblings
    $label.siblings().toArray().forEach(sibling => {
        const input = sibling.firstChild;
        if (input.checked) {
            sum += getPrice($(sibling));
        }
    });
    // Check if the time is already occupied

    // Append the sum to the activities
    $("#sum").remove();
    $activities.append($(`<p id='sum'>Total: \$${sum}</p>`));

});
