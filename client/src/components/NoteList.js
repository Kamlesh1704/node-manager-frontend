import React, {useRef, useState, useEffect } from "react";

const NoteList = (props) => {
  const host = "https://node-manager-back-k.onrender.com";
  const [search, setSearch] = useState("");
  const ref = useRef(null)
  const refclose = useRef(null)
  const [note, setNote] = useState({id: "", etitle: "", edescription: ""});
  const notesInitial = []

  const [notes, setNotes] = useState(notesInitial);

  useEffect(()=> {
    const getNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          },
        });
        const json = await response.json();
        console.log(json);
        setNotes(json);
    };
    getNotes();
  },[])
  const updateNote = (currentNote)=>{
    ref.current.click();
    setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description});
  }

  const handleClick = (e)=>{
    editNote(note.id, note.etitle, note.edescription);
    refclose.current.click();
    props.showAlert("Updated Successfully", "success");
  }

  const onChange = (e)=>{
      setNote({...note, [e.target.name]: e.target.value})
  }
  
  
  const deleteNote = async (id) => {
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: "DELETE",
          headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem('token')
            },
        });
        const json = response.json();
        console.log(json);
        const newNotes = notes.filter((note) => {
            return note._id !== id;
        });
        setNotes(newNotes);
    };
    
    const editNote = async (id, title, description, tag) => {
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag}),
        });
        const json = await response.json();
        console.log(json);
        let newNotes = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    };
    
    const filteredNotes = notes.filter((each) =>
      each.title?.toLowerCase().includes(search.toLowerCase())
  );
  console.log(filteredNotes);
  return (

    <div className="row my-3">
    <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
    </button>
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form className="my-3">
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="etitle" 
                                name="etitle" 
                                value={note.etitle} 
                                aria-describedby="emailHelp" 
                                onChange={onChange} 
                                minLength={5} 
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label"> Description </label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="edescription" 
                                name="edescription" 
                                value={note.edescription} 
                                onChange={onChange} 
                                minLength={5} 
                                required
                            />
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button disabled={note.etitle.length === 0 || note.edescription.length === 0} onClick={handleClick} type="button" className="btn btn-primary">
                        Update Note
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div className="my-3 ">
        <h2>Your Note</h2>
        <input 
        style={{width:"300px", marginTop:"20px"}}
            type="text" 
            placeholder="Search..." 
            className="form-control" 
            id="search" 
            name="search" 
            onChange={(e) => { setSearch(e.target.value) }}
        />
    </div>
    <div className="container mx-2">
        {filteredNotes.length === 0 && 'No notes to display'}
    </div>
    {filteredNotes.map((note) => {
        return <div className="col-md-3">
        <div className="card my-3">
          <div className="card-body">
            <div className="d-flex align-items-center justify-content-between">
              <h5 className="card-title">{note.title}</h5>
              <div>
              <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteNote(note._id); props.showAlert("Deleted Successfully", "success");}} ></i>
              <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
              </div>
            </div>
            <p className="card-text">{note.description}</p>
          </div>
        </div>
      </div>;
    })}
</div>
  );
};

export default NoteList;
