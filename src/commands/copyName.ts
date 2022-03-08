import * as vscode from 'vscode';
import { RouteItem } from "../routesList/routeItem";

export function copyName(routeItem: RouteItem | null = null) {

    if (routeItem === null) {
        vscode.window.showWarningMessage('You can copy name from Routes List');
        return;
    }

    vscode.env.clipboard.writeText(routeItem.getName() || '');

}