import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import VideoCard from './VideoCard'
import { getALLVideos } from '../services/allAPI'

function View({uploadVideoStatus}) {
  const [allVideo , setAllVideo ]=useState([])
  const [deleteVideoStatus, setDeleteVideoStatus]=useState(false)
  const getAllUploadedVideos = async ()=>{
   const response= await getALLVideos()
   const {data}=response
   setAllVideo(data);

  }
  console.log(allVideo);
  useEffect(()=>{
    getAllUploadedVideos()
    setDeleteVideoStatus(false)
  },[uploadVideoStatus,deleteVideoStatus])
  return (
    <>
    <Row>
      {allVideo.length>0?allVideo.map((video)=>(
        <Col sm={12} md={6} lg={4} xl={3}>
            <VideoCard displayVideo={video} setDeleteVideoStatus={setDeleteVideoStatus}/>
        </Col>
      )): <p>nothing to display</p>
      }
    
    </Row>
    </>
  )
}

export default View