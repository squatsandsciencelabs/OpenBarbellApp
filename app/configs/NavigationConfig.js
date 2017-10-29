import React from 'react';
import { SceneMap } from 'react-native-tab-view';

import WorkoutScreen from 'app/features/workout/WorkoutScreen';
import SettingsTab from 'app/features/settings/SettingsTab';
import HistoryScreen from 'app/features/history/HistoryScreen';

export const initialIndex = 2;

export const routes = [
    { key: '0', title: 'WORKOUT' },
    { key: '1', title: 'HISTORY' },
    { key: '2', title: 'SETTINGS' },            
];

export const sceneMap = SceneMap({
    '0': () => <WorkoutScreen />,
    '1': () => <HistoryScreen />,
    '2': () => <SettingsTab />
});
