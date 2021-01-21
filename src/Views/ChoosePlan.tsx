import React from 'react';

// component
import FormChooseProtect from './../Components/FormChooseProtect';

// material ui
import Grid from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/core";

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
  formContainer: {
    justifyContent: "center",
    marginTop: "40px",
    [theme.breakpoints.up("md")]: {
      marginTop: "0px",
    },
  }
}))

function ChoosePlan() {
  const classes = useStyles()
  return (
    <div className={classes.mainContainer}>
      <div className="bgRedBig">
        <img src={BgRedBig} alt="logo" className={classes.imgBgRedBig} />
      </div>
      <Grid container spacing={0} className='main__container'>
        <Grid container item lg={2} md={2} sm={5} xs={4} spacing={0} className='home__content' alignItems="center">
        </Grid>
        <Grid container item lg={2} md={2} sm={7} xs={8} className='home__img' alignItems="center">
          <img src={Family} alt="logo" />
        </Grid>
        <Grid container item lg={8} md={8} sm={12} xs={12} alignItems="center" className={classes.formContainer}>
          <FormChooseProtect />
        </Grid>
      </Grid>
    </div>
  );
}

export default ChoosePlan;