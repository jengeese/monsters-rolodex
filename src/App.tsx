import { useState, useEffect, ChangeEvent } from "react";
import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";
import "./App.css";

import { getData } from "./utils/fetch.utils";

export type Monster = {
  id: string;
  name: string;
  email: string;
}

const App = () => {
  const [searchField, setSearchField] = useState("");
  const [title, setTitle] = useState ("");
  const [monsters, setMonsters] = useState<Monster[]>([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);
  
  
  useEffect(()=>{   //////// useEffect is used to prevent loop issue. When you write fetch function out of useEffect it goes into a loop. useEffect fires thnigs under it up just once
    // fetch("https://jsonplaceholder.typicode.com/users")
    // .then((response) => response.json())
    // .then((users) => setMonsters(users));

    const fetchUsers = async () => {
      const users = await getData<Monster[]>('https://jsonplaceholder.typicode.com/users')
      setMonsters(users);
    };
    fetchUsers();
  },[]);

  useEffect(()=>{  /////////// instead of triggering all the time, useEffect provides after change trigger for monsters and searchField
    // console.log('rendered');
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });
    setFilteredMonsters(newFilteredMonsters);
  },[monsters, searchField]);


  const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };
  const onTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setTitle(searchFieldString);
  };
 
 

  return (
    <div className="App">
      <h1 className="app-title">{title}</h1>
      <SearchBox
        className={"monster-search-box"}
        onChangeHandler={onSearchChange}
        placeholder={"search monsters"}
      />
      <br/>
      <SearchBox
        className={"title-search-box"}
        onChangeHandler={onTitleChange}
        placeholder={"set title"}
      />
      <CardList monsters={filteredMonsters} />
    </div>
  );
};

// class App extends Component {
//   constructor() {
//     super();

//     this.state = {
//       monsters: [],
//       searchField: "",
//     };
//     // console.log("state 1");
//   }

// componentDidMount() {
//   fetch("https://jsonplaceholder.typicode.com/users")
//   .then((response) =>response.json())
//   .then((users) =>this.setState(() => {
//         return { monsters: users };
//       }));
// }

// onSearchChange = (event) => {
//   const searchField = event.target.value.toLocaleLowerCase();
//   this.setState(() => {
//     return { searchField };
//   });
// };

//   render() {
//     // console.log("render 2");

//     const { monsters, searchField } = this.state; //instead of writing this.state.monsters and this.state.searchFiled that provides to write only monsters and searchField
//     const { onSearchChange } = this; // same function as above

//     const filteredMonsters = monsters.filter((monster) => {
//       return monster.name.toLocaleLowerCase().includes(searchField);
//     });
//     return (
//       <div className="App">
//         <h1 className='app-title'>Monsters Rolodex</h1>
//         <SearchBox
//           className={"search-box"}
//           onChangeHandler={onSearchChange}
//           placeholder={"search monsters"}
//         />
//         <CardList monsters={filteredMonsters} />
//       </div>
//     );
//   }
// }

export default App;
