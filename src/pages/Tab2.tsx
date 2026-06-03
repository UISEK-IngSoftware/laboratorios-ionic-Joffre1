import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import './Tab2.css';

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Formulario de Repositorio</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Formulario de Reposiorio</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className='form-container'>
          <IonInput
            className='form-field'
            label= "Nombre del Repositorio"
            labelPlacement='floating'
            fill='outline'
            placeholder='nombre del repositorio'
            ></IonInput>
            <IonTextarea
            className='from-field'
            label= "Descripción del Repositorio"
            labelPlacement='floating'
            fill='outline'
            placeholder='Descripción del repositorio'
            rows={6}
            autoGrow
            ></IonTextarea>
            <IonButton className='form-field' expand="block" fill="solid">
              Crear Repositorio
            </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab2