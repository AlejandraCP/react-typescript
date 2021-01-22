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
import Checkbox from '@material-ui/core/Checkbox';
import DateFnsUtils from '@date-io/date-fns';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { makeStyles } from "@material-ui/core";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

// form
import * as Yup from 'yup'
import { useFormik } from 'formik'

const useStyles = makeStyles((theme) => ({
  inputDNI: {
    "& .MuiOutlinedInput-root": {
      borderRadius: "4px 0 0 4px",
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "rgba(0, 0, 0, 0.23)",
        borderWidth: "1px"
      }
    },
  },
  inputText: {
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
      borderRadius: "0 4px 4px 0"
    },
    "& .MuiFilledInput-input": {
      padding: "25px 14.5px 10px"
    }
  },
  inputDate: {
    width: "100%",
    "& .MuiFilledInput-root": {
      backgroundColor: '#fff',
    },
    "& .MuiInput-underline:before": {
      borderBottom: "none",
    },
    "& .MuiInput-underline:after": {
      borderBottom: "none",
    },
    "& .MuiFormLabel-root.Mui-focused": {
      color: "rgba(0, 0, 0, 0.54)",
    },
    "&.MuiFormControl-root": {
      border: "1px solid #C4C4C4",
      borderRadius: "4px",
    },
    "& .MuiInputLabel-formControl": {
      left: "15px",
    }
  },
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
    "& h1": {
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
      fontSize: "20px"
    }

  }
}))
const Schema = Yup.object().shape({
  typeDocument: Yup.string()
    .required('Completar campo'),
  numberDocument: Yup.string()
    // .min(8, 'Too Short!')
    // .max(15, 'Too Long!')
    .required('Completar campo').nullable(),
  names: Yup.string()
    .required('Completar campo'),
  firstLastName: Yup.string()
    .required('Completar campo'),
  secondLastName: Yup.string()
    .required('Completar campo'),
  birthDate: Yup.date().required('Completar campo'),
  typeInsurance: Yup.string().required('Seleccionar el tipo de seguro')
});

type InitialValues = {
  typeDocument: string;
  numberDocument: number | null;
  names: string,
  firstLastName: string,
  secondLastName: string,
  birthDate: Date | null,
  gender: string,
  typeInsurance: string
}


const FormInfoDNI = () => {

  const classes = useStyles()
  const { setStep, dataResponse, setDataResponse, userExist, withFamily, setWithFamily, formFamilyValid, setFormFamilyValid } = useContext(Context)

  const initialValues: InitialValues = {
    typeDocument: '2',
    numberDocument: null,
    names: '',
    firstLastName: '',
    secondLastName: '',
    birthDate: null,
    gender: '',
    typeInsurance: ''
  }

  const formik = useFormik({
    initialValues,
    validationSchema: Schema,
    onSubmit: (values, { resetForm }) => {
      // setDataComplement(values)
      setDataResponse(values)
      setStep(2)
    }
  })

  const documentType = [
    {
      value: 'DNI',
      label: 'DNI',
    },
    {
      value: 'C.E',
      label: 'C.E',
    }
  ];

  const backInitial = () => setStep(0)

  const setTypeInsurance = (val: any) => {
    const value = val.target.value
    if (value === 'family') {
      setWithFamily(true)
      setFormFamilyValid(false)
    } else {
      setWithFamily(false)
      setFormFamilyValid(true)
    }
  }

  useEffect(() => {
    // (() => formik.validateForm())();
    if (dataResponse && userExist) {
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
        <h1>Hola, <span>{dataResponse.names}</span></h1>
        <p>Valida que los datos sean correctos</p>
        <p>Datos personales del titular</p>
      </div>
      <div className='form__content'>
        <form onSubmit={formik.handleSubmit} >
          <TextField
            id="typeDocument"
            select
            name="typeDocument"
            value={formik.values.typeDocument}
            onChange={formik.handleChange}
            variant="outlined"
            error={Boolean(formik.errors.typeDocument)}
            helperText={formik.errors.typeDocument}
            className={classes.inputDNI}
          >
            {documentType.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            id="numberDocument"
            name="numberDocument"
            label="Número de documento"
            variant="filled"
            value={formik.values.numberDocument || ''}
            onChange={formik.handleChange}
            type='number'
            error={Boolean(formik.errors.numberDocument)}
            helperText={formik.errors.numberDocument}
            className={classes.inputText}
          />
          <TextField id="names" name="names" onChange={formik.handleChange} value={formik.values.names} label="Nombres" variant="filled" className={classes.inputRegular} />
          <TextField id="firstLastName" name="firstLastName" onChange={formik.handleChange} value={formik.values.firstLastName} label="Apellido Paterno" variant="filled" className={classes.inputRegular} />
          <TextField id="secondLastName" name="secondLastName" onChange={formik.handleChange} value={formik.values.secondLastName} label="Apellido Materno" variant="filled" className={classes.inputRegular} />

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="birthDate"
                name="birthDate"
                label="Fecha de nacimiento"
                value={formik.values.birthDate}
                error={Boolean(formik.errors.birthDate)}
                onChange={value => formik.setFieldValue("birthDate", value)}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
                className={classes.inputDate}
              />
            </Grid>
          </MuiPickersUtilsProvider>
          <FormControl component="fieldset" className={classes.inputRadio}>
            <FormLabel component="legend">Género</FormLabel>
            <RadioGroup id="gender" aria-label="gender" name="gender" value={formik.values.gender} onChange={formik.handleChange}>
              <FormControlLabel value="F" control={<Radio />} label="Femenino" />
              <FormControlLabel value="M" control={<Radio />} label="Masculino" />
            </RadioGroup>
          </FormControl>
          <div>
            <FormControl component="fieldset" className={classes.inputRadio}>
              <FormLabel component="legend">¿A quiénes vamos a asegurar?</FormLabel>
              <RadioGroup id="typeInsurance" aria-label="typeInsurance" name="typeInsurance" value={formik.values.typeInsurance} onChange={e => { setTypeInsurance(e); formik.handleChange(e) }}>
                <FormControlLabel value="me" control={<Radio />} label="Solo a mí" />
                <FormControlLabel value="family" control={<Radio />} label="A mí y a mi familia" />
              </RadioGroup>
            </FormControl>
          </div>

          {/* {formik.errors.typeInsurance && (
                  <span>{formik.errors.typeInsurance}</span>
              )} */}
          {withFamily && (<FormFamily />)}
          <div>
            <Button type="submit" disabled={!formik.isValid || !formFamilyValid} className={`form__button ${formik.isValid && formFamilyValid ? "form__button--salud" : "form__button--disabled"}`}>
              Continuar <NavigateNextIcon />
            </Button>
          </div>
        </form>
      </div>
    </div>

  )
}

export default FormInfoDNI