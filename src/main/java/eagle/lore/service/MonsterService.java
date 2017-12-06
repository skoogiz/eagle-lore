package eagle.lore.service;

import eagle.lore.dao.MonsterDao;
import eagle.lore.model.Monster;
import io.reactivex.Observable;

public class MonsterService {

    private static final MonsterService INSTANCE = new MonsterService(MonsterDao.getInstance());

    private MonsterDao monsterDao;

    public MonsterService(MonsterDao monsterDao) {
        super();
        this.monsterDao = monsterDao;
    }

    public static MonsterService getInstance() {
        return INSTANCE;
    }

    public Observable<Monster> fetchAll() {
        return Observable.fromIterable(monsterDao.getAll());
    }
}
