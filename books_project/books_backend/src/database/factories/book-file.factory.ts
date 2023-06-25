import { setSeederFactory } from 'typeorm-extension';
import { BookFile } from '../entities/BookFile';

export default setSeederFactory(BookFile, async (faker) => new BookFile(
    faker.string.uuid(),
    null,
    null
));
