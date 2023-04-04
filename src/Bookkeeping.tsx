
import Header from "./Header";

const Bookkeeping = () => {

    const readData = () => {};
    const writeData = () => {};
    return (
        <div>
            <Header />
            <main className='bookkeeping'>
                <div className='read'>
                    <h2>Search the details</h2>
                    <form action='' method='post' id='search-form'>
                        <label htmlFor='search-username'>Username: </label><input type='text' id='search-username' />
                        <label htmlFor='search-start-date'>Start Date: </label><input type='date' id='search-start-date' />
                        <label htmlFor='search-end-date'>End Date: </label><input type='date' id='search-end-date' />
                        <div>
                            <span>Category: </span>
                            <label htmlFor='search-all'><input type='checkbox' name='search-category' id='search-all' value='all' />All</label>
                        </div>
                        <input type='submit' onClick={readData} value='Search' />
                    </form>
                </div>
                <hr/>
                <div className='write'>
                    <h2>Add a new detail</h2>
                    <form action='' method='post' id='add-form'>
                        <label htmlFor='add-username'>Username: </label><input type='text' id='add-username' />
                        <label htmlFor='add-date'>Date: </label><input type='date' id='add-date' />
                        <label htmlFor='add-category'>Category: </label>
                        <select name='add-category' id='add-category'>
                            <option value='all'>All</option>
                        </select>
                        <input type='submit' onClick={writeData} value='Add' />
                    </form>
                </div>
                <hr/>
                <div className='detail'>
                    <h2>Details</h2>
                    <div></div>
                </div>
            </main>
        </div>
    )
}

export default Bookkeeping;