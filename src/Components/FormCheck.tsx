import React, { useState, useContext, useEffect } from 'react'
import { Context } from '../App'

// material ui
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

// form
import * as Yup from 'yup'
import { useFormik } from 'formik'

import axios from "axios";

const useStyles = makeStyles((theme) => ({
  form: {
    maxWidth: "400px"
  },
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
  checkbox: {
    marginTop: '10px',
    "& .MuiTypography-body1": {
      fontSize: "12px",
      color: "#C5CBE0",
    },
    "& .MuiCheckbox-colorSecondary.Mui-checked": {
      color: "#83CC5E"
    }
  }
}));

const Schema = Yup.object().shape({
  typeDocument: Yup.string()
    .required(''),
  numberDocument: Yup.string()
    .required('').nullable(),
  birthDate: Yup.date().required(''),
  cellphone: Yup.string()
    .required('').nullable(),
  protection: Yup.boolean().oneOf([true], "Aceptar los términos y condiciones"),
  comercial: Yup.boolean().oneOf([true], "Aceptar los términos y condiciones"),
});

type InitialValues = {
  names: string;
  firstLastName: string;
  secondLastName: string;
  typeDocument: string;
  numberDocument: number | null;
  birthDate: Date | null;
  cellphone: number | null;
  gender: string;
  protection: boolean;
  comercial: boolean;
  typeInsurance: string
}



const FormCheck = () => {
  const classes = useStyles();
  const { setStep, dataResponse, setDataResponse, setUserExist, setFamily } = useContext(Context)
  const [verify, setVerify] = useState<boolean>(false);
  const initialValues: InitialValues = {
    names: '',
    firstLastName: '',
    secondLastName: '',
    typeDocument: 'DNI',
    numberDocument: null,
    birthDate: null,
    cellphone: null,
    gender: '',
    protection: false,
    comercial: false,
    typeInsurance: ''
  }

  const formik = useFormik({
    initialValues,
    validationSchema: Schema,
    onSubmit: (values, { resetForm }) => {
      // setData(values)
      setDataResponse(values)
      getData()
      resetForm()
      setStep(1)
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

  const getData = async () => {
    // create repleace response because post get this message: "The owner of this Sandbox has exceeded their requests limit. Upgrade plans to re-enable access."

    const response = {
      "names": "FREDY LUIS",
      "firstLastName": "LOPEZ",
      "secondLastName": "MARTINEZ",
      "cellphone": 998765432,
      "gender": "M",
      "typeDocument": "DNI",
      "numberDocument": 25343476,
      "birthDate": "11/05/1972"
    }
    setDataResponse({response})
    if(response.numberDocument === formik.values.numberDocument) {
      setDataResponse({...initialValues,...response, protection: formik.values.protection, comercial: formik.values.comercial})
      setFamily([])
      setUserExist(true)
    } else {
      setDataResponse({...initialValues, ...formik.values, names: initialValues.names, typeInsurance: initialValues.typeInsurance})  
      setUserExist(false)  
      setFamily([])
    }
      
  //   const baseURL = `https://freestyle.getsandbox.com/dummy/obtenerdatospersona`
  //   if (
  //     formik.isValid
  //   ) {
  //     try {
  //       await axios.post(baseURL, {})
  //       .then(res => {
  //         console.log(res);
  //         console.log(res.data);
  //         setDataResponse(res.data)
  //       })
  //   } catch (error) {
  //         console.log('Ocurrió un error, lo revisaremos');
  //       }
  // } else {
  //   setVerify(true)
  // }
}
  useEffect(() => {
    if (dataResponse) {
      formik.setValues(dataResponse)
    } else {
      (() => formik.validateForm())();
    }
  }, [dataResponse])

  return (
    <form onSubmit={formik.handleSubmit} className={classes.form}>
      <div>
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
      </div>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container>
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
            className={classes.inputDate}
          />
        </Grid>
      </MuiPickersUtilsProvider>

      <TextField
        label="Celular"
        id="cellphone"
        name="cellphone"
        variant="filled"
        type="number"
        value={formik.values.cellphone || ''}
        error={Boolean(formik.errors.cellphone)}
        helperText={formik.errors.cellphone}
        onChange={formik.handleChange}
        className={classes.inputRegular}
      />

      <FormControlLabel
        name="protection"
        id="protection"
        className={classes.checkbox}
        control={
          <Checkbox
            checked={formik.values.protection}
            onChange={formik.handleChange}
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        }
        label="Acepto la Política de Protección de Datos Personales y los Términos y Condiciones"
      />

      <FormControlLabel
        name="comercial"
        id="comercial"
        className={classes.checkbox}
        control={
          <Checkbox
            checked={formik.values.comercial}
            onChange={formik.handleChange}
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        }
        label="Acepto la Política de Envío de Comunicaciones Comerciales"
      />
      {/* {!formik.isValid && (
        <span>Complete los datos solicitados</span>
      )} */}
      {verify && (
        <span>Vuelva a verificar sus datos </span>
      )}
      <div>
        <Button type="submit" disabled={!formik.isValid} className={`form__button ${formik.isValid ? "form__button--salud" : "form__button--disabled"}`}>
          COMENCEMOS
        </Button>
      </div>
    </form>
  )
}

export default FormCheck