import App from './App';
import { AppRegistry, StatusBar, Platform } from 'react-native';
import React from 'react';
import { name as appName } from './app.json';

// --- PERSISTÊNCIA E BANCO ---
import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import DatabaseProvider from '@nozbe/watermelondb/DatabaseProvider';
import { mySchema } from './src/models/schema';
import Blog from './src/models/Blog';
import Post from './src/models/Post';
import Profile from './src/models/Profile';
import Comment from './src/models/Comment';
import SpaceProfile from './src/models/SpaceProfile';

// --- REDUX ---
import { Provider } from 'react-redux';
import { store, persistor } from './src/store';
import { PersistGate } from 'redux-persist/integration/react';

// --- GESTURE HANDLER & NOTIFICATIONS ---
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import PushNotification from 'react-native-push-notification';

// --- NATIVE MODULES ---
import { NativeModules } from 'react-native';
const { TimeController } = NativeModules;

// Configuração do WatermelonDB
const adapter = new SQLiteAdapter({
    dbName: 'GrowDB10',
    schema: mySchema,
});

const database = new Database({
    adapter,
    modelClasses: [SpaceProfile, Blog, Post, Comment, Profile],
    actionsEnabled: true,
});

// Componente Raiz Envolvido com os Providers
const RNRedux = () => {
    // Inicializa os serviços nativos que você criou em Java/Kotlin
    if (TimeController) {
        TimeController.startService();
        TimeController.startDailyService();
    }

    return (
        <DatabaseProvider database={database}>
            <Provider store={store}>
                <StatusBar hidden={true} />
                <PersistGate loading={null} persistor={persistor}>
                    <App />
                </PersistGate>
            </Provider>
        </DatabaseProvider>
    );
};

// Registro do App com suporte a Gestos
AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(RNRedux));