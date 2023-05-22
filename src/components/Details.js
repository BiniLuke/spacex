import * as React from 'react';
import {Dialog,DialogContent,DialogContentText,DialogTitle} from '@mui/material';
import { useEffect,useState } from 'react';
import { API_URL } from '../common';


const Details = (props) => {

    const [launchDetails,setLaunchDetails]= useState(null)
  const handleClose = () => {
    props.setOpenPopUp(false);
  };

  useEffect(()=>{
    getLaunchDetails(props.flight_number)
  },[])

  const getLaunchDetails = async(flight_number) =>{
    let url = API_URL;
    
    url+="/"+flight_number;
    console.log("URL",url);
    let response = await fetch(url);
    const jsonData = await response.json();
    setLaunchDetails(jsonData);
    console.log(jsonData);
  }
  //
  return (
    <div>
      <Dialog
        open={props.openPopUp}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
         <>
         <img src={launchDetails?.links?.mission_patch} alt="logo" style={{height:'100px',width:'50px'}}/>
         <div>
         <span>{launchDetails?.mission_name}</span>
         <span>{launchDetails?.launch_success?"Success" : "Failed" }</span>
         </div>
         </>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div>
                <p>
                {launchDetails?.details}
                <a href={launchDetails?.links?.wikipedia}>Wikipedia </a>
                </p>
            </div>
            <div>
                <span>Flight Number</span>
                <span>{launchDetails?.flight_number}</span>
            </div>
            <div>
                <span>Mission Name</span>
                <span>{launchDetails?.mission_name}</span>
            </div>
            <div>
                <span>Rocket Type</span>
                <span>{launchDetails?.rocket?.rocket_type}</span>
            </div>
            <div>
                <span>Rocket Name</span>
                <span>{launchDetails?.rocket?.rocket_name}</span>
            </div>
            <div>
                <span>Manufacturer</span>
                <span>{launchDetails?.second_stage?.payloads[0]?.manufacturer}</span>
            </div>
            <div>
                <span>Nationality</span>
                <span>{launchDetails?.second_stage?.payloads[0]?.nationality}</span>
            </div>
            <div>
                <span>Launch Date</span>
                <span>{launchDetails?.launch_date_utc}</span>
            </div>
            <div>
                <span>Payload Type</span>
                <span>{launchDetails?.second_stage?.payloads[0]?.payload_type}</span>
            </div>
            <div>
                <span>Orbit</span>
                <span>{launchDetails?.second_stage?.payloads[0]?.orbit}</span>
            </div>
            <div>
                <span>Launch Site</span>
                <span>{launchDetails?.launch_site?.site_name_long}</span>
            </div>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Details;