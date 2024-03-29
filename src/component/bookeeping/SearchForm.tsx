import React, { useReducer } from "react";
import { currentDate, lastSevenDays, thisMonthStart, thisMonthEnd, lastMonthStart, lastMonthEnd } from "../helper/date";

export interface SearchFormState {
    startDate: string;
    endDate: string;
    category: string[];
}

const INITIAL_STATE: SearchFormState = {
    startDate: "",
    endDate: "",
    category: [],
};

const ACTION_TYPE = {
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
                <div key={item.name} className="col-auto">
                    <div className="row gx-2">
                        <div className="col">
                            <input
                                type="checkbox"
                                name="search-category"
                                id={`search-${item.name}`}
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
                            <label
                                htmlFor={`search-${item.name}`}
                                className="form-check-label"
                            >
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
            <div className="row">
                <div className="col">
                    <h2 className="h2">Search the details</h2>
                    <form
                        id="search-form"
                        onSubmit={(event) => {
                            event.preventDefault();
                            props.search(state);
                            dispatch({ type: ACTION_TYPE.RESET });
                        }}
                    >
                        <div className="row mb-3 text-center">
                            <div className="col">
                                <button type="button" className="btn btn-secondary" onClick={() => {
                                    dispatch({ type: ACTION_TYPE.START_DATE, payload: currentDate() }) 
                                    dispatch({ type: ACTION_TYPE.END_DATE, payload: currentDate() })
                                }}>Today</button>
                            </div>
                            <div className="col">
                                <button type="button" className="btn btn-secondary" onClick={() => {
                                    dispatch({ type: ACTION_TYPE.START_DATE, payload: lastSevenDays() })
                                    dispatch({ type: ACTION_TYPE.END_DATE, payload: currentDate() })
                                }}>Last 7 days</button>
                            </div>
                            <div className="col">
                                <button type="button" className="btn btn-secondary" onClick={() => {
                                    dispatch({ type: ACTION_TYPE.START_DATE, payload: lastMonthStart() })
                                    dispatch({ type: ACTION_TYPE.END_DATE, payload: lastMonthEnd() })
                                }}>Last month</button>
                            </div>
                            <div className="col">
                                <button type="button" className="btn btn-secondary" onClick={()=>{
                                    dispatch({ type: ACTION_TYPE.START_DATE, payload: thisMonthStart() })
                                    dispatch({ type: ACTION_TYPE.END_DATE, payload: thisMonthEnd() })
                                }}>This month</button>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label
                                htmlFor="search-start-date"
                                className="col-sm-2 col-form-label"
                            >
                                Start Date
                            </label>
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
                        <div className="row mb-3">
                            <label
                                htmlFor="search-end-date"
                                className="col-sm-2 col-form-label"
                            >
                                End Date
                            </label>
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
                        <div className="row mb-3">
                            <label
                                className="col-sm-2 col-form-label"
                                htmlFor="search-category"
                            >
                                Category
                            </label>
                            <div className="col" id="search-category">
                                <div className="row">
                                    {toElement(props.categories)}
                                </div>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-sm-10 offset-sm-2">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SearchForm;
