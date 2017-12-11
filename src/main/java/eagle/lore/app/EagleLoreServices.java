package eagle.lore.app;

import static spark.Spark.*;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Optional;
import java.util.Properties;

import org.json.JSONObject;

import eagle.lore.function.Dices;
import eagle.lore.model.helper.MonsterHelper;

public class EagleLoreServices {

    public enum AppConfig {
        INSTANCE;

        private Properties props = new Properties();

        private AppConfig() {
            init();
        }

        public static AppConfig getConfig() {
            return INSTANCE;
        }

        private void init() {

            File resourceDir = new File("src/main/resources");

            if (!(resourceDir.exists() && resourceDir.isDirectory())) {
                return;
            }

            try (InputStream input = new FileInputStream(new File(resourceDir, "app.properties"))) {
                props.load(input);
            } catch (IOException e) {
                e.printStackTrace();
            }

            File localConfig = new File(resourceDir, "local.properties");

            if (localConfig.exists() && localConfig.isFile()) {
                try (InputStream input = new FileInputStream(localConfig)) {
                    Properties localProps = new Properties();
                    localProps.load(input);
                    props.putAll(localProps);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }

            props.keySet().stream().map(obj -> obj.toString()).forEach(
                    key -> System.out.println(key + " : " + props.getProperty(key, "")));
        }

        public Optional<String> getStaticFilesPath() {
            String staticFilesPath = props.getProperty("app.static.files.location", "");
            return staticFilesPath.isEmpty() ? Optional.empty() : Optional.of(staticFilesPath);
        }
    }

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
