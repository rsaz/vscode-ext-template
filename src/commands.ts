import * as vscode from 'vscode';
import * as path from 'path';
import * as utils from './utils';

export class Commands {
    private static _context: vscode.ExtensionContext;

    constructor(context: vscode.ExtensionContext) {
        Commands._context = context;
    }

    /* Initialize your commands */
    public init(): void {
        this.registerCommands("extarch.myWebview", this.myWebviewHandler);
    }

    /* Add your command handler here */
    private myWebviewHandler(): any {
      // Creating panel  
      const panel = vscode.window.createWebviewPanel(
            "myWebview",
            "My Webview",
            vscode.ViewColumn.One,
            {
              enableScripts: true,
              localResourceRoots: [
                vscode.Uri.file(path.join(Commands._context.extensionPath, 'media'))
              ]
            }            
        );

      // Defining resources to be loaded
      const webviewHtmlUri = panel.webview.asWebviewUri(vscode.Uri.file(
        path.join(Commands._context.extensionPath, 'media', 'webview.html')
      ));

      const mainjsUri = panel.webview.asWebviewUri(vscode.Uri.file(
        path.join(Commands._context.extensionPath, 'media', 'main.js')
      ));

      const stylecssUri = panel.webview.asWebviewUri(vscode.Uri.file(
        path.join(Commands._context.extensionPath, 'media', 'style.css')
      ));

      const vscodecssUri = panel.webview.asWebviewUri(vscode.Uri.file(
        path.join(Commands._context.extensionPath, 'media', 'vscode.css')
      ));
      
      // Setting panel html 
      panel.webview.html = utils.getWebviewHTML(
        panel.title, panel.webview.cspSource,webviewHtmlUri, mainjsUri, stylecssUri,vscodecssUri);

      
      // Handling Webview and Extension communication (main.js)
      panel.webview.onDidReceiveMessage(
        async (message) => {
          switch (message.command) {
            case "createProject": 
            console.log(`Base command: ${message.content}`);
            //await this.createProject(message.cardSelection, message.packageManager);
            return;
          }
        }
      );

      /* Called on panel dispose */
      panel.onDidDispose(
        ()=> {
          // Space dedicated to terminate actions, clean lists when extension is closed
          vscode.window.showInformationMessage("Thanks for using our extension");
        },
        null,
        Commands._context.subscriptions
      );
    };

    private registerCommands(commandLine: string, commandHandler: ()=> any): void {
        Commands._context.subscriptions.push(vscode.commands.registerCommand(commandLine, commandHandler));
    }
}
