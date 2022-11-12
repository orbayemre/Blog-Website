import React, { Component } from 'react';

export class FetchData extends Component {
    static displayName = FetchData.name;

    constructor(props) {
        super(props);
    }


    render() {
    return (
        <div>
            <h1 onClick={this.Login} id="tabelLabel" >Login</h1>
            <p onClick={this.GetData}>GET</p >
            <p onClick={this.LogOut}><em>LOG OUT</em></p>
        </div>
    );
    }

    async LogOut() {
        const response = await fetch('account/logout', {
            method: 'POST'
        });
        const data = await response.json();
        console.log(data);
    }
    async GetData() {
        const response = await fetch('story');
        const data = await response.json();
        console.log(data);
    }
     
    async Login() {
        const response = await fetch('account/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ UserName: "", Email:"Ali2@gmail.com", Password: "4343"})
        });
        const data = await response.json();
        console.log(data);

    }
}


