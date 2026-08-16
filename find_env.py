import paramiko

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('145.223.17.106', port=65002, username='u278286324', password='Saverra@123')

stdin, stdout, stderr = client.exec_command('find /home/u278286324 -maxdepth 5 -name ".env"')
print(stdout.read().decode())
client.close()
