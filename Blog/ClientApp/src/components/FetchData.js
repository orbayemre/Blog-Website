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

        const response = await fetch('like/addlike', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ UserId: "3474bcf8-94c0-47c0-9840-e1e9a1900228", StoryId: "sd-111"})
        });
        const data = await response.json();
        console.log(data);

        /*
        // get likes by story id
        const response = await fetch('like/byuserid/ud-333');
        const data = await response.json();
        console.log(data);
        
        // get likes by story id
        const response = await fetch('like/bystoryid/sd-333');
        const data = await response.json();
        console.log(data);
        

        // burasý yanlýzca beðenlerin kim olduðunu görmek için
        //önemli olan kaç kiþinin beðendiði aslýnda
        const response2 = await fetch(`account/${data[0].userId}`);
        const data2 = await response2.json();
        console.log(data2);
        */
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


