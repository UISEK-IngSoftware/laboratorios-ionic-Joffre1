import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab3.css';

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Usuario</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 3</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className='card-container'>
          <IonCard className='card'>
            < img src= "https://avatars.githubusercontent.com/u/216461812?v=4&size=64" alt='Avatar'/>
            <IonCardHeader>
              <IonCardTitle>Joffre Verdezoto</IonCardTitle>
              <IonCardSubtitle>joffreverdezoto</IonCardSubtitle>
            </IonCardHeader>
            <IonCardHeader>
              Hola soy Joffre Verdeoto, un estudiante informático en la univesidad SEK, además me gusta mucho hacer deporte pero más el fútbol.
            </IonCardHeader>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
