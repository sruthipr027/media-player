import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { uploadVideoAll } from '../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  


function Add({setUploadVideoStatus}) {
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
 const [videos ,setVideos]=useState({
  id:"",
  caption:"",
   url:"",
   embedLink:"",
 }
 )
 console.log(videos);

 const embedVideoLink =(e)=>{
  const {value}=e.target
  console.log(value.slice(-11));
  const link=`https://www.youtube.com/embed/${value.slice(-11)}`
  setVideos({...videos,embedLink:link})
 }

  const handleUpload = async ()=>{
  const{id,caption,url,embedLink}=videos
  // if there is no value in the input box
  if(id||caption||url||embedLink){
const response= await uploadVideoAll(videos)
console.log(response);
if(response.status>=200 && response.status<300){
  setUploadVideoStatus(response.data)
  toast.warning(`${response.data.caption} is successfully uploaded`)
   setVideos({
    id:"",
  caption:"",
   url:"",
   embedLink:"",
  })
  
  handleClose()
}
else{
  console.log(response);
  toast.success('error')
}
  }
  else{
    //if there is value in input box
    toast.error('please fill all the field')
  }
  

 } 


  return (
    <>
    <div className='d-flex align-items-center'>
<h5> <i class="fa-solid fa-film me-2 text-warning"></i>Upload new Video</h5>
<button onClick={handleShow} className='btn'><i class="fa-solid fa-cloud-arrow-up fs-5"></i></button>
    </div>
    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Upload Videos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <p>please fill the text completely </p>
         <form className='border border-secondary rounded p-2'>
         <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Control type="text" placeholder="Enter Video ID" onChange={(e)=>setVideos({...videos,id:e.target.value})} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Control type="text" placeholder="Enter Video Caption" onChange={(e)=>setVideos({...videos,caption:e.target.value})} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Control type="text" placeholder="Enter Video Image URL" onChange={(e)=>setVideos({...videos,url:e.target.value})} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Control type="text" placeholder="Enter Youtube  VIdeo Link  "  onChange={embedVideoLink} />
      </Form.Group>
     
         </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleUpload} variant="warning">Upload</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position='top-center' theme='colored' autoClose={2000}/>
    </>
  )
}

export default Add
//https://www.youtube.com/watch?v=VAdGW7QDJiU

//https://www.youtube.com/embed/VAdGW7QDJiU