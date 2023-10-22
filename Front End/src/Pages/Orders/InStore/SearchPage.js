/**
 * Author : Dev Prtap Singh Rajawat
 * Banner No : B00922348
 * Email: dv269119@dal.ca
 */
import {React} from 'react'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import { useNavigate } from 'react-router-dom';
import SearchBox from '../../../Components/SearchBox';

const SearchPage = () => {
  const navigate = useNavigate();
  const handleCardClick= event =>{
          console.log(event.currentTarget.id);
          navigate('/ProductListing', {state: event.currentTarget.id});
    }
  return (
    <Container maxWidth='md'>
    <SearchBox />
    <div>
      <h1 style={{marginTop:'50px', justifyContent: 'center', textAlign:'center', marginBottom: '16px'}}> Shop By Category </h1>
    </div>
      <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={3} key='1234'>
            <Card>
            <CardActionArea id='bracelet' target="_blank" rel="noopener" onClick={handleCardClick}>
              <CardMedia
                component="img"
                height="200"
                image={require('../../../bracelet2.jpg')}
                alt='bracelet'
              />
              <CardContent >
                <Typography gutterBottom variant="h5" component="h2">
                  Bracelets
                </Typography>
                <Typography gutterBottom variant="h6" component="h2">
                  Explore 
                </Typography>
              </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3} key='12367'>
            <Card>
            <CardActionArea id='necklace' target="_blank" rel="noopener" onClick={handleCardClick}>
              <CardMedia
                component="img"
                height="200"
                image={require("../../../necklace-img.png")}
                alt='necklace'
              />
              <CardContent >
                <Typography gutterBottom variant="h5" component="h2">
                  Necklace
                </Typography>
                <Typography gutterBottom variant="h6" component="h2">
                  Explore
                </Typography>
              </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3} key='12389'>
            <Card>
            <CardActionArea id='ring' target="_blank" rel="noopener" onClick={handleCardClick}>
              <CardMedia
                component="img"
                height="200"
                image={require('../../../ring3.png')}
                alt='diamond-ring'
              />
              <CardContent >
                <Typography gutterBottom variant="h5" component="h2">
                  Finger Rings
                </Typography>
                <Typography gutterBottom variant="h6" component="h2">
                  Explore
                </Typography>
              </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3} key='45678'>
            <Card>
            <CardActionArea id='earring' target="_blank" rel="noopener" onClick={handleCardClick}>
              <CardMedia
                component="img"
                height="200"
                image={require('../../../earrings2.png')}
                alt='ear-rings'
              />
              <CardContent >
                <Typography gutterBottom variant="h5" component="h2">
                  Ear-Rings
                </Typography>
                <Typography gutterBottom variant="h6" component="h2">
                  Explore
                </Typography>
              </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
      </Grid>
    </Container>
  )
}

export default SearchPage