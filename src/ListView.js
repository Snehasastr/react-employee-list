import React, { useEffect, useState } from 'react';
import './ListView.css';

const ListView = () => {
    const [data, setData] = useState([]);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://reqres.in/api/users?page=2');
                const json = await response.json();
                setData(json.data);
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };

    const filteredData = data.filter((item) =>
        item.first_name.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div className="list-view">
            <h1>Employee List</h1>
            <input
                type="text"
                placeholder="Search by first name"
                value={searchText}
                onChange={handleSearch}
            />
            <ul className="employee-list">
                {filteredData.map((employee) => (
                    <li key={employee.id}>
                        <img src={employee.avatar} alt="Avatar" />
                        <span>{employee.first_name}</span>
                        <span>ID: {employee.id}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListView;
