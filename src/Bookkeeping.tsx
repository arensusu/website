
import Header from "./Header";

const Bookkeeping = () => {

    return (
        <div>
            <Header />
            <main className='bookkeeping'>
                <div>
                    <button className='read' onClick={()=>{}}>Get the details</button>
                    <button className='write' onClick={()=>{}}>Add new detail</button>
                </div>
            </main>
        </div>
    )
}

export default Bookkeeping;