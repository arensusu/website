import { useEffect, useState } from "react";
import Header from "./component/Header";
import SearchForm, { SearchFormState } from "./component/bookeeping/SearchForm";
import AddForm, { AddFormState } from "./component/bookeeping/AddForm";

const BASE_API = "http://127.0.0.1:8080/api";

interface DetailInfo {
    id: number;
    user: { username: string };
    category: { name: string };
    date: string;
    cost: number;
}

const Bookkeeping = () => {
    const [detail, setDetail] = useState<DetailInfo[]>([]);
    const [category, setCategory] = useState([]);
    const [apiStatus, setApiStatus] = useState<number>(0);
    const [popupType, setPopupType] = useState<string>("close");

    const popupPage = (type: string) => {
        switch (type) {
            case "login":
                return (
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Login</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={() => setPopupType("close")}
                            />
                        </div>
                        <div className="modal-body">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col">
                                        <form>
                                            <div className="row mb-3">
                                                <div className="col-3">
                                                    <label
                                                        htmlFor="username"
                                                        className="col-form-label"
                                                    >
                                                        Username
                                                    </label>
                                                </div>
                                                <div className="col">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="username"
                                                    />
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-3">
                                                    <label
                                                        htmlFor="password"
                                                        className="col-form-label"
                                                    >
                                                        Password
                                                    </label>
                                                </div>
                                                <div className="col">
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        id="password"
                                                    />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col text-end">
                                                    <button
                                                        type="submit"
                                                        className="btn btn-primary"
                                                    >
                                                        Login
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case "register":
                return (
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Register</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={() => setPopupType("close")}
                            />
                        </div>
                        <div className="modal-body">
                        <div className="container-fluid">
                                <div className="row">
                                    <div className="col">
                                        <form>
                                            <div className="row mb-3">
                                                <div className="col-5">
                                                    <label
                                                        htmlFor="username"
                                                        className="col-form-label"
                                                    >
                                                        Username
                                                    </label>
                                                </div>
                                                <div className="col">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="username"
                                                    />
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-5">
                                                    <label
                                                        htmlFor="password"
                                                        className="col-form-label"
                                                    >
                                                        Password
                                                    </label>
                                                </div>
                                                <div className="col">
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        id="password"
                                                    />
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-5">
                                                    <label
                                                        htmlFor="password"
                                                        className="col-form-label"
                                                    >
                                                        Confirm Password
                                                    </label>
                                                </div>
                                                <div className="col">
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        id="password"
                                                    />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col text-end">
                                                    <button
                                                        type="submit"
                                                        className="btn btn-primary"
                                                    >
                                                        Register
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case "close":
                return <div className="modal-content"></div>;
            default:
                return undefined;
        }
    };

    useEffect(() => {
        const modal = document.getElementById("popup");
        if (modal === null) return;

        if (popupType === "close") {
            modal.style.display = "none";
            modal.className = "modal fade";
        } else {
            modal.style.display = "block";
            modal.className = "modal fade show";
        }
    }, [popupType]);

    const userAction = () => {
        if (localStorage.getItem("jwt") !== null) {
            return (
                <div>
                    <p>123</p>
                    <button
                        className="btn btn-danger"
                        onClick={() => {
                            localStorage.removeItem("jwt");
                        }}
                    >
                        Logout
                    </button>
                </div>
            );
        } else {
            return (
                <div>
                    <button
                        className="btn btn-outline-primary"
                        onClick={() => setPopupType("login")}
                    >
                        Login
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={() => setPopupType("register")}
                    >
                        Register
                    </button>
                </div>
            );
        }
    };

    const printDetails = (data: DetailInfo[]) => {
        if (data.length) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h2 className="h2">Details</h2>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Spending Date</th>
                                        <th>Category</th>
                                        <th>Cost</th>
                                        <th>User</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item) => {
                                        return (
                                            <tr key={item.id}>
                                                <td>{item.date}</td>
                                                <td>{item.category.name}</td>
                                                <td>{item.cost}</td>
                                                <td>{item.user.username}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            );
        }
    };

    useEffect(() => {
        fetch(`${BASE_API}/categories`)
            .then((response) => response.json())
            .then((data) => setCategory(data));
    }, []);

    const searchDetail = (state: SearchFormState) => {
        setApiStatus(0);
        const { category, ...others } = state;
        const queryApi = `${BASE_API}/details?${new URLSearchParams(
            others
        ).toString()}`;
        fetch(queryApi)
            .then((response) => response.json())
            .then((data) => {
                if (category.length !== 0) {
                    setDetail(
                        data.filter((item: any) =>
                            category.includes(item.category.name)
                        )
                    );
                } else {
                    setDetail(data);
                }
            });
    };

    const addDetail = (state: AddFormState) => {
        setDetail([]);
        console.log(state);
        fetch(`${BASE_API}/details`, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(state),
        }).then((response) => setApiStatus(response.status));
    };

    const printApiResult = () => {
        if (apiStatus === 201) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="alert alert-success" role="alert">
                                Add Successfully
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else if (apiStatus === 400) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="alert alert-danger" role="alert">
                                Bad Request
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    };

    return (
        <div>
            <Header />
            <main className="bookkeeping">
                <div className="container">
                    <div className="row justify-content-end">
                        <div className="col-auto">{userAction()}</div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <SearchForm
                                search={searchDetail}
                                categories={category}
                            />
                        </div>
                    </div>
                    <hr className="hr" />
                    <div className="row">
                        <div className="col-12">
                            <AddForm add={addDetail} categories={category} />
                        </div>
                    </div>
                    <hr className="hr" />
                    {printDetails(detail)}
                    {printApiResult()}
                    <div className="modal fade" id="popup">
                        <div className="modal-dialog modal-dialog-centered modal">
                            {popupPage(popupType)}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Bookkeeping;
