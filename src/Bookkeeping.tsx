
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Header from "./Header";

const BASE_API = "http://182.233.181.107/api"

const Bookkeeping = () => {

    const [apiData, setApiData] = useState([]);
    const [searchFormData, setSearchFormData] = useState<{ user: string; startDate: string; endDate: string; category: string[]}>({ user: '', startDate: '', endDate: '', category: []});
    const [addFormData, setAddFormData] = useState<{ user: string; date: string; category: string; cost: string}>({ user: '', date: '', category: '', cost: ''});
    const [category, setCategory] = useState([])

    const handleSearchFormChange = (event: ChangeEvent<HTMLInputElement>) => {
        const attrName = event.target.name;
        const attrValue = event.target.value;
        if (attrName === 'search-category') {
            const isChecked = event.target.checked;
            const isExisted = searchFormData.category.indexOf(attrValue) !== -1;
            if (isChecked && !isExisted) {
                setSearchFormData({ ...searchFormData, category: [...searchFormData.category, attrValue]});
            }
            else if (!isChecked && isExisted) {
                setSearchFormData({ ...searchFormData, category: searchFormData.category.filter(item => item !== attrValue)});
            }
        } else {
            setSearchFormData({...searchFormData, [attrName]: attrValue});
        }
    };

    const printDetails = (data: any[]) => {
        return data.map(item => {
            return (
                <tr key={item.id}>
                    <td>{item.date}</td>
                    <td>{item.category.name}</td>
                    <td>{item.cost}</td>
                    <td>{item.user.name}</td>
                </tr>
            )
        })
    };

    useEffect(() => {
        fetch(`${BASE_API}/categories`)
        .then(response => response.json())
        .then(data => setCategory(data))
    }, []);

    const readData = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { category, ...others} = searchFormData;
        const queryApi = `${BASE_API}/details?${new URLSearchParams(others).toString()}`;
        fetch(queryApi)
        .then(response => response.json())
        .then(data => {
            if (category.length !== 0) {
                setApiData(data.filter((item: any) => category.includes(item.category.name)));
            } else {
                setApiData(data);
            }
        });
        setSearchFormData({ user: '', startDate: '', endDate: '', category: []});
    };

    const writeData = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        fetch(`${BASE_API}/details`, {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(addFormData),
        })
        .then(response => response.json())
        .catch(error => console.log(error));
    };

    const getCategory = (data: any[]) => {
        return data.map(item => {
            return (
                <label htmlFor={`search-${item.id}`} key={item.id}>
                    <input type='checkbox' name='search-category' id={`search-${item.id}`} value={item.name} checked={searchFormData.category.includes(item.name)} onChange={handleSearchFormChange} />{item.name}
                </label>
            )
        })
    }

    return (
        <div>
            <Header />
            <main className='bookkeeping'>
                <div className='read'>
                    <h2>Search the details</h2>
                    <form id='search-form' onSubmit={readData}>
                        <label htmlFor='search-username'>Username: </label>
                        <input type='text' id='search-username' name='user' value={searchFormData.user} onChange={handleSearchFormChange} />
                        <label htmlFor='search-start-date'>Start Date: </label>
                        <input type='date' id='search-start-date' name='startDate' value={searchFormData.startDate} onChange={handleSearchFormChange} />
                        <label htmlFor='search-end-date'>End Date: </label>
                        <input type='date' id='search-end-date' name='endDate' value={searchFormData.endDate} onChange={handleSearchFormChange} />
                        <div>
                            <span>Category: </span>
                            {getCategory(category)}
                        </div>
                        <input type='submit' value='Search' />
                    </form>
                </div>
                <hr/>
                <div className='write'>
                    <h2>Add a new detail</h2>
                    <form id='add-form' onSubmit={writeData}>
                        <label htmlFor='add-username'>Username: </label><input type='text' id='add-username' />
                        <label htmlFor='add-date'>Date: </label><input type='date' id='add-date' />
                        <label htmlFor='add-category'>Category: </label>
                        <select name='add-category' id='add-category'>
                            <option value='all'>All</option>
                        </select>
                        <input type='submit' value='Add' />
                    </form>
                </div>
                <hr/>
                <div className='detail'>
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
                            {printDetails(apiData)}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    )
}

export default Bookkeeping;