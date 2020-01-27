import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main';
import Profile from './pages/Profile';
import AddUser from './pages/AddUser';

const Routes = createAppContainer (
    createStackNavigator({
        Main: {
            screen: Main,
            navigationOptions: {
                title: 'DevRadar'
            }
        }, 
        Profile: {
            screen: Profile,
            navigationOptions: {
                title: 'Perfil no Github'
            }
        }, 
        AddUser: {
            screen: AddUser,
            navigationOptions: {
                title: 'Gerenciar Usuários'
            }
        }
    }, {
        defaultNavigationOptions: {
            headerTintColor: '#FFFFFF',
            headerBackTitleVisible: false,
            headerStyle: {
                backgroundColor: '#000000'
            }
        }
    }) 
);

export default Routes;