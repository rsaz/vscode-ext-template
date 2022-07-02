(function () {

    // vscode api
    const vscode = acquireVsCodeApi();

    // Html elements bindings
    const createProject = document.getElementById('submit-confirm');

    createProject.addEventListener("click", ()=> {
        vscode.postMessage({
            command: 'createProject',
            content: "Creating project"
        });
    });
})();
    