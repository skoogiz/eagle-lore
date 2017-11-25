package eagle.lore.app;

import org.json.JSONObject;

import spark.Request;
import spark.Response;
import spark.Route;

public class MonsterController {
    public static Route create = (Request request, Response response) -> {
        JSONObject monster = new JSONObject(request.body());
        System.out.println("[race] > " + monster.get("race"));
        System.out.println("[description] > " + monster.get("description"));
        JSONObject abilities = monster.getJSONObject("abilities");
        for (String ability : JSONObject.getNames(abilities)) {
            System.out.println("[ability:" + ability + "] > " + abilities.get(ability));
        }
        return "";
    };
}
