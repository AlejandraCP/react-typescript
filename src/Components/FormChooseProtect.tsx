import React, { useState, useContext, useEffect } from 'react'
import { Context } from '../App'

// material ui
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from "@material-ui/core";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Grid from '@material-ui/core/Grid';



// form
import * as Yup from 'yup'
import { useFormik } from 'formik'

const useStyles = makeStyles((theme) => ({
  formText: {
    "& h2": {
      color: "#C5CBE0",
      fontWeight: '400',
      "& span": {
        color: "#EF3340"
      }
    },
    "& p": {
      color: "#C5CBE0"
    }
  },
  formContent: {
    marginLeft: "30px"
  },
  inputRadio: {
    "& .MuiRadio-colorSecondary.Mui-checked": {
      color: "#83CC5E"
    }
  },
  radioContainer: {
    "& div:nth-child(1)": {
      width: "100%",
      border: "1px solid #C5CBE0",
      borderRadius: "4px",
      padding: "4px",
      margin: "20px 5px"
    },
    "& p": {
      margin: "8px 0 0 0"
    },
    "& p:nth-of-type(odd)": {
      color: "#6E7385",
      fontWeight: "400",
      fontSize: "14px"
    },
    "& p:nth-of-type(even)": {
      color: "#000",
      fontWeight: "400",
      fontSize: "18px"
    }
  },
  radioSelected: {
    border: "1px solid yellow !important",
  }
}))

const Schema = Yup.object().shape({
  insurancePlan: Yup.string().required('Seleccionar plan de salud'),
});

type InitialValues = {
  insurancePlan: string;
}
interface IPlanDetail {
  amount: string,
  titlePlan: string,
  imgSRC: string,
  listItem1: boolean,
  listItem2: boolean,
  listItem3: boolean,
  listItem4: boolean
}

function FormChooseProtect() {
  const classes = useStyles()

  const { setStep, dataResponse, setFinalData } = useContext(Context)

  const initialValues: InitialValues = {
    insurancePlan: 'basic',
  }

  const formik = useFormik({
    initialValues,
    validationSchema: Schema,
    onSubmit: (values, { resetForm }) => {
      dataResponse.insurancePlan = formik.values.insurancePlan
      setFinalData(dataResponse)
      setStep(3)
    }
  })

  const backInitial = () => setStep(1)

  const insurancePlanDetail = {
    basic: {
      amount: '1 MM',
      titlePlan: 'PLAN BÁSICO',
      imgSRC: '1',
      listItem1: false,
      listItem2: false,
      listItem3: false,
      listItem4: false
    },
    advance: {
      amount: '5 MM',
      titlePlan: 'PLAN AVANZADO',
      imgSRC: '2',
      listItem1: true,
      listItem2: true,
      listItem3: false,
      listItem4: false
    },
    premium: {
      amount: '8 MM',
      titlePlan: 'PLAN PREMIUM',
      imgSRC: '2',
      listItem1: true,
      listItem2: true,
      listItem3: true,
      listItem4: false
    },
    full: {
      amount: '10 MM',
      titlePlan: 'PLAN FULL',
      imgSRC: '2',
      listItem1: true,
      listItem2: true,
      listItem3: true,
      listItem4: true
    }
  }

  useEffect(() => {
    console.log(dataResponse);
    
  }, [dataResponse])
  return (
    <div className='form__container'>
      <div className='next-step'>
        <span onClick={backInitial}> <ArrowBackIosIcon style={{ fontSize: 12, color: '#EF3340' }} /></span>
        <span>Paso 2 </span>
        <span>de 7</span>
      </div>
      <div className={classes.formText}>
        <h2>Elige <span>tu proteción</span></h2>
        <p>Selecciona tu plan de salud</p>
      </div>
      <div className={classes.formContent}>
        <form onSubmit={formik.handleSubmit}>
          <RadioGroup id="insurancePlan" aria-label="insurancePlan" name="insurancePlan" value={formik.values.insurancePlan} onChange={formik.handleChange}>
            <Grid container spacing={2}>
              <Grid container item lg={3} md={3} sm={3} xs={6} className={classes.radioContainer}>
                <div className={`${formik.values.insurancePlan === 'basic' ? "radio-selected" : ""}`}>
                  <FormControlLabel value="basic" className={classes.inputRadio} control={<Radio />} label="" />
                  <p>BÁSICO</p>
                  <p><span>S/</span><span>160</span></p>
                  <p>mensual</p>
                </div>
              </Grid>
              <Grid container item lg={3} md={3} sm={3} xs={6} className={classes.radioContainer}>
                <div className={`${formik.values.insurancePlan === 'advance' ? "radio-selected" : ""}`}>
                  <FormControlLabel value="advance" className={classes.inputRadio} control={<Radio />} label="" />
                  <p>AVANZADO</p>
                  <p><span>S/</span><span>200</span></p>
                  <p>mensual</p>
                </div>
              </Grid>
              <Grid container item lg={3} md={3} sm={3} xs={6} className={classes.radioContainer}>
                <div className={`${formik.values.insurancePlan === 'premium' ? "radio-selected" : ""}`}>
                  <FormControlLabel value="premium" className={classes.inputRadio} control={<Radio />} label="" />
                  <p>PREMIUM</p>
                  <p><span>S/</span><span>250</span></p>
                  <p>mensual</p>
                </div>
              </Grid>
              <Grid container item lg={3} md={3} sm={3} xs={6} className={classes.radioContainer}>
                <div className={`${formik.values.insurancePlan === 'full' ? "radio-selected" : ""}`}>
                  <FormControlLabel value="full" className={classes.inputRadio} control={<Radio />} label="" />
                  <p>FULL</p>
                  <p><span>S/</span><span>500</span></p>
                  <p>mensual</p>
                </div>
              </Grid>
            </Grid>
          </RadioGroup>
          {formik.errors.insurancePlan && (
            <span>{formik.errors.insurancePlan}</span>
          )}
          <div>
            <p>Cuentas con estos beneficios</p>
            <div>
              <div>
                <p>Cobertura máxima</p>
                {/* <p>{insurancePlanDetail[{formik.values.insurancePlan}].titlePlan}</p> */}
              </div>
              <div>
                <p>Lima <span>(Zona de cobertura)</span></p>
                <p>+30 clínicas <span>(en red afiliada)</span></p>
                <ul>
                  <li>Médico a domicilio</li>
                  <li>Chequeos prevetivos</li>
                  <li>Reembolso nacional</li>
                  <li>Reembolso internacional</li>
                </ul>
              </div>
              <div>
                <img />
              </div>
            </div>
          </div>
          <Button type="submit" disabled={!formik.isValid} className={`form__button ${formik.isValid ? "form__button--salud" : "form__button--disabled"}`}>
            COMPRAR PLAN
              </Button>
        </form>
      </div>
    </div>
  );
}
export default FormChooseProtect