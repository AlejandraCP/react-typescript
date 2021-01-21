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

import { v4 as uuid } from 'uuid';

const useStyles = makeStyles((theme) => ({
  form: {
    maxWidth: "400px",
    display: "flex",
    marginLeft: "0 !important" ,
    marginTop: "0 !important"
  },
  inputFamilyBond: {
    "& .MuiOutlinedInput-root": {
      borderRadius: "4px 0 0 4px",
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "rgba(0, 0, 0, 0.23)",
        borderWidth: "1px"
      },
      "& .MuiOutlinedInput-input": {
      padding: "18.5px 30px 13px 14px",
      }
    },
    "&.MuiFormControl-root": {
      marginTop: "16px !important"
    }
  },
  inputDate: {
    width: "70%",
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
      borderRadius: "0 4px 4px 0"
    },
    "& .MuiInputLabel-formControl": {
      left: "15px",
    },
  },
}));

const Schema = Yup.object().shape({
  familyBond: Yup.string()
    .required(''),
  birthDate: Yup.date().required('')
});

type InitialValues = {
  familyBond: string;
  birthDate: Date | null;
}

type FamilyMember = {
  id: number;
  familyBond: string;
  birthDate: Date | null;
}

function FormFamily() {
  const classes = useStyles();
  const { setStep, dataResponse, setDataResponse, family, setFamily } = useContext(Context)

  const initialValues: InitialValues = {
    familyBond: 'Vínculo',
    birthDate: null,
  }

  const formik = useFormik({
    initialValues,
    validationSchema: Schema,
    onSubmit: (values, { resetForm }) => {
      // setData(values)
      // setDataResponse(values)
      addFamilyMember(values)
      resetForm()
    }
  })

  const addFamilyMember = (val:any) =>{
    const newId = uuid();
    const newMember:FamilyMember = {
      id: newId,
      ...val
    }
    setFamily([[...family, newMember]])
  }

  const removeFamilyMember = (val:any) => {
  };

  useEffect(() => {
      (() => formik.validateForm())();

    // if (dataResponse) {
    //   formik.setValues(dataResponse)
    // } else {
    //   (() => formik.validateForm())();
    // }
  }, [dataResponse])

  const documentType = [
    {
      value: 'Vínculo',
      label: 'Vínculo',
    },
    {
      value: 'Cónyuge',
      label: 'Cónyuge',
    },
    {
      value: 'Hijo',
      label: 'Hijo',
    }
  ];
  return (
    <div>
      <p>Datos de los familiares</p>
      <form onSubmit={formik.handleSubmit} className={classes.form}>
        <TextField
          id="familyBond"
          select
          name="familyBond"
          value={formik.values.familyBond}
          onChange={formik.handleChange}
          variant="outlined"
          error={Boolean(formik.errors.familyBond)}
          helperText={formik.errors.familyBond}
          className={classes.inputFamilyBond}
        >
          {documentType.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
      </MuiPickersUtilsProvider>
      <Button type="submit" disabled={!formik.isValid} className={`form__button--add ${formik.isValid ? "form__button--add-enable" : "form__button--add-disabled"}`}>
          Agregar
        </Button>
    </form>
    </div>
  );
}

export default FormFamily;