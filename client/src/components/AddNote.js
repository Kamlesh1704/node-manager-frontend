import React, {useState, useContext} from "react";
import noteContext from "../context/notes/NoteContext";

const AddNote = (props) => {
    const context = useContext(noteContext);
    const {addNote } = context;
    const [note, setNote] = useState({title: "", description: ""});


    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description);
        setNote({title: "", description: ""});
        props.showAlert("Added Successfully", "success");
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
    return (
        <div style={{backgroundColor:"rgb(29,35,39)",color:"white", height:"90.2vh", width:"100vw",marginLeft:"-120px"}}>
    <div className="container pt-5">
        <h2>Add a Note</h2>
        <form className="my-3">
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={1} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label"> Description </label>
                <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} minLength={1} required/>
            </div>
            <button disabled={note.title.length===0 || note.description.length===0} type="submit" className="btn btn-primary" onClick={handleClick}>
                Add Note
            </button>
        </form>
    </div>
    </div>
    );
};

export default AddNote;
