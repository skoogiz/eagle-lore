package eagle.lore.model.helper;

import java.util.Arrays;

import eagle.lore.dao.MonsterDao;
import eagle.lore.model.Ability;
import eagle.lore.model.DiceFormula;
import eagle.lore.model.Monster;

public class MonsterHelper {

    public static final DiceFormula DEFAULT_FORMULA = DiceFormula.create(3, 6);

    public static Monster createDwarf() {
        return Monster.create("Dvärg",
                "Dvärgar är inom fantasygenren en humanoid, småväxt och satt art (alltså inte en småvuxen människa) som är baserad på och har många likheter med de dvärgar som skildras i bland annat fornnordisk mytologi.",
                Arrays.asList(ability(AbilityType.STY, 4, 6), ability(AbilityType.STO, 2, 6),
                        ability(AbilityType.FYS, 2, 6), ability(AbilityType.SMI), ability(AbilityType.INT),
                        ability(AbilityType.PSY), ability(AbilityType.KAR)));
    }

    public static Monster createElf() {
        return Monster.create("Alv",
                "Alver är ett folkslag som återkommer i många rollspel. Främsta anledningen till dess popularitet är att de har en framträdande roll i J.R.R. Tolkiens böcker och mytologi.",
                Arrays.asList(ability(AbilityType.STY, 2, 6), ability(AbilityType.STO, 2, 6), ability(AbilityType.FYS),
                        ability(AbilityType.SMI, 4, 6), ability(AbilityType.INT, 4, 6), ability(AbilityType.PSY),
                        ability(AbilityType.KAR)));
    }

    public static Monster createHuman() {
        return Monster.create("Människa",
                "Människa (Homo sapiens = den visa/tänkande människan) är ett däggdjur av släktet Homo. Människan tillhör familjen hominider och som i sin tur tillhör ordningen primater. Alla nu levande människor tillhör underarten Homo sapiens sapiens.[1] Ytterligare en förmodad underart av människan är känd, den utdöda Homo sapiens idaltu. Till släktet homo ingår även de utdöda arterna neandertalmänniskan, Homo floresiensis och Homo erectus.",
                Arrays.asList(ability(AbilityType.STY), ability(AbilityType.STO), ability(AbilityType.FYS),
                        ability(AbilityType.SMI), ability(AbilityType.INT), ability(AbilityType.PSY),
                        ability(AbilityType.KAR)));
    }

    public static Monster createOrc() {
        return Monster.create("Orch",
                "Orcherna eller orkerna (på engelska orc, från ett ord som används för att beskriva odjuret Grendel i Beowulf, eller från den romerska guden Orcus, dödsguden) är fiktiva humanoida varelser som först uppträdde i J.R.R. Tolkiens Midgård, vilket är vår egen värld med ett sagolikt förflutet, där de är varelser underställda mörkrets furste Melkor (senare Morgoth) och hans efterträdare Sauron.",
                Arrays.asList(ability(AbilityType.STY, 4, 6), ability(AbilityType.STO), ability(AbilityType.FYS),
                        ability(AbilityType.SMI), ability(AbilityType.INT, 2, 6), ability(AbilityType.PSY),
                        ability(AbilityType.KAR, 2, 6)));
    }

    public static DiceFormula formula(int nrOfDices, int sides) {
        return DiceFormula.create(nrOfDices, sides);
    }

    public static Ability ability(AbilityType type) {
        return Ability.create(type.name(), DEFAULT_FORMULA);
    }

    public static Ability ability(AbilityType type, int nrOfDices, int sides) {
        return Ability.create(type.name(), formula(nrOfDices, sides));
    }

    public static void initStore() {
        MonsterDao dao = MonsterDao.getInstance();
        dao.add(createDwarf());
        dao.add(createElf());
        dao.add(createHuman());
        dao.add(createOrc());
    }

    public enum AbilityType {
        STY, STO, FYS, SMI, INT, PSY, KAR;
    }

}
