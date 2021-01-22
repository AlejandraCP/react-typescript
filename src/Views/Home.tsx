import React from 'react';

// components
import FormCheck from './../Components/FormCheck'

// material ui
import Grid from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/core";

// imgs
import BgRedBig from './../Assets/Basebgbig.png';
import BgRedThin from './../Assets/Basebgthin.png';
import Family from './../Assets/family.png';
import Mobile from './../Icons/Mobile';
import Security from './../Icons/Security';
import Clinic from './../Icons/Clinic';
import Money from './../Icons/Money';


const useStyles = makeStyles((theme) => ({
  home: {
    "& .BgRedBig": {
      zIndex: "1",
      position: "absolute"
    }
  },
  imgBgRedBig: {
    height: "48vh",
    width: "100vw",
    [theme.breakpoints.up("md")]: {
      height: "90vh",
      width: "50vw",
    },
  },
  titleWhite: {
    fontSize: "50px",
    color: "#fff",
    fontWeight: 300,
    "& span": {
      fontWeight: 600,
      display: "block"
    },
    "& p": {
      color: "#fff"
    }
  },
  items: {
    color: "#fff",
    lineHeight: "25px",
    "& img": {
      with: '22px',
      height: '22px',
      position: 'relative',
      top: '5px',
      paddingRight: '5px'
    }
  },
  homeForm: {
    justifyContent: "center",
    marginTop: "20px",
    [theme.breakpoints.up("md")]: {
      marginTop: "0px",
    },
    "& h2": {
      color: "#494F66",
      fontWeight: 400,
      fontSize: "30px",
      "& span": {
        color: "#EF3340",
        fontWeight: 600,
      }
    },
    "& p": {
      color: "#C5CBE0"
    }
  }
}));


function Home() {
  const classes = useStyles();
  return (
    <div className={classes.home}>
      <div className="BgRedBig">
        <img src={BgRedBig} alt="logo" className={classes.imgBgRedBig} />
      </div>
      <Grid container spacing={0} className='home__container main__container'>
        <Grid container item lg={3} md={3} sm={6} xs={7} spacing={0} className='home__content' alignItems="center">
          <div>
            <h1 className={classes.titleWhite}>Seguro de <span>Salud</span></h1>
            <div className={classes.items}>
              <p>
                <Security />
                Cómpralo de manera fácil y rápida
              </p>
              <p>
                <Mobile />
              Cotiza y compra tu seguro 100% digital</p>
              <span></span>
              <p>
                <Money />
                Hasta S/. 12 millones de cobertura anual
              </p>
              <p>
                <Clinic />
                Más de 300 clientes en todo el Perú
                </p>
            </div>
          </div>
        </Grid>
        <Grid container item lg={4} md={4} sm={4} xs={4} spacing={0} className='home__img' alignItems="flex-end">
          <img src={Family} alt="logo" />
        </Grid>
        <Grid container item lg={4} md={5} sm={12} xs={12} spacing={0} alignItems="center" className={classes.homeForm}>
          <div>
            <h2>Obten tu <span>seguro ahora</span></h2>
            <p>Ingresa los datos para comenzar</p>
            <FormCheck />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;