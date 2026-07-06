import React from 'react';
import {createOutline,trashBinOutline} from 'ionicons/icons';

import {IonIcon,IonItem,IonItemOption,IonItemOptions,IonItemSliding,IonLabel,IonThumbnail} from '@ionic/react';

import { Repository } from '../interfaces/Repository';

interface RepoItemProps {repo: Repository;
    onEdit: (repo: Repository) => void;
    onDelete: (repo: Repository) => void;
}

const RepoItem: React.FC<RepoItemProps> = ({repo,onEdit,onDelete}) => {

    const slidingRef = React.useRef<HTMLIonItemSlidingElement>(null);

    const handleEdit = async () => {
        await slidingRef.current?.close();
        onEdit(repo);
    };

    const handleDelete = async () => {
        await slidingRef.current?.close();
        onDelete(repo);
    };

    return (

        <IonItemSliding ref={slidingRef}>

            <IonItem>

                <IonThumbnail slot="start">
                    <img
                        src={repo.owner.avatar_url}
                        alt={repo.name}
                    />
                </IonThumbnail>

                <IonLabel>

                    <h3>{repo.name}</h3>

                    {repo.description && (
                        <p>{repo.description}</p>
                    )}

                    {repo.language && (
                        <p>
                            <strong>Language:</strong> {repo.language}
                        </p>
                    )}

                </IonLabel>

            </IonItem>

            <IonItemOptions side="end">

                <IonItemOption
                    color="primary"
                    onClick={handleEdit}
                >
                    <IonIcon
                        icon={createOutline}
                        slot="icon-only"
                    />
                </IonItemOption>

                <IonItemOption
                    color="danger"
                    onClick={handleDelete}
                >
                    <IonIcon
                        icon={trashBinOutline}
                        slot="icon-only"
                    />
                </IonItemOption>

            </IonItemOptions>

        </IonItemSliding>

    );

};

export default RepoItem;