import { produce } from "immer";

const book = {
    author: "Robert Kiyosaki",
    book: {
        name: "Rich Dad Poor Dad",
        price: "$8",
        rating: 4.7,
    },
};

const newBook = produce(book, (darftState) => {
    darftState.book.price = "$10";
    darftState.book.rating = 4.8;
});

console.log(newBook);

const arrayOfBooks = ["Book1", "Book2", "Book3"];
const newArray = arrayOfBooks.map((book) =>
    book === "Book2" ? "Book4" : book
);

console.log(newArray);
