import * as vscode from 'vscode';
import { RouteItem } from "../routesList/routeItem";

export function copyAction(routeItem: RouteItem | null = null) {

    if (routeItem === null) {
        vscode.window.showWarningMessage('You can copy action from Routes List');
        return;
    }

    vscode.env.clipboard.writeText(routeItem.getAction() || '');

}