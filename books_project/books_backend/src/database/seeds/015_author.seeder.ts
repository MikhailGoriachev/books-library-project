import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Author } from '../entities/Author';

export default class AuthorSeeder implements Seeder {
    async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager,
    ): Promise<any> {
        return dataSource.getRepository(Author).save([
            // 0
            {
                name: 'Лев Толстой',
                description: 'Русский писатель, один из самых известных и великих романистов и мыслителей Российской империи.',
                detailsLink: 'https://ru.wikipedia.org/wiki/Толстой,_Лев_Николаевич',
                image: 'lev_tolstoy.jpg',
            },
            // 1
            {
                name: 'Фёдор Достоевский',
                description: 'Русский писатель, один из крупнейших представителей русской литературы.',
                detailsLink: 'https://ru.wikipedia.org/wiki/Достоевский,_Фёдор_Михайлович',
                image: 'fyodor_dostoevsky.jpg',
            },
            // 2
            {
                name: 'Михаил Булгаков',
                description: 'Русский писатель-фантаст, драматург и филолог, автор романа "Мастер и Маргарита".',
                detailsLink: 'https://ru.wikipedia.org/wiki/Булгаков,_Михаил_Афанасьевич',
                image: 'mikhail_bulgakov.jpg',
            },
            // 3
            {
                name: 'Михаил Лермонтов',
                description: 'Русский поэт, прозаик, драматург, автор романа "Герой нашего времени".',
                detailsLink: 'https://ru.wikipedia.org/wiki/Лермонтов,_Михаил_Юрьевич',
                image: 'mikhail_lermontov.jpg',
            },
            // 4
            {
                name: 'Александр Пушкин',
                description: 'Русский поэт, драматург и прозаик, основоположник современного русского литературного языка.',
                detailsLink: 'https://ru.wikipedia.org/wiki/Пушкин,_Александр_Сергеевич',
                image: 'alexander_pushkin.jpg',
            },
            // 5
            {
                name: 'Иван Тургенев',
                description: 'Русский писатель и драматург, автор романа "Отцы и дети".',
                detailsLink: 'https://ru.wikipedia.org/wiki/Тургенев,_Иван_Сергеевич',
                image: 'ivan_turgenev.jpg',
            },
            // 6
            {
                name: 'Жюль Верн',
                description: 'Французский писатель, один из самых известных авторов научной фантастики и приключенческой литературы.',
                detailsLink: 'https://ru.wikipedia.org/wiki/Верн,_Жюль',
                image: 'jules_verne.jpg',
            },
            // 7
            {
                name: 'Михаил Шолохов',
                description: 'Русский писатель, лауреат Нобелевской премии по литературе за роман "Тихий Дон".',
                detailsLink: 'https://ru.wikipedia.org/wiki/Шолохов,_Михаил_Александрович',
                image: 'mikhail_sholokhov.jpg',
            },
            // 8
            {
                name: 'Илья Ильф',
                description: 'Советский писатель и журналист, соавтор знаменитой дуэтной комедийной пары Ильфа и Петрова.',
                detailsLink: 'https://ru.wikipedia.org/wiki/Ильф,_Илья_Арнольдович',
                image: 'ilya_ilf.jpg',
            },
            // 9
            {
                name: 'Алексей Толстой',
                description: 'Русский писатель, автор исторических романов и сказок.',
                detailsLink: 'https://ru.wikipedia.org/wiki/Толстой,_Алексей_Николаевич',
                image: 'alexei_tolstoy.jpg',
            },
            // 10
            {
                name: 'Николай Гоголь',
                description: 'Русский писатель, один из основоположников русской и украинской прозы.',
                detailsLink: 'https://ru.wikipedia.org/wiki/Гоголь,_Николай_Васильевич',
                image: 'nikolai_gogol.jpg',
            },
            // 11
            {
                name: 'Дмитрий Глуховский',
                description: 'Российский писатель, автор постапокалиптического романа "Метро 2033".',
                detailsLink: 'https://ru.wikipedia.org/wiki/Глуховский,_Дмитрий_Александрович',
                image: 'dmitry_glukhovsky.jpg',
            },
            // 12
            {
                name: 'Иван Гончаров',
                description: 'Русский писатель, автор романа "Обломов".',
                detailsLink: 'https://ru.wikipedia.org/wiki/Гончаров,_Иван_Александрович',
                image: 'ivan_goncharov.jpg',
            },
            // 13
            {
                name: 'Юрий Нагибин',
                description: 'Юрий Нагибин, советский и российский писатель, автор романов, повестей, рассказов, эссе, драматург, литературный критик.',
                detailsLink: 'https://ru.wikipedia.org/wiki/Нагибин,_Юрий_Михайлович',
                image: 'yuri_nagibin.jpg',
            },
            // 14
            {
                name: 'Евгений Петров',
                description: 'Евгений Петров, писатель, совместно с Ильей Ильфом создатель знаменитой дуэтной комедийной пары Ильфа и Петрова.',
                detailsLink: 'https://ru.wikipedia.org/wiki/Петров,_Евгений_Петрович',
                image: 'evgeny_petrov.jpg',
            },
            // 15
            {
                name: 'Уильям Шекспир',
                description: 'Уильям Шекспир, английский драматург, поэт и актёр, наиболее известный драматург в истории литературы.',
                detailsLink: 'https://ru.wikipedia.org/wiki/Шекспир,_Уильям',
                image: 'william_shakespeare.jpg',
            },
            // 16
            {
                name: 'Франц Кафка',
                description: 'Франц Кафка, австрийско-немецкий писатель, один из ведущих представителей европейской литературы XX века.',
                detailsLink: 'https://ru.wikipedia.org/wiki/Кафка,_Франц',
                image: 'franz_kafka.jpg',
            },
            // 17
            {
                name: 'Жан-Поль Сартр',
                description: 'Жан-Поль Сартр, французский писатель, философ, драматург, основатель экзистенциализма.',
                detailsLink: 'https://ru.wikipedia.org/wiki/Сартр,_Жан-Поль',
                image: 'jean-paul_sartre.jpg',
            },
            // 18
            {
                name: 'Эрнест Хемингуэй',
                description: 'Эрнест Хемингуэй, американский писатель и журналист, лауреат Нобелевской премии по литературе.',
                detailsLink: 'https://ru.wikipedia.org/wiki/Хемингуэй,_Эрнест',
                image: 'ernest_hemingway.jpg',
            },
            // 19
            {
                name: 'Джордж Оруэлл',
                description: 'Джордж Оруэлл, английский писатель, журналист и эссеист, автор знаменитых произведений "1984" и "Скотный двор".',
                detailsLink: 'https://ru.wikipedia.org/wiki/Оруэлл,_Джордж',
                image: 'george_orwell.jpg',
            },
            // 20
            {
                name: 'Федерико Гарсиа Лорка',
                description: 'Федерико Гарсиа Лорка, испанский поэт и драматург, один из крупнейших представителей испанской литературы XX века.',
                detailsLink: 'https://ru.wikipedia.org/wiki/Лорка,_Федерико_Гарсиа',
                image: 'federico_garcia_lorca.jpg',
            },
            // 21
            {
                name: 'Эмили Дикинсон',
                description: 'Эмили Дикинсон, американская поэтесса, одна из величайших и наиболее оригинальных поэтов в истории американской литературы.',
                detailsLink: 'https://ru.wikipedia.org/wiki/Дикинсон,_Эмили',
                image: 'emily_dickinson.jpg',
            },
            // 22
            {
                name: 'Фрэнсис Скотт Фицджеральд',
                description: 'Фрэнсис Скотт Фицджеральд, американский писатель, автор знаменитого романа "Великий Гэтсби".',
                detailsLink: 'https://ru.wikipedia.org/wiki/Фицджеральд,_Фрэнсис_Скотт',
                image: 'francis_scott_fitzgerald.jpg',
            },
            // 23
            {
                name: 'Джейн Остин',
                description: 'Джейн Остин, английская писательница, автор классических романов XIX века, таких как "Гордость и предубеждение" и "Эмма".',
                detailsLink: 'https://ru.wikipedia.org/wiki/Остин,_Джейн',
                image: 'jane_austen.jpg',
            },
            // 24
            {
                name: 'Чарльз Диккенс',
                description: 'Чарльз Диккенс, английский писатель, один из самых известных и популярных авторов викторианской эпохи.',
                detailsLink: 'https://ru.wikipedia.org/wiki/Диккенс,_Чарльз',
                image: 'charles_dickens.jpg',
            },
        ]);
    }
}
