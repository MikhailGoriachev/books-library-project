import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Book } from '../entities/Book';

export default class BookSeeder implements Seeder {
    run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        return dataSource.getRepository(Book).save([
            // 0
            {
                title: 'Война и мир',
                description: 'Исторический роман, описывающий жизнь аристократической семьи во время войн против Наполеона.',
                image: 'war_and_peace.jpg',
                price: 1500.00,
                publicationYear: 1869,
                isbn: '978-5-990-00241-4',
            },
            // 1
            {
                title: 'Преступление и наказание',
                description: 'Роман о молодом студенте, совершившем преступление и пытающемся оправдать свои действия.',
                image: 'crime_and_punishment.jpg',
                price: 1200.00,
                publicationYear: 1866,
                isbn: '978-5-990-00242-1',
            },
            // 2
            {
                title: 'Анна Каренина',
                description: 'История любовной страсти и трагедии женщины, пытающейся найти счастье в запретной любви.',
                image: 'anna_karenina.jpg',
                price: 1350.00,
                publicationYear: 1877,
                isbn: '978-5-990-00243-8',
            },
            // 3
            {
                title: 'Мастер и Маргарита',
                description: 'Философско-фантастический роман о дьяволе, который посещает Москву и разворачивает целую серию необычных событий.',
                image: 'master_and_margarita.jpg',
                price: 1100.00,
                publicationYear: 1967,
                isbn: '978-5-990-00244-5',
            },
            // 4
            {
                title: 'Герой нашего времени',
                description: 'Роман о герое, который отказывается от общественных норм и вступает в противоречия со своим окружением.',
                image: 'hero_of_our_time.jpg',
                price: 1000.00,
                publicationYear: 1840,
                isbn: '978-5-990-00261-2',
            },
            // 5
            {
                title: 'Братья Карамазовы',
                description: 'Психологический роман о семейных отношениях, религии и моральных дилеммах.',
                image: 'the_brothers_karamazov.jpg',
                price: 1400.00,
                publicationYear: 1880,
                isbn: '978-5-990-00246-9',
            },
            // 6
            {
                title: 'Дубровский',
                description: 'Приключенческий роман о молодом дворянине, который сражается за справедливость и любовь.',
                image: 'dubrovsky.jpg',
                price: 950.00,
                publicationYear: 1841,
                isbn: '978-5-990-00247-6',
            },
            // 7
            {
                title: 'Евгений Онегин',
                description: 'Роман в стихах, повествующий о жизни молодого придворного и его сложных отношениях с окружающими.',
                image: 'eugene_onegin.jpg',
                price: 1050.00,
                publicationYear: 1833,
                isbn: '978-5-990-00248-3',
            },
            // 8
            {
                title: 'Отцы и дети',
                description: 'Роман о столкновении поколений и их идеалов, описывающий конфликт между отцами и их детьми.',
                image: 'fathers_and_sons.jpg',
                price: 1150.00,
                publicationYear: 1862,
                isbn: '978-5-990-00249-0',
            },
            // 9
            {
                title: 'Дети капитана Гранта',
                description: 'Приключенческий роман о поисках пропавшего капитана и его детей на необитаемом острове.',
                image: 'captain_grants_children.jpg',
                price: 975.00,
                publicationYear: 1868,
                isbn: '978-5-990-00241-4',
            },
            // 10
            {
                title: 'Тихий Дон',
                description: 'Эпический роман, описывающий события гражданской войны в России и судьбу казачьей семьи.',
                image: 'quiet_flows_the_don.jpg',
                price: 1450.00,
                publicationYear: 1940,
                isbn: '978-5-990-00242-1',
            },
            // 11
            {
                title: '12 стульев',
                description: 'Комический роман о поисках сокровищ, спрятанных в одном из двенадцати стульев.',
                image: 'the_twelve_chairs.jpg',
                price: 1025.00,
                publicationYear: 1928,
                isbn: '978-5-990-00243-8',
            },
            // 12
            {
                title: 'Двенадцать',
                description: 'Роман о событиях русской революции и судьбах участников повстанческого отряда.',
                image: 'the_twelve.jpg',
                price: 1075.00,
                publicationYear: 1918,
                isbn: '978-5-990-00244-5',
            },
            // 13
            {
                title: 'Мёртвые души',
                description: 'Сатирический роман о чиновниках и обществе, основанный на идее о покупке мертвых крестьян.',
                image: 'dead_souls.jpg',
                price: 1125.00,
                publicationYear: 1842,
                isbn: '978-5-990-00245-2',
            },
            // 14
            {
                title: 'Пиковая дама',
                description: 'Рассказ о страшном секрете, который становится причиной одержимости главного героя.',
                image: 'the_queen_of_spades.jpg',
                price: 1175.00,
                publicationYear: 1834,
                isbn: '978-5-990-00246-9',
            },
            // 15
            {
                title: 'Метро 2033',
                description: 'Постапокалиптический роман о выживании людей в московском метро после ядерной катастрофы.',
                image: 'metro_2033.jpg',
                price: 1200.00,
                publicationYear: 2005,
                isbn: '978-5-990-00247-6',
            },
            // 16
            {
                title: 'Обломов',
                description: 'Роман о бездельнике и лентяе, который отказывается от активной жизни и предпочитает бездельничать.',
                image: 'oblomov.jpg',
                price: 925.00,
                publicationYear: 1859,
                isbn: '978-5-990-00248-3',
            },
            // 17
            {
                title: 'Председатель',
                description: 'Егор Трубников возвращается в родную деревню, все разорено, на колхозной работе заняты одни женщины - все мужчины на заработках в городе. Егор становится председателем колхоза и принимается за возрождение хозяйства…',
                image: 'the_chairman.jpg',
                price: 975.00,
                publicationYear: 1998,
                isbn: '978-5-990-00249-0',
            },
            // 18
            {
                title: 'Тарас Бульба',
                description: 'Центральными темами повести являются патриотизм и героизм запорожских казаков. Торжество духовности показано, прежде всего, в главном герое - Тарасе Бульбе, судьба которого полна драматизма.',
                image: 'taras_bulba.jpg',
                price: 1050.00,
                publicationYear: 1835,
                isbn: '978-5-990-00240-7',
            },
        ]);
    }
}