"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Author_1 = require("../entities/Author");
class AuthorSeeder {
    async run(dataSource, factoryManager) {
        return dataSource.getRepository(Author_1.Author).save([
            {
                name: 'Лев Толстой',
                description: 'Русский писатель, один из самых известных и великих романистов и мыслителей Российской империи.',
                detailsLink: 'https://ru.wikipedia.org/wiki/Толстой,_Лев_Николаевич',
                image: 'lev_tolstoy.jpg',
            },
            {
                name: 'Фёдор Достоевский',
                description: 'Русский писатель, один из крупнейших представителей русской литературы.',
                detailsLink: 'https://ru.wikipedia.org/wiki/Достоевский,_Фёдор_Михайлович',
                image: 'fyodor_dostoevsky.jpg',
            },
            {
                name: 'Михаил Булгаков',
                description: 'Русский писатель-фантаст, драматург и филолог, автор романа "Мастер и Маргарита".',
                detailsLink: 'https://ru.wikipedia.org/wiki/Булгаков,_Михаил_Афанасьевич',
                image: 'mikhail_bulgakov.jpg',
            },
            {
                name: 'Михаил Лермонтов',
                description: 'Русский поэт, прозаик, драматург, автор романа "Герой нашего времени".',
                detailsLink: 'https://ru.wikipedia.org/wiki/Лермонтов,_Михаил_Юрьевич',
                image: 'mikhail_lermontov.jpg',
            },
            {
                name: 'Александр Пушкин',
                description: 'Русский поэт, драматург и прозаик, основоположник современного русского литературного языка.',
                detailsLink: 'https://ru.wikipedia.org/wiki/Пушкин,_Александр_Сергеевич',
                image: 'alexander_pushkin.jpg',
            },
            {
                name: 'Иван Тургенев',
                description: 'Русский писатель и драматург, автор романа "Отцы и дети".',
                detailsLink: 'https://ru.wikipedia.org/wiki/Тургенев,_Иван_Сергеевич',
                image: 'ivan_turgenev.jpg',
            },
            {
                name: 'Жюль Верн',
                description: 'Французский писатель, один из самых известных авторов научной фантастики и приключенческой литературы.',
                detailsLink: 'https://ru.wikipedia.org/wiki/Верн,_Жюль',
                image: 'jules_verne.jpg',
            },
            {
                name: 'Михаил Шолохов',
                description: 'Русский писатель, лауреат Нобелевской премии по литературе за роман "Тихий Дон".',
                detailsLink: 'https://ru.wikipedia.org/wiki/Шолохов,_Михаил_Александрович',
                image: 'mikhail_sholokhov.jpg',
            },
            {
                name: 'Илья Ильф',
                description: 'Советский писатель и журналист, соавтор знаменитой дуэтной комедийной пары Ильфа и Петрова.',
                detailsLink: 'https://ru.wikipedia.org/wiki/Ильф,_Илья_Арнольдович',
                image: 'ilya_ilf.jpg',
            },
            {
                name: 'Алексей Толстой',
                description: 'Русский писатель, автор исторических романов и сказок.',
                detailsLink: 'https://ru.wikipedia.org/wiki/Толстой,_Алексей_Николаевич',
                image: 'alexei_tolstoy.jpg',
            },
            {
                name: 'Николай Гоголь',
                description: 'Русский писатель, один из основоположников русской и украинской прозы.',
                detailsLink: 'https://ru.wikipedia.org/wiki/Гоголь,_Николай_Васильевич',
                image: 'nikolai_gogol.jpg',
            },
            {
                name: 'Дмитрий Глуховский',
                description: 'Российский писатель, автор постапокалиптического романа "Метро 2033".',
                detailsLink: 'https://ru.wikipedia.org/wiki/Глуховский,_Дмитрий_Александрович',
                image: 'dmitry_glukhovsky.jpg',
            },
            {
                name: 'Иван Гончаров',
                description: 'Русский писатель, автор романа "Обломов".',
                detailsLink: 'https://ru.wikipedia.org/wiki/Гончаров,_Иван_Александрович',
                image: 'ivan_goncharov.jpg',
            },
            {
                name: 'Юрий Нагибин',
                description: 'Юрий Нагибин, советский и российский писатель, автор романов, повестей, рассказов, эссе, драматург, литературный критик.',
                detailsLink: 'https://ru.wikipedia.org/wiki/Нагибин,_Юрий_Михайлович',
                image: 'yuri_nagibin.jpg',
            },
            {
                name: 'Евгений Петров',
                description: 'Евгений Петров, писатель, совместно с Ильей Ильфом создатель знаменитой дуэтной комедийной пары Ильфа и Петрова.',
                detailsLink: 'https://ru.wikipedia.org/wiki/Петров,_Евгений_Петрович',
                image: 'evgeny_petrov.jpg',
            },
            {
                name: 'Уильям Шекспир',
                description: 'Уильям Шекспир, английский драматург, поэт и актёр, наиболее известный драматург в истории литературы.',
                detailsLink: 'https://ru.wikipedia.org/wiki/Шекспир,_Уильям',
                image: 'william_shakespeare.jpg',
            },
            {
                name: 'Франц Кафка',
                description: 'Франц Кафка, австрийско-немецкий писатель, один из ведущих представителей европейской литературы XX века.',
                detailsLink: 'https://ru.wikipedia.org/wiki/Кафка,_Франц',
                image: 'franz_kafka.jpg',
            },
            {
                name: 'Жан-Поль Сартр',
                description: 'Жан-Поль Сартр, французский писатель, философ, драматург, основатель экзистенциализма.',
                detailsLink: 'https://ru.wikipedia.org/wiki/Сартр,_Жан-Поль',
                image: 'jean-paul_sartre.jpg',
            },
            {
                name: 'Эрнест Хемингуэй',
                description: 'Эрнест Хемингуэй, американский писатель и журналист, лауреат Нобелевской премии по литературе.',
                detailsLink: 'https://ru.wikipedia.org/wiki/Хемингуэй,_Эрнест',
                image: 'ernest_hemingway.jpg',
            },
            {
                name: 'Джордж Оруэлл',
                description: 'Джордж Оруэлл, английский писатель, журналист и эссеист, автор знаменитых произведений "1984" и "Скотный двор".',
                detailsLink: 'https://ru.wikipedia.org/wiki/Оруэлл,_Джордж',
                image: 'george_orwell.jpg',
            },
            {
                name: 'Федерико Гарсиа Лорка',
                description: 'Федерико Гарсиа Лорка, испанский поэт и драматург, один из крупнейших представителей испанской литературы XX века.',
                detailsLink: 'https://ru.wikipedia.org/wiki/Лорка,_Федерико_Гарсиа',
                image: 'federico_garcia_lorca.jpg',
            },
            {
                name: 'Эмили Дикинсон',
                description: 'Эмили Дикинсон, американская поэтесса, одна из величайших и наиболее оригинальных поэтов в истории американской литературы.',
                detailsLink: 'https://ru.wikipedia.org/wiki/Дикинсон,_Эмили',
                image: 'emily_dickinson.jpg',
            },
            {
                name: 'Фрэнсис Скотт Фицджеральд',
                description: 'Фрэнсис Скотт Фицджеральд, американский писатель, автор знаменитого романа "Великий Гэтсби".',
                detailsLink: 'https://ru.wikipedia.org/wiki/Фицджеральд,_Фрэнсис_Скотт',
                image: 'francis_scott_fitzgerald.jpg',
            },
            {
                name: 'Джейн Остин',
                description: 'Джейн Остин, английская писательница, автор классических романов XIX века, таких как "Гордость и предубеждение" и "Эмма".',
                detailsLink: 'https://ru.wikipedia.org/wiki/Остин,_Джейн',
                image: 'jane_austen.jpg',
            },
            {
                name: 'Чарльз Диккенс',
                description: 'Чарльз Диккенс, английский писатель, один из самых известных и популярных авторов викторианской эпохи.',
                detailsLink: 'https://ru.wikipedia.org/wiki/Диккенс,_Чарльз',
                image: 'charles_dickens.jpg',
            },
        ]);
    }
}
exports.default = AuthorSeeder;
//# sourceMappingURL=015_author.seeder.js.map