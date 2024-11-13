import React, { useContext, useRef, useState } from "react";
import noteContext from "../context/notes/NoteContext";
import Noteitem from "./Noteitem";
import { FaSearch } from "react-icons/fa";


const NoteList = (props) => {
  const context = useContext(noteContext);
  const {notes,editNote} = context;
  const [search, setSearch] = useState("");
  const ref = useRef(null)
  const refclose = useRef(null)
  console.log(notes);
  const [note, setNote] = useState({id: "", etitle: "", edescription: ""});

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
  
  const filteredNotes = notes.filter((each) =>
    each.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{backgroundColor:"rgb(29,35,39)",color:"white", height:"90.2vh", width:"100vw",marginLeft:"-120px",paddingLeft:"30px",paddingRight:"30px",paddingTop:"15px"}}>
    <div className="row pt-5">
        <button ref={ref} type="button" className="btn btn-primary, d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Launch demo modal
        </button>
      <div className="modal fade mt-5" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content" style={{backgroundColor:"rgb(29,35,39)"}}>
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close bg-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label"> Description </label>
                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required/>
                </div>
              </form>

            </div>
            <div className="modal-footer">
              <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length===0 || note.edescription.length===0} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div style={{display:"flex",alignItems:"center"}}>
        <h2>Your Note</h2>
        <input type="text" placeholder="Search..." style={{width:"300px",marginLeft:"80px"}} className="form-control" id="search" name="search" onChange={(e) => {setSearch(e.target.value)}}/>
       </div>
    <div className="container mx-2 pt-3">
      {filteredNotes.length===0 && 'No notes to display'}
    </div>
    {filteredNotes.map((note) => {
      return <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />;
    })}
  </div>
  </div>
  );
};

export default NoteList;
