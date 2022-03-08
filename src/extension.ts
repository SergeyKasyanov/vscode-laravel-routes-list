import * as vscode from 'vscode';
import { RoutesListDataProvider } from './routesList/routesListDataProvider';
import { copyUri } from './commands/copyUri';
import { copyName } from './commands/copyName';
import { copyAction } from './commands/copyAction';

export function activate(context: vscode.ExtensionContext) {
    if (vscode.workspace.workspaceFolders?.length) {
        let routesListDataProvider = new RoutesListDataProvider(vscode.workspace.workspaceFolders[0].uri.path);

        vscode.window.registerTreeDataProvider('routesList.viewRoutes', routesListDataProvider);
        
        vscode.commands.registerCommand('routesList.refreshRoutes', () => { routesListDataProvider.refresh(); });

        vscode.commands.registerCommand('routesList.copyUri', copyUri);
        vscode.commands.registerCommand('routesList.copyName', copyName);
        vscode.commands.registerCommand('routesList.copyAction', copyAction);

        vscode.workspace.onDidChangeConfiguration(event => {
            let affected = event.affectsConfiguration('routesList.phpExecutable')
                || event.affectsConfiguration('routesList.shownHttpMethods');

            if (affected) {
                routesListDataProvider.refresh();
            }
        });
    }
}

export function deactivate() { }
