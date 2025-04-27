import { CloudUpload, Description, GeneratingTokens, Label, Publish, Tag, Title, Visibility } from '@mui/icons-material'
import { Alert, Box, Button, Chip, Container, FormControl, FormControlLabel, InputAdornment, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useAuth } from '../helper/AuthContext'
import toast from 'react-hot-toast'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';



const videoUploadUrl = 'http://localhost:8080/api/v1/video/upload'
const Upload = () => {

  const { token } = useAuth();


  const [data, setData] = useState({
    title: "",
    description: "",
    videoFile: "",
    visibility: ""
  })
  const [success, setSuccess] = useState("");
  const [successBool, setSuccessBool] = useState(false);
  const [error, setError] = useState(false);
  const [tags, setTags] = useState([]);



  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData({ ...data, [name]: value });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Data from Input: ", data);


    // Create a FormData object
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("videoFile", event.target.videoFile.files[0]); // Get the file from the input
    formData.append("visibility", data.visibility);
    formData.append("tags", tags);
    //todo: Send the file to server

    console.log("Formdata: ", formData);

    try {
      const response = await axios.post(videoUploadUrl,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      )
      setSuccess("Video uploaded successfully!")
      setSuccessBool(true)
      setError(false);
      console.log(response);
      toast.success(success);

    }
    catch (error) {
      console.error(error);
      setError(true);
      setSuccessBool(false)
      toast.error("Error uploading video: ", error);

    }

    setTimeout(() => {
      setData({
        title: "",
        description: "",
        videoFile: "",
        visibility: ""
      });
      setTags([]);
      setSuccessBool(false);
    }, 5000);

  }

  const generateMetaData = async () => {


    const generateMetaDataUrl = 'http://localhost:8080/api/v1/video/generate-meta-data';

    if (data.title.trim() === '') {
      toast.error("Title is required to generate metadata");
      return;
    }
    try {
      const formData = new FormData();
      formData.append('title', data.title)
      const response = await axios.post(generateMetaDataUrl, formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      console.log(response);
      setData((prevData) => ({
        ...prevData,
        title: response.data.title,
        description: response.data.description,
      }));
      setTags([...response.data.videotags]);

    } catch (error) {
      console.log(error);

    }
  }

  const handleDelete = (tag) => {

    setTags(tags.filter((i) => tag !== i));
  }

  const handleClick = () => {
    return;
  }

  return (
    <Container maxWidth="md" >

      {error &&

        <Alert
          sx={{ marginTop: '1rem', marginBottom: '-1.5rem', fontWeight: 'bold' }}
          variant="filled" onClose={(() => setError(false))} severity="error">
          Something went wrong
        </Alert>
      }


      {successBool &&

        <Alert
          sx={{ marginTop: '1rem', marginBottom: '-1.5rem', fontWeight: 'bold' }}
          marginTop={1} variant="filled" onClose={() => setSuccess(false)} severity="success">
          Video Uploaded Successully
        </Alert>


      }

      <Paper
        elevation={6}
        sx={{
          padding: 4,
          marginTop: 8,
          borderRadius: 3

        }}
      >
        <Typography
          variant='h5'
          gutterBottom
          align='center'
          fontWeight={'bold'}
        >
          Upload Here
        </Typography>
        <Typography
          gutterBottom
          align='center'

        >
          Please upload your videos file in MP4 format with maximum size of 1GB
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box display={'flex'} flexDirection={'column'} marginTop={3} gap={3}  >

            <TextField

              label={'Title'}
              placeholder='Please write here to generate title, description and tags via AI...'
              variant='outlined'
              fullWidth
              slotProps={{
                input: {
                  startAdornment: (<InputAdornment position='start'><Title color='primary' ></Title></InputAdornment>)
                }
              }}

              name='title'
              value={data.title}
              onChange={handleChange}

            />
            <TextField

              label={'Description'}
              variant='outlined'
              fullWidth
              multiline
              slotProps={{
                input: {
                  startAdornment: (<InputAdornment ><Description color='primary' style={{ marginRight: '0.5rem' }}></Description></InputAdornment>)
                }
              }}
              name='description'
              value={data.description}
              onChange={handleChange}

            />

            <Box display={'flex'}>
              <input type="file"
                accept='Video/'
                id='upload-video'
                style={{ display: 'none' }}
                name='videoFile'
                value={data.videoFile}
                onChange={handleChange}
              />
              <label htmlFor="upload-video">
                <Button variant='contained' color='secondary' component='span' startIcon={<CloudUpload />}>Upload Video</Button>
              </label>



            </Box>
            <Box marginTop={'-1rem'} color={'green'} fontWeight={'semibold'} >{data.videoFile.split("\\")[data.videoFile.split('\\').length - 1]}</Box>

            <FormControl fullWidth>
              <InputLabel>Visibility</InputLabel>

              <Select
                label={"Visibility"}
                // value={'Visibility'}
                renderValue={() => (
                  <Box display={'flex'} alignItems='center' gap={1}>
                    <Visibility color='primary' />
                    <Typography>{data.visibility}</Typography>
                  </Box>
                )}

                name='visibility'
                value={data.visibility}
                onChange={handleChange}

              >
                <MenuItem value={'Public'}>Public</MenuItem>
                <MenuItem value={'Private'}>Private</MenuItem>
                <MenuItem value={'Unlisted'}>Unlisted</MenuItem>


              </Select>
            </FormControl>

            <Box>
              <label htmlFor="">Tags</label>
              <Box gap={2} marginTop={2} marginBottom={2}>
                {
                  tags.map((tag, index) => {
                    return (
                      <Chip sx={{ marginRight: 2, marginBottom: 2 }} key={index} label={tag} onClick={() => { handleClick() }} onDelete={() => handleDelete(tag)} />
                    )
                  })
                }
              </Box>
            </Box>

            <Box display={'flex'} gap={5} justifyContent={'center'}>
              <Button variant='contained' color='secondary' startIcon={<AutoAwesomeIcon />} fontWeight={'bold'} padding={1.5} onClick={generateMetaData}>Generate Metadata</Button>
              <Button type='submit' variant='contained' color='primary' startIcon={<Publish />} fontWeight={'bold'} padding={1.5}>Publish</Button>
            </Box>

          </Box>
        </form>

      </Paper>

    </Container>
  )
}

export default Upload
