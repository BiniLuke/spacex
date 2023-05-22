import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
  Button,
  Menu,
} from "@mui/material";
import {
  Link,
  useParams,
  createSearchParams,
  useSearchParams,
} from "react-router-dom";
import { API_URL } from "../common";
import Details from "./Details";
const Summary = () => {
  const [list, setList] = useState([]);
  const [timeLine, setTimeLine] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const { value } = useParams();
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElv1, setAnchorElv1] = useState(null);
  const open = Boolean(anchorEl);
  const openv1 = Boolean(anchorElv1);
  const [openPopUp,setOpenPopUp]= useState(false)
  const [flight_number,setFlightNumber]=useState("")
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClickv1 = (event) => {
    setAnchorElv1(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClosev1 = () => {
    setAnchorElv1(null);
  };

  const getStatus = async () => {
    //                         https://api.spacexdata.com/v3/launches
    let url = API_URL;
    if(timeLine)
      url+="/"+timeLine;
      
    if(searchParams?.get("launch_success")) 
      url+="?"+searchParams?.toString() 

      console.log("URL",url);
    let response = await fetch(url);
    const jsonData = await response.json();
    setList(jsonData);
  };
  useEffect(() => {
    console.log("mount",value,searchParams?.toString() )
    setTimeLine(value);
  }, []);

  useEffect(() => {
    console.log("value changed in timeline ",timeLine,"or search params",searchParams?.get("launch_success"))
    getStatus();
  }, [timeLine,searchParams]);

  const changeTimeLine = (value) => {
    setTimeLine(value);
    handleClose();
  };
  const changeLaunchStatus = (value) => {
    console.log(value)
    setSearchParams(createSearchParams({ launch_success: value }));
    handleClosev1();
  };

  const onRowClick = (flight_number) =>{
    console.log("row clicked")
    
    setFlightNumber(flight_number);
    setOpenPopUp(true);
  }
  return (
    <div>
      <div className="filter">
        <>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            Filter TimeLine
          </Button>
          <Menu
            aria-label="duuu"
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <Link to="">
              <MenuItem onClick={()=>changeTimeLine("")}>
                All Launches
              </MenuItem>
            </Link>
            <Link to="/timeLine/upcoming">
              <MenuItem onClick={()=>changeTimeLine("upcoming")}>
                Upcoming Launches
              </MenuItem>
            </Link>
            <Link to="/timeLine/past">
              <MenuItem onClick={()=>changeTimeLine("past")}>
                Past Launches
              </MenuItem>
            </Link>
          </Menu>
        </>
        <>
          <Button
            id="basic-button"
            aria-controls={openv1 ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openv1 ? "true" : undefined}
            onClick={handleClickv1}
          >
            Filter Launch Status
          </Button>
          <Menu
            aria-label="duuu"
            id="basic-menu"
            anchorEl={anchorElv1}
            open={openv1}
            onClose={handleClosev1}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={()=>changeLaunchStatus("true")}>
              Success
            </MenuItem>
            <MenuItem onClick={()=>changeLaunchStatus("false")}>
              Failed
            </MenuItem>
          </Menu>
        </>
      </div>
      <div className="launchList">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>No:</TableCell>
                <TableCell align="right">Launched (UTC)</TableCell>
                <TableCell align="right">Location</TableCell>
                <TableCell align="right">Mission</TableCell>
                <TableCell align="right">Orbit</TableCell>
                <TableCell align="right">Launch Status</TableCell>
                <TableCell align="right">Rocket</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list &&
                list.map((row) => (
                  <TableRow onClick={()=>onRowClick(row.flight_number)}
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.flight_number}
                    </TableCell>
                    <TableCell align="right">{row?.launch_date_utc}</TableCell>
                    <TableCell align="right">
                      {row?.launch_site?.site_name}
                    </TableCell>
                    <TableCell align="right">{row?.mission_name}</TableCell>
                    <TableCell align="right">
                      {row?.rocket?.second_stage?.payloads[0]?.orbit}
                    </TableCell>
                    {row?.launch_success ? (
                      <TableCell align="right">Success</TableCell>
                    ) : row?.upcoming ? (
                      <TableCell align="right">Upcoming</TableCell>
                    ) : (
                      <TableCell align="right">Failed</TableCell>
                    )}
                    <TableCell align="right">
                      {row?.rocket?.rocket_name}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div>
        {
          openPopUp && <Details setOpenPopUp={setOpenPopUp} openPopUp={openPopUp} flight_number={flight_number}/>
        }
      </div>
    </div>
  );
};

export default Summary;
