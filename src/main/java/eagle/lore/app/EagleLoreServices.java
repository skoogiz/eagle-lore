package eagle.lore.app;

import static spark.Spark.*;

import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.json.JSONObject;

public class EagleLoreServices {

    public static void main(String[] args) {
        staticFiles.location("/public");

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

        post("/api/monster/create", (req, res) -> MonsterController.create);

    }

    public static String getAbility(String key) {
        Pattern pattern = Pattern.compile("^abilities\\[(.*)\\]$");
        Matcher matcher = pattern.matcher(key);
        if (matcher.find()) {
            return matcher.group(1);
        }
        return key;
    }

}
