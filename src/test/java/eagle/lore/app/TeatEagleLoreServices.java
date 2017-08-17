package eagle.lore.app;

import static io.restassured.RestAssured.*;
import static org.hamcrest.Matchers.*;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.net.Socket;

import org.junit.Assume;
import org.junit.Before;
import org.junit.Test;

public class TeatEagleLoreServices
{
    @Before
    public void ping()
    {
        // Check that web-service is available
        Assume.assumeTrue(pingHost("localhost", 4567, 3000));
    }

    @Test
    public void testRollAbility()
    {
        // Happy case
        given()
            .proxy(4567)
            .when()
            .get("/roll/{ability}/{dices}", "STY", "3T6")
            .then()
            .statusCode(200)
            .body("ability", equalTo("STY"))
            .body("value", is(both(greaterThan(2)).and(lessThan(19))));

        // With invalid dice formula
        given()
            .proxy(4567)
            .when()
            .get("/roll/{ability}/{dices}", "STY", "ABC")
            .then()
            .statusCode(400);
    }

    public static boolean pingHost(String host, int port, int timeout)
    {
        try (Socket socket = new Socket())
        {
            socket.connect(new InetSocketAddress(host, port), timeout);
            return true;
        }
        catch (IOException e)
        {
            return false;
        }
    }

}
