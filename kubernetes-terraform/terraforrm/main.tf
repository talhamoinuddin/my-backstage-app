
# GitHub Repository Resource

resource "github_repository" "repo" {
  name        = "my-terraform-repo"
  description = "My Terraform repository"
  visibility  = "public"
}




