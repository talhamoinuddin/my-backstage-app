import  scaffolderBackendFeature  from '@backstage/plugin-scaffolder-backend';
import { uploadFilesAction } from './actions/uploadFileAction';
import { runTerraformAction } from './actions/runTerraformAction';
import { deployDockerAction } from './actions/deployDockerAction';

export default [
  scaffolderBackendFeature,
  uploadFilesAction,
  runTerraformAction,
  deployDockerAction,
];
