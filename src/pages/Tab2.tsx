import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import './Tab2.css';
import { useHistory } from 'react-router-dom';
import { RepositoryPayload } from '../interfaces/RepositoryPayload';
import { create } from 'axios';
import { createRepository } from '../services/GithubService';
import React from 'react';
import LoadingSpinner from '../components/LoadingSpinner';

const Tab2: React.FC = () => {
  const history = useHistory();
  const [loading, setLoading] = React.useState<boolean>(false);

  const repoFormData : RepositoryPayload = {
    name: '',
    description: ''
  };

  const setRepoName = (value: string) => {
    repoFormData.name = value;
  };

  const setRepoDescription = (value: string) => {
    repoFormData.description = value;
  };

  const saveRepository = () => {
    if(repoFormData.name.trim() === ''){
      alert('El nombre del repositorio es obligatorio');
      return;
    }
    setLoading(true);
    createRepository(repoFormData).then(() => {
      history.push('/tab1');
    }).catch((error) => {
      alert('Error al crear el repositorio.');
    }).finally(() => {
      setLoading(false);
    });
  };

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
            value = {repoFormData.name}
            onIonChange={e => setRepoName(e.detail.value!)}
            ></IonInput>
            <IonTextarea
            className='from-field'
            label= "Descripción del Repositorio"
            labelPlacement='floating'
            fill='outline'
            placeholder='Descripción del repositorio'
            rows={6}
            value = {repoFormData.description}
            onIonChange={e => setRepoDescription(e.detail.value!)}
            autoGrow
            ></IonTextarea>
            <IonButton className='form-field' expand="block" fill="solid" 
              onClick={saveRepository}>
              Crear Repositorio
            </IonButton>
        </div>
        {loading && (<LoadingSpinner isOpen={loading}/>)}
      </IonContent>
    </IonPage>
  );
};

export default Tab2