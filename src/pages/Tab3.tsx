import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import './Tab3.css';
import React from 'react';
import { GithubUser } from "../interfaces/GithubUser";
import { getUserInfo } from '../services/GithubService';
import LoadingSpinner from '../components/LoadingSpinner';

const Tab3: React.FC = () => {
  const [userInfo, setUserInfo] = React.useState<GithubUser | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  const loadUserInfo = async () => {
    setLoading(true);
    const userData = await getUserInfo();
    setUserInfo(userData);
    setLoading(false);
  }

  useIonViewWillEnter(() => {
    loadUserInfo();
  });
  
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
            < img src= {userInfo?.avatar_url} alt={userInfo?.login}/>
            <IonCardHeader>
              <IonCardTitle color= "primary">{userInfo?.name}</IonCardTitle>
              <IonCardSubtitle>{userInfo?.login}</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>{userInfo?.bio}</IonCardContent>
          </IonCard>
        </div>
        {loading && <LoadingSpinner isOpen={loading}/>}
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
