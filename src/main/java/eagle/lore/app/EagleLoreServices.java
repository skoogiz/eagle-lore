package eagle.lore.app;

import static spark.Spark.get;
import static spark.Spark.staticFiles;

public class EagleLoreServices
{

    public static void main(String[] args)
    {
        staticFiles.location("/public");

        get(
            "/roll/:ability/:dices",
            (req, res) -> "<span>" +
                req.params(":ability") +
                " " +
                Dices.generateValue(req.params(":dices")) +
                "</span>");
    }

}
