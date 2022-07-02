import * as vscode from 'vscode';
import { Commands } from './commands';

export function activate(context: vscode.ExtensionContext) {
	/* Setup commands */
	const commands = new Commands(context);
	commands.init();
}

export function deactivate() {}
