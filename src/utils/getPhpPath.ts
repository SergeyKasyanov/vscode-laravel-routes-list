import * as vscode from 'vscode';

export async function getPhpPath() {
    let phpPath = vscode.workspace.getConfiguration('routesList').get<string>('phpExecutable');

    if (!phpPath) {
        throw Error('PHP Executable not found');
    }

    if (phpPath === 'php') {
        return phpPath;
    }

    try {
        let phpFileStat = await vscode.workspace.fs.stat(vscode.Uri.parse(phpPath));

        if (phpFileStat.size > 0) {
            return phpPath;
        }
    } catch (Error) {
    }

    throw Error('PHP Executable not found');
}