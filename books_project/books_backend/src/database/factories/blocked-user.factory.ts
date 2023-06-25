import { setSeederFactory } from 'typeorm-extension';
import { BlockedUser } from '../entities/BlockedUser';

export default setSeederFactory(BlockedUser, async (faker) => {
    const isUnblocked = faker.helpers.rangeToNumber({ min: 0, max: 10 }) < 3;

    const startDateMin = new Date();
    startDateMin.setDate(-80);

    const startDateMax = new Date();
    startDateMax.setDate(-20);

    const endDateMin = new Date(startDateMin);
    endDateMin.setDate(startDateMin.getDate() + 1);

    const start = faker.date.between({ from: startDateMin, to: startDateMax });
    const finish = isUnblocked
        ? faker.date.between({ from: endDateMin, to: new Date() })
        : null;

    return new BlockedUser(null, start, finish);
});
