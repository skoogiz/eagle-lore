$(document).ready(() => {
    $("#abilities").append(createAbility());

    $("#add-ability").click((event) => {
        event.preventDefault();
        $("#abilities").append(createAbility());
    });

    $("#create-monster").click((event) => {
        event.preventDefault();
        showSnackbar("Nytt monster skapat");
    });

    $("#generate-monster").click((event) => {
        event.preventDefault();
        $("#result-container").html(createMonsterPanel($("#race-selector").val()));
        showSnackbar("Nytt monster genererat");
    });
});

const createAbility = () => {
    var ability = $(document.createElement("div"));
    $(ability).addClass("ability");
    $(ability).append(createInput("ability", "Grundegenskap"));
    $(ability).append(createInput("dices", "Tärningsvärde"));
    return ability;
};

const createInput = (name, placeholder) => {
    var textfield = $(document.createElement("div"));
    $(textfield).addClass("mui-textfield");
    var input = $(document.createElement("input"));
    $(input).attr("type", "text").attr("placeholder", placeholder).attr("name",
            name);
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
