output "public_ip" {
  description = "IP publico da instancia"
  value       = aws_instance.app.public_ip
}

output "api_url" {
  description = "URL de health check da API"
  value       = "http://${aws_instance.app.public_ip}:${var.app_port}/health"
}
