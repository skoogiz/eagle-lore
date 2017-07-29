/**
 * 
 */
package eagle.lore.app;

import java.util.Random;
import java.util.function.Function;

/**
 * @author skoogiz
 *
 */
public class Dice
{
    private final Function<Integer, Integer> randomNumber = nrOfSides -> new Random().nextInt(nrOfSides) + 1;

    private final int sides;

    private int currentValue;

    public Dice(int sides)
    {
        this.sides = sides;
    }

    public int roll()
    {
        this.currentValue = randomNumber.apply(sides);
        return getCurrentValue();
    }

    public int getSides()
    {
        return sides;
    }

    public int getCurrentValue()
    {
        return currentValue;
    }

}
