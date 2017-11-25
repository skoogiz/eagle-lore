package eagle.lore.model;

import java.util.List;

public interface Monster {

    String getRace();

    String getDesciption();

    List<Ability> getAbilities();

    static Monster create(final String race, final String description, final List<Ability> abilities) {
        return new Monster() {

            @Override
            public String getRace() {
                return race;
            }

            @Override
            public String getDesciption() {
                return description;
            }

            @Override
            public List<Ability> getAbilities() {
                return abilities;
            }
        };
    }
}
