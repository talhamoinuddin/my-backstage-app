import  createScaffolderAction  from '@backstage/plugin-scaffolder-backend';
import { Octokit } from '@octokit/rest';
import fs from 'fs';
import path from 'path';

export const uploadFilesAction =({
  id: 'custom:upload-files',
  description: 'Uploads Terraform files to a specified GitHub repository',
  schema: {
    input: {
      required: ['repoOwner', 'repoName', 'branch', 'filesPath', 'githubToken'],
      type: 'object',
      properties: {
        repoOwner: { type: 'string', description: 'GitHub owner (user or org)' },
        repoName: { type: 'string', description: 'GitHub repository name' },
        branch: { type: 'string', description: 'Branch to push the files to' },
        filesPath: { type: 'string', description: 'Local path to the Terraform files directory' },
        githubToken: { type: 'string', description: 'GitHub Personal Access Token (PAT)' },
      },
    },
  },
  async handler(ctx) {
    const { repoOwner, repoName, branch, filesPath, githubToken } = ctx.input;

    ctx.logger.info(`Uploading Terraform files from ${filesPath} to GitHub repository: ${repoOwner}/${repoName}`);

    const octokit = new Octokit({ auth: githubToken });

    // Get the latest commit from the branch
    const { data: branchData } = await octokit.repos.getBranch({
      owner: repoOwner,
      repo: repoName,
      branch,
    });

    const latestCommitSha = branchData.commit.sha;
    ctx.logger.info(`Latest commit SHA: ${latestCommitSha}`);

    // Read files from the local directory
    const files = fs.readdirSync(filesPath);

    for (const file of files) {
      const filePath = path.join(filesPath, file);
      if (fs.lstatSync(filePath).isFile()) {
        const content = fs.readFileSync(filePath, 'utf8');
        const encodedContent = Buffer.from(content).toString('base64');

        // Upload file to GitHub
        await octokit.repos.createOrUpdateFileContents({
          owner: repoOwner,
          repo: repoName,
          path: `terraform/${file}`, // Upload to a `terraform/` folder
          message: `Adding ${file} from Backstage`,
          content: encodedContent,
          branch,
        });

        ctx.logger.info(`Uploaded ${file} successfully.`);
      }
    }

    ctx.logger.info('Terraform files uploaded to GitHub successfully.');
  },
});
