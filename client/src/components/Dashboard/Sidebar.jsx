// import {
//   Box,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   styled,
// } from "@mui/material";
// import { RiMiniProgramFill } from "react-icons/ri";
// import { MdDashboard } from "react-icons/md";
// import { RiWechatChannelsLine } from "react-icons/ri";
// import { Link } from "react-router-dom";
// const StyledBox = styled(Box)({
//   width: "20%",
//   backgroundColor: "#fff",
//   boxShadow: "13px 0px 12px 0px rgba(0,0,0,0.18)",
//   height: "90vh",
// });

// const StyledListItemButton = styled(ListItemButton)({
//   "&:hover": {
//     backgroundColor: "#1A1A3D",
//     "& .MuiListItemText-root": {
//       color: "white",
//     },
//     "& .MuiListItemIcon-root": {
//       color: "white",
//     },
//   },
// });

// function SidebAr() {
//   return (
//     <StyledBox>
//       <List>
//         <ListItem disablePadding>
//           <StyledListItemButton>
//             <ListItemIcon>
//               <MdDashboard />
//             </ListItemIcon>
//             <ListItemText primary="Dashboard" />
//           </StyledListItemButton>
//         </ListItem>
//         <ListItem disablePadding>
//           <StyledListItemButton component="a" href="#sample-list">
//             <ListItemIcon>
//               <RiWechatChannelsLine />
//             </ListItemIcon>
//             <ListItemText primary="Channels" />
//           </StyledListItemButton>
//         </ListItem>
//         <ListItem disablePadding>
//           <StyledListItemButton component="a" href="#sample-list">
//             <ListItemIcon>
//               <RiMiniProgramFill />
//             </ListItemIcon>
//             <ListItemText primary="Programs" />
//           </StyledListItemButton>
//         </ListItem>
//       </List>
//     </StyledBox>
//   );
// }

// export default SidebAr;
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
} from "@mui/material";
import { RiMiniProgramFill } from "react-icons/ri";
import { MdDashboard } from "react-icons/md";
import { RiWechatChannelsLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const StyledBox = styled(Box)({
  width: "20%",
  backgroundColor: "#fff",
  boxShadow: "13px 0px 12px 0px rgba(0,0,0,0.18)",
  height: "90vh",
});

const StyledListItemButton = styled(ListItemButton)({
  "&:hover": {
    backgroundColor: "#1A1A3D",
    "& .MuiListItemText-root": {
      color: "white",
    },
    "& .MuiListItemIcon-root": {
      color: "white",
    },
  },
});

function SidebAr() {
  return (
    <StyledBox>
      <List>
        <ListItem disablePadding>
          <StyledListItemButton component={Link} to="/admin/dashboard">
            <ListItemIcon>
              <MdDashboard />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </StyledListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <StyledListItemButton component={Link} to="/admin/channels">
            <ListItemIcon>
              <RiWechatChannelsLine />
            </ListItemIcon>
            <ListItemText primary="Channels" />
          </StyledListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <StyledListItemButton component={Link} to="/admin/programs">
            <ListItemIcon>
              <RiMiniProgramFill />
            </ListItemIcon>
            <ListItemText primary="Programs" />
          </StyledListItemButton>
        </ListItem>
      </List>
    </StyledBox>
  );
}

export default SidebAr;
