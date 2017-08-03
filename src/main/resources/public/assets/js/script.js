$(document).ready(() => {
    $("#abilities").append(createAbility());

    $("#add-ability").click((event) => {
        event.preventDefault();
        $("#abilities").append(createAbility());
    });

    $("#generate-monster").click((event) => {
        event.preventDefault();
        $("#result-container").html(createMonsterPanel($("#race-selector").val()));
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
