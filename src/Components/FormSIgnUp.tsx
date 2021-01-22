import React, { useState, useContext, useEffect } from 'react'
import { Context } from '../App'

//components 
import FormFamily from './FormFamily';

// material ui
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { makeStyles } from "@material-ui/core";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

// form
import * as Yup from 'yup'
import { useFormik } from 'formik'

const useStyles = makeStyles((theme) => ({
  inputRegular: {
    width: "100%",
    marginTop: '8px',
    "& .MuiFilledInput-root": {
      backgroundColor: '#fff',
    },
    "& .MuiFilledInput-underline:before": {
      borderBottom: "none",
    },
    "& .MuiFilledInput-underline:after": {
      borderBottom: "none",
    },
    "& .MuiFormLabel-root.Mui-focused": {
      color: "rgba(0, 0, 0, 0.54)",
    },
    "&.MuiFormControl-root": {
      border: "1px solid #C4C4C4",
      borderRadius: "4px"
    },
    "& .MuiFilledInput-input": {
      padding: "25px 14.5px 10px"
    }
  },
  inputRadio: {
    marginTop: "15px",
    "& .MuiRadio-colorSecondary.Mui-checked": {
      color: "#83CC5E"
    }
  },
  indications: {
    "& h1":{
      color: '#494F66',
      "& span": {
        color: "#EF3340",
        textTransform: 'capitalize'
      }
    },
    "& p:nth-of-type(1)": {
      color: "#676F8F",
      fontWeight: "300",
      fontSize: "16px"
    },
    "& p:nth-of-type(2)": {
      color: "#494F66",
      fontSize: "20px",
      marginTop: "30px",
      marginBotton: 5
    }
  }
}))

const Schema = Yup.object().shape({
  names: Yup.string()
    .required('Completar campo'),
  typeInsurance: Yup.string().required('Seleccionar el tipo de seguro')
});

type InitialValues = {
  names: string,
  typeInsurance: string
}

function FormSignUp() {

  const classes = useStyles()
  const { setStep, dataResponse, setDataResponse, userExist, withFamily, setWithFamily, formFamilyValid, setFormFamilyValid } = useContext(Context)

  const initialValues: InitialValues = {
    names: '',
    typeInsurance: ''
  }

  const formik = useFormik({
    initialValues,
    validationSchema: Schema,
    onSubmit: (values, { resetForm }) => {
      setDataResponse(values)
      setStep(2)
    }
  })
  const backInitial = () => setStep(0)

  const setTypeInsurance = (val:any) => {
    const value = val.target.value
    if (value === 'family'){
      setWithFamily(true)
      setFormFamilyValid(false)
    } else { 
      setWithFamily(false)
      setFormFamilyValid(true)
    }
  }

  useEffect(() => {
    // (() => formik.validateForm())();
    console.log(dataResponse);
    console.log(!!dataResponse);
    console.log(formik.values);

    
    // let dataFormik
    if (dataResponse && !userExist) {
      formik.setValues(dataResponse)
    }
  }, [dataResponse])

  return (
        <div className='form__container'>
      <div className='next-step'>
        <span onClick={backInitial}> <ArrowBackIosIcon style={{ fontSize: 12, color: '#EF3340' }} /></span>
        <span>Paso 1 </span>
        <span>de 7</span>
      </div>
      <div className={classes.indications}>
        <h1>Hola, <span>¡empecemos!</span></h1>
        <p>Cuéntanos un poco sobre ti</p>
        <p>Ingresa tu nombre</p>
      </div>
      <div className='form__content'>
        <form onSubmit={formik.handleSubmit} >
          <TextField id="names" name="names" onChange={formik.handleChange} value={formik.values.names} label="Nombres" variant="filled" className={classes.inputRegular} />

          <FormControl component="fieldset" className={classes.inputRadio}>
            <FormLabel component="legend">¿A quiénes vamos a asegurar?</FormLabel>
            <RadioGroup id="typeInsurance" aria-label="typeInsurance" name="typeInsurance" value={formik.values.typeInsurance} onChange={e => { setTypeInsurance(e); formik.handleChange(e)}}>
              <FormControlLabel value="me" control={<Radio />} label="Solo a mí" />
              <FormControlLabel value="family" control={<Radio />} label="A mí y a mi familia" />
            </RadioGroup>
          </FormControl>
          {withFamily && (<FormFamily/>)}
          {/* {formik.errors.typeInsurance && (
                  <span>{formik.errors.typeInsurance}</span>
              )} */}
              <div>
                <Button type="submit" disabled={!formik.isValid} className={`form__button ${formik.isValid && formFamilyValid ? "form__button--salud" : "form__button--disabled"}`}>
                Continuar <NavigateNextIcon />
              </Button>
              </div>
          
        </form>
      </div>
    </div>
  );
}

export default FormSignUp;