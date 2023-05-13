import React, { useReducer } from "react";

export interface AddFormState {
    category: string;
    date: string;
    cost: string;
}

const INITIAL_STATE: AddFormState = {
    category: "",
    date: "",
    cost: "",
};

const ACTION_TYPE = {
    CATEGORY: "CATEGORY",
    DATE: "DATE",
    COST: "COST",
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
    add(state: AddFormState): void;
    categories: CategoryInfo[];
}

const AddForm = (props: Prop) => {
    const reducer = (state: AddFormState, action: Action) => {
        switch (action.type) {
            case ACTION_TYPE.CATEGORY:
                return { ...state, category: action.payload };
            case ACTION_TYPE.DATE:
                return { ...state, date: action.payload };
            case ACTION_TYPE.COST:
                return { ...state, cost: action.payload };
            case ACTION_TYPE.RESET:
                return INITIAL_STATE;
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

    const addCategory = (categories: CategoryInfo[]) => {
        return categories.map((item) => {
            return (
                <option value={item.name} key={item.name}>
                    {item.name}
                </option>
            );
        });
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col">
                    <h2 className="h2">Add a new detail</h2>
                    <form
                        id="add-form"
                        onSubmit={(event) => {
                            event.preventDefault();
                            props.add(state);
                            dispatch({ type: ACTION_TYPE.RESET });
                        }}
                    >
                        <div className="row mb-3">
                            <label
                                htmlFor="add-category"
                                className="col-sm-2 col-form-label"
                            >
                                Category
                            </label>
                            <div className="col-sm-10">
                                <select
                                    name="add-category"
                                    id="add-category"
                                    value={state.category}
                                    onChange={(event) =>
                                        dispatch({
                                            type: ACTION_TYPE.CATEGORY,
                                            payload: event.target.value,
                                        })
                                    }
                                    className="form-select"
                                >
                                    <option value="">Select a category</option>
                                    {addCategory(props.categories)}
                                </select>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label
                                htmlFor="add-date"
                                className="col-sm-2 col-form-label"
                            >
                                Date
                            </label>
                            <div className="col-sm-10">
                                <input
                                    type="date"
                                    id="add-date"
                                    name="date"
                                    value={state.date}
                                    onChange={(event) =>
                                        dispatch({
                                            type: ACTION_TYPE.DATE,
                                            payload: event.target.value,
                                        })
                                    }
                                    className="form-control"
                                />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label
                                htmlFor="add-cost"
                                className="col-sm-2 col-form-label"
                            >
                                Cost
                            </label>
                            <div className="col-sm-10">
                                <input
                                    type="number"
                                    id="add-cost"
                                    name="cost"
                                    value={state.cost}
                                    onChange={(event) =>
                                        dispatch({
                                            type: ACTION_TYPE.COST,
                                            payload: event.target.value,
                                        })
                                    }
                                    className="form-control"
                                />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-sm-10 offset-sm-2">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddForm;
