"use strict";

/* Set focus on the first textfield */
$("#name")[0].focus();

/* If "other" option is selected show "other-title" textfield */
const $otherTitle = $("#other-title").hide();
$("#title").change(function (evt) {
    if ($(this).val() === "other") {
        $otherTitle.show();
    } else {
        $otherTitle.hide();
    }
});


/* Only show t-shirt colors that belong to selected theme */
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

        // If the theme attribute is set get the text out of it
        $option.text($option.attr("theme"));

        if (!$option.text().includes(theme)) {
            $option.hide();
        } else {
            $option.show();

            // Store the theme text into the theme attribute
            $option.attr("theme", $option.text());

            // Remove the theme text from the color option
            $option.text($option.text().replace(theme, ""));
            $colorSelect.val($option.val());
        }
    });
    $colorSelect.show();
}


/* Only show the selected payment option */
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

/* Make activity checkboxes interactive */
const $activities = $(".activities");
$(".activities input").change(function (evt) {
    const $label = $(this).parent();
    const datetime = getDatetime($label);
    let sum = 0;

    if (this.checked) {
        sum += getPriceInDollar($label);
    }

    $label.siblings("label").toArray().forEach(sibling => {
        const input = sibling.firstChild;
        const datetimeOfSibling = getDatetime($(sibling));

        if (input.checked) {
            const price = getPriceInDollar($(sibling))
            sum += price;
        }

        if (this.checked && datetime === datetimeOfSibling) {
            $(input).attr("disabled", true);
            sibling.style = "color: grey";
        } else if (!this.checked && datetime === datetimeOfSibling) {
            $(input).attr("disabled", false);
            sibling.style = "color: black";
        }
    });

    $("#sum").remove();
    if (sum > 0) {
        $activities.append($(`<p id='sum'>Total: \$${sum}</p>`));
    }

});

function getPriceInDollar($element) {
    return parseFloat($element.text().match(/\$(\d+)/)[1]);
}

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

// Validate name field while typing
$("#name").keyup(function (evt) {
    validateName();
});

// Validate email field while typing
$("#mail").keyup(function (evt) {
    validateEmail();
});

function validateName() {
    const $nameField = $("#name");
    const nameFieldFilled = $nameField.val().trim().length > 0;
    validateField($nameField, nameFieldFilled, "Name:", "please provide your name");

    return nameFieldFilled;
}

function validateEmail() {
    const $email = $("#mail");
    const emailEmpty = $email.val().trim().length === 0
    const emailCorrect = $email.val().trim().match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/);
    if (emailEmpty) {
        validateField($email, emailCorrect, "Email:", "please enter a value");
    } else {
        validateField($email, emailCorrect, "Email:", "please provide a valid email address");
    }

    return emailCorrect;
}

// Validate the form and check if it's ready to submit
function readyToSubmit() {

    const nameFieldFilled = validateName();
    const emailCorrect = validateEmail();

    // Check if an activity is selected
    let activityChecked = false;
    $(".activities input").toArray().forEach(input => {
        if (input.checked) {
            return activityChecked = true;
        }
    });

    /* Add / Reset activity error message */
    $("#activityError").remove();
    if (!activityChecked) {
        const $legend = $(".activities legend");
        $("#activityError").remove();
        $("<p id='activityError' style='color: red;'>Please select an Activity</p>").insertAfter($legend);
    }

    /* If credit card is selected validate it's input */
    let paymentValid = true;
    const $paymentSelect = $("#payment");
    $paymentSelect[0].style = "border-color: none;";
    $("#paymentError").remove();
    if ($paymentSelect.val() === "credit card") {
        const ccNumValid = validateWithRegex("#cc-num", /^\d{13,16}$/);
        const zipValid = validateWithRegex("#zip", /^\d{5}$/);
        const cvvValid = validateWithRegex("#cvv", /^\d{3}$/);

        paymentValid = ccNumValid && zipValid && cvvValid;
    } else if ($paymentSelect.val() === "select_method") {
        paymentValid = false;
        $paymentSelect[0].style = "border-color: red;";
        $("<p id='paymentError' style='color: red;'>Please select a payment option</p>").insertAfter($bitcoin);
    }

    return (nameFieldFilled && emailCorrect && activityChecked && paymentValid);
}

// If the boolean expression is not valid create an error in the label with the given error message
function validateField($element, booleanValue, message, errorMessage) {
    const $label = $element.prev();
    if (!booleanValue) {
        $label.text(`${message} (${errorMessage})`);
        $label[0].style = "color: red";
    } else {
        $label.text(message);
        $label[0].style = "color: black";
    }
}

function validateWithRegex(selector, regex) {
    const valid = $(selector).val().match(regex);
    const $label = $(selector).prev();
    if (!valid) {
        $label[0].style = "color: red;";
    } else {
        $label[0].style = "color: black;";
    }
    return valid;
}
