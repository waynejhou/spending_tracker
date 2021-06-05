import ReactDOM from 'react-dom';
import React, { Component, useState } from 'react';

export type AppProps = {

}

export const App: React.FC<AppProps> = props =>{
    const [fetched, setFetched] = useState("")
    fetch("/api/helloworld")
        .then(async res=>{
            setFetched(await res.json())
        })
    return (
        <div>
            <div>
                Hello World! from readering client
            </div>
            <div>
                {fetched} from fetched api
            </div>
        </div>
    )
}