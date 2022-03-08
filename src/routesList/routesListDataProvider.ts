import * as vscode from 'vscode';
import { RouteItem } from './routeItem';
import { shellExec } from '../utils/shellExec';
import { getPhpPath } from '../utils/getPhpPath';
import { loadRoutes } from '../utils/loadRoutes';

export class RoutesListDataProvider implements vscode.TreeDataProvider<RouteItem>
{
    private _onDidChangeTreeData: vscode.EventEmitter<any> = new vscode.EventEmitter<any>();
    readonly onDidChangeTreeData: vscode.Event<any> = this._onDidChangeTreeData.event;

    constructor(private workspaceRoot: string) { }

    public refresh(): any {
        this._onDidChangeTreeData.fire(undefined);
    }

    getTreeItem(element: RouteItem): vscode.TreeItem | Thenable<vscode.TreeItem> {
        return element;
    }

    async getChildren(element?: RouteItem): Promise<RouteItem[]> {

        try {
            const data = await loadRoutes(this.workspaceRoot);

            let result = [];

            for (const row of data) {
                result.push(
                    new RouteItem(row)
                );
            }

            result.sort((a, b) => a.getUri().localeCompare(b.getUri()));

            return result;
        } catch (e) {
            console.error(e);
            vscode.window.showErrorMessage('Artisan executing error.');
            return [];
        }
    }
}
