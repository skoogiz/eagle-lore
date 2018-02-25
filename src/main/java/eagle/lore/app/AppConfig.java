package eagle.lore.app;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Optional;
import java.util.Properties;

public enum AppConfig {
    INSTANCE;

    private Logger logger = LoggerFactory.getLogger(AppConfig.class);

    private Properties props = new Properties();

    AppConfig() {
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
            logger.error("Error reading app.properties file.", e);
        }

        File localConfig = new File(resourceDir, "local.properties");

        if (localConfig.exists() && localConfig.isFile()) {
            try (InputStream input = new FileInputStream(localConfig)) {
                Properties localProps = new Properties();
                localProps.load(input);
                props.putAll(localProps);
            } catch (IOException e) {
                logger.error("Error reading local.properties file.", e);
            }
        }

        props.keySet().stream().map(Object::toString).forEach(
                key -> logger.info(key + " : " + props.getProperty(key, "")));
    }

    public Optional<String> getProperty(String key) {
        return Optional.ofNullable(props.getProperty(key));
    }

    public Optional<String> getStaticFilesPath() {
        Optional<String> path = getProperty("app.static.files.location");
        return path
                .map((dir) -> new File(dir))
                .flatMap(AppConfig::getPath);
    }

    private static Optional<String> getPath(File file) {
        return file.exists() && file.isDirectory()
                ? Optional.of(file.getAbsolutePath()) : Optional.empty();
    }
}