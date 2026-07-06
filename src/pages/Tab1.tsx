import React from 'react';
import { IonAlert, IonContent, IonHeader, IonList, IonPage, IonText, IonToast, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import './Tab1.css';
import RepoItem from '../components/RepoItem';
import LoadingSpinner from '../components/LoadingSpinner';
import { Repository } from '../interfaces/Repository';
import { fetchRepositories, deleteRepository } from '../services/GithubService';
import { useHistory } from 'react-router';

const Tab1: React.FC = () => {

  const history = useHistory();

  const [repos, setRepos] = React.useState<Repository[]>([]);

  const [loading, setLoading] = React.useState(false);

  const [errorMsg, setErrorMsg] = React.useState("");

  const [selectedRepo, setSelectedRepo] = React.useState<Repository | null>(null);

  const [showDeleteAlert, setShowDeleteAlert] = React.useState(false);

  const [showToast, setShowToast] = React.useState(false);

  const [toastMessage, setToastMessage] = React.useState("");

  const [toastColor, setToastColor] = React.useState<"success" | "danger">("success");

  const loadRepos = async () => {

    setLoading(true);

    fetchRepositories()

      .then((reposData) => {

        setRepos(reposData);

      })

      .catch((error) => {
        setErrorMsg(
          "Error al cargar repositorios: " + error
        );
      })

      .finally(() => {
        setLoading(false);
      });

  };

  const editRepository = (repo: Repository) => {

    history.push('/tab2', {
      repository: repo
    });
  };

  const confirmDelete = (repo: Repository) => {

    setSelectedRepo(repo);
    setShowDeleteAlert(true);
  };

  const removeRepository = async () => {

    if (!selectedRepo) return;
    setLoading(true);

    try {
      await deleteRepository(
        selectedRepo.owner.login,
        selectedRepo.name
      );

      setToastMessage("Repositorio eliminado correctamente.");
      setToastColor("success");
      setShowToast(true);
      loadRepos();

    } catch (error) {

      setErrorMsg("Error al eliminar: " + error);

      setToastMessage("No se pudo eliminar el repositorio.");
      setToastColor("danger");
      setShowToast(true);

    } finally {
      setLoading(false);
      setShowDeleteAlert(false);
      setSelectedRepo(null);
    }

  };

  useIonViewWillEnter(() => {loadRepos();});

  return (
    <IonPage>

      <IonHeader>

        <IonToolbar>

          <IonTitle>Repositorios</IonTitle>

        </IonToolbar>

      </IonHeader>

      <IonContent fullscreen className="ion-padding">

        <IonHeader collapse="condense">

          <IonToolbar>

            <IonTitle size="large">

              Repositorios

            </IonTitle>

          </IonToolbar>

        </IonHeader>

        <IonList>

          {repos.map((repo) => (

            <RepoItem
              key={repo.id}
              repo={repo}
              onEdit={editRepository}
              onDelete={confirmDelete}
            />

          ))}

        </IonList>

        {loading && (<LoadingSpinner isOpen={loading} />)}

        <IonToast
          isOpen={showToast}
          message={toastMessage}
          duration={2000}
          color={toastColor}
          onDidDismiss={() => setShowToast(false)}
        />

        {errorMsg !== "" && (<IonText color="danger">{errorMsg}</IonText>)}

        <IonAlert
          isOpen={showDeleteAlert}
          header="Eliminar repositorio"
          message={`¿Está seguro de eliminar el repositorio "${selectedRepo?.name}"?`}
          buttons={[
            {

              text: "Cancelar",
              role: "cancel",

              handler: () => {

                setShowDeleteAlert(false);
                setSelectedRepo(null);

              }

            },

            {
              text: "Eliminar",
              role: "destructive",
              
              handler: () => {
                removeRepository();

              }

            }

          ]}

        />

      </IonContent>

    </IonPage>

  );

};

export default Tab1;