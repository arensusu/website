import { useEffect, useState } from "react";
import Header from "./Header";
import SearchForm from "./bookeeping/SearchForm";
import AddForm from "./bookeeping/AddForm";

const BASE_API = "http://182.233.181.107/api";

export interface SearchFormState {
    user: string;
    startDate: string;
    endDate: string;
    category: string[];
}
export interface AddFormState {
    user: string;
    category: string;
    date: string;
    cost: number;
}
interface DetailInfo {
    id: number;
    user: { name: string };
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
                <div className="detail">
                    <h2>Details</h2>
                    <table>
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
                                        <td>{item.user.name}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
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
        const body = {
            user: { name: state.user },
            category: { name: state.category },
            cost: state.cost,
            date: state.date,
        };
        fetch(`${BASE_API}/details`, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        }).then((response) => setApiStatus(response.status));
    };

    const printApiResult = () => {
        if (apiStatus === 201) {
            return (<p>Add Successfully</p>);
        } else if (apiStatus === 400) {
            return (<p>Bad Request</p>)
        }
    }

    return (
        <div>
            <Header />
            <main className="bookkeeping">
                <SearchForm search={searchDetail} categories={category} />
                <hr />
                <AddForm add={addDetail} categories={category} />
                <hr />
                {printDetails(detail)}
                {printApiResult()}
            </main>
        </div>
    );
};

export default Bookkeeping;
