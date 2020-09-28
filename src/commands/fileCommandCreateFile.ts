import { COMMAND_CREATE_FILE } from '../constants';
import { createRemoteFile } from '../fileHandlers';
import { checkFileCommand } from './abstract/createCommand';
import { uriFromExplorerContextOrEditorContext } from './shared';
import { window, Uri } from 'vscode';

export default checkFileCommand({
  id: COMMAND_CREATE_FILE,
  async getFileTarget(item, items) {
    const targets = await uriFromExplorerContextOrEditorContext(item, items);

    if (!targets) {
      return;
    }
    const result = await window.showInputBox({
        value: '',
        prompt: 'Please input file name',
    });


    if (result !== undefined) {
        return Uri.parse(targets.toString() + '/' + result);
    }

    
    return undefined;
    
  },

  handleFile: createRemoteFile,
});
