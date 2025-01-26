import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

export const deployDockerAction = ({
  id: 'backstage:deploy-docker',
  description: 'Deploys a Docker container to a Kubernetes cluster',
  schema: {
    input: {
      required: ['image', 'deploymentFile'],
      type: 'object',
      properties: {
        image: {
          type: 'string',
          description: 'Docker image to deploy',
        },
        deploymentFile: {
          type: 'string',
          description: 'Path to the Kubernetes deployment YAML file',
        },
      },
    },
  },
  async handler(ctx) {
    const { image, deploymentFile } = ctx.input;

    ctx.logger.info(`Updating deployment file with image ${image}...`);
    await execPromise(`kubectl apply -f ${deploymentFile}`);

    ctx.logger.info('Deployment completed.');
  },
});
