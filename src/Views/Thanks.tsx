import React, { useState, useContext, useEffect } from 'react';
import { Context } from './../App'

// material ui
import Grid from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/core";
import Button from '@material-ui/core/Button';


// imgs
import BgRedBig from './../Assets/Basebgbig.png';
import BgRedThin from './../Assets/Basebgthin.png';
import Family from './../Assets/family.png';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    "& .bgRedBig": {
      zIndex: "1",
      position: "absolute"
    }
  },
  imgBgRedBig: {
    height: "47vh",
    width: "60vw",
    [theme.breakpoints.up("md")]: {
      height: "100vh",
      width: "30vw",
    },
  },
  textContainer: {
    "& h1": {
      color: "#6E7385",
      "& span": {
        color: "#EF3340"
      }
    },
    "& p": {
      color: "#C5CBE0",
      "& span": {
        fontWeight: "600"
      }
    }
  }
}))

function Thanks() {
  const classes = useStyles()
  const { setData, setStep, setDataResponse, finalData, setFinalData } = useContext(Context)
  const goInitial = () => {
    setData(undefined)
    setDataResponse(undefined)
    setFinalData(undefined)
    setStep(0)

  }
  useEffect(() => {
    console.log(finalData);
    
  }, [finalData])

  return (
    <div className={classes.mainContainer}>
      <div className="bgRedBig">
        <img src={BgRedBig} alt="fondo rojo" className={classes.imgBgRedBig} />
      </div>
      <Grid container spacing={0} className='main__container'>
        <Grid container item lg={2} md={2} sm={5} xs={4} spacing={0} className='home__content' alignItems="center">
        </Grid>
        <Grid container item lg={2} md={2} sm={7} xs={8} className='home__img' alignItems="center">
          <img src={Family} alt="imagen de familia" />
        </Grid>
        <Grid container item lg={8} md={8} sm={12} xs={12} alignItems="center">
          <div className={classes.textContainer}>
            <h1>!Gracias por <span>confiar en nosotros!</span></h1>
            <p>Queremos conocer mejor la salud de los asegurados. un asesor <span>se pondrá en contacto </span> contigoen las siguientes <span>48 horas</span></p>
          </div>
          <div>
            <Button className="form__button" onClick={goInitial}>IR A SALUD</Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Thanks;