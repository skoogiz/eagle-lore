$(document).ready(function() {
    console.log("JQuery ready to use...");
    $("#abilities").append(createAbility());

    $("#add-ability").click(function(event) {
        event.preventDefault();
        $("#abilities").append(createAbility());
    });

    $("#generate-monster").click(function(event) {
        event.preventDefault();
        $("#result-container").html(createMonsterPanel($("#race-selector").val()));
    });
});

var createAbility = function() {
    var ability = $(document.createElement("div"));
    $(ability).addClass("ability");
    $(ability).append(createInput("ability", "Grundegenskap"));
    $(ability).append(createInput("dices", "Tärningsvärde"));
    return ability;
};

var createInput = function(name, placeholder) {
    var textfield = $(document.createElement("div"));
    $(textfield).addClass("mui-textfield");
    var input = $(document.createElement("input"));
    $(input).attr("type", "text").attr("placeholder", placeholder).attr("name",
            name);
    $(textfield).append(input);
    return textfield;
};

var createMonsterPanel = function(text) {
    var panel = $(document.createElement("div"));
    $(panel).addClass("mui-panel");
    var p = $(document.createElement("p"));
    $(p).text(text);
    $(panel).append(p);
    return panel;
};
