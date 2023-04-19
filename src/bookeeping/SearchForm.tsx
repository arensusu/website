import React, { useReducer } from "react";
import { SearchFormState } from "../Bookkeeping";

const INITIAL_STATE: SearchFormState = {
    user: "",
    startDate: "",
    endDate: "",
    category: [],
};

const ACTION_TYPE = {
    USER: "USER",
    START_DATE: "START_DATE",
    END_DATE: "END_DATE",
    CATEGORY: "CATEGORY",
    RESET: "RESET",
};

interface Action {
    type: string;
    payload?: any;
}
interface CategoryInfo {
    id: number;
    name: string;
}
interface Prop {
    search(state: SearchFormState): void;
    categories: CategoryInfo[];
}

const SearchForm = (props: Prop) => {
    const reducer = (state: SearchFormState, action: Action) => {
        switch (action.type) {
            case ACTION_TYPE.USER:
                return { ...state, user: action.payload };
            case ACTION_TYPE.START_DATE:
                return { ...state, startDate: action.payload };
            case ACTION_TYPE.END_DATE:
                return { ...state, endDate: action.payload };
            case ACTION_TYPE.CATEGORY:
                if (action.payload.checked) {
                    return {
                        ...state,
                        category: [...state.category, action.payload.value],
                    };
                } else {
                    return {
                        ...state,
                        category: state.category.filter(
                            (item) => item !== action.payload.value
                        ),
                    };
                }
            case ACTION_TYPE.RESET:
                return INITIAL_STATE;
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

    const toElement = (categories: CategoryInfo[]) => {
        return categories.map((item) => {
            return (
                <div key={item.id}>
                    <input
                        type="checkbox"
                        name="search-category"
                        id={`search-${item.id}`}
                        value={item.name}
                        checked={state.category.includes(item.name)}
                        onChange={(event) =>
                            dispatch({
                                type: ACTION_TYPE.CATEGORY,
                                payload: {
                                    value: event.target.value,
                                    checked: event.target.checked,
                                },
                            })
                        }
                    />
                    <label htmlFor={`search-${item.id}`}>{item.name}</label>
                </div>
            );
        });
    };

    return (
        <div className="read">
            <h2>Search the details</h2>
            <form
                id="search-form"
                onSubmit={(event) => {
                    event.preventDefault();
                    props.search(state);
                    dispatch({ type: ACTION_TYPE.RESET });
                }}
            >
                <label htmlFor="search-username">Username: </label>
                <input
                    type="text"
                    id="search-username"
                    name="user"
                    value={state.user}
                    onChange={(event) =>
                        dispatch({
                            type: ACTION_TYPE.USER,
                            payload: event.target.value,
                        })
                    }
                />
                <label htmlFor="search-start-date">Start Date: </label>
                <input
                    type="date"
                    id="search-start-date"
                    name="startDate"
                    value={state.startDate}
                    onChange={(event) =>
                        dispatch({
                            type: ACTION_TYPE.START_DATE,
                            payload: event.target.value,
                        })
                    }
                />
                <label htmlFor="search-end-date">End Date: </label>
                <input
                    type="date"
                    id="search-end-date"
                    name="endDate"
                    value={state.endDate}
                    onChange={(event) =>
                        dispatch({
                            type: ACTION_TYPE.END_DATE,
                            payload: event.target.value,
                        })
                    }
                />
                <div>
                    <span>Category: </span>
                    {toElement(props.categories)}
                </div>
                <input type="submit" value="Search" />
            </form>
        </div>
    );
};

export default SearchForm;
