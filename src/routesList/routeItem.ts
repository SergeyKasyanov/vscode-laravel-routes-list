import * as vscode from 'vscode';
import { Route } from '../utils/loadRoutes';

export class RouteItem extends vscode.TreeItem {

    private shownMethods: Array<string> = [];

    constructor(
        private dataRow: Route
    ) {
        super('');

        this.loadShownMethods();

        this.setLabel();
        this.setTooltip();
        this.setDescription();

        this.contextValue = 'routeListItem';
    }

    private loadShownMethods() {
        let shownMethods = vscode
            .workspace
            .getConfiguration('routesList')
            .get<Array<string>>('shownHttpMethods');

        if (!shownMethods) {
            shownMethods = [];
        }

        this.shownMethods = shownMethods;
    }

    public getUri(): string {
        return this.dataRow.uri;
    }

    public getName(): string|null {
        return this.dataRow.name;
    }

    public getAction(): string {
        return this.dataRow.action;
    }

    private setLabel() {
        this.label = this.getMethodLabel() + '   ' + this.dataRow.uri;
    }

    private getMethodLabel() {
        let methods: Array<string> = this.dataRow.method.split('|');

        return methods
            .filter((m) => this.shownMethods.includes(m))
            .join('|');
    }

    private setTooltip() {
        let tooltip = '';

        if (this.dataRow.domain) {
            tooltip += '**Domain**: ' + this.dataRow.domain + '\n\n';
        }

        if (this.dataRow.method) {
            tooltip += '**Method**: ' + this.dataRow.method + '\n\n';
        }

        if (this.dataRow.uri) {
            tooltip += '**Uri**: ' + this.dataRow.uri + '\n\n';
        }

        if (this.dataRow.name) {
            tooltip += '**Name**: ' + this.dataRow.name + '\n\n';
        }

        if (this.dataRow.action) {
            tooltip += '**Action**: ' + this.dataRow.action + '\n\n';
        }

        if (this.dataRow.middleware) {
            tooltip += '**Middleware**: ' + this.dataRow.middleware;
        }

        this.tooltip = new vscode.MarkdownString(tooltip);
    }

    private setDescription() {
        this.description = this.dataRow.name || '';
    }
}
