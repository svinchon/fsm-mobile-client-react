import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonMenu,
  IonMenuToggle,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { useTranslation } from 'react-i18next';

import ServiceRequestsList from './pages/ServiceRequestsList';
//import ViewMessage from './pages/ViewMessage';

import { callOutline, settingsOutline, personOutline, constructOutline } from 'ionicons/icons';
import kaIcon from './svg/ka-icon.svg';
import CreateServiceRequest from './pages/CreateServiceRequest';
import WorkOrderList from './pages/WorkOrderList';
import KnowledgeAgent from './pages/KnowledgeAgent';
import Settings from './pages/Settings';
import Home from './pages/Home';
import Account from './pages/Account';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import { useEffect, useState } from 'react';
import { GlobalStatusProvider } from './state/global-status';
import GlobalStatusBar from './components/GlobalStatusBar';

setupIonicReact();

const App: React.FC = () => {
  
  const { t } = useTranslation();
  const [appMode, setAppMode] = useState<'Customer' | 'Technician'>(() => {
    const savedMode = localStorage.getItem('appMode');
    return savedMode === 'Technician' ? 'Technician' : 'Customer';
  });

  useEffect(() => {
    const savedColor = localStorage.getItem('primaryColor');
    if (savedColor) {
      document.documentElement.style.setProperty('--app-primary-color', savedColor);
    }
  }, []);

  useEffect(() => {
    const syncAppMode = () => {
      const savedMode = localStorage.getItem('appMode');
      setAppMode(savedMode === 'Technician' ? 'Technician' : 'Customer');
    };

    window.addEventListener('storage', syncAppMode);
    window.addEventListener('appModeChanged', syncAppMode);

    return () => {
      window.removeEventListener('storage', syncAppMode);
      window.removeEventListener('appModeChanged', syncAppMode);
    };
  }, []);

  const isTechnician = appMode === 'Technician';
  const defaultRoute = '/ka';

  const routerBase = import.meta.env.BASE_URL ?? '/';

  return (
    <IonApp>
      <GlobalStatusProvider>
        <IonReactRouter basename={routerBase}>
          <IonMenu contentId="main-content" side="end">
            <IonHeader>
              <IonToolbar>
                <IonTitle>Additional Options</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonContent>
              <IonMenuToggle autoHide={false}>
                <IonItem button routerLink="/settings" routerDirection="none">
                  <IonIcon slot="start" icon={settingsOutline} />
                  <IonLabel>Settings</IonLabel>
                </IonItem>
              </IonMenuToggle>
            </IonContent>
          </IonMenu>
          <IonTabs>
            <IonRouterOutlet id="main-content">
              <Route exact path="/">
                <Redirect to={defaultRoute} />
              </Route>
              <Route exact path="/index.html">
                <Redirect to={defaultRoute} />
              </Route>
              <Route exact path="/ka"><KnowledgeAgent /></Route>
              <Route exact path="/wol"><WorkOrderList /></Route>
              <Route exact path="/srl"><ServiceRequestsList /></Route>
              <Route exact path="/csr"><CreateServiceRequest /></Route>
              <Route exact path="/settings"><Settings /></Route>
              <Route exact path="/home"><Home /></Route>
              <Route exact path="/account"><Account /></Route>
            </IonRouterOutlet>
            {isTechnician ? (
              <IonTabBar slot="bottom">
              <IonTabButton tab="ka" href="/ka"><IonIcon aria-hidden="true" src={kaIcon} /><IonLabel>Assistant</IonLabel></IonTabButton>
              <IonTabButton tab="srl" href="/srl"><IonIcon aria-hidden="true" icon={callOutline} /><IonLabel>{t('tabs.requests')}</IonLabel></IonTabButton>
              <IonTabButton tab="wol" href="/wol"><IonIcon aria-hidden="true" icon={constructOutline} /><IonLabel>Work Orders</IonLabel></IonTabButton>
              <IonTabButton tab="account" href="/account"><IonIcon aria-hidden="true" icon={personOutline} /><IonLabel>{t('tabs.account')}</IonLabel></IonTabButton>
              </IonTabBar>
            ) : (
              <IonTabBar slot="bottom">
              <IonTabButton tab="ka" href="/ka"><IonIcon aria-hidden="true" src={kaIcon} /><IonLabel>Assistant</IonLabel></IonTabButton>
              <IonTabButton tab="srl" href="/srl"><IonIcon aria-hidden="true" icon={callOutline} /><IonLabel>{t('tabs.requests')}</IonLabel></IonTabButton>
              <IonTabButton tab="account" href="/account"><IonIcon aria-hidden="true" icon={personOutline} /><IonLabel>{t('tabs.account')}</IonLabel></IonTabButton>
              </IonTabBar>
            )}
            <GlobalStatusBar />

          </IonTabs>
        </IonReactRouter>
      </GlobalStatusProvider>
    </IonApp>
  );
};

export default App;
