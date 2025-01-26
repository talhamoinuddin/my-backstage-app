output "repository_url" {
  value = github_repository.repo.http_clone_url  # Use https_clone_url instead of clone_url
}
