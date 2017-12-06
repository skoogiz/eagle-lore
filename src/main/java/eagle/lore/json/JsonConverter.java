package eagle.lore.json;

import java.util.Collection;

import org.json.JSONObject;

import eagle.lore.model.Ability;
import eagle.lore.model.Monster;

public class JsonConverter {

    public static JSONObject toJson(Monster monster) {
        JSONObject monsterJson = new JSONObject();
        monsterJson.put("race", monster.getRace());
        monsterJson.put("description", monster.getDesciption());
        monsterJson.put("abilities", toJson(monster.getAbilities()));
        return monsterJson;
    }

    public static JSONObject toJson(Collection<Ability> abilities) {
        JSONObject abilitiesJson = new JSONObject();
        abilities.forEach(ability -> abilitiesJson.put(ability.getKey(), ability.getFormula()));
        return abilitiesJson;
    }

    private JsonConverter() {
    }

}
