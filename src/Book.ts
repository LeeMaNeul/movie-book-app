export interface Book {
    author: string;
    cover: string;
    description: string;
    isbn: string;
    title: string;
    categoryName?: string;
    customerReviewRank?: Number;
    itemId: Number;
};

export interface BookApiResponse {
    item: Book[];
}