import { setSeederFactory } from 'typeorm-extension';
import { User } from '../entities/User';

export default setSeederFactory(User, async (faker) => new User(
    faker.person.firstName(),
    faker.internet.email(),
));