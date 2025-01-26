import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

export const runTerraformAction = ({
  id: 'backstage:run-terraform',
  description: 'Runs Terraform commands in a specified directory',
  schema: {
    input: {
      required: ['terraformDirectory'],
      type: 'object',
      properties: {
        terraformDirectory: {
          type: 'string',
          description: 'The directory where Terraform files are located',
        },
      },
    },
  },
  async handler(ctx) {
    const { terraformDirectory } = ctx.input;

    ctx.logger.info(`Initializing Terraform in ${terraformDirectory}...`);
    await execPromise(`terraform init`, { cwd: terraformDirectory });

    ctx.logger.info(`Applying Terraform configuration...`);
    await execPromise(`terraform apply -auto-approve`, { cwd: terraformDirectory });

    ctx.logger.info('Terraform apply completed.');
  },
});
