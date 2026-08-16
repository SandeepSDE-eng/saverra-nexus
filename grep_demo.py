import paramiko

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('145.223.17.106', port=65002, username='u278286324', password='Saverra@123')

cmd = "grep -rn 'createPool' /home/u278286324/domains/demo.saverrarealty.com/hbuilds/current/nodejs/server/"
stdin, stdout, stderr = client.exec_command(cmd)
print(stdout.read().decode('utf-8', errors='ignore'))
client.close()
