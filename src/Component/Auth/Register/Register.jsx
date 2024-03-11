import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { signup } from "../../../Redux/AuthSlice/AuthSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch} from "react-redux";
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';


import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Register() {
    const dispatch= useDispatch()
     const [name, setName] =useState('');
     const [email ,setEmail] =useState('');
     const [password,setPassword] =useState('')
     const [phone,setPhone] = useState('');
     const [answer, setAnswer] =useState('')
    const [image,setImage] =useState('')

    const [showPassword, setShowPassword] = useState(false);
    const [checked, setChecked] = useState(false);
    const handleTogglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setImage(reader.result);
          };
          reader.readAsDataURL(file);
        }
      };

    const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData()
    formData.append("name",name);
    formData.append("email",email);
    formData.append("phone",phone);
    formData.append("password",password);
    formData.append("answer",answer);
    formData.append("image",image);
    dispatch(signup(formData))

  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Registraton Form
          </Typography>
          <Box
            component="form"
            noValidate
            
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="First Name"
                  type="text"
                  onChange={(e)=>setName(e.target.value)}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  label="mobile"
                  name="phone"
                  type="number"
                  variant="outlined"
                  inputProps={{ maxLength: 10, inputMode: 'numeric', pattern: '[0-9]*' }}
                  onChange={(e)=>setPhone(e.target.value)}
                  autoComplete="mobile-number"
                />
              </Grid>
        
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  type="email"
                  onChange={(e)=>setEmail(e.target.value)}
                  autoComplete="email"
                />
              </Grid>

            

              <Grid item xs={12}>
                
              <TextField
      label="Password"
      id="password"
      name="password"
      margin="normal"
            required
            fullWidth
      onChange={(e)=>setPassword(e.target.value)}
      type={showPassword ? 'text' : 'password'}
      autoComplete="current-password"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleTogglePasswordVisibility} edge="end">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
    
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="answer"
                  label="answer"
                  name="answer"
                  type="text"
                  onChange={(e)=>setAnswer(e.target.value)}
                  autoComplete="answer"
                />
              </Grid>

             

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="image"
                //   label="image"
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={ handleFileChange}
                  autoComplete="new-image"
                />
                   {image && <img src={image} alt="Uploaded" style={{ maxWidth: '100px', maxHeight: '100px' }} />}
              </Grid>

              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label=" verification successfully open email."
                />
              </Grid> */}

         <Grid item xs={12}>
         <FormControlLabel
      control={<Checkbox checked={checked} onChange={(e)=>{setChecked(e.target.checked)}} />}
      label="Check me"
    />
         </Grid>
        

            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}