package eagle.lore.model;

import java.util.Optional;

import eagle.lore.app.Dices;

public interface Ability {
    String getKey();

    String getFormula();

    default int generateValue() {
        Optional<Integer> value = Dices.calculateValue(getFormula());
        return value.isPresent() ? value.get() : -1;
    }

    static Ability create(final String key, final String formula) {
        return new Ability() {

            @Override
            public String getKey() {
                return key.toUpperCase();
            }

            @Override
            public String getFormula() {
                return formula.toUpperCase();
            }
        };
    }
}
