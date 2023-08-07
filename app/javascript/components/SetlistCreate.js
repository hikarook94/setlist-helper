import React, { useState } from 'react';
import SetlistForm from './SetlistForm';
import SetlistSongSelect from './SetlistSongSelect';

const SetlistCreate = () => {
  const [step, setStep] = useState(0);
  const nextStep = () => setStep(step + 1);

  return (
    <>
    <div className="p-4">
      <h1 className="text-2xl text-center mb-8">セットリスト新規作成</h1>
      {step === 0 && <SetlistForm onNext={nextStep} />}
      {step === 1 && <SetlistSongSelect />}
    </div>
    </>
  )
}
export default SetlistCreate
