export interface Book {
    author: string;
    cover: string;
    description: string;
    isbn: string;
    title: string;
    categoryName?: string;
    customerReviewRank?: number;
    itemId: number;
};

export interface BookApiResponse {
    item: Book[];
}