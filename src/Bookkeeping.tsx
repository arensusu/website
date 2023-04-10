
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Header from "./Header";

const Bookkeeping = () => {
    const api = "https://192.168.0.16:8000/api/details/";

    const [apiData, setApiData] = useState([]);
    const [searchFormData, setSearchFormData] = useState<{ user: string; startDate: string; endDate: string; category: string[]}>({ user: '', startDate: '', endDate: '', category: []});

    const handleSearchFormChange = (event: ChangeEvent<HTMLInputElement>) => {
        const attrName = event.target.name;
        const attrValue = event.target.value;
        if (attrName == 'search-category') {
            const isChecked = event.target.checked;
            const isExisted = searchFormData.category.indexOf(attrValue) != -1;
            if (isChecked && !isExisted) {
                setSearchFormData({ ...searchFormData, category: [...searchFormData.category, attrValue]});
            }
            else if (!isChecked && isExisted) {
                setSearchFormData({ ...searchFormData, category: searchFormData.category.filter(item => item != attrValue)});
            }
        } else {
            setSearchFormData({...searchFormData, [attrName]: attrValue});
        }
    };

    useEffect(() => {
        console.log(searchFormData);
    }, [searchFormData]);

    const readData = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { category, ...others} = searchFormData;
        const queryApi = `${api}?${new URLSearchParams(others).toString()}`;
        fetch(queryApi)
        .then(response => response.json())
        .then(data => setApiData(data.filter((item: any) => category.includes(item.category.name))))
        setSearchFormData({ user: '', startDate: '', endDate: '', category: []});
    };

    const writeData = () => {};
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
                            <label htmlFor='search-all'>
                                <input type='checkbox' name='search-category' id='search-test' value='test' onChange={handleSearchFormChange} />test
                            </label>
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
                    <div>
                        {apiData.map(data => {
                            return (
                            <tr>
                                <td>date</td>
                                <td>category</td>
                                <td>cost</td>
                            </tr>
                            );
                        })}
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Bookkeeping;