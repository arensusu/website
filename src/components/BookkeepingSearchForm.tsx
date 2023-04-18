import React, { useReducer } from 'react';

const INITIAL_STATE: State = {
    user: '',
    startDate: '',
    endDate: '',
    category: [],
}

const ACTION = {
    USER: 'USER',
    START_DATE: 'START_DATE',
    END_DATE: 'END_DATE',
    CATEGORY: 'CATEGORY'
}

type State = { user: string; startDate: string; endDate: string; category: string[] };
type Action = { type: string, payload: any }

const BookkeepingSearchForm = () => {
    const reducer = (state: State, action: Action) => {
        switch(action.type) {
            case ACTION.USER:
                return { ...state, user: action.payload };
            case ACTION.START_DATE:
                return { ...state, startDate: action.payload };
            case ACTION.END_DATE:
                return { ...state, endDate: action.payload };
            case ACTION.CATEGORY:

            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

    const searchCategory = (data: any[]) => {
        return data.map(item => {
            return (
                <label htmlFor={`search-${item.id}`} key={item.id}>
                    <input type='checkbox' name='search-category' id={`search-${item.id}`} value={item.name} checked={searchFormData.category.includes(item.name)} onChange={handleSearchFormChange} />{item.name}
                </label>
            )
        })
    }

    return (
        <div className='read'>
            <h2>Search the details</h2>
            <form id='search-form' onSubmit={readData}>
                <label htmlFor='search-username'>Username: </label>
                <input type='text' id='search-username' name='user' value={state.user} onChange={(event) => dispatch({ type: ACTION.USER, payload: event.target.value })} />
                <label htmlFor='search-start-date'>Start Date: </label>
                <input type='date' id='search-start-date' name='startDate' value={state.startDate} onChange={(event) => dispatch({ type: ACTION.START_DATE, payload: event.target.value })} />
                <label htmlFor='search-end-date'>End Date: </label>
                <input type='date' id='search-end-date' name='endDate' value={state.endDate} onChange={(event) => dispatch({ type: ACTION.END_DATE, payload: event.target.value })} />
                <div>
                    <span>Category: </span>
                    {searchCategory(category)}
                </div>
                <input type='submit' value='Search' />
            </form>
        </div>
    )
};

export default BookkeepingSearchForm;