import { refreshRemoteExplorer } from './shared';
import { fileOperations } from '../core';
import createFileHandler from './createFileHandler';
import { FileHandleOption } from './option';

export const createRemoteFile = createFileHandler<FileHandleOption & { skipDir?: boolean }>({
  name: 'createRemoteFile',
  async handle(option) {
    const remoteFs = await this.fileService.getRemoteFileSystem(this.config);
    const { remoteFsPath } = this.target;
    
    let promise;
    promise = fileOperations.createFile(remoteFsPath, remoteFs, {});

    await promise;
  },
  transformOption() {
    const config = this.config;
    return {
      ignore: config.ignore,
    };
  },
  afterHandle() {
    refreshRemoteExplorer(this.target, true);
  },
});

export const createRemoteFolder = createFileHandler<FileHandleOption & { skipDir?: boolean }>({
  name: 'createRemoteFolder',
  async handle(option) {
    const remoteFs = await this.fileService.getRemoteFileSystem(this.config);
    const { remoteFsPath } = this.target;
    
    let promise;
    promise = fileOperations.createDir(remoteFsPath, remoteFs, {});

    await promise;
  },
  transformOption() {
    const config = this.config;
    return {
      ignore: config.ignore,
    };
  },
  afterHandle() {
    refreshRemoteExplorer(this.target, true);
  },
});
