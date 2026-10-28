terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

resource "aws_instance" "mon_premier_serveur" {
  ami           = "ami-0c7217cdde317cfec" # Image Ubuntu 22.04 LTS
  instance_type = "t3.micro"             # On teste t3.micro (standard Free Tier récent)

  tags = {
    Name        = "SysHealth-Cloud-Server"
    Environment = "sandbox"
    Owner       = "wolfsay"
  }
}