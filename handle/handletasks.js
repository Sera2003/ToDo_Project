import axios from 'axios'

const baseUrl ="http://localhost:5036"


const getallToDo =(setTasks) => {
  // Get the token from local storage
  const token = localStorage.getItem('token');

  axios.get(baseUrl, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then(({data}) => {
    console.log('data --->',data);
    setTasks(data)
  })
  .catch(error =>{
    console.log("Error in Reading tasks",error)
  });
}

const addToDo =(text,setText,setTasks) => {
  
  const token = localStorage.getItem('token');

  axios.post(`${baseUrl}/createtask`, {text}, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then((data) =>{
    console.log(data);
    setText("")
    return getallToDo(setTasks)
  })
}


const updateTodo =(toDoId,setTasks) =>{
    
    axios.put(`${baseUrl}/updatetask/` +toDoId)
    .then(result => { 
      console.log(result);
      return getallToDo(setTasks)
    })
    .catch(err =>console.log(err))
    }

    const deleteTodo =(_id,setTasks) =>{
    
        axios.delete(`${baseUrl}/deletetask/`+_id).then((data) => {
  return getallToDo(setTasks)
        
        })
        .catch((err)=>console.log(err))
        }

export {getallToDo,addToDo,updateTodo,deleteTodo}