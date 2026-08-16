import paramiko
import sys

def run_remote_deploy():
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    print("Connecting to Hostinger...")
    client.connect('145.223.17.106', port=65002, username='u278286324', password='Saverra@123')
    print("Connected!")

    cmd = "export PATH=/opt/alt/alt-nodejs20/root/usr/bin:$PATH && cd domains/saverrarealty.com/public_html && bash deploy_to_main.sh"
    stdin, stdout, stderr = client.exec_command(cmd)

    while True:
        line = stdout.readline()
        if not line:
            break
        sys.stdout.buffer.write(line.encode('utf-8', errors='ignore'))
        sys.stdout.buffer.flush()

    err = stderr.read().decode('utf-8', errors='ignore')
    if err:
        print("STDERR:", err)

    client.close()

if __name__ == "__main__":
    run_remote_deploy()
