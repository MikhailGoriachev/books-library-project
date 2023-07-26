import { BookRatingsService } from '../../../database/services/book-ratings/book-ratings.service';
import { BookRatingFilterDto } from '../../../dto/filters/book-rating-filter.dto';
import { BookRatingDto } from '../../../dto/crud/book-rating.dto';
import { BookRating } from '../../../database/entities/BookRating';
export declare class BookRatingsController {
    private _bookRatingsService;
    constructor(_bookRatingsService: BookRatingsService);
    findAll(filter: BookRatingFilterDto): Promise<BookRating[]>;
    findOne(filter: BookRatingFilterDto): Promise<BookRating>;
    findOneById(id: number): Promise<BookRating>;
    create(item: BookRatingDto): Promise<BookRating>;
    update(item: BookRatingDto): Promise<BookRating>;
}
