import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from '../../database/services/users/users.service';
import { User } from '../../database/entities/User';

describe('UsersController', () => {
    let usersController: UsersController;
    let usersService: UsersService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [UsersService],
        }).compile();

        usersService = await moduleRef.resolve(UsersService);
        usersController = await moduleRef.resolve(UsersController);
    }).useMocker((tocken) => {
        const results = 
    });

    it('should be defined', () => {
        expect(usersController).toBeDefined();
    });

    describe('findAll', () => {
        it('should return an array of cats', async () => {
            const result = new Promise<User>(() => {
                return {
                    name: 'Madyson',
                    email: 'Eloy83@hotmail.com',
                    id: 1,
                };
            });

            jest.spyOn(usersService, 'findOne').mockImplementation(() => result);

            expect(await usersController.findOne({ id: 1 }));
        });
    });
});
