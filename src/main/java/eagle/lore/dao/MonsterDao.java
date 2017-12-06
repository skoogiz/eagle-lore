package eagle.lore.dao;

import java.util.Collection;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

import eagle.lore.model.Monster;

public enum MonsterDao {

    INSTANCE;

    private final List<Monster> localMonsterStore = new CopyOnWriteArrayList<>();

    public static MonsterDao getInstance() {
        return INSTANCE;
    }

    public synchronized void add(Monster monster) {
        getInstance().localMonsterStore.add(monster);
    }

    public synchronized void remove(Monster monster) {
        getInstance().localMonsterStore.remove(monster);
    }

    public Collection<Monster> getAll() {
        return getInstance().localMonsterStore;
    }

}
