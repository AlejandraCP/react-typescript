import React, { useState, createContext } from 'react';
import ChoosePlan from './Views/ChoosePlan'
import ConfirmInfo from './Views/ConfirmInfo'
import Home from './Views/Home'
import Thanks from './Views/Thanks'

type ContextType = {
  data: any;
  setData: any;
  step: number;
  setStep: any
  dataResponse: any;
  setDataResponse: any;
  dataComplement: any,
  setDataComplement: any,
  finalData: any,
  setFinalData: any,
  userExist: boolean,
  setUserExist: any,
  family: any,
  setFamily: any,
  withFamily: boolean,
  setWithFamily: any,
  formFamilyValid: boolean,
  setFormFamilyValid: any
}

export const Context = createContext<ContextType>({
  data: {},
  setData: undefined,
  step: 0,
  setStep: undefined,
  dataResponse: {},
  setDataResponse: undefined,
  dataComplement: {},
  setDataComplement: undefined,
  finalData: {},
  setFinalData: undefined,
  userExist: false,
  setUserExist: undefined,
  family: [],
  setFamily: undefined,
  withFamily: false,
  setWithFamily: undefined,
  formFamilyValid: false,
  setFormFamilyValid: undefined
})

function App() {
  const [step, setStep] = useState<number>(0);
  const [data, setData] = useState(null)
  const [dataResponse, setDataResponse] = useState(null)
  const [dataComplement, setDataComplement] = useState(null)
  const [finalData, setFinalData] = useState(null)
  const [userExist, setUserExist] = useState(false)
  const [family, setFamily] = useState([])
  const [withFamily, setWithFamily] = useState(false)
  const [formFamilyValid, setFormFamilyValid] = useState(false)


  return (
    <Context.Provider value={{ data, setData, step, setStep, dataResponse, setDataResponse, dataComplement, setDataComplement, finalData, setFinalData, userExist, setUserExist, family, setFamily, withFamily, setWithFamily, formFamilyValid, setFormFamilyValid }}>
      <div>
        {(() => {
          if (step === 0) {
            return <Home />;
          } else if (step === 1) {
            return <ConfirmInfo />
          } else if (step === 2) {
            return <ChoosePlan />
          } else if (step === 3) {
            return <Thanks />
          }
        })()}
      </div>
    </Context.Provider>
  );
}

export default App;
