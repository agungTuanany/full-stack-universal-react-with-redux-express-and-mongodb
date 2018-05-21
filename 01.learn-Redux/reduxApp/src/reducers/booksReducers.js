"user strict"

// BOOK REDUCERS
export function bookReducers(state = {
    books:
        [{
            _id: 1,
            title: 'this is book title',
            description: 'this is the book description',
            price: 55.33
        }, {
            _id: 2,
            title: 'this is the second book title',
            description: 'this is the second book description',
            price: 66
        }]
    }, action) {
    switch (action.type) {
        case "GET_BOOKS":
        return { ...state, books: [...state.books] }
        break;

        case "POST_BOOK":
        return { books: [ ...state.books, ...action.payload ] }
        break;

        case "DELETE_BOOK":
        const currentBookToDelete = [...state.books]
        const indexToDelete = currentBookToDelete.findIndex((book) => book._id == action.payload)

        return { books: [...currentBookToDelete.slice(0, indexToDelete),
            ...currentBookToDelete.slice(indexToDelete + 1)] }
        break;

        case "UPDATE_BOOK":
        const currentBookToUpdate =[...state.books]
        const indexToUpdate = currentBookToUpdate.findIndex((book) => book._id === action.payload._id);
        const newBookToUpdate =
            {
                ...currentBookToUpdate[indexToUpdate],
                title: action.payload.title,
                description: action.payload.description
            }
        console.log("what is it newBookToUpdate", newBookToUpdate);

        return {
            books: [...currentBookToUpdate.slice(0, indexToUpdate),
            newBookToUpdate,
            ...currentBookToUpdate.slice(indexToUpdate +1)]
        }
        break;
    }
    return state
}