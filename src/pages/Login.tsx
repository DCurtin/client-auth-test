import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonInput, IonButton } from '@ionic/react';
import React, {useRef} from 'react';

import {useForm} from 'react-hook-form'
interface loginForm {
    phone: string,
    email:string
}
const Welcome: React.FC = () => {
    let formRef = useRef<HTMLFormElement>(null);
    const { register, getValues, setValue, errors, handleSubmit } = useForm<loginForm>({defaultValues:{
        phone: '',
        email: ''
    }})
    return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Login Page</IonTitle>
        </IonToolbar>
      </IonHeader>

        <IonContent fullscreen>
            <form ref={formRef} onSubmit={handleSubmit(validateSomeInput)}>
                <IonInput name='phone' placeholder='Phone' type='tel' ref={register}></IonInput>
                <IonInput name='email' placeholder='Email' type='email' ref={register}></IonInput>
                <IonButton onClick={()=>{formRef.current?.dispatchEvent(new Event('submit', {cancelable:true}))}}> Submit</IonButton>
            </form>
        </IonContent>
    </IonPage>
  );
};

function validateSomeInput(values:loginForm){
    console.log(values)
    if(!values.email){
        console.log("need phone or email")
    }else{
        console.log("s'all good")
        let url = '/apiLogin';
        let options = {
            method : 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email: values.email})
        }
        fetch(url, options).then((result)=>{
            console.log('success?')
            console.log('result')
        }).catch((err)=>{
            console.log('error')
            console.log(err)
        }).finally(()=>{
            console.log('finally')
        });
    }
}

export default Welcome;
