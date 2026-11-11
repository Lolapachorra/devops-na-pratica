variable "region" {
  description = "Regiao AWS"
  type        = string
  default     = "us-east-1"
}

variable "project" {
  description = "Prefixo dos recursos"
  type        = string
  default     = "devops-na-pratica"
}

variable "instance_type" {
  description = "Tipo da instancia EC2 (free tier)"
  type        = string
  default     = "t3.micro"
}

variable "app_port" {
  description = "Porta da API"
  type        = number
  default     = 3000
}

variable "ssh_cidr" {
  description = "CIDR liberado para SSH (use seu IP/32)"
  type        = string
  default     = "127.0.0.1/32"
}

variable "repo_url" {
  description = "Repositorio clonado pela instancia"
  type        = string
  default     = "https://github.com/Lolapachorra/devops-na-pratica.git"
}
