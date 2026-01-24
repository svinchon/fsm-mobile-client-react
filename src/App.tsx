import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import ServiceRequestsList from './pages/ServiceRequestsList';
//import ViewMessage from './pages/ViewMessage';

import { library, list, addCircle, settingsOutline } from 'ionicons/icons';
import CreateServiceRequest from './pages/CreateServiceRequest';
import WorkOrderList from './pages/WorkOrderList';
import KnowledgeAgent from './pages/KnowledgeAgent';
import Settings from './pages/Settings';

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

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/" exact={true}>
            <Redirect to="/srl" />
          </Route>
          <Route exact path="/srl">
            <ServiceRequestsList />
          </Route>
          <Route exact path="/csr">
            <CreateServiceRequest />
          </Route>
          <Route path="/wol">
            <WorkOrderList />
          </Route>
          <Route path="/ka">
            <KnowledgeAgent />
          </Route>
          <Route path="/settings">
            <Settings />
          </Route>
          <Route exact path="/">
            <Redirect to="/tab1" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="tab4" href="/ka">
            <IonIcon aria-hidden="true" icon={library} />
            <IonLabel>K Agent</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/wol">
            <IonIcon aria-hidden="true" icon={list} />
            <IonLabel>WO List</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab1" href="/srl">
            <IonIcon aria-hidden="true" icon={list} />
            <IonLabel>SR List</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/csr">
            <IonIcon aria-hidden="true" icon={addCircle} />
            <IonLabel>Create SR</IonLabel>
          </IonTabButton>
          <IonTabButton tab="settings" href="/settings">
            <IonIcon aria-hidden="true" icon={settingsOutline} />
            <IonLabel>Settings</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
