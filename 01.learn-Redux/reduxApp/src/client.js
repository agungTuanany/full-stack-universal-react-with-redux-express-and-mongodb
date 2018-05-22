"user strict"

// IMPORT REACT
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect, browserHistory } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

// IMPORT COMBINED REDUCERS
import reducers from './reducers/index';

// IMPORT ACTIONS
import { addToCart } from './actions/cartActions';
import { postBooks, deleteBooks, updateBooks } from './actions/booksActions';

// Step 1 create the store
const middleware = applyMiddleware(thunk, logger);
const store = createStore(reducers, middleware);

// COMPONENT
import BooksList from './components/pages/BooksList';
import BooksForm from './components/pages/BooksForm';
import Cart from './components/pages/Cart';
import Menu from './components/Menu'
import Footer from './components/Footer';

const Routes = (
    <Provider store={store}>
        <Router history={browserHistory}>
            <div>
                <Menu />
                <Switch>
                    <Route exact path='/' component={BooksList}/>
                    <Route path="/admin" component={BooksForm}/>
                    <Route path="/cart" component={Cart}/>
                </Switch>
                <Footer />
            </div>
        </Router>
    </Provider>
)

render(
    Routes, document.getElementById('app')
);

// // step 2 create and dispatch action
// store.dispatch(postBooks(

// ))

// // DELETE a book
// store.dispatch(deleteBooks(
//     { id: 1 }
// ))

// // UPDATE a book
// store.dispatch(updateBooks(
//     {
//         id: 2,
//         title: 'THE 24h Redux course',
//         description: 'id two change the description'
//     }
// ))

// // -->> CART ACTIONS <<--
// // ADD to cart

// store.dispatch(addToCart([{ id: 1 }]))