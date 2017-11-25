const MONSTER_FORM = "#create-monster-form";

$(document).ready(() => {
    $("#abilities").append(createAbility());

    $("#add-ability").click((event) => {
        event.preventDefault();
        $("#abilities").append(createAbility());
    });

    $(MONSTER_FORM).submit(function(event) {
        event.preventDefault();
        const form = $(this);
        const req = {
            url: form.attr( "action" ),
            payload: {
                race: form.find( ":input[name='race']" ).val(),
                description: form.find( ":input[name='description']" ).val(),
                abilities: getAbilitiesArray()
            }
        };
        console.log("Create monster request", req);
        var posting = $.ajax({
            type: "POST",
            url: req.url,
            data: JSON.stringify(req.payload),
            success: function(data) { showSnackbar("Success"); },
            contentType: "application/json",
            dataType: 'json'
        });

        // Put the results in a div
        posting.done(function(data) {
            showSnackbar("Nytt monster skapat");
        });
    });

    $("#generate-monster").click((event) => {
        event.preventDefault();
        $("#result-container").html(createMonsterPanel($("#race-selector").val()));
        showSnackbar("Nytt monster genererat");
    });
});

const getAbilitiesArray = () => {
    let abilities = {};
    $(".ability").each(function() {
        const ability = $(this);
        abilities = {
            ...abilities,
            [ability.find( ":input[name='ability']" ).val()]: ability.find( ":input[name='dices']" ).val()
        };
        /*
        abilities.push({
            ability: ability.find( ":input[name='ability']" ).val(),
            dices: ability.find( ":input[name='dices']" ).val()
        });
        */
    });
    return abilities;
};

const createAbility = () => {
    var ability = $(document.createElement("div"));
    $(ability).addClass("ability");
    $(ability).append(createInput({
        name: "ability",
        placeholder: "Grundegenskap",
        required: true
    }));
    $(ability).append(createInput({
        name: "dices", 
        placeholder: "Tärningsvärde",
        pattern: "^\\d+(T|t)\\d+$",
        required: true
    }));
    return ability;
};

const createInput = ({name, placeholder, pattern, required = false}) => {
    var textfield = $(document.createElement("div"));
    $(textfield).addClass("mui-textfield");
    var input = $(document.createElement("input"));
    $(input)
        .attr("type", "text")
        .attr("placeholder", placeholder)
        .attr("name", name)
        .attr("required", required);
    if (pattern) $(input).attr("pattern", pattern);
    $(textfield).append(input);
    return textfield;
};

const createMonsterPanel = (text) => {
    var panel = $(document.createElement("div"));
    $(panel).addClass("mui-panel");
    var p = $(document.createElement("p"));
    $(p).text(text);
    $(panel).append(p);
    return panel;
};

const addSnackbar = (parent) => {
    var snackbar = $(document.createElement("div"));
    $(snackbar).addClass("snackbar");
    var text = $(document.createElement("div"));
    $(text).addClass("snackbar-text");
    $(snackbar).append(text);
    $(parent).append(snackbar);
};

const showSnackbar = (text) => {
    if (!($("#snackbar-root").length)) return;
    var root = $("#snackbar-root");
    if (!($(".snackbar").length)) addSnackbar(root);
    $(root).removeClass("snackbar-root-hidden");
    $(root).addClass("snackbar-root-visible");
    showSnackbarText(text);
    setTimeout(() => {
        hideSnackbarText();
        $(root).removeClass("snackbar-root-visible");
        $(root).addClass("snackbar-root-hidden");
    }, 3000);
};

const hideSnackbarText = () => {
    var snack = $(".snackbar-text");
    $(snack).removeClass("snackbar-text-visible");
    $(snack).addClass("snackbar-text-hidden");
    $(snack).html("");
};

const showSnackbarText = (text) => {
    var snack = $(".snackbar-text");
    $(snack).removeClass("snackbar-text-hidden");
    $(snack).addClass("snackbar-text-visible");
    var span = $(document.createElement("span"));
    $(span).text(text);
    $(snack).html(span);
};
