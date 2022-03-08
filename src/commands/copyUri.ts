import * as vscode from 'vscode';
import { RouteItem } from "../routesList/routeItem";

export function copyUri(routeItem: RouteItem | null = null) {

    if (routeItem === null) {
        vscode.window.showWarningMessage('You can copy URI from Routes List');
        return;
    }

    vscode.env.clipboard.writeText(routeItem.getUri() || '');

}