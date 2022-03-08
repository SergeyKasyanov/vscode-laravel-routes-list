import * as vscode from 'vscode';
import { getPhpPath } from './getPhpPath';
import { shellExec } from './shellExec';

export interface Route {
    uri: string,
    name: string | null,
    action: string,
    domain: string|null,
    method: string,
    middleware: string|null,
}

export async function loadRoutes(workspaceRoot: string): Promise<Array<Route>> {
    try {
        let artisanFileStat = await vscode.workspace.fs.stat(vscode.Uri.parse(`${workspaceRoot}/artisan`));

        if (artisanFileStat.size === 0) {
            vscode.window.showErrorMessage('Artisan file is empty. Something wrong.');
            return [];
        }
    } catch (Error) {
        console.log('Artisan file not found.');
        return [];
    }

    try {
        const phpPath = await getPhpPath();
        const cmd = `${phpPath} ${workspaceRoot}/artisan route:list --json`;
        const json = await shellExec(cmd);
        const data: Array<Route> = JSON.parse(json);

        let result = [];

        for (const row of data) {
            if (showRow(row)) {
                result.push(row);
            }
        }

        return result;
    } catch (e) {
        console.error(e);
        vscode.window.showErrorMessage('Artisan executing error.');
        return [];
    }
}

function showRow(row: any) {
    let shownMethods = vscode
        .workspace
        .getConfiguration('routesList')
        .get<Array<string>>('shownHttpMethods') || [];

    let methods: Array<string> = row.method.split('|');

    return methods
        .filter(m => shownMethods.includes(m))
        .length > 0;
}