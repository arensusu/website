import { useEffect, useState } from "react";
import Header from "./component/Header";
import SearchForm, { SearchFormState } from "./component/bookeeping/SearchForm";
import AddForm, { AddFormState } from "./component/bookeeping/AddForm";
import UserForm, { UserFormState } from "./component/bookeeping/UserForm";

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

    const getDetailApi = (state: SearchFormState) => {
        setApiStatus(0);
        const { category, ...others } = state;
        const queryApi = `${BASE_API}/details?${new URLSearchParams(
            others
        ).toString()}`;

        const jwtToken = localStorage.getItem("jwt");
        fetch(queryApi, { headers: { "Authorization": `Bearer ${jwtToken}` }})
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

    const postDetailApi = (state: AddFormState) => {
        setDetail([]);
        console.log(state);
        fetch(`${BASE_API}/details`, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(state),
        }).then((response) => setApiStatus(response.status));
    };

    const postUserApi = async (type: string, state: UserFormState) => {
        let api: string;
        if (type === "login") {
            api = `${BASE_API}/login`;
        } else if (type === "register") {
            api = `${BASE_API}/register`;
        } else {
            api = "";
            console.log("invalid type");
        }

        const response = await fetch(api, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(state),
        });
        if (response.ok) {
            const data = await response.json();
            localStorage.setItem("jwt", data.jwt);
        }
    }

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
                    <div className="row">
                        <UserForm action={postUserApi} />
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <SearchForm
                                search={getDetailApi}
                                categories={category}
                            />
                        </div>
                    </div>
                    <hr className="hr" />
                    <div className="row">
                        <div className="col-12">
                            <AddForm add={postDetailApi} categories={category} />
                        </div>
                    </div>
                    <hr className="hr" />
                    {printDetails(detail)}
                    {printApiResult()}
                </div>
            </main>
        </div>
    );
};

export default Bookkeeping;
