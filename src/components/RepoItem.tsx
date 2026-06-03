    import React from 'react';
import {createOutline, trashBinOutline, starOutline } from 'ionicons/icons'
import { IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonThumbnail} from '@ionic/react';

interface RepoProps {
    name: string;
    avatarUrl: string;
}

const RepoItem: React.FC<RepoProps> = ({ name, avatarUrl }) => {
    return (
        <IonItemSliding>
            <IonItem>
                <IonThumbnail slot="start">
                    <img src={avatarUrl}/>
                </IonThumbnail>
                <IonLabel>
                    <h1>{name}</h1>
                    <p>Descripción: Hola como vas</p>
                </IonLabel>
            </IonItem>
            <IonItemOptions>
                <IonItemOption>
                    <IonIcon icon={createOutline} slot='icon-only' />
                </IonItemOption>
                <IonItemOption>
                    <IonIcon icon={trashBinOutline} slot='icon-only' />
                </IonItemOption>
                <IonItemOption>
                    <IonIcon icon={starOutline} slot='icon-only' />
                </IonItemOption>
            </IonItemOptions>
        </IonItemSliding>
    );
};

export default RepoItem;