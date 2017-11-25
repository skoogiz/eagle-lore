package eagle.lore.app;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.json.JSONArray;
import org.json.JSONObject;

import eagle.lore.dao.MonsterDao;
import eagle.lore.model.Ability;
import eagle.lore.model.Monster;
import spark.Request;
import spark.Response;
import spark.Route;

public class MonsterController {
    public static Route create = (Request request, Response response) -> {
        // Extract race members
        JSONObject monsterData = new JSONObject(request.body());
        Optional<String> race = Optional.ofNullable(monsterData.getString("race"));
        Optional<String> description = Optional.ofNullable(monsterData.getString("description"));

        // Extract abilities
        JSONObject abilitiesDate = monsterData.getJSONObject("abilities");
        List<Ability> abilities = new ArrayList<>();
        for (String abilityName : JSONObject.getNames(abilitiesDate)) {
            Optional.ofNullable(abilitiesDate.getString(abilityName)).map(
                    value -> Ability.create(abilityName, value)).ifPresent(abilities::add);

        }

        // Create monster and add to storage
        Monster monster = Monster.create(race.orElse(""), description.orElse(""), abilities);
        MonsterDao.getInstance().add(monster);
        return "Done!";
    };

    public static Route fetchAll = (Request request, Response response) -> {
        // Fetch all monster
        JSONArray result = new JSONArray();

        Collection<Monster> monsters = MonsterDao.getInstance().getAll();
        for (Monster monster : monsters) {
            JSONObject monsterJson = new JSONObject();
            monsterJson.put("race", monster.getRace());
            monsterJson.put("description", monster.getDesciption());
            JSONObject abilitiesJson = new JSONObject();
            for (Ability ability : monster.getAbilities()) {
                abilitiesJson.put(ability.getKey(), ability.getFormula());
            }
            monsterJson.put("abilities", abilitiesJson);
            result.put(monsterJson);
        }

        response.type("application/json");
        response.status(200);

        return result.toString();
    };

    private MonsterController() {
    }
}
