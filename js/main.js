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


// Only show t-shirt colors that belong to selected theme
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
            $creditCard.show();
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

// Bind a function to the change event of the activity checkboxes
const $activities = $(".activities");
$(".activities input").change(function (evt) {
    let sum = 0;
    const $label = $(this).parent();
    let datetime = getDatetime($label);

    // Get the sum of this activity
    if (this.checked) {
        sum += getPrice($label);
    }

    // Add up the cost of checked siblings
    $label.siblings("label").toArray().forEach(sibling => {
        const input = sibling.firstChild;
        const datetimeOfSibling = getDatetime($(sibling));

        // If this input is checked add it's price to the sum
        if (input.checked) {
            const price = getPrice($(sibling))
            sum += price;
        }

        // Check if the time is already occupied
        if (this.checked && datetime === datetimeOfSibling) {
            $(input).attr("disabled", true);
            sibling.style = "color: grey";
        } else if (!this.checked && datetime === datetimeOfSibling) {
            $(input).attr("disabled", false);
            sibling.style = "color: black";
        }
    });

    // Append the sum to the activities
    $("#sum").remove();
    if (sum > 0) {
        $activities.append($(`<p id='sum'>Total: \$${sum}</p>`));
    }

});


// Extract the price in dollar
function getPrice($element) {
    return parseFloat($element.text().match(/\$(\d+)/)[1]);
}

// Extract the datetime
function getDatetime($element) {
    const results = $element.text().match(/\w+\s\d{1,2}[ap]m-\d{1,2}[ap]m/);
    if (results !== null) {
        return results[0];
    }
}

$("form").submit(evt => {
    if (!readyToSubmit()) {
        evt.preventDefault();
    }
});

// Check if the form is ready to submit
function readyToSubmit() {

    // Check if the name field is blank
    const $nameField = $("#name");
    const nameFieldFilled = $nameField.val().trim().length > 0;
    const $nameLabel = $nameField.prev();
    if (!nameFieldFilled) {
        $nameLabel.text("Name: (please provide your name)");
        $nameLabel[0].style = "color: red";
    } else {
        $nameLabel.text("Name:");
        $nameLabel[0].style = "color: black";
    }


    // Check if the email is correctly formatted
    const $email = $("#mail");
    const emailCorrect = $email.val().trim().match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)
    const $emailLabel = $email.prev();
    if (!emailCorrect) {
        $emailLabel.text("Email: (please provide a valid email address)");
        $emailLabel[0].style = "color: red";
    } else {
        $emailLabel.text("Email:");
        $emailLabel[0].style = "color: black";
    }


    // Check if an activity is selected
    let activityChecked = false;
    $(".activities input").toArray().forEach(input => {
        if (input.checked) {
            return activityChecked = true;
        }
    });
    $("#activityError").remove();
    if (!activityChecked) {
        const $legend = $(".activities legend");
        $("#activityError").remove();
        $("<p id='activityError' style='color: red;'>Please select an Activity</p>").insertAfter($legend);
    }


    // If credit card is selected validate it's input
    let creditCardValid = true;
    if ($("#payment").val() === "credit card") {
        const ccNumValid = $("#cc-num").val().match(/\d{13,16}/);
        if (!ccNumValid) {
            const $ccNumLabel = $("#cc-num").prev();
            $ccNumLabel[0].style = "color: red;";
        }
        const zipValid = $("#zip").val().match(/^\d{5}$/);
        if (!zipValid) {
            const $zipLabel = $("#zip").prev();
            $zipLabel[0].style = "color: red;";
        }
        const cvvValid = $("#cvv").val().match(/^\d{3}$/);
        if (!cvvValid) {
            const $cvvLabel = $("#cvv").prev();
            $cvvLabel[0].style = "color: red;";
        }

        creditCardValid = ccNumValid && zipValid && cvvValid;
    }

    return (nameFieldFilled && emailCorrect && activityChecked && creditCardValid);
}
