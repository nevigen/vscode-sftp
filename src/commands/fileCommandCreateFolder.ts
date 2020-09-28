import { COMMAND_CREATE_FOLDER } from '../constants';
import { createRemoteFolder } from '../fileHandlers';
import { checkFileCommand } from './abstract/createCommand';
import { uriFromExplorerContextOrEditorContext } from './shared';
import { window, Uri } from 'vscode';

export default checkFileCommand({
  id: COMMAND_CREATE_FOLDER,
  async getFileTarget(item, items) {
    const targets = await uriFromExplorerContextOrEditorContext(item, items);

    if (!targets) {
      return;
    }
    
    const result = await window.showInputBox({
        value: '',
        prompt: 'Please input folder name',
    });


    if (result !== undefined) {
        return Uri.parse(targets.toString() + '/' + result);
    }

    
    return undefined;
    
  },

  handleFile: createRemoteFolder,
});
