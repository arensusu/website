
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Header from "./Header";

const BASE_API = "http://192.168.0.16:8000/api"

const Bookkeeping = () => {

    const [apiData, setApiData] = useState([]);
    const [searchFormData, setSearchFormData] = useState<{ user: string; startDate: string; endDate: string; category: string[]}>({ user: '', startDate: '', endDate: '', category: []});
    const [addFormData, setAddFormData] = useState<{ user: string; date: string; category: string; cost: string}>({ user: '', date: '', category: '', cost: ''});
    const [category, setCategory] = useState([]);

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

    const handleAddFormChange = (event: ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
        const attrName = event.target.name;
        const attrValue = event.target.value;
        if (attrName === 'add-category') {
            setAddFormData({ ...addFormData, category: attrValue});
        } else {
            setAddFormData({...addFormData, [attrName]: attrValue});
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
            .then(() => console.log('test'));
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
        const body = {
            user: { name: addFormData.user },
            category: { name: addFormData.category },
            cost: addFormData.cost,
            date: addFormData.date
        }
        fetch(`${BASE_API}/details`, {
            method: 'post', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        })
            .then(response => {
                
            });
        setAddFormData({ user: '', date: '', cost: '', category: '' });
    };

    const searchCategory = (data: any[]) => {
        return data.map(item => {
            return (
                <label htmlFor={`search-${item.id}`} key={item.id}>
                    <input type='checkbox' name='search-category' id={`search-${item.id}`} value={item.name} checked={searchFormData.category.includes(item.name)} onChange={handleSearchFormChange} />{item.name}
                </label>
            )
        })
    }

    const addCategory = (data: any[]) => {
        return data.map(item => {
            return (
                <option value={item.name} key={item.id}>{item.name}</option>
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
                            {searchCategory(category)}
                        </div>
                        <input type='submit' value='Search' />
                    </form>
                </div>
                <hr/>
                <div className='write'>
                    <h2>Add a new detail</h2>
                    <form id='add-form' onSubmit={writeData}>
                        <label htmlFor='add-username'>Username: </label><input type='text' id='add-username' name='user' value={addFormData.user} onChange={handleAddFormChange} />
                        <label htmlFor='add-date'>Date: </label><input type='date' id='add-date' name='date' value={addFormData.date} onChange={handleAddFormChange} />
                        <label htmlFor='add-cost'>Cost: </label><input type='text' id='add-cost' name='cost' value={addFormData.cost} onChange={handleAddFormChange} />
                        <label htmlFor='add-category'>Category: </label>
                        <select name='add-category' id='add-category' value={addFormData.category} onChange={handleAddFormChange}>
                            <option value=''>Please select</option>
                            {addCategory(category)}
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