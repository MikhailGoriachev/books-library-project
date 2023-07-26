import { setSeederFactory } from 'typeorm-extension';
import { UserPassword } from '../entities/UserPassword';
import * as bcrypt from 'bcrypt'

export default setSeederFactory(UserPassword, async (faker) => {
    const isServiceAuth = faker.helpers.rangeToNumber({ min: 0, max: 10 }) < 5;
    const salt = 10;
    return new UserPassword(
        null,
        !isServiceAuth ? (await bcrypt.hash(faker.internet.password(), salt)) : null,
        isServiceAuth,
    );
});
