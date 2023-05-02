import { useEffect, useState } from "react";
import Header from "./component/Header";
import SearchForm, {SearchFormState} from "./component/bookeeping/SearchForm";
import AddForm, {AddFormState} from "./component/bookeeping/AddForm";

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
    }

    return (
        <div>
            <Header />
            <main className="bookkeeping">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <SearchForm search={searchDetail} categories={category} />
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
                </div>
            </main>
        </div>
    );
};

export default Bookkeeping;
