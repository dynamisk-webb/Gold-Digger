/*
* promiseNoData displays loading screen when retrieving asynchronous data (suspense)
*/

function promiseNoData(searchPromiseState) {
    
    if(searchPromiseState.promise) {
        if (!searchPromiseState.data) {
            if (!searchPromiseState.error) {
                return <img src="https://media2.giphy.com/media/l4FGv5Ci0WIp8kYhO/giphy.gif?cid=ecf05e47uqy4n8tcdxai9ecd4hx70t9x5078mp0bap8ht6l6&rid=giphy.gif&ct=g"></img>
            }

            return <div >{searchPromiseState.error.toString()}</div>
        }

        return false;
    }
    
    return <div>No data</div>    
}

export default promiseNoData;