package eagle.lore.app;

import static spark.Spark.get;
import static spark.Spark.post;
import static spark.Spark.staticFiles;

import java.util.Optional;

import org.json.JSONObject;

import eagle.lore.function.Dices;
import eagle.lore.model.helper.MonsterHelper;

public class EagleLoreServices {

    public enum AppConfig
    {
        INSTANCE;

    }

    public static void main(String[] args) {

        MonsterHelper.initStore();

        // staticFiles.location("/public");
        staticFiles.externalLocation("/home/ask/Projects/eagle-lore/src/main/webapp/build");

        get("/roll/:ability/:dices", (req, res) -> {
            Optional<Integer> value = Dices.calculateValue(req.params(":dices"));
            if (value.isPresent()) {
                res.type("application/json");
                res.status(200);
                JSONObject result = new JSONObject();
                result.put("ability", req.params(":ability"));
                result.put("value", value.get());
                return result.toString();
            } else {
                res.status(400);
                return "";
            }
        });

        post("/api/monster/create", MonsterController.create);

        get("/api/monster/fetchAll", MonsterController.fetchAll);
    }

}
