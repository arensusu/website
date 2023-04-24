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
                <div key={item.id} className="col-auto">
                    <div className="row gx-2">
                        <div className="col">
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
                                className="form-check-input"
                            />
                        </div>
                        <div className="col-auto">
                            <label htmlFor={`search-${item.id}`} className="form-check-label">
                                {item.name}
                            </label>
                        </div>
                    </div>
                </div>
            );
        });
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col">
                    <h2 className="pt-5">Search the details</h2>
                    <form
                        id="search-form"
                        onSubmit={(event) => {
                            event.preventDefault();
                            props.search(state);
                            dispatch({ type: ACTION_TYPE.RESET });
                        }}
                    >
                        <div className="row justify-content-center pt-3">
                            <div className="col-2">
                                <label
                                    htmlFor="search-username"
                                    className="form-label"
                                >
                                    Username:{" "}
                                </label>
                            </div>
                            <div className="col">
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
                                    className="form-control"
                                />
                            </div>
                        </div>
                        <div className="row justify-content-center pt-2">
                            <div className="col-2">
                                <label
                                    htmlFor="search-start-date"
                                    className="form-label"
                                >
                                    Start Date:{" "}
                                </label>
                            </div>
                            <div className="col">
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
                                    className="form-control"
                                />
                            </div>
                        </div>
                        <div className="row justify-content-center pt-2">
                            <div className="col-2">
                                <label
                                    htmlFor="search-end-date"
                                    className="form-label"
                                >
                                    End Date:{" "}
                                </label>
                            </div>
                            <div className="col">
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
                                    className="form-control"
                                />
                            </div>
                        </div>
                        <div className="row pt-2">
                            <label
                                className="form-label col-2"
                                htmlFor="search-category"
                            >
                                Category:{" "}
                            </label>
                            <div className="col" id="search-category">
                                <div className="row">
                                    {toElement(props.categories)}
                                </div>
                            </div>
                        </div>
                        <div className="row pt-2">
                            <div className="col-auto">
                                <input
                                    className="btn btn-primary"
                                    type="submit"
                                    value="Search"
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SearchForm;
