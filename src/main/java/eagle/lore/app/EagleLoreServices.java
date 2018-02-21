package eagle.lore.app;

import static spark.Spark.*;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Optional;
import java.util.Properties;

import org.json.JSONObject;

import eagle.lore.dao.MonsterHelper;
import eagle.lore.function.Dices;

public class EagleLoreServices {

    public static void main(String[] args) {

        MonsterHelper.initStore();

        AppConfig config = AppConfig.getConfig();
        if (config.getStaticFilesPath().isPresent()) {
            config.getStaticFilesPath().ifPresent(staticFiles::externalLocation);
        } else {
            staticFiles.location("/public");
        }

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
