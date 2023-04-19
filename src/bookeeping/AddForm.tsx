import React, { useReducer } from "react";
import { AddFormState } from "../Bookkeeping";

const INITIAL_STATE: AddFormState = {
    user: "",
    category: "",
    date: "",
    cost: 0,
};

const ACTION_TYPE = {
    USER: "USER",
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
            case ACTION_TYPE.USER:
                return { ...state, user: action.payload };
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
                <option value={item.name} key={item.id}>
                    {item.name}
                </option>
            );
        });
    };

    return (
        <div className="write">
            <h2>Add a new detail</h2>
            <form
                id="add-form"
                onSubmit={(event) => {
                    event.preventDefault();
                    props.add(state);
                    dispatch({ type: ACTION_TYPE.RESET });
                }}
            >
                <label htmlFor="add-username">Username: </label>
                <input
                    type="text"
                    id="add-username"
                    name="user"
                    value={state.user}
                    onChange={(event) =>
                        dispatch({
                            type: ACTION_TYPE.USER,
                            payload: event.target.value,
                        })
                    }
                />
                <label htmlFor="add-category">Category: </label>
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
                >
                    <option value="">Please select</option>
                    {addCategory(props.categories)}
                </select>
                <label htmlFor="add-date">Date: </label>
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
                />
                <label htmlFor="add-cost">Cost: </label>
                <input
                    type="text"
                    id="add-cost"
                    name="cost"
                    value={state.cost}
                    onChange={(event) =>
                        dispatch({
                            type: ACTION_TYPE.COST,
                            payload: event.target.value,
                        })
                    }
                />
                <input type="submit" value="Add" />
            </form>
        </div>
    );
};

export default AddForm;
