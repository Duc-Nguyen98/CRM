jQuery(".form-validate").validate({
    rules: {
        "customerName": {
            required: !0,
            minlength: 3,

        },
        "customerEmail": {
            required: !0,
            email: !0
        },
        "customerGender": {
            required: !0
        },
        "customerAddress": {
            required: !0,
        },
        "customerGroupId": {
            required: !0
        },
        "customerJob": {
            required: !0,
        },
        "customerDate": {
            required: !0,
        },
        "customerTelephone": {
            required: !0,
            minlength:9
        },
     

    },
    messages: {
        "customerName": {
            required: "Please enter a username",
            minlength: "Your username must consist of at least 3 characters",
        },
        "customerEmail": {
            required: "Please enter email address",
            email: "Please enter a valid email address"
        },
        "customerAddress": {
            required: "Please enter a address city",
        },
        "customerJob": {
            required: "Please enter a job name",
        },
        "customerTelephone":{
            required: "Please enter your telephone number",
            minlength:"Your telephone must consist of at least 9 number"
        },
        "customerGender": "Please select a gender!",
        "customerGroupId": "Please select a group!",
        "customerDate":{
            required: "Please enter your birth date",
        }
    },

    ignore: [],
    errorClass: "invalid-feedback animated fadeInUp",
    errorElement: "div",
    errorPlacement: function (e, a) {
        jQuery(a).parents(".form-group > div").append(e)
    },
    highlight: function (e) {
        jQuery(e).closest(".form-group").removeClass("is-invalid").addClass("is-invalid")
    },
    success: function (e) {
        jQuery(e).closest(".form-group").removeClass("is-invalid"), jQuery(e).remove()
    },
});


jQuery(".form-valide-with-icon").validate({
    rules: {
        "customerName": {
            required: !0,
            minlength: 3
        },
        "val-password": {
            required: !0,
            minlength: 5
        }
    },
    messages: {
        "customerName": {
            required: "Please enter a username",
            minlength: "Your username must consist of at least 3 characters"
        },
        "val-password": {
            required: "Please provide a password",
            minlength: "Your password must be at least 5 characters long"
        }
    },

    ignore: [],
    errorClass: "invalid-feedback animated fadeInUp",
    errorElement: "div",
    errorPlacement: function (e, a) {
        jQuery(a).parents(".form-group > div").append(e)
    },
    highlight: function (e) {
        jQuery(e).closest(".form-group").removeClass("is-invalid").addClass("is-invalid")
    },
    success: function (e) {
        jQuery(e).closest(".form-group").removeClass("is-invalid").addClass("is-valid")
    }




});