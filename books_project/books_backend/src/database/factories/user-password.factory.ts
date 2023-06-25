import { setSeederFactory } from 'typeorm-extension';
import { UserPassword } from '../entities/UserPassword';

export default setSeederFactory(UserPassword, async (faker) => {
    const isServiceAuth = faker.helpers.rangeToNumber({ min: 0, max: 10 }) < 5;
    return new UserPassword(
        null,
        !isServiceAuth ? faker.internet.password() : null,
        isServiceAuth,
    );
});
