package eagle.lore.model;

public class DiceFormula {

    private final int numberOfDiceRolls;
    private final Dice dice;

    private DiceFormula(int numberOfDiceRolls, Dice dice) {
        super();
        this.numberOfDiceRolls = numberOfDiceRolls;
        this.dice = dice;
    }

    public int getNumberOfDiceRolls() {
        return numberOfDiceRolls;
    }

    public Dice getDice() {
        return dice;
    }

    @Override
    public String toString() {
        return String.format("%dT%d", numberOfDiceRolls, dice.getSides());
    }

    public static DiceFormula create(final int numberOfDiceRolls, final int sidesOnDice) {
        return create(numberOfDiceRolls, new Dice(sidesOnDice));
    }

    public static DiceFormula create(final int numberOfDiceRolls, final Dice dice) {
        return new DiceFormula(numberOfDiceRolls, dice);
    }
}
