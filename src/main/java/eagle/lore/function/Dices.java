package eagle.lore.function;

import java.util.Optional;

import eagle.lore.model.Dice;

public class Dices {
    public static Optional<Integer> calculateValue(final String formula) {
        if (formula.matches("\\d+T\\d+")) {
            int index = formula.indexOf('T');
            String nrOfDices = formula.substring(0, index);
            String sidesOnDices = formula.substring(index + 1);

            Dice dice = new Dice(Integer.parseInt(sidesOnDices));
            int sum = 0;
            for (int i = 0; i < Integer.parseInt(nrOfDices); i++) {
                sum += dice.roll();
            }
            return Optional.of(sum);
        } else {
            return Optional.empty();
        }
    }

    public static String generateValue(final String formula) {
        if (formula.matches("\\d+T\\d+")) {
            int index = formula.indexOf('T');
            String nrOfDices = formula.substring(0, index);
            String sidesOnDices = formula.substring(index + 1);

            Dice dice = new Dice(Integer.parseInt(sidesOnDices));
            int sum = 0;
            String resultat = "";
            for (int i = 0; i < Integer.parseInt(nrOfDices); i++) {
                int roll = dice.roll();
                if (i > 0) {
                    resultat += " + ";
                }
                resultat += roll;
                sum += roll;
            }
            return 0 + " = " + sum;
        }
        return "[ogiltigt input!]";
    }
}
