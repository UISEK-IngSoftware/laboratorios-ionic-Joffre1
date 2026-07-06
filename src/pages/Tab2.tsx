import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonText, IonTextarea, IonTitle, IonToolbar, IonToast } from '@ionic/react';
import './Tab2.css';
import React from 'react';
import { RepositoryPayload } from '../interfaces/RepositoryPayload';
import { createRepository, updateRepository } from '../services/GithubService';
import { useHistory, useLocation } from 'react-router';
import LoadingSpinner from '../components/LoadingSpinner';
import { Repository } from '../interfaces/Repository';

const Tab2: React.FC = () => {
  const history = useHistory();
  const location = useLocation<{ repository?: Repository; }>();

  const editingRepo = location.state?.repository;

  const isEditing = editingRepo !== undefined;

  const [loading, setLoading] = React.useState(false);

  const [showToast, setShowToast] = React.useState(false);

  const [toastMessage, setToastMessage] = React.useState("");

  const [toastColor, setToastColor] = React.useState<"success" | "danger">("success");

  const [errorMsg, setErrorMsg] = React.useState("");

  const [repoFormData, setRepoFormData] = React.useState<RepositoryPayload>({
    name: "",
    description: ""
  });

  React.useEffect(() => {
    setErrorMsg("");

    if (editingRepo) {

      setRepoFormData({
        name: editingRepo.name, description: editingRepo.description || ""
      });

    } else {

      setRepoFormData({
        name: "",
        description: ""
      });

    }

  }, [editingRepo]);

  const setRepoName = (value: string) => {

    setRepoFormData({

      ...repoFormData,

      name: value

    });

  };

  const setRepoDescription = (value: string) => {

    setRepoFormData({

      ...repoFormData,

      description: value

    });

  };

  const saveRepository = async () => {

    if (repoFormData.name.trim() === "") {
      setErrorMsg("Este campo es obligatorio");
      return;
    }

    setLoading(true);

    try {

      if (isEditing && editingRepo) {

        await updateRepository(
          editingRepo.owner.login,
          editingRepo.name,
          repoFormData
        );

        setToastMessage("Repositorio actualizado correctamente.");
        setToastColor("success");

      } else {

        await createRepository(repoFormData);
        setToastMessage("Repositorio creado correctamente.");
        setToastColor("success");
        setShowToast(true);
      }

      setShowToast(true);

      setTimeout(() => { history.replace("/tab1"); }, 1500);

    } catch (error) {

      setErrorMsg(

        (isEditing ? "Error al actualizar repositorio: " : "Error al crear repositorio: ") + error);

        setToastMessage("Ocurrió un error.");

        setToastColor("danger");

        setShowToast(true);

    } finally {

      setLoading(false);

    }

  };

  return (
    <IonPage>

      <IonHeader>

        <IonToolbar>

          <IonTitle>

            {isEditing? "Editar repositorio": "Agregar repositorio"}

          </IonTitle>

        </IonToolbar>

      </IonHeader>

      <IonContent fullscreen>

        <IonHeader collapse="condense">

          <IonToolbar>

            <IonTitle size="large">

              {isEditing? "Editar repositorio": "Agregar repositorio"}

            </IonTitle>

          </IonToolbar>

        </IonHeader>

        <div className="form-container">

          <IonInput
            className="form-field"
            label="Nombre"
            labelPlacement="floating"
            fill="outline"
            placeholder="nombre-repositorio"
            value={repoFormData.name}
            onIonChange={e => setRepoName(e.detail.value!)}
          />

          <IonTextarea
            className="form-field"
            label="Descripción"
            labelPlacement="floating"
            fill="outline"
            placeholder="descripcion-repositorio"
            rows={6}
            autoGrow
            value={repoFormData.description}
            onIonChange={e => setRepoDescription(e.detail.value!)}
          />

          {errorMsg !== "" && (

            <IonText color="danger">

              {errorMsg}

            </IonText>

          )}

          <IonButton
            className="form-field"
            expand="block"
            fill="solid"
            onClick={saveRepository}
            >

            {isEditing? "Guardar cambios": "Crear repositorio"}

          </IonButton>

        </div>

        <LoadingSpinner isOpen={loading} />

        <IonToast
          isOpen={showToast}
          message={toastMessage}
          duration={2000}
          color={toastColor}
          onDidDismiss={() => setShowToast(false)}
        />

      </IonContent>

    </IonPage>
  );

};

export default Tab2;