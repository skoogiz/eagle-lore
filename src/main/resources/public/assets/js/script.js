const MONSTER_FORM = "#create-monster-form";

$(document).ready(() => {
    createForm();
    fetchMonsters();

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
        $.ajax({
            type: "POST",
            url: req.url,
            data: JSON.stringify(req.payload),
            contentType: "application/json",
            dataType: 'json',
            statusCode: {
                200: function() {
                    showSnackbar("Nytt monster skapat");
                    resetForm();
                    fetchMonsters();
                }
            }
        });
    });

    $("#generate-monster").click((event) => {
        event.preventDefault();
        const selected = $("#race-selector").find("option:selected");
        const data = selected.data('monster'); 
        $("#result-container").html(renderMonsterPanel(data));
        showSnackbar("Nytt monster genererat");
    });
    
    $("#race-selector").change((event) => {
        event.preventDefault();
        const selected = $("#race-selector").find("option:selected");
        const data = selected.data('monster'); 
        $("#result-container").html(renderMonsterPanel(data));
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

const createRaceInput = () => {
    var input = $(document.createElement("input"));
    $(input)
        .attr("type", "text")
        .attr("placeholder", "Ras")
        .attr("name", "race")
        .attr("required", true);
    $("#race").append(input);
};

const createDescriptionInput = () => {
    var input = $(document.createElement("textarea"));
    $(input)
        .attr("placeholder", "Beskrivning")
        .attr("name", "description")
    $("#description").append(input);
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

const createForm = () => {
    createRaceInput();
    createDescriptionInput();
    $("#abilities").append(createAbility());
};

const resetForm = () => {
    $("#race").empty();
    $("#description").empty();
    $("#abilities").empty();
    createForm();
};

/* Populate monster select */
const renderOptions = (data) => {
    let sel = $("#race-selector");
    sel.empty();
    $.each(data, function(index, value) {
        var option = $(document.createElement("option"));
        $(option)
            .val(index)
            .text(value.race)
            .data("monster", value);
        sel.append(option);
    });
};

const renderMonsterPanel = (data) => {
    var panel = $(document.createElement("div"));
    $(panel).addClass("mui-panel");
    var p = $(document.createElement("p"));
    var heading = $(document.createElement("div"));
    $(heading).addClass("mui--text-title").text(data.race);
    var body = $(document.createElement("div"));
    $(body).addClass("mui--text-body1").text(data.description);
    var table = $(document.createElement("table"));
    $(table).addClass("mui-table").addClass("mui-table--bordered");
    var tableHead = $(document.createElement("thead"));
    var tableHeadRow = $(document.createElement("tr"));
    var tableHeadCellKey = $(document.createElement("th"));
    $(tableHeadCellKey).text("Grundegenskaper");
    var tableHeadCellVal = $(document.createElement("th"));
    $(tableHeadCellVal).text("Tärningar");
    $(tableHeadRow).append(tableHeadCellKey).append(tableHeadCellVal);
    $(tableHead).append(tableHeadRow);
    var tableBody = $(document.createElement("tbody"));
    $.each(data.abilities, function(key, value) {
        var tableBodyRow = $(document.createElement("tr"));
        var tableBodyCellKey = $(document.createElement("th"));
        $(tableBodyCellKey).text(key);
        var tableBodyCellVal = $(document.createElement("th"));
        $(tableBodyCellVal).text(value);
        $(tableBodyRow).append(tableBodyCellKey).append(tableBodyCellVal);
        $(tableBody).append(tableBodyRow);
    });
    $(table).append(tableHead).append(tableBody);
    $(p).append(heading).append(body).append(table);
    $(panel).append(p);
    var button = $(document.createElement("button"));
    $(button)
        .attr("id", "generate-monster")
        .attr("type", "submit")
        .addClass("mui-btn")
        .addClass("mui-btn--primary")
        .addClass("mui-btn--raised")
        .addClass("primary-button")
        .text("Generera");
    $(button).bind("click", generateMonster(data));
    $(panel).append(button);
    return panel;
};

const generateMonster = (data) => {
    return (event) => {
        event.preventDefault();
        console.log("Generate monster", data);
        showSnackbar("Nytt monster genererat");
    };
};

const fetchMonsters = () => {
    $.get("/api/monster/fetchAll", function(data) {
        console.log("Get monsters", data);
        renderOptions(data);
    }, "json" );
};