import paramiko

def main():
    print("Connecting to Hostinger server via SSH & SFTP...")
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    client.connect('145.223.17.106', port=65002, username='u278286324', password='Saverra@123')

    print("Installing mysql2 module in server nodejs folder...")
    stdin, stdout, stderr = client.exec_command("cd /home/u278286324/domains/saverrarealty.com/hbuilds/current/nodejs && /opt/alt/alt-nodejs22/root/bin/npm install mysql2")
    print(stdout.read().decode())
    print(stderr.read().decode())

    sftp = client.open_sftp()
    target_path = "/home/u278286324/domains/saverrarealty.com/hbuilds/current/nodejs/seed.cjs"
    print(f"Uploading seed.cjs to {target_path}...")
    sftp.put(r"c:\SandeYadav\saverra-nexus\seed.cjs", target_path)
    sftp.close()

    print("Executing node seed.cjs inside server directory...")
    cmd = "cd /home/u278286324/domains/saverrarealty.com/hbuilds/current/nodejs && export DB_HOST=127.0.0.1 && export DB_NAME=u278286324_saverra && export DB_USER=u278286324_user && export DB_PASSWORD=Saverra@123 && /opt/alt/alt-nodejs22/root/bin/node seed.cjs"
    stdin, stdout, stderr = client.exec_command(cmd)
    
    out = stdout.read().decode()
    err = stderr.read().decode()
    
    print("STDOUT:", out)
    print("STDERR:", err)

    # Touch restart.txt to refresh passenger apps
    client.exec_command("touch /home/u278286324/domains/saverrarealty.com/hbuilds/current/nodejs/tmp/restart.txt")
    client.exec_command("touch /home/u278286324/domains/demo.saverrarealty.com/hbuilds/current/nodejs/tmp/restart.txt")

    client.close()
    print("SEED AND RESTART FINISHED!")

if __name__ == "__main__":
    main()
